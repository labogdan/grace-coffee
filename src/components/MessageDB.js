import React, { Component } from 'react'
import faunadb from 'faunadb'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import { ImageCrop, RoundImage, P, LightH1, BMarBottom } from '../css/childcss'

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
   if (this.state.subject.length <= 0 || this.state.msg.length <= 0) {
    alert('please enter in a message')
   } else {
     this.createMessage()
   }
 }


  createMessage() {
    client.query(
      q.Create(
        q.Collection('Message'),
          {
            data: {
              beneficiary_id: this.props.child.beneficiary_id,
              name: this.props.child.name,
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

      <BMarBottom>Leave a message for your sponsored child:</BMarBottom>
      <Card>
        <Card.Body>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    as="input"
                    type="text"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="msg"
                      rows="4"
                      value={this.state.msg}
                      onChange={this.handleInputChange}
                    />
                </Form.Group>
                <Button type="submit" block>Submit</Button>
            </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{this.state.subject}</div>
              <div>{this.state.msg}</div>
            </Col>
          </Row>
        </Container>
        </Card.Body>
      </Card>

      </>
    )
  }
}

export default MessageDB
