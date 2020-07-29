import React, { Component } from 'react'
import faunadb from 'faunadb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

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
      isDataFetched: false
    };

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


renderMessages(data) {
  const items = data.map((message, key) =>
        <li key={message.subject}>{message.msg}</li>
    );
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

  render () {

    if(!this.state.isDataFetched) {
      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Generate PDF from messages</h2>
                <form onSubmit={this.handleSubmit}>
                  <Button type="submit">Submit</Button>
              </form>
              </Col>
            </Row>
          </Container>


        </>
      )
    } else {
      return (
        <>
          <Container>
            <Row>
              <Col>
              <Button>
                <PDFDownloadLink
                  document={<MyDoc data={this.state} />}
                  fileName="somename.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
              </Button>
              </Col>
            </Row>
          </Container>
        </>
      )
    }


  }
}

export default MessagePDF
