import React, { Component } from 'react'
import faunadb from 'faunadb'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { ImageCrop, RoundImage, P, LightH1 } from '../css/childcss'

const client = new faunadb.Client({ secret: `${process.env.FAUNADB_KEY}` })
const q = faunadb.query

class MessageDB extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subject: "",
      msg: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
   this.createMessage()

 }


  createMessage() {
    client.query(
      q.Create(
        q.Collection('Message'),
          {
            data: {
              beneficiary_id: this.props.beneficiary_id,
              title: this.state.subject,
              msg: this.state.msg
            }
          },
        )
      )

      .then(response => {
        const res = response.data
        console.log(res)

        return res
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
                <label>
                  Subject
                  <input
                    type="text"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.handleInputChange}
                  />
                </label>
                <label>
                  Message

                  <textarea
                    name="msg"
                    value={this.state.msg}
                    onChange={this.handleInputChange}
                  />
                </label>
                <button type="submit">Submit</button>
            </form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{this.state.subject}</div>
              <div>{this.state.msg}</div>
            </Col>
          </Row>
        </Grid>
      </>
    )
  }
}

export default MessageDB
