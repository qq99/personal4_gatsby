import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../ReadableSection'

const Footer = () => (
  <footer>
    <ReadableSection>
      <p>
        <a className='iconal external different-context' href='https://github.com/qq99' target='_blank' title='Github'>
          <i className='fa fa-github'></i>
        </a>

        <a className='iconal external different-context' href='http://codepen.io/qq99' target='_blank' title='CodePen'>
          <i className='fa fa-codepen'></i>
        </a>

        <a className='iconal external different-context' href='https://twitter.com/dontqq' target='_blank' title='Twitter'>
          <i className='fa fa-twitter'></i>
        </a>

        <a className='iconal external different-context' href='http://ca.linkedin.com/in/anthonycameron/' target='_blank' title='LinkedIn'>
          <i className='fa fa-linkedin'></i>
        </a>
      </p>
    </ReadableSection>
  </footer>
)

export default Footer
