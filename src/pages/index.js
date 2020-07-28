import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"


const IndexPage = ({ data }) => {

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>
      <Link to="/ImportPage">Data Importer</Link>
      <br /><br />
      <Link to="/ChildPage">Child Display</Link>
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
