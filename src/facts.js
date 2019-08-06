import React from 'react'

class Facts extends React.Component {
  constructor(props){
    super(props)
  } 

componentDidMount(){
  this.props.getfactual()

}
render() {
    return (
      <div className = "facts" >
      <h1>Paths are Easy</h1>
      <h3>Facts go here</h3>
      <ul>
      {this.props.facts.map(fact => {
      return (<li key={fact._id}> 
      <p>Title: {fact.text}</p>
      <p>Date: {fact.when}</p>
      </li>)
      })}
      </ul>
    </div>
    )
}

}


export default Facts