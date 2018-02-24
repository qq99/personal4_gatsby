import React from "react";
import Img from "gatsby-image";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";

const IndexPage = ({ data }) => (
  <StandardPage twoColumn>
    <ReadableSection>
      <AnnotatedImage caption="Terrain generated from Perlin noise">
        <Img sizes={ data.srpg1.sizes } />
      </AnnotatedImage>
      <Typography.PageTitle>WebGL Strategy RPG Engine</Typography.PageTitle>
      <p><Typography.Subdued>Dec 5, 2011</Typography.Subdued></p>
      <Typography.Header>Overview</Typography.Header>
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
      <AnnotatedImage caption="Sprite shaders, L-system 'trees'">
        <Img sizes={ data.srpg2.sizes } />
      </AnnotatedImage>
      <AnnotatedImage>
        <Img sizes={ data.srpg3.sizes } />
      </AnnotatedImage>
      <AnnotatedImage>
        <Img sizes={ data.srpg4.sizes } />
      </AnnotatedImage>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
query IndexQueryWebglSrpgEngine {
  srpg1: imageSharp(id: { regex: "/img/srpg1.png/" }) {
    ...LabImageFragment
  }
  srpg2: imageSharp(id: { regex: "/img/srpg2.png/" }) {
    ...LabImageFragment
  }
  srpg3: imageSharp(id: { regex: "/img/srpg3.png/" }) {
    ...LabImageFragment
  }
  srpg4: imageSharp(id: { regex: "/img/srpg4.png/" }) {
    ...LabImageFragment
  }
}
`;