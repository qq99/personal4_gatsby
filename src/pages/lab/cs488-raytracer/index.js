import React from "react";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";

import img_final_scene from "./img/final_scene.png";
import img_textured_glass from "./img/scene_textured_glass.png";
import img_glass from "./img/scene_glass.png";
import img_shadows from "./img/scene_sidelight2.png";
import img_multilights from "./img/scene_multilights.png";

const IndexPage = () => (
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

      <AnnotatedImage src={ img_final_scene } caption="Final scene" />
      <AnnotatedImage src={ img_textured_glass } caption="All manners of textured spheres" />
      <AnnotatedImage src={ img_glass } caption="Heavy refraction from the front-most glassy sphere" />
      <AnnotatedImage src={ img_shadows } caption="Side lights & shadowing, a bit buggy here with phantom specular reflections" />
      <AnnotatedImage src={ img_multilights } caption="Multiple lights & shadows" />

      <p>If you'd like to learn more about the implementation, please consult <a href="https://github.com/qq99/personal4/tree/master/app/views/lab/cs488-raytracer" target="_blank">this (really difficult to consume) documentation.</a></p>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;