import React, { Component } from 'react'
import { Link } from "gatsby"
import faunadb from 'faunadb'
import Child from './../components/Child'


const client = new faunadb.Client({ secret: "fnADxM7bVIACEl3pJAy2ZcdANl2aUpnmSSj5OeaG" })
const q = faunadb.query


class FaunaTest extends Component {
  constructor() {
    super()



  }

  getChildren() {
    client.query(
      q.Paginate(
        q.Match(
          q.Ref('indexes/allChildren')))
    )
      .then(response => {
        const notesRefs = response.data
        console.log(notesRefs)

        return notesRefs
      })
      .catch(error => console.warn('error', error.message))
  }


  getChildById(childId) {
    client.query(
      q.Ref(q.Collection('Child'), childId)
    )
      .then(response => {
        const notesRefs = response.data
        console.log(notesRefs)

        return notesRefs
      })
      .catch(error => console.warn('error', error.message))
  }

  getChildByBen() {
    client.query(
      q.Get(
      q.Match(
        q.Index('childByBeneficiary'), "CO038000089")))

      .then(response => {
        const child = response.data
        console.log(child)

        return child
      })
      .catch(error => console.warn('error', error.message))
  }

  render () {

    return (
      <>
        <div>hello from FaunaTest</div>
        <input
            type="button"
            id="launch"
            value="GetChild"
            onClick={this.getChildByBen}
            />
          <Child data={this.getChildByBen()} />

      </>
    )
  }
}

export default FaunaTest
