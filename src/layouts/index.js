import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import './index.css'
import './styles.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Develop: Anthony Cameron"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      ]}
    >
      <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' rel='stylesheet'/>
    </Helmet>
    <div className='main-container'>
      <Header />
      <div className="main-content">
        {children()}
      </div>
      <Footer />
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
