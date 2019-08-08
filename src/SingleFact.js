import React from 'react'
import {Link} from 'react-router-dom'

class SingleFact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      factText:'',
        factWhen: '',
        factId : ''
    }
  }
  componentDidMount(){
    let objectId = window.location.pathname.split('/')[2]
    fetch(`/facts/${objectId}`)
    .then(res => res.json())
    .then(result => {
      this.setState({
        factText:result[0].text,
        factWhen: result[0].when,
        factId : result[0]._id
      })
    })
  }

  render(){
    console.log(this.state.fact)
    return (
      <div>
        <p>{this.state.factText}</p>
        <p>{this.state.factWhen}</p>
      </div>
    )
  }
}

export default SingleFact