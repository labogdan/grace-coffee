import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = ({ data }) => {

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>
      <Link to="/AdminPage">Admin View</Link>
      <br /><br />
      <Link to="/ChildPage">Child View</Link>
    </Layout>
  )
}




export const query = graphql`
{
  fauna {
    findCustomerByID(id: 271660898083406336) {
      child {
        name
      }
    }
  }
}
`




export default IndexPage
