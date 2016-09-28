import React,{Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class Vote extends Component{
  static contextTypes = {
    router: React.PropTypes.object
  }

  handleVoteSubmit({voteItem}){
    const pollID = this.props.pollID;
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
    <form className="voteForm" onSubmit={handleSubmit(this.handleVoteSubmit.bind(this))}>
    <select {...voteItem} id="voteSelect" name="voteSelection">
    {this.formOptions(this.props.poll)}
    </select>
    <button action="submit" className="btn btn-primary">submit</button>
    </form>
  )
  }

}

export default reduxForm({
  form:"submitvote",
  fields:["voteItem"]
},null,actions)(Vote);
