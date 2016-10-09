import React from 'react';

const Table = (props) => {
  const {chartData} = props;

if(!chartData.data){
  return <div>loading....</div>
}
const dataArray = [];

   chartData.data.datasets[0].data.map(function(votes,i){
     const dataObj = {};
     dataObj.votes = votes;
    dataArray.push(dataObj)
  })

chartData.data.datasets[0].backgroundColor.map(function(colour,i){
      dataArray[i].colour = colour;
  })

chartData.data.labels.map(function(item,i){
  dataArray[i].item = item;
  })

const key = dataArray.map(function(keyItem,i){

 return <div className="keyTableWrapper" key={keyItem.item+i} className="keyItem">
            <div style={{background:keyItem.colour}} className="keyColour"></div>
              <span className="keyItem">{keyItem.item}</span>
              <div className="keyVotes">{keyItem.votes}</div>
          </div>
})

  return(

    <div className="keyTable">
    <h3>votes</h3>
      {key}
    </div>
  )



}


export default Table;
