import React from "react"
import { Link } from "gatsby"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import { graphql } from "gatsby"

import FlatfileImporter from "flatfile-csv-importer";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <ul>
        <li>{data.fauna.findCustomerByID.child.name}</li>
      </ul>

      <input
        type="button"
        id="launch"
        value="Launch Importer"
        
      />

      <Link to="/page-2/">Go to page 2</Link> <br />

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

/*
export const query = graphql`
{
  fauna {
    allChildren {
      data { name beneficiary_id}
    }
  }
}
`
*/
export default IndexPage
