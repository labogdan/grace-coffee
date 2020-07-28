import React, { Component } from 'react'
import faunadb from 'faunadb'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { ImageCrop, RoundImage, P, LightH1 } from '../css/childcss'


const client = new faunadb.Client({ secret: `${process.env.FAUNADB_KEY}` })
const q = faunadb.query

const beneficiary_id = "CO038000089"



class ChildDB extends Component {
  constructor() {
    super()

    this.state = {

      isDataFetched: false
    };

  }
  async componentDidMount() {
    this.setState({child: null});
    this.getChildByBeneficiary(beneficiary_id)
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
        <Grid>
        <Row>
          <Col mdOffset={4}>
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
        </Grid>
      </>
    )
  }
}

export default ChildDB
