import React from 'react';

const Messages = (props) => {
    const {hasVoted,hasVoteMessage,pollError,auth} = props;

if(!auth){
  return (
    <div className="messageSuggestion alert alert-warning">If you would like to vote or create a new item,
    please sign in or sign up if you're a new user.</div>
  )
}

if(hasVoteMessage){

  if(hasVoted){
    return(
      <div className="alert alert-danger">
   You have already voted in this poll.
     </div>
    )
}

}



if(pollError){
return(

  <div className="alert alert-danger">
You have already created an item for this poll.
</div>
)
}
return <div></div>
}

export default Messages;
