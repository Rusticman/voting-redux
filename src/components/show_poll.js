import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Chart from 'chart.js';
import * as actions from '../actions';
import Vote from './vote';

class ShowPoll extends Component{

componentWillMount(){
this.props.fetchPoll(this.props.params.pollID);//sends pollID to fetchPoll action taken from param
                                              //this finds in database and sends it back
}

componentWillUnmount(){

  this.props.fetchPoll(null);
}


chartRender(poll){
  const objectItems = poll.items;
  const arrayOfKeys = Object.keys(objectItems);
  const arrayOfValues = [];
  const ctx = document.getElementById("myChart");
  const options = {
       type: 'doughnut',
        data: {
           labels: [],
           datasets: [{
               label: '# of Votes',
               data: [],
               backgroundColor: [],
               borderColor: [],
               borderWidth: 3
           }]
       },
      options : {
       responsive: true,
       maintainAspectRatio: true
   }
 };

options.data.labels = arrayOfKeys;

for( var key in objectItems){
arrayOfValues.push(objectItems[key]);
}
console.log('data:', arrayOfValues)
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

  const MyDoughnutChart = new Chart(ctx, options);

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
    return <div>If you would lke to vote, please sign in or sign up if you're a new user.</div>
  }
  else{
    return   <Vote poll={poll} pollID={this.props.params.pollID} />
  }
}


render(){
  const {poll,authenticated} = this.props;

  if(!poll){
  console.log('not yet....')
  }
  else{
    this.chartRender(poll)
  }



  return(
    <div className="ShowPollView">
      <h1>poll<img className="blackChartImg" src="../../style/img/chart.png" alt="chart image" /></h1>
      <div className="pollTitle">{this.pollInfo(poll)}</div>
        <div className="chartWrapper">
          <canvas id="myChart">
          </canvas>

        </div>
        <div className="voteFormWrapper">
          {this.formComponent(poll,authenticated)}
        </div>

    </div>
  )
}
}

function mapStateToProps(state){
  return{
    poll:state.polls.fetchedPoll,
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps,actions)(ShowPoll);
