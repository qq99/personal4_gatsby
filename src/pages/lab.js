import React from 'react'
import Link from 'gatsby-link'
import StandardPage from '../components/StandardPage'
import ReadableSection from '../components/ReadableSection'
import LabFeature from '../components/LabFeature'

import img_muvee from './lab/muvee/img/movies-index.jpeg';
import img_srpg from './lab/webgl-srpg-engine/img/srpg1.png';

const IndexPage = () => (
  <StandardPage>
    <ReadableSection>
      <h1 className="page-title">Lab</h1>
      <LabFeature
        title='muvee'
        img={img_muvee}
        to='/lab/muvee'
        status='Not under active development'
        description='This project is something like Netflix, but run on a server in your own home. It aims to be an open source alternative to Plex.'>
      </LabFeature>
      <LabFeature
        title='WebGL SRPG Engine'
        img={img_srpg}
        to='/lab/webgl-srpg-engine'
        status='Done/Dead'
        description='A university project, created for CS488 (Introduction to Computer Graphics) during Fall 2011 at the University of Waterloo as a final project.' />
      <LabFeature
        title='muvee'
        img={img_muvee}
        to='/lab/muvee'
        description='Like Netflix, but for your home' />
      <LabFeature
        title='WebGL SRPG Engine'
        img={img_srpg}
        to='/lab/webgl-srpg-engine'
        description='Gfx project' />
      <LabFeature
        title='muvee'
        img={img_muvee}
        to='/lab/muvee'
        description='Like Netflix, but for your home' />
      <LabFeature
        title='WebGL SRPG Engine'
        img={img_srpg}
        to='/lab/webgl-srpg-engine'
        description='Gfx project' />
    </ReadableSection>
  </StandardPage>
);

export default IndexPage
