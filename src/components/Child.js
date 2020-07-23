import React, { Component } from 'react'

class Child extends Component {

  constructor(props) {
    super(props)



  }

componentDidUpdate() {
  console.log('updated')
}

  render() {
    return (
      <>
        {this.props.name}
      </>

    )
  }
}
 export default Child
