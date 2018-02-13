import React from 'react'

const AnnotatedImage = (props) => (
  <figure className="annotated-image">
    <img src={props.src} className="navigation"/>
    <figcaption>{props.caption}</figcaption>
  </figure>
)

export default AnnotatedImage
