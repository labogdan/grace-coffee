import React, { Component } from 'react'
import faunadb from 'faunadb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

import { ImageCrop, RoundImage, P, LightH1 } from '../css/childcss'

const client = new faunadb.Client({ secret: `${process.env.FAUNADB_KEY}` })
const q = faunadb.query

const styles = StyleSheet.create({
  section: { marginBottom: 30 },
  bold: { fontWeight: 'bold' }
});

export class MyDoc extends Component {
  constructor(props) {
    super(props)

  }
  render () {
    return (
      <Document>
        <Page>
        {this.props.data.messages.map(message => (
          <View style={styles.section}>
            <Text style={styles.bold}>{message.data.title}</Text>
            <Text>{message.data.msg}</Text>
          </View>
        ))}
        </Page>
      </Document>
    )
  }
}


class MessagePDF extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChildrenFetched: false,
      isDataFetched: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    //this.setState({child: null});
    this.getAllChildren()
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    console.log(name)
    console.log(value)

    this.setState({name: value});
    console.log(this.state)
 }

 handleSubmit(event) {
   event.preventDefault()
   this.getMessagesByName()

 }


renderMessages(data) {
  const items = data.map((message, key) =>
        <li key={message.subject}>{message.msg}</li>
    );
}

getAllChildren() {
  client.query(
    q.Map(
      q.Paginate(
        q.Match(q.Index("allChildren"))
      ),
      q.Lambda("Message",q.Get(q.Var("Message")))
    )
  )
    .then(response => {
      const children = response.data
      console.log(children)
      this.setState({
        children: children,
        isChildrenFetched: true
      })

      return children
    })
    .catch(error => console.warn('error', error.message))
}

 getMessagesByBeneficiary() {
   client.query(
     q.Map(
       q.Paginate(
         q.Match(
           q.Index('messagesByBeneficiary'), this.props.beneficiary_id)),
       q.Lambda("Message",q.Get(q.Var("Message")))
     )
   )
     .then(response => {
       const message = response.data
       console.log(message)
       this.setState({
         messages: message,
         isDataFetched: true
       })

       return message
     })
     .catch(error => console.warn('error', error.message))
 }

 getMessagesByName() {
   console.log(this.state)
   client.query(
     q.Map(
       q.Paginate(
         q.Match(
           q.Index('messagesByName'), this.state.name)),
       q.Lambda("Message",q.Get(q.Var("Message")))
     )
   )
     .then(response => {
       const message = response.data
       console.log(message)
       this.setState({
         messages: message,
         isDataFetched: true
       })

       return message
     })
     .catch(error => console.warn('error', error.message))
 }

  render () {

    if(!this.state.isChildrenFetched) return null;

    if(!this.state.isDataFetched) {
      return (
        <form onSubmit={this.handleSubmit}>
          <Form.Label>Custom select</Form.Label>

          <Form.Control as="select"
            custom
            value={this.state.name}
            onChange={this.handleInputChange}
          >
            <option>------</option>
            {this.state.children.map(child => (
              <option key={child.data.beneficiary_id}>{child.data.name}</option>
            ))}
          </Form.Control>
          <br /><br />
            <Button type="submit">Submit</Button>
        </form>
      )
    } else {
      return (
        <>
          <form onSubmit={this.handleSubmit}>
            <Form.Label>Custom select</Form.Label>

            <Form.Control as="select" custom value={this.state.value} onChange={this.handleInputChange}>
              <option>------</option>
              {this.state.children.map(child => (
                <option key={child.data.beneficiary_id}>{child.data.name}</option>
              ))}
            </Form.Control>
            <br /><br />
              <Button type="submit">Submit</Button>
          </form>

          <PDFDownloadLink
            document={<MyDoc data={this.state} />}
            fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </>
      )
    }


  }
}

export default MessagePDF
