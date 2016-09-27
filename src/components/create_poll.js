import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class CreatePoll extends Component{

  handlePollSubmit({pollTitle,items}){

    this.props.pollSubmit({pollTitle,items})
  }

  render(){
      const { handleSubmit, fields: { pollTitle, items }} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handlePollSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>poll title:</label>
          <input {...pollTitle} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>options:</label>
          <input {...items} type="text" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">submit</button>
      </form>
    )
  }
}
/*
function mapStateToProps(state){
  return{

  }
} */

export default reduxForm({
  form:'createpoll',
  fields:['pollTitle','items']
},null,actions)(CreatePoll);
