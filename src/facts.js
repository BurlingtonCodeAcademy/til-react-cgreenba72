import React from "react";
import {Link} from 'react-router-dom'

class Facts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: [],
  }
}

  getfactual = async () => {
    const response = await fetch("/facts");
    const result = await response.json();
    this.setState({
      facts: result
    });
  };

  componentDidMount() {
    this.getfactual();
  }
  render() {
    console.log(this.state.facts)
    return (
      <div className="facts">
        <h1>Paths are Easy</h1>
        <h3>Facts go here</h3>
        <ul>
          {this.state.facts.map(fact => {
            return (
              <Link key={fact._id} to = {`/fact/${fact._id}`}>
              <li >
                <p>Title: {fact.text}</p>
                <p>Date: {fact.when}</p>
              </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Facts;
