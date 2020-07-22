import React from "react"

import DisplayChild from './DisplayChild';
import Importer from './Importer';


const IndexPage = ({ data }) => {

  return (
    <>
      <DisplayChild data={data}/>
      <Importer />
    </>
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
