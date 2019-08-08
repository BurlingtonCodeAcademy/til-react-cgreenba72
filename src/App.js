import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Facts from './facts.js'
import Home from './home.js'
import SingleFact from './SingleFact.js'
const path = document.location.pathname


class App extends React.Component {
  constructor(){
    super();
    }
  
  render () {
    return (
      <Router>
      <div>


        <Route exact path="/" component= {Home} />
        <Route exact path = "/facts" component = {Facts}/>
        <Route exact path="/facts/:objectId?" render = {({match}) => <SingleFact id = {match.params.objectId} />}/>
      
      </div>
      </Router>

    )
  }
}

    



export default App;

