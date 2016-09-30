import React,{Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class Vote extends Component{
  static contextTypes = {
    router: React.PropTypes.object
  }

  handleVoteSubmit({voteItem}){

  this.props.userVoted()

    const {pollID,hasVoted} = this.props;

    if(hasVoted){
      return;
    }
    if(voteItem){
      this.context.router.push('/loader');
       this.props.voteSubmit({voteItem,pollID});
       this.props.fetchPoll(pollID,true)
    }
    else{
      const voteItem =  document.getElementById('voteSelect').value;
        this.context.router.push('/loader');
      this.props.voteSubmit({voteItem,pollID});
      this.props.fetchPoll(pollID,true);
    }

  }

  formOptions(poll,arrayOfKeys){
    const options = Object.keys(poll.items);
    const voteOptions = options.map((item) => {
      return (
      <option key={item} value={item}>{item}</option>
    )
  });

  return voteOptions;
  }

  render(){

    const { handleSubmit, fields: {  voteItem }} = this.props;
return(
  <div className="voteFormWrapper">
   <div className="voteformWrapper">
      <form className="voteForm" onSubmit={handleSubmit(this.handleVoteSubmit.bind(this))}>
        <select {...voteItem}  id="voteSelect" name="voteSelection">
        <option value="" default >select your option to vote...</option>
        {this.formOptions(this.props.poll)}
        </select>
        <button action="submit" className="submitButton btn btn-primary">submit</button>
      </form>
    </div>
  </div>
  )
  }

}

export default reduxForm({
  form:"submitvote",
  fields:["voteItem"]
},null,actions)(Vote);
