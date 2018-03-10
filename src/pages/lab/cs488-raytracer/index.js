import React from "react";
import Img from "gatsby-image";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";

const IndexPage = ({ data }) => (
  <StandardPage>
    <ReadableSection>
      <Typography.PageTitle>A ray-tracer with a focus on various material properties</Typography.PageTitle>
      <p><Typography.Subdued>Jul 26, 2011.</Typography.Subdued></p>
      <Typography.Header>Overview</Typography.Header>
      <p>This project was a University project for CS488 &ndash; Introduction to Computer Graphics. The primary goal was to explore the implementation of a variety of different textures and materials.</p>
      <ul>
        <li>Hard shadows</li>
        <li>Reflections, various degrees of reflectivity possible</li>
        <li>Glossy surfaces</li>
        <li>Refraction, physically based according to differing indices of refraction</li>
        <li>Texture mapping</li>
        <li>Bump mapping</li>
        <li>2D/3D procedural textures</li>
      </ul>

      <AnnotatedImage caption="Final scene">
        <Img sizes={ data.finalScene.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="All manners of textured spheres">
        <Img sizes={ data.texturedGlass.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="Heavy refraction from the front-most glassy sphere">
        <Img sizes={ data.glass.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="Side lights & shadowing, a bit buggy here with phantom specular reflections">
        <Img sizes={ data.shadows.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="Multiple lights & shadows">
        <Img sizes={ data.multilights.sizes } />
      </AnnotatedImage>

      <p>If you'd like to learn more about the implementation, please consult <a href="https://github.com/qq99/personal4/tree/master/app/views/lab/cs488-raytracer" target="_blank">this (really difficult to consume) documentation.</a></p>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
query IndexQueryRaytracer {
  finalScene: imageSharp(id: { regex: "/img/final_scene.png/" }) {
    ...LabImageFragment
  }
  texturedGlass: imageSharp(id: { regex: "/img/scene_textured_glass.png/" }) {
    ...LabImageFragment
  }
  glass: imageSharp(id: { regex: "/img/scene_glass.png/" }) {
    ...LabImageFragment
  }
  shadows: imageSharp(id: { regex: "/img/scene_sidelight2.png/" }) {
    ...LabImageFragment
  }
  multilights: imageSharp(id: { regex: "/img/scene_multilights.png/" }) {
    ...LabImageFragment
  }
}
`;