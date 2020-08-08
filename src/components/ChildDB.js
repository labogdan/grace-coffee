import React, { Component } from 'react'
import faunadb from 'faunadb'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ImageCrop, RoundImage, P, LightH1 } from '../css/childcss'


//const client = new faunadb.Client({ secret: `${process.env.FAUNADB_KEY}` })
//const q = faunadb.query


class ChildDB extends Component {
  constructor(props) {
    super(props)

/*    this.state = {
      isDataFetched: false
    };*/

  }
  /*
  async componentDidMount() {
    this.setState({child: null});
    this.getChildByBeneficiary(this.props.beneficiary_id)
  }*/



/*
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
  }*/

  render () {

    const {child} = this.props || {};


    return (
      <>


      <Card bg={'light'}>
        <Card.Header>
          <Card.Title><h2>{child.name}</h2></Card.Title>
        </Card.Header>
        <Card.Body>
        <Container>
        
          <Row>
            <Col md={4}>
              <ImageCrop>
                <RoundImage src={child.child_image} alt={child.name} />
              </ImageCrop>
            </Col>
            <Col md={4}>
              <Row>
                <Col xs={6}><b>Age</b></Col>
                <Col xs={6}>{child.age}</Col>
              </Row>

              <Row>
                <Col xs={6}><b>Birthday</b></Col>
                <Col xs={6}>{child.date_of_birth}</Col>
              </Row>

              <Row>
                <Col xs={6}><b>Gender</b></Col>
                <Col xs={6}>{child.gender}</Col>
              </Row>

              <Row>
                <Col xs={6}><b>Country</b></Col>
                <Col xs={6}>{child.country}</Col>
              </Row>

              <Row>
                <Col xs={6}><b>Language</b></Col>
                <Col xs={6}>{child.language_spoken}</Col>
              </Row>

              <Row>
                <Col xs={6}><b>Siblings</b></Col>
                <Col xs={6}>{child.no_of_siblings}</Col>
              </Row>
            </Col>
            <Col md={4}>
            <Row>
              <Col xs={6}><b>Marital Status</b></Col>
              <Col xs={6}>{child.marital_status_of_parents}</Col>
            </Row>

            <Row>
              <Col xs={6}><b>Vulnerable</b></Col>
              <Col xs={6}>{(child.in_a_highly_vulnerable_area)?'Yes':'No'}</Col>
            </Row>

            <Row>
              <Col xs={6}><b>Grade</b></Col>
              <Col xs={6}>{child.grade}</Col>
            </Row>

            <Row>
              <Col xs={6}><b>Fav Subject</b></Col>
              <Col xs={6}>{child.favorite_subjects_in_school}</Col>
            </Row>

            <Row>
              <Col xs={6}><b>Hobbies</b></Col>
              <Col xs={6}>{child.hobbies}</Col>
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
