import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../ReadableSection'

import './image-grid.scss';

const ImageGrid = (props) => (
  <div className="image-grid" {...props}>
    {props.children.map((child) => 
      <div className='image-grid-item'>
        {child}
      </div>
    )}
  </div>
)

export default ImageGrid
