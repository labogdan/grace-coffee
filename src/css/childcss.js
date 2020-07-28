import styled from 'styled-components'

const ImageCrop = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`
const RoundImage = styled.img`
  display: inline;
  margin: 0 auto;
  width: auto;
`
const P = styled.p`
margin-bottom: 0.25rem;
`
const LightH1 = styled.h1`
  font-family: 'Roboto Condensed Light';
  font-weight: 300;
`

export { ImageCrop, RoundImage, P, LightH1 }
