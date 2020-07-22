import React, { useState } from "react"
import { Link } from "gatsby"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const DisplayChild = props => {



  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>

      <ul>
        <li>{props.data.fauna.findCustomerByID.child.name}</li>
      </ul>

      <Link to="/page-2/">Go to page 2</Link> <br />

    </Layout>
  )
}


const GET_CHILD = gql
`
query GetChild($productId: ID!) {
  findCustomerByID(id: $productId) {
    child {
      name
    }
  }
}
`



export default DisplayChild
