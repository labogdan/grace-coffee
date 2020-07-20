import React from "react"
import Header from "../components/header"
import { Link } from "gatsby"
import Container from "../components/container"
import FileReader from "../components/fileReader"

export default function FileRead() {
  return (
    <>
      <div style={{ color: `teal` }}>
      <Header headerText="File Reader" />
        <h1>File Reader</h1>
        <p class="red">read a file</p>
        <FileReader />
      </div>
    </>
  )
}
