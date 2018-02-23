import React from "react";
import Helmet from "react-helmet";

import StandardPage from "../../components/StandardPage";
import ReadableSection from "../../components/ReadableSection";
import ImageGrid from "../../components/ImageGrid";
import AnnotatedImage from "../../components/AnnotatedImage";
import Typography from "../../components/Typography";

import img_tile_ab from "./img/tile_ab.jpg";
import img_tile_apwan from "./img/tile_apwan.jpg";
import img_tile_e52 from "./img/tile_e52.jpg";
import img_tile_hannah from "./img/tile_hannah.jpg";
import img_tile_hklane from "./img/tile_hklane.jpg";
import img_tile_jerome from "./img/tile_jerome.jpg";
import img_tile_jwilliams from "./img/tile_jwilliams.jpg";
import img_tile_pd from "./img/tile_pd.jpg";
import img_tile_shirtsbyme from "./img/tile_shirtsbyme.jpg";
import img_tile_solage from "./img/tile_solage.jpg";
import img_tile_solhotel from "./img/tile_solhotel.jpg";
import img_tile_visum from "./img/tile_visum.jpg";

import "./portfolio.scss";

const IndexPage = () => (
  <StandardPage>
    <Helmet title="Portfolio - Anthony Cameron" />
    <ReadableSection>
      <Typography.PageTitle>Front-end Work</Typography.PageTitle>
      <p>I specialize in front-end development, and I believe I can make any design a reality. I'm not a designer by trade, but I like to dabble and design via CSS. I like to think I have an eye for aesthetics.</p>
      <p>Below you'll see some work I was involved with back in my freelancing days.</p>
    </ReadableSection>
    <ReadableSection>
      <ImageGrid>
        <AnnotatedImage src={ img_tile_solage } />
        <AnnotatedImage src={ img_tile_solhotel } />
        <AnnotatedImage src={ img_tile_ab } />
        <AnnotatedImage src={ img_tile_apwan } />
        <AnnotatedImage src={ img_tile_e52 } />
        <AnnotatedImage src={ img_tile_hannah } />
        <AnnotatedImage src={ img_tile_hklane } />
        <AnnotatedImage src={ img_tile_jerome } />
        <AnnotatedImage src={ img_tile_jwilliams } />
        <AnnotatedImage src={ img_tile_pd } />
        <AnnotatedImage src={ img_tile_shirtsbyme } />
        <AnnotatedImage src={ img_tile_visum } />
      </ImageGrid>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;
