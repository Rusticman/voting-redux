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
      <li className="list-group-item" key={poll._id.toString()}>
        <Link to={"mypolls/"+poll._id.toString()}>
          <span className="text-center"><strong>{poll.pollTitle}</strong></span>
        </Link>
      </li>
    )
  })
}

render(){
    return(
      <div>
        <h1>my polls</h1>
      <ul className="list-group">
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
