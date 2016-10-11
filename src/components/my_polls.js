import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

class MyPolls extends Component{

componentWillMount(){
this.props.myPollsRetrieve();
}

deletePoll(event){

if (confirm("Click OK to delete this poll") == true) {
const pollID = event.target.id;
axios.delete(`${ROOT_URL}/delete/${pollID}`,{
    headers: { authorization: sessionStorage.getItem('token') }})
.then(response => {
  console.log(response.data.success)

})
.catch(() => {
  console.log('failed to delete poll.')
})

  setTimeout(() => this.props.myPollsRetrieve(),500);

   }

}

mouseHover(event){
var tag;
  if(event.target.className === 'deleteImg'){
    tag = '.deleteTag';
  }
  else{
    tag = '.showPollTag';
  }
  const left =(event.clientX + 15)+'px';
  const top = (event.clientY - 45)+'px'
  const element = document.querySelector(tag);

element.style.left = left;
element.style.top = top;
element.style.opacity = 1;

}

mouseOut(event){
  var tag;
    if(event.target.className === 'deleteImg'){
      tag = '.deleteTag';
    }
    else{
      tag = '.showPollTag';
    }
  const element = document.querySelector(tag);
  element.style.opacity = 0;
}

renderPolls(){

  return this.props.polls.map((poll) => {
    return(
      <li className="viewPollItems"  key={poll._id.toString()}>

       <img onMouseEnter={this.mouseHover.bind(this)} onMouseOut={this.mouseOut.bind(this)} className="deleteImg" id={poll._id.toString()} onClick={this.deletePoll.bind(this)}  src="../../style/img/bin.png" alt="delete image" />

        <Link style={{"color":"white"}}  to={"mypolls/"+poll._id.toString()}>
          <span className="text-center"><strong>{poll.pollTitle}</strong></span><img className="magGlassImg" onMouseEnter={this.mouseHover.bind(this)} onMouseOut={this.mouseOut.bind(this)}  src="../../style/img/magnifying_glass.png"/>
        </Link>


      </li>
    )
  })
}

render(){
if(this.props.polls.length < 1){
  return(
<div className="myPollWrapper" style={{"textAlign":"center"}}><div className="deleteTag">delete poll</div><div className="showPollTag">show poll</div>
<h1>my polls</h1>
To create a new poll, please click on the link above.
</div>
  )
}

    return(
      <div className="myPollWrapper"><div className="deleteTag">delete poll</div><div className="showPollTag">show poll</div>
        <h1>my polls<img className="chartImg imgHeight" src="../../style/img/blue_chart.png" alt="chart image" /></h1>
      <ul className="viewPollContainer">
        {this.renderPolls()}
      </ul>
      </div>
    )
}

}

function mapStateToProps(state){
  return{
    polls:state.polls.myPolls
  }
}

export default connect(mapStateToProps,actions)(MyPolls)
