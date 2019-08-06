import React from 'react'
const ObjectId = require('mongodb').ObjectId;

class Fact extends React.Component {
  constructor(props){
    super(props)
  }
   // Get a singlefact/
   async one (someId) {
    const id = someId;
    const o_id = new ObjectId(id);
    let collection  = await this.props.getfactual()
    return collection.find({_id: o_id})
  }
  componentDidMount(){
    //one()
  }

  render(){
    return (
      <div>
        <form>
          <textarea>
            {this.props.facts}
          </textarea>
        </form>
      </div>
    )
  }
}

export default Fact