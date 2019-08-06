import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Facts from './facts.js'
import Home from './home.js'
import Fact from './fact.js'
const path = document.location.pathname


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      facts: [],
    }

  }
  getfactual = async() => {
    const response = await fetch ('/facts') 
    const result = await response.json()
    this.setState({
      facts:result,
    })
  }

  render () {
    const {facts} = this.state
    console.log(Object.values(this.state.facts))
    /* 
    

    if (path === "/facts"){
      return (
      <Facts facts = {facts} getfactual = {this.getfactual}/>
      )
    } */
    return (
      <Router>
      <div>
        <h2>Links</h2>
          <li>
            <Link to="/facts">Facts</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/facts/fact">Fact 1</Link>
          </li>
        <Route exact path="/" component={Home} />
        <Route exact path = "/facts" component = {()=> <Facts facts = {facts} getfactual = {this.getfactual}/>
        } />
        <Route path="/facts/fact" component={()=> <Fact facts={facts} getfactual = {this.getfactual}/>} />
      
      </div>
      </Router>

    )
  }
}

    



export default App;

