import React from "react"
import ChildDB from '../components/ChildDB';

import Layout from "../components/layout"

import SEO from "../components/seo"

const ChildPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>


      <ChildDB />


    </Layout>
  )
}

export default ChildPage
