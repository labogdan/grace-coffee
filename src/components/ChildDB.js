import React, { Component } from 'react'
import { Link } from "gatsby"
import faunadb from 'faunadb'
import { Container, Row, Col } from 'react-grid';


const client = new faunadb.Client({ secret: "fnADxM7bVIACEl3pJAy2ZcdANl2aUpnmSSj5OeaG" })
const q = faunadb.query


class ChildDB extends Component {
  constructor() {
    super()

    this.state = {

      isDataFetched: false
    };

  }
  async componentDidMount() {
    this.setState({child: null});
    this.getChildByBen()
  }




  getChildByBen() {
    client.query(
      q.Get(
      q.Match(
        q.Index('childByBeneficiary'), "CO038000089")))

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

      <Container>
        <Row>
          <Col><img src={child.child_image} /></Col>
          <Col>
            <div style={{ float: 'left', width: '50%' }}><b>Age</b></div>
            <div style={{ float: 'left' }}>{child.age}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Birthday</b></div>
            <div style={{ float: 'left' }}>{child.date_of_birth}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Gender</b></div>
            <div style={{ float: 'left' }}>{child.gender}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Country</b></div>
            <div style={{ float: 'left' }}>{child.country}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Language</b></div>
            <div style={{ float: 'left' }}>{child.language_spoken}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Siblings</b></div>
            <div style={{ float: 'left' }}>{child.no_of_siblings}</div>
          </Col>
          <Col>
            <div style={{ float: 'left', width: '50%' }}><b>Marital Status</b></div>
            <div style={{ float: 'left' }}>{child.marital_status_of_parents}</div>

            <div style={{ float: 'left', width: '60%' }}><b>Highly Vulnerable</b></div>
            <div style={{ float: 'left' }}>{(child.in_a_highly_vulnerable_area==='F'?'No':'Yes')}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Grade</b></div>
            <div style={{ float: 'left' }}>{child.grade}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Fav Subject</b></div>
            <div style={{ float: 'left' }}>{child.favorite_subjects_in_school}</div>

            <div style={{ float: 'left', width: '50%' }}><b>Hobbies</b></div>
            <div style={{ float: 'left' }}>{child.hobbies}</div>
          </Col>
        </Row>
      </Container>

        <ul>
        <li>{child.beneficiary_id}</li>
        <li>{child.name}</li>


        </ul>
      </>
    )
  }
}

export default ChildDB
