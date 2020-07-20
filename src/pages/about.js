import React from "react"
import Header from "../components/header"
import { Link } from "gatsby"
import Container from "../components/container"

export default function About() {
  return (
    <>
    <div style={{ color: `teal` }}>
    <Header headerText="About Gatsby" />
      <h1>About Gatsby</h1>
      <p class="red">Such wow. Very React.</p>
      <Header headerText="It's pretty cool" />
      <Link to="/">Home</Link>
    </div>
    <Container>
          <h1>About CSS Modules</h1>
          <p>CSS Modules are cool</p>
    </Container>
    </>
  )
}
