import React, { Component } from 'react'
import faunadb from 'faunadb'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { ImageCrop, RoundImage, P, LightH1 } from '../css/childcss'

const client = new faunadb.Client({ secret: `${process.env.FAUNADB_KEY}` })
const q = faunadb.query

class MessagePDF extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
 }

 handleSubmit(event) {
   event.preventDefault()
   this.getMessagesByBeneficiary()

 }

 getMessagesByBeneficiary() {

// Map(Paginate(Match(Index("messagesByBeneficiary"), "CO038000089")),Lambda("Message",Get(Var("Message"))))
   client.query(
     q.Map(
       q.Paginate(
         q.Match(
           q.Index('messagesByBeneficiary'), this.props.beneficiary_id)),
       q.Lambda("Message",q.Get(q.Var("Message")))
     )
   )
     .then(response => {
       const message = response
       console.log(message)

       return message
     })
     .catch(error => console.warn('error', error.message))
 }

  render () {
    return (
      <>
        <Grid>
          <Row>
            <Col mdOffset={4}>
              <LightH1>Input a message...</LightH1>
              <form onSubmit={this.handleSubmit}>

                <button type="submit">Submit</button>
            </form>
            </Col>
          </Row>

        </Grid>
      </>
    )
  }
}

export default MessagePDF
