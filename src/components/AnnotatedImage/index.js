import React from 'react'

import './annotated-image.css';

const AnnotatedImage = (props) => (
  <figure className="annotated-image">
    <img src={props.src} className="navigation"/>
    <figcaption style={{display: props.caption ? 'block' : 'none'}}>{props.caption}</figcaption>
  </figure>
)

export default AnnotatedImage
