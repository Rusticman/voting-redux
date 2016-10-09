import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';

class MyPolls extends Component{

componentWillMount(){
this.props.myPollsRetrieve();
}

renderPolls(){

  return this.props.polls.map((poll) => {
    return(
      <li className="viewPollItems" key={poll._id.toString()}>
        <Link style={{"color":"white"}}  to={"mypolls/"+poll._id.toString()}>
          <span className="text-center"><strong>{poll.pollTitle}</strong></span><img src="../../style/img/magnifying_glass.png"/>
        </Link>
      </li>
    )
  })
}

render(){
if(this.props.polls.length < 1){
  return(
<div style={{"textAlign":"center"}}>
<h1>my polls</h1>
To create a new poll, please click on the link above.
</div>


  )
}

    return(
      <div className="myPollWrapper">
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
