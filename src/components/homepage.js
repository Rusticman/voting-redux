import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';


class Homepage extends Component {

  showLock(){
    this.props.lock.show();
  }

render(){
if(this.props.auth){
return(
  <div className="homepageWrapper">
  <div><img id="vote_logo" src="../../style/img/vote_logo.png" /></div>
  <div><img id="casting_ballot_img" src="../../style/img/casting_ballot.png" /></div>
  <div className="introText">You have now successfully signed in, click the link if you'd like to create your own poll.</div>
  <Link style={{"color":"#19b5fe"}} className="signUpButton" to="/createpoll" >create poll</Link>
  </div>
  )
}

return(
  <div className="homepageWrapper">
    <div><img id="vote_logo" src="../../style/img/vote_logo.png" /></div>
    <div><img id="casting_ballot_img" src="../../style/img/casting_ballot.png" /></div>
    <div className="introText">Click on link above to view polls.  Alternatively, you can create your own polls by signing up!</div>
    <button className="signUpButton" onClick={this.showLock.bind(this)}>sign in</button>
  </div>

)


}
}

function mapStateToProps(state){
  return{
    auth:state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Homepage);
