import React from 'react'

import './annotated-image.css';

const AnnotatedImage = (props) => (
  <figure className="annotated-image">
    <img src={props.src} className="navigation"/>
    <figcaption>{props.caption}</figcaption>
  </figure>
)

export default AnnotatedImage
