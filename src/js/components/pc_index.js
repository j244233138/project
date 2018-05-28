import React from 'react'
import PCHeader from './pc_Header'
import PCfooter from './pc_footer'
import PCNewsContainer from './pc_newscontainer'
import {BrowserRouter as Router, Route, hashHistory} from 'react-router-dom';
export default class PCIndex extends React.Component{
  render(){
    return(
      <div>
        <PCHeader></PCHeader>
        <PCNewsContainer/>
        <PCfooter></PCfooter>
      </div>
    )
  }
}
