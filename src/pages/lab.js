import React from 'react'
import Link from 'gatsby-link'
import StandardPage from '../components/StandardPage'
import ReadableSection from '../components/ReadableSection'

const IndexPage = () => (
  <StandardPage>
    <ReadableSection>
      <h1>Lab</h1>
      <Link to='/lab/muvee'>Muvee</Link>
      <Link to='/lab/webgl-srpg-engine'>WebGL SRPG</Link>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage
