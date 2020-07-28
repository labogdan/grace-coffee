import React from "react"
import ChildDB from '../components/ChildDB';
import MessageDB from '../components/MessageDB';
import MessagePDF from '../components/MessagePDF';

import '../css/index.css'
import Layout from "../components/layout"

import SEO from "../components/seo"

const ChildPage = () => {

  return (
    <Layout>
      <ChildDB beneficiary_id="CO038000089" />
      <MessageDB beneficiary_id="CO038000089" />
      <MessagePDF beneficiary_id="CO038000089" />
    </Layout>
  )
}

export default ChildPage
