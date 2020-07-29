import React from "react"
import Importer from '../components/Importer';
import MessagePDF from '../components/MessagePDF';

import Layout from "../components/layout"

import SEO from "../components/seo"

const ImportPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Grace Coffee</h1>

      <Importer />

      <MessagePDF beneficiary_id="CO038000089" />

    </Layout>
  )
}

export default ImportPage
