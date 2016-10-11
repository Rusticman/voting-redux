import React,{Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class Vote extends Component{


handleVoteSubmit({voteItem}){
const {pollID,hasVoted,poll,chartData,isChartUpdated} = this.props;
if(hasVoted){
  return this.props.messageDisplay('You have already voted in this poll.')
}

const selectedItem = voteItem || document.getElementById('voteSelect').value;
this.props.voteSubmit({selectedItem,pollID});
    setTimeout(() => {
      this.props.getChartData(pollID)
    },1500)


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

      <form className="voteForm" onSubmit={handleSubmit(this.handleVoteSubmit.bind(this))}>
        <select {...voteItem}  id="voteSelect" name="voteSelection">
        <option value="" default >select your option to vote...</option>
        {this.formOptions(this.props.poll)}
        </select>
        <button action="submit" className="submitButton btn btn-primary">submit</button>
      </form>

  </div>
  )
  }

}

export default reduxForm({
  form:"submitvote",
  fields:["voteItem"]
},null,actions)(Vote);
