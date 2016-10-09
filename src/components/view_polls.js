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
          <span className="text-center"><strong>{poll.pollTitle}</strong></span><img src="../../style/img/magnifying_glass.png"/>
        </Link>
      </li>
    )
  })
})
 return pollArray;
}

render(){
const {allPolls} = this.props;
  if(!allPolls){
    return <div>waiting....</div>
  }
  else{
    return(
      <div style={{"overflow":"hidden"}}>
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
