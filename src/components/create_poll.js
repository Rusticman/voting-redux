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
      <div className="createPollContainer">
        <h1>create poll<img className="chartImg" src="../../style/img/note.png" alt="note image" /></h1>
      <div className="createPollWrapper">

      <form onSubmit={handleSubmit(this.handlePollSubmit.bind(this))}>
        <fieldset className="form-group formPollTitle">
          <label>poll title:</label>
          <input {...pollTitle} className="form-control titleInput" placeholder="name of poll..." />

        </fieldset>
        <fieldset className="form-group formPollItems">
          <label>options:</label>
          <textarea {...items} type="text" rows="6" className="form-control itemstextArea" placeholder="separate items using a comma..." />
        </fieldset>
        <button action="submit" className="pollCreateButton">submit</button>
      </form>
      </div>
      </div>
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
