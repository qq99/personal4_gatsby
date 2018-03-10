import React from "react";
import Img from "gatsby-image";
import CrazyEye from "../components/CrazyEye";

const IndexPage = ({ data }) => (
  <CrazyEye
    fallback={
      <Img
        className="canvas-background-image"
        style={{ height: "100vh" }}
        sizes={ data.crazyEyeFallback.sizes }
      />
    }
  />
);

export default IndexPage;

export const query = graphql`
  query HomepageIndexQuery {
    crazyEyeFallback: imageSharp(id: { regex: "/img/crazyeye-fallback.png/" }) {
      sizes(maxWidth: 1920, quality: 90) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;
