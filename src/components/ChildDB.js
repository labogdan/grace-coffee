import React, { Component } from 'react'
import faunadb from 'faunadb'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ImageCrop, RoundImage, P, LightH1 } from '../css/childcss'


const client = new faunadb.Client({ secret: `${process.env.FAUNADB_KEY}` })
const q = faunadb.query


class ChildDB extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDataFetched: false
    };

  }
  async componentDidMount() {
    this.setState({child: null});
    this.getChildByBeneficiary(this.props.beneficiary_id)
  }




  getChildByBeneficiary(beneficiary_id) {
    client.query(
      q.Get(
      q.Match(
        q.Index('childByBeneficiary'), beneficiary_id)))

      .then(response => {
        const child = response.data
        console.log(child)
        this.setState({
          name: response.data.name,
          isDataFetched: true,
          child: response.data
        })
        return child
      })
      .catch(error => console.warn('error', error.message))
  }

  render () {
    if(!this.state.isDataFetched) return null;
    const {child} = this.state || {};


    return (
      <>
      <Card>
        <Card.Body>
        <Container>
        <Row>
          <Col md={{offset:4}}>
            <LightH1>{child.name}</LightH1>
          </Col>
        </Row>
          <Row>
            <Col md={4}>
              <ImageCrop>
                <RoundImage src={child.child_image} alt={child.name} />
              </ImageCrop>
            </Col>
            <Col md={4}>
              <Row>
                <Col xs={6}>
                  <P><b>Age</b></P>
                  <P><b>Birthday</b></P>
                  <P><b>Gender</b></P>
                  <P><b>Country</b></P>
                  <P><b>Language</b></P>
                  <P><b>Siblings</b></P>
                </Col>
                <Col xs={6}>
                  <P>{child.age}</P>
                  <P>{child.date_of_birth}</P>
                  <P>{child.gender}</P>
                  <P>{child.country}</P>
                  <P>{child.language_spoken}</P>
                  <P>{child.no_of_siblings}</P>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
            <Row>
              <Col xs={6}>
                <P><b>Marital Status</b></P>
                <P><b>Highly Vulnerable</b></P>
                <P><b>Grade</b></P>
                <P><b>Fav Subject</b></P>
                <P><b>Hobbies</b></P>
              </Col>
              <Col xs={6}>
                <P>{child.marital_status_of_parents}</P>
                <P>{child.in_a_highly_vulnerable_area}</P>
                <P>{child.grade}</P>
                <P>{child.favorite_subjects_in_school}</P>
                <P>{child.hobbies}</P>
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
        </Card.Body>
          </Card>
      </>
    )
  }
}

export default ChildDB
