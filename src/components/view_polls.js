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
      <li className="list-group-item" key={poll._id.toString()}>
        <Link to={"viewpolls/"+poll._id.toString()}>
          <span className="text-center"><strong>{poll.pollTitle}</strong></span>
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
      <div>
      <h1>view polls</h1>
      <ul className="list-group">
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
