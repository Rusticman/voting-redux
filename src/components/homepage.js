import React,{Component} from 'react';

class Homepage extends Component {

render(){
return(
  <div className="homepageWrapper">
    <div><img id="vote_logo" src="../../style/img/vote_logo.png" /></div>
    <div><img id="casting_ballot_img" src="../../style/img/casting_ballot.png" /></div>
    <div className="introText">Click on link above to view polls.  Alternatively, you can create your own poll by signing up!</div>
    <button className="sign_up_but">sign up</button>
    <div className="push"></div>
  </div>

)


}
}

export default Homepage;
