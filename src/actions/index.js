import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_MY_POLLS,
  FETCHED_POLL,
  ALL_POLLS,
  CHART_DATA,
  HAS_VOTED,
  ITEM_CREATED,
  POLL_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('id',response.data.id);
        // - redirect to the route '/feature'
        browserHistory.push('/viewpolls');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        console.log('bad login info');
       dispatch(authError('Bad Login Info'));

      });
  }
}

export function signoutUser() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('id');
console.log('signed out!')
  return { type: UNAUTH_USER };
}

export function signupUser({ email, password, userName }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, userName })
      .then(response => {
        dispatch({ type: AUTH_USER });
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('id',response.data.id);
        browserHistory.push('/viewpolls');
      })
      .catch(error => {
        console.log('Not signed up!')
        dispatch(authError(error.response.data.error));
      });
  }
}

export function changePage(){
  return{
    type:AUTH_ERROR,
    payload:''
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function pollSubmit({pollTitle,items}){
const id = sessionStorage.getItem('id');
  axios.post(`${ROOT_URL}/createpoll`, { pollTitle, items,id},{
      headers: { authorization: sessionStorage.getItem('token') }})
    .then(response => {

      browserHistory.push('/mypolls');
    })
    .catch(() => {
      console.log('did not register new poll');

    });
}

export function viewAllPolls(){
  return function(dispatch){

      axios.get(`${ROOT_URL}/viewpolls`,{
          headers: { authorization: sessionStorage.getItem('token') }
        })
      .then(response => {
        dispatch({
          type:ALL_POLLS,
          payload:response.data.allPolls

        })

      })
      .catch(() => {
        console.log('Unable to retrieve all documents')
      })
  }

}

export function voteSubmit({voteItem,pollID}){
const userID = sessionStorage.getItem('id');

return function(dispatch){

axios.put(`${ROOT_URL}/vote`,{voteItem,pollID,userID},{
    headers: { authorization: sessionStorage.getItem('token') }
  })
     .then(response => {
       console.log('successfully submitted vote.');
       console.log(response.data.message)
     })
     .catch(() => {
       console.log('unsuccessfully submitted vote')
     })


}
}

export function myPollsRetrieve(){
  return function(dispatch){

    const id = sessionStorage.getItem('id');

    axios.get(`${ROOT_URL}/mypolls/${id}`,{
        headers: { authorization: sessionStorage.getItem('token') }
      })
    .then(response => {
      dispatch({
        type:FETCH_MY_POLLS,
        payload:response.data.polls
      });

    })
    .catch(() => {
      console.log('couldnt retrieve users polls');
    });
  }
}

export function fetchPoll(pollID,delay){
  return function(dispatch){
if(!delay){
  axios.get(`${ROOT_URL}/showpoll/${pollID}`, {
      headers: { authorization: sessionStorage.getItem('token') }
    })
  .then(response => {
    dispatch({
      type:FETCHED_POLL,
      payload:response.data.poll
    });
  })
  .catch(() =>{
    dispatch({
      type:FETCHED_POLL,
      payload:null
    });


  });

}
else{
setTimeout(function(){
  browserHistory.push('/viewpolls/'+pollID)
  axios.get(`${ROOT_URL}/showpoll/${pollID}`,{
      headers: { authorization: sessionStorage.getItem('token') }})
  .then(response => {
    dispatch({
      type:FETCHED_POLL,
      payload:response.data.poll
    });

  })
  .catch(() =>{
    dispatch({
      type:FETCHED_POLL,
      payload:null
    });


  });
}, 100);

}
  }

}


export function getChartData(pollID){
  return function(dispatch){
  axios.get(`${ROOT_URL}/showpoll/${pollID}`,{
      headers: { authorization: sessionStorage.getItem('token') }})
  .then(response => {
    const poll = response.data.poll;
    const objectItems = poll.items;
    const arrayOfKeys = Object.keys(objectItems);
    const arrayOfValues = [];

    const options = {
         type: 'doughnut',
                   data: {
             labels: [],
             datasets: [{
                 label: '# of Votes',
                 data: [],
                 backgroundColor: [],
                 borderColor: [],
                 borderWidth: 4
             }]
         },
        options : {
          legend: {
            display: false
         },
         responsive: true,
         maintainAspectRatio: true
     }
   };

   options.data.labels = arrayOfKeys;

   for( var key in objectItems){
   arrayOfValues.push(objectItems[key]);
   }

   options.data.datasets[0].data = arrayOfValues;

   const borderColor = arrayOfKeys.map((item) => {
   return 'rgb(0,0,0)';
   });
   options.data.datasets[0].borderColor = borderColor;

   const backgroundColor = arrayOfKeys.map((item) => {

       const r = (Math.round(Math.random()* 127) + 127).toString(16);
       const g = (Math.round(Math.random()* 127) + 127).toString(16);
       const b = (Math.round(Math.random()* 127) + 127).toString(16);

   return '#' + r + g + b;
   });
   options.data.datasets[0].backgroundColor = backgroundColor;


    dispatch({
      type:CHART_DATA,
      payload:options
    });
  })
  .catch(() =>{
    console.log('chart data not retrieved')
  })
}
}

export function hasVotedInPoll(pollID){
return function(dispatch){
  const id = sessionStorage.getItem('id');

  axios.get(`${ROOT_URL}/hasvoted/${pollID}/${id}`,{
      headers: { authorization: sessionStorage.getItem('token') }
    })
  .then(response => {
    console.log(response.data.message)
    if(response.data.message === true){
      dispatch({
        type:HAS_VOTED,
        payload:true
      })
    }
    else{
      dispatch({
        type:HAS_VOTED,
        payload:false
      })
    }

  })
}
}

export function newItemCreate({pollID,newItem,newState}){
return function(dispatch){
  const userID = sessionStorage.getItem('id');

  axios.post(`${ROOT_URL}/newitem`,{pollID, newItem, userID},{
      headers: { authorization: sessionStorage.getItem('token') }
    })
  .then(response => {
      if(response.data.message === 'success'){

        dispatch({
          type:ITEM_CREATED,
          payload:newState
        })
      }
      else{
        dispatch({
          type:POLL_ERROR,
          payload:'You have already created an item for this poll'
        })
      }

  })
  .catch(() => {
    console.log('it failed to create new item')
  })
}

}


export function clearPollError(){

  return{
    type:POLL_ERROR,
    payload:''
  }
}
