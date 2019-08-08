import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component{
  constructor(props){
    super(props)
  } 
render(){
return (
  <div className="App">
  <h2>Links</h2>
  <li>
    <Link to="/facts">Facts</Link>
  </li>
  <li>
    <Link to="/">Home</Link>
  </li>
  
    <h1>Today I Learned</h1>
    <li><a href='/facts'>List all entries (JSON)</a></li>
    <h2>Add a fact</h2>
    <form method="POST" action="/facts">
      <input type="text" name="text"></input>
      <input type="submit"></input>
    </form>
  </div>
    ) 
  }
}

export default Home