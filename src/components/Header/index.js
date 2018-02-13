import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../ReadableSection'
import Nav from '../Nav'

import './header.css'

const Header = () => (
  <header className="primary-header">
    <ReadableSection>
      <Nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/lab" className="nav-link">
          Lab
        </Link>
        <Link to="/portfolio" className="nav-link">
          Portfolio
        </Link>
        <Link to="/philosophy" className="nav-link">
          Philosophy
        </Link>
        <Link to="/resume" className="nav-link">
          Resume
        </Link>
      </Nav>
    </ReadableSection>
  </header>
)

export default Header
