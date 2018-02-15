import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../ReadableSection'
import Nav from '../Nav'

import './header.css'

const Header = () => (
  <header className="primary-header">
    <ReadableSection>
      <Nav>
        <Link to="/" className="nav-link" activeClassName="selected" exact>
          Home
        </Link>
        <Link to="/lab" className="nav-link" activeClassName="selected">
          Lab
        </Link>
        <Link to="/portfolio" className="nav-link" activeClassName="selected">
          Portfolio
        </Link>
        <Link to="/philosophy" className="nav-link" activeClassName="selected">
          Philosophy
        </Link>
        <Link to="/resume" className="nav-link" activeClassName="selected">
          Resume
        </Link>
      </Nav>
    </ReadableSection>
  </header>
)

export default Header
