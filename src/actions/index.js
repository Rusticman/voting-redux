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
  MESSAGE_USER,
  UPDATE_CHART,
  DELETE_POLL
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


export function authSignin(userID,name,provider){
  return function(dispatch){console.log('am i working authsignin')
    axios.post(`${ROOT_URL}/auth/signin`,{userID,name,provider})
    .then(response => {
      dispatch({type:AUTH_USER})
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
  axios.post(`${ROOT_URL}/createpoll`, {pollTitle, items, id},{
      headers: { authorization: sessionStorage.getItem('token') }})
    .then(response => {

      setTimeout(() => browserHistory.push('/mypolls'),100);
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

export function voteSubmit({selectedItem,pollID}){
const userID = sessionStorage.getItem('id');

return function(dispatch){

axios.put(`${ROOT_URL}/vote`,{selectedItem,pollID,userID},{
    headers: { authorization: sessionStorage.getItem('token') }
  })
     .then(response => {
       console.log('successfully submitted vote.');
       dispatch({
         type:HAS_VOTED,
         payload:true
       })
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
    .then(response => {console.log('retrieved my polls')
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

export function fetchPoll(pollID){
  return function(dispatch){
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
}

export function updateChart(boolean){
  return function(dispatch){

    dispatch({
      type:UPDATE_CHART,
      payload:boolean
    })
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

const arrayOfColours = ["#CF000F","#2ecc71","#FF7416","#44BBFF"
                      ,"#FFDE49","#6F2480","#CEBEFF","#799412","#112885",
                    "#C0392B","#F3EECC","#523D1E","#FAA5AD","#AE44C8",
                  "#6DA0CD","#FE0089","#7F8C8D"]

   const backgroundColor = arrayOfKeys.map((item,i) => {
     if(i < 17){
       return arrayOfColours[i];
     }
       const r = (Math.round(Math.random()* 127) + 127).toString(16);
       const g = (Math.round(Math.random()* 127) + 127).toString(16);
       const b = (Math.round(Math.random()* 127) + 127).toString(16);

   return '#' + r + g + b;
   });
   options.data.datasets[0].backgroundColor = backgroundColor;
console.log('new data:',options.data.datasets[0].data);

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
  .catch(()=> {
    console.log('didnt work hasVotedInPoll')
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
        setTimeout(() => {
          dispatch({
            type:ITEM_CREATED,
            payload:newState
          })
        },2000)
      }
      else{
        dispatch({
          type:MESSAGE_USER,
          payload:'You have already created an item for this poll.'
        })
        setTimeout(() => dispatch({
          type:MESSAGE_USER,
          payload:''
        }),3000)
      }

  })
  .catch(() => {
    console.log('it failed to create new item')
  })
}

}

export function messageDisplay(message){
return function(dispatch){

  dispatch({
    type:MESSAGE_USER,
    payload:message
  })

  setTimeout(() => dispatch({
    type:MESSAGE_USER,
    payload:''
  }),3000)
}

}
