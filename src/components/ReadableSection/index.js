import React from 'react'
import Link from 'gatsby-link'

import './readable-section.css'

const ReadableSection = (props) => (
  <div className='readable-section'>
    {props.children}
  </div>
)

export default ReadableSection
