import React from "react"
import Importer from '../components/Importer';

import Layout from "../components/layout"

import SEO from "../components/seo"

const ImportPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>

      <Importer />


    </Layout>
  )
}

export default ImportPage
