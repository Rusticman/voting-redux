import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Chart from 'chart.js';
import * as actions from '../actions';
import Vote from './vote';
import Table from './table';

class ShowPoll extends Component{


componentWillMount(){
this.props.getChartData(this.props.params.pollID);//sends pollID to fetchPoll action taken from param
this.props.fetchPoll(this.props.params.pollID); //this finds in database and sends it back
}



componentWillUnmount(){
this.props.fetchPoll(null);
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
    return <div>If you would like to vote, please sign in or sign up if you're a new user.</div>
  }
  else{
    return   <Vote poll={poll} pollID={this.props.params.pollID} />
  }
}


render(){
  const {poll,authenticated,chartData} = this.props;

  if(!chartData || !poll){
  console.log('not yet....')
  }
  else{
   this.chartRender(poll, chartData)
  }



  return(
    <div className="showPollView">
      <h1>poll<img className="chartImg" src="../../style/img/chart.png" alt="chart image" /></h1>
      <div className="pollTitle">{this.pollInfo(poll)}</div>
        <div className="pollWrappedContainers">
          <div className="leftPollContainer">
            <div className="chartWrapper">
              <canvas id="myChart">
              </canvas>

            </div>
            <div className="voteFormWrapper">
              {this.formComponent(poll,authenticated)}
            </div>
          </div>
          <div className="rightPollContainer">
            <Table chartData={this.props.chartData} />
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
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps,actions)(ShowPoll);
