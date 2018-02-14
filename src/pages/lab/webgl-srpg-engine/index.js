import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../../../components/ReadableSection'
import AnnotatedImage from '../../../components/AnnotatedImage'

import img_srpg1 from './img/srpg1.png'
import img_srpg2 from './img/srpg2.png'
import img_srpg3 from './img/srpg3.png'
import img_srpg4 from './img/srpg4.png'

const IndexPage = () => (
  <div className="two-column-grid">
    <ReadableSection>
      <AnnotatedImage src={img_srpg1} caption="Terrain generated from Perlin noise" />
      <h1 className="page-title">WebGL Strategy RPG Engine</h1>
      <h3>Executive Summary</h3>
      <p>
        Created for CS488 (Introduction to Computer Graphics) during Fall 2011 at the University of Waterloo as a final project.  This marks the second
        time that I've taken this course.  Against all odds, I somehow managed to miss the exam during my first course attempt, and was assigned a Fail outright.  I'm pleased to announce
        that I have since passed this wonderfully fun course!
      </p>
      <p>
        The focus was on procedural generation, completely framework free code.  It was primarily an exploration in real-time interactive graphics, utilizing only shaders and
        modern graphics techniques.
      </p>
      <p>
        I did not meet all of the objectives I set for myself, but I was able to explore: texture mapping, texture atlasing, bump mapping, procedural terrain, water reflections,
        animations using Catmull-Rom splines, Phong shading/lighting model, WebGL, OpenGL ES 2.0, AI pathfinding, Perlin noise, and context-free trees.
      </p>
      <p>
        When I get the time, I'd like to explore more of the objectives I wasn't able to achieve, probably separate from this project.  I've put in a bit of work to polish
        certain aspects (namely, the character animation and interleaving the terrain data), but haven't had time to commit the changes yet.
      </p>
    </ReadableSection>
    <ReadableSection>
      <AnnotatedImage src={img_srpg2} caption="Sprite shaders, L-system 'trees'" />
      <AnnotatedImage src={img_srpg3} />
      <AnnotatedImage src={img_srpg4} caption="Water: a rectangular mesh, positions offset by sin() and perturbed with Perlin noise" />
    </ReadableSection>
  </div>
);

export default IndexPage
