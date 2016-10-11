import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';

class ViewPolls extends Component{

componentWillMount(){
this.props.viewAllPolls();
}

renderPolls(){
const pollArray = this.props.allPolls.map((userPolls) => {

  return userPolls.polls.map((poll) => {
    return(
      <li className="viewPollItems" key={poll._id.toString()}>
        <Link style={{"color":"white"}} to={"viewpolls/"+poll._id.toString()}>
          <span className="text-center"><strong>{poll.pollTitle}</strong></span><img className="magGlassImg" onMouseEnter={this.mouseHover.bind(this)} onMouseOut={this.mouseOut.bind(this)} src="../../style/img/magnifying_glass.png"/>
        </Link>
      </li>
    )
  })
})
 return pollArray;
}

mouseHover(event){

  const tag = '.showPollTag';
  const left =(event.clientX + 15)+'px';
  const top = (event.clientY - 25)+'px'
  const element = document.querySelector(tag);

element.style.left = left;
element.style.top = top;
element.style.opacity = 1;

}

mouseOut(event){
  const tag = '.showPollTag';

  const element = document.querySelector(tag);
  element.style.opacity = 0;
}

render(){
const {allPolls} = this.props;
  if(!allPolls){
    return <div>waiting....</div>
  }
  else{
    return(
      <div style={{"overflow":"hidden"}}><div className="showPollTag">show poll</div>
      <h1>view polls<img className="chartImg imgHeight" src="../../style/img/blue_chart.png" alt="chart image" /></h1>
      <ul className="viewPollContainer">
      {this.renderPolls()}
      </ul>
      </div>
    )
  }
}

}

function mapStateToProps(state){
  return{
    allPolls:state.polls.allPolls
  }
}

export default connect(mapStateToProps,actions)(ViewPolls)
