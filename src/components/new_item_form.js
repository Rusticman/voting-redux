import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions';

class NewItemForm extends Component {

handleItemSubmit({newItem}){
const newState = this.props.itemCreated ? false :true;//this is to help re render if new item created
const pollID = this.props.pollID;
this.props.newItemCreate({pollID,newItem ,newState});

}



render(){//console.log(this.props.pollError, 'and:',this.props.itemCreated)
const {auth,itemCreated,handleSubmit,fields:{newItem}} = this.props;

if(!auth){
  return <div></div>
}

  return(
    <div className="newItemWrapper">
    <form className="voteForm" onSubmit={handleSubmit(this.handleItemSubmit.bind(this))}>

    <input type="text" {...newItem} className="newItemInput" placeholder="type new poll item here..." />

    <button action="submit" className="submitButton btn btn-primary">submit</button>
    </form>

    </div>
  )
}
}

function mapStateToProps(state){
  return{
    pollError:state.polls.pollError
  }
}

export default reduxForm(
  {form:'addnewitem',
   fields:['newItem']
},mapStateToProps,actions) (NewItemForm);
