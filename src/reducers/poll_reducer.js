import {
  FETCH_MY_POLLS,
  FETCHED_POLL,
  ALL_POLLS,
  CHART_DATA,
  HAS_VOTED,
  ITEM_CREATED,
  POLL_ERROR
} from '../actions/types';

const INITIAL_STATE = {
                      myPolls:[],
                      fetchedPoll:null,
                      allPolls:null,
                      chartData:{},
                      hasVoted:true,
                      itemCreated:false,
                      pollError:''
                    };

export default function(state =INITIAL_STATE,action){
  switch(action.type){
    case FETCH_MY_POLLS:
        return {...state, myPolls:action.payload}

    case FETCHED_POLL:
        return {...state, fetchedPoll:action.payload}

    case ALL_POLLS:
        return {...state, allPolls:action.payload}

    case CHART_DATA:
        return {...state, chartData:action.payload}

    case HAS_VOTED:
        return {...state, hasVoted:action.payload}

    case ITEM_CREATED:
        return {...state, itemCreated:action.payload}

    case POLL_ERROR:
        return {...state, pollError:action.payload}
  }
 return state;
}
