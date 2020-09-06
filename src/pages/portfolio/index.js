import React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import StandardPage from "../../components/StandardPage";
import ReadableSection from "../../components/ReadableSection";
import ImageGrid from "../../components/ImageGrid";
import AnnotatedImage from "../../components/AnnotatedImage";
import Typography from "../../components/Typography";

import "./portfolio.scss";

const IndexPage = ({ data }) => (
  <StandardPage>
    <Helmet title="Portfolio - Anthony Cameron" />
    <ReadableSection>
      <Typography.PageTitle>Front-end Work</Typography.PageTitle>
      <p>
        I specialize in front-end development, and I believe I can make any
        design a reality. I'm not a designer by trade, but I like to dabble and
        design via CSS. I like to think I have an eye for aesthetics.
      </p>
      <p>
        Below you'll see some work I was involved with back in my freelancing
        days.
      </p>
    </ReadableSection>
    <ReadableSection>
      <ImageGrid>
        {data.portfolioImages.edges.map((image) => (
          <AnnotatedImage>
            <Img sizes={image.node.sizes} />
          </AnnotatedImage>
        ))}
      </ImageGrid>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
  query PortfolioQuery {
    portfolioImages: allImageSharp(
      filter: { id: { regex: "/portfolio/img/tile*/" } }
    ) {
      edges {
        node {
          sizes(maxWidth: 350, quality: 80) {
            ...GatsbyImageSharpSizes_tracedSVG
          }
        }
      }
    }
  }
`;
