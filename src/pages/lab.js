import React from "react";
import Helmet from "react-helmet";
import StandardPage from "../components/StandardPage";
import ReadableSection from "../components/ReadableSection";
import LabFeature from "../components/LabFeature";
import Img from "gatsby-image";

const IndexPage = ({data}) => (
  <StandardPage>
    <Helmet title="Lab - Anthony Cameron" />
    <ReadableSection wide>
      <h1 className="page-title">Lab</h1>
      <LabFeature
        title="muvee"
        image={<Img sizes={data.muvee.sizes} />}
        to="/lab/muvee/"
        status="Not under active development"
        description="This project is something like Netflix, but run on a server in your own home. It aims to be an open source alternative to Plex."
      />
      <LabFeature
        title="echoplexus"
        image={<Img sizes={data.echoplexus.sizes} />}
        to="/lab/echoplexus/"
        status="Dead"
        description="Echoplexus was an anonymous, web-based, IRC-like chatting platform that made its best effort to respect your privacy. You could use a pseudonym for linkable anonymity, and secure it with PGP. You could code and whiteboard together in real time. You could also make Peer2Peer video and voice calls with the people in your channel."
      />
      <LabFeature
        title="WebGL Background Bump Mapping"
        image={<Img sizes={data.backgroundBumps.sizes} />}
        to="/lab/webgl-background-bump-mapping/"
        description="Background textures have always been fairly flat and static things. I set out to increase their (apparent) depth."
      />
      <LabFeature
        title="WebGL SRPG Engine"
        image={<Img sizes={data.srpg.sizes} />}
        to="/lab/webgl-srpg-engine/"
        status="Done/Dead"
        description="A university project, created for CS488 (Introduction to Computer Graphics) during Fall 2011 at the University of Waterloo as a final project."
      />
      <LabFeature
        title="Animating Functions of Improved 3D Perlin Noise"
        image={<Img sizes={data.perlin.sizes} />}
        to="/lab/animating-functions-of-improved-3d-perlin-noise/"
        description="In this experiment, I made a quick port of Ken Perlin's classical noise in 3 dimensions. Due to its continuity properties, we can take a 2D cross-section and step through the 3rd dimension in time. The end result is a continuous animation."
      />
      <LabFeature
        title="CS488 Ray-tracer"
        image={<Img sizes={data.raytracer.sizes} />}
        to="/lab/cs488-raytracer/"
        description="A ray-tracer with a focus on various material properties."
      />
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    muvee: imageSharp(id: {regex: "/muvee/img/movies-index.jpeg/"}) {
      sizes(maxWidth: 601, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    srpg: imageSharp(id: {regex: "/webgl-srpg-engine/img/srpg1.png/"}) {
      sizes(maxWidth: 601, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    echoplexus: imageSharp(
      id: {regex: "/echoplexus/img/echoplexus-latest.png/"}
    ) {
      sizes(maxWidth: 601, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    backgroundBumps: imageSharp(
      id: {regex: "/webgl-background-bump-mapping/img/background-bumps.jpg/"}
    ) {
      sizes(maxWidth: 601, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    perlin: imageSharp(
      id: {
        regex: "/animating-functions-of-improved-3d-perlin-noise/img/gpu-perlin4.png/"
      }
    ) {
      sizes(maxWidth: 601, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    raytracer: imageSharp(
      id: {regex: "/cs488-raytracer/img/final_scene.png/"}
    ) {
      sizes(maxWidth: 601, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;
