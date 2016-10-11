import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Chart from 'chart.js';
import * as actions from '../actions';
import Vote from './vote';
import Table from './table';
import NewItemForm from './new_item_form';
import Messages from './messages';

class ShowPoll extends Component{


componentWillMount(){
this.props.getChartData(this.props.params.pollID);//sends pollID to fetchPoll action taken from param
this.props.fetchPoll(this.props.params.pollID); //this finds in database and sends it back
if(sessionStorage.getItem('token')){
  this.props.hasVotedInPoll(this.props.params.pollID);
}

}

componentWillUnmount(){
this.props.fetchPoll(null);
}

componentWillUpdate(nextProps){
 if(nextProps.itemCreated !== this.props.itemCreated){//this should re-render component when new item
  this.props.getChartData(this.props.params.pollID);
}

}

chartRender(poll,chartData){
  const ctx = document.getElementById("myChart");
  const MyDoughnutChart = new Chart(ctx, chartData);
  return MyDoughnutChart;

}

pollInfo(poll){

  if(!poll){
    return <div>waiting</div>
  }
  else{
    return <div>{poll.pollTitle}</div>
  }
}

formComponent(poll,auth){

  if(!poll){
    return <div>waiting</div>
  }
  else if(!auth){
    return ;
  }
  else{
    return   <Vote poll={poll}
                   pollID={this.props.params.pollID}
                   hasVoted={this.props.hasVoted}
                   messageForUser={this.props.messageForUser}
                   updateChart={this.props.updateChart}
                   chartData={this.props.chartData}
                   />
  }
}


render(){
  const {poll,authenticated,chartData,itemCreated} = this.props;

  if(!chartData || !poll){
  }
  else{

    const hasNoData = this.props.chartData.data.datasets[0].data.every((elem) =>{ return elem === 0});

var  chartOpacity,chartTag;

if(hasNoData){
   chartOpacity = 'noOpacity'
  chartTag = 'Please vote in this poll.'
 }
else{
  chartTag = '';
chartOpacity = '';
}

  this.chartRender(poll, chartData);

  }

  return(
    <div className="showPollView">
      <h1>poll<img className="chartImg" src="../../style/img/chart.png" alt="chart image" /></h1>
      <div className="pollTitle">{this.pollInfo(poll)}</div>
        <div className="pollWrappedContainers">
          <div className="leftPollContainer">
            <div className="chartWrapper">{chartTag}
               <canvas className={chartOpacity} id="myChart">
               </canvas>
            </div>
              {this.formComponent(poll,authenticated)}
          </div>
          <div className="rightPollContainer">
            <Table chartData={this.props.chartData}

                          />
            <NewItemForm pollID={this.props.params.pollID}
                        auth={this.props.authenticated}
                        chartRender={this.props.chartRender}
                        />
            <div className="flashWrapper">
            <Messages hasVoted={this.props.hasVoted}
                      auth={this.props.authenticated}
                      messageForUser={this.props.messageForUser}
                      />

            </div>
          </div>
        </div>
    </div>
  )
}
}

function mapStateToProps(state){
  return{
    poll:state.polls.fetchedPoll,
    chartData:state.polls.chartData,
    authenticated: state.auth.authenticated,
    hasVoted:state.polls.hasVoted,
    itemCreated:state.polls.itemCreated,
    messageForUser: state.polls.messageForUser,
    isChartUpdated:state.polls.isChartUpdated
  }
}
export default connect(mapStateToProps,actions)(ShowPoll);
