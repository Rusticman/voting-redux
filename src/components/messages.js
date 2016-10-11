import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Messages = (props) => {
    const {hasVoted,hasVoteMessage,pollError,auth,messageForUser} = props;

if(!auth){
  return (
    <div className="messageSuggestion alert alert-warning">If you would like to vote or create a new item,
    please sign in or sign up if you're a new user.</div>
  )
}

if(!messageForUser){
return <div></div>
}
if(messageForUser){
    return <div className="alert alert-danger">{messageForUser}</div>
}


return <div></div>
}

export default Messages;
