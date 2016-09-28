import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Chart from 'chart.js';
import * as actions from '../actions';
import Vote from './vote';
import Table from './table';

class ShowPoll extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{}
    }
  }


componentWillMount(){
this.props.fetchPoll(this.props.params.pollID);//sends pollID to fetchPoll action taken from param
                                              //this finds in database and sends it back
}

componentDidMount(){
    this.setState({chartData:options})
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
    return <div>If you would like to vote, please sign in or sign up if you're a new user.</div>
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
            <Table chartData={this.state.chartData} />
          </div>
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

bundle.js:2361 Warning: setState(...): Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.warning @ bundle.js:2361getInternalInstanceReadyForUpdate @ bundle.js:6082enqueueSetState @ bundle.js:6223ReactComponent.setState @ bundle.js:16089chartRender @ bundle.js:33087render @ bundle.js:33140_renderValidatedComponentWithoutOwnerOrContext @ bundle.js:7844_renderValidatedComponent @ bundle.js:7864ReactCompositeComponent__renderValidatedComponent @ bundle.js:1595_updateRenderedComponent @ bundle.js:7817_performComponentUpdate @ bundle.js:7801updateComponent @ bundle.js:7730ReactCompositeComponent_updateComponent @ bundle.js:1595performUpdateIfNecessary @ bundle.js:7678performUpdateIfNecessary @ bundle.js:5852runBatchedUpdates @ bundle.js:6434perform @ bundle.js:6894perform @ bundle.js:6894perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595close @ bundle.js:6350closeAll @ bundle.js:6960perform @ bundle.js:6907perform @ bundle.js:6391flushBatchedUpdates @ bundle.js:6452ReactUpdates_flushBatchedUpdates @ bundle.js:1595closeAll @ bundle.js:6960perform @ bundle.js:6907batchedUpdates @ bundle.js:10931enqueueUpdate @ bundle.js:6481enqueueUpdate @ bundle.js:6066enqueueSetState @ bundle.js:6232ReactComponent.setState @ bundle.js:16089handleChange @ bundle.js:20308dispatch @ bundle.js:20692(anonymous function) @ bundle.js:27181dispatch @ bundle.js:21284(anonymous function) @ bundle.js:30913
bundle.js:58418 stuff taken from state: undefined
