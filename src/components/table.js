import React from 'react';

const Table = (props) => {
    console.log('stuff taken from state:',props.poll)
/*
    const keyItems = <div><a href="#" className="keyItem">placeholder</a></div>
    */




  return(

    <div className="keyTable">
    <h2> I'm a table</h2>
   <div><a href="#" className="keyItem">placeholder</a></div>
    <div><a href="#" className="keyItem">placeholder</a></div>
    </div>
  )



}


export default Table;
