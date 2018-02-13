import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../ReadableSection'

import './nav.css'

const Nav = (props) => (
  <nav className="navigation" {...props}>
    {props.children}
  </nav>
)

export default Nav
