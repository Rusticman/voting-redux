import {
  FETCH_MY_POLLS,
  FETCHED_POLL,
  ALL_POLLS
} from '../actions/types';

const INITIAL_STATE = {myPolls:[],fetchedPoll:null,allPolls:null};

export default function(state =INITIAL_STATE,action){
  switch(action.type){
    case FETCH_MY_POLLS:
        return {...state, myPolls:action.payload}

    case FETCHED_POLL:
        return {...state, fetchedPoll:action.payload}

    case ALL_POLLS:
        return {...state, allPolls:action.payload}
  }
 return state;
}
