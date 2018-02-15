import React from 'react'
import Link from 'gatsby-link'
import StandardPage from '../../components/StandardPage'
import ReadableSection from '../../components/ReadableSection'
import ImageGrid from '../../components/ImageGrid'
import AnnotatedImage from '../../components/AnnotatedImage'

import img_tile_ab from './img/tile_ab.jpg';
import img_tile_apwan from './img/tile_apwan.jpg';
import img_tile_e52 from './img/tile_e52.jpg';
import img_tile_hannah from './img/tile_hannah.jpg';
import img_tile_hklane from './img/tile_hklane.jpg';
import img_tile_jerome from './img/tile_jerome.jpg';
import img_tile_jwilliams from './img/tile_jwilliams.jpg';
import img_tile_pd from './img/tile_pd.jpg';
import img_tile_saffron from './img/tile_saffron.jpg';
import img_tile_shirtsbyme from './img/tile_shirtsbyme.jpg';
import img_tile_solage from './img/tile_solage.jpg';
import img_tile_solhotel from './img/tile_solhotel.jpg';
import img_tile_visum from './img/tile_visum.jpg';

import './portfolio.scss';

const IndexPage = () => (
  <StandardPage>
    <ReadableSection>
      <h1>Front-end Work</h1>
      <p>I specialize in front-end development, and I believe I can make any design a reality. I'm not a designer by trade, but I like to dabble and design via CSS.</p>
      <p>For many of these projects, I was the sole developer. For a few, I worked with my good friend and colleague <a href="http://kaizhiwei.com/" target="_blank">Kaizhi Wei</a>.</p>
      <p>Generally, the main focus was PSD2HTML. Some were flat sites, others were driven by WordPress. I used HAML and SASS were used for rapid prototyping, and image spritesheets whenever applicable.</p>
      <p>Many sites had needed custom widgets. I've coded dozens of custom slideshows in my time, interactive maps, and several full-spread responsive image-based landing pages.</p>
      <p>I'm experienced with integration of external services – yelp, Facebook, iHomeFinder, and other 3rd party weather services.</p>
      <p>These days, I've fleshed out more in terms of back-end development. I'd still consider myself primarily a front-end developer, as I'd say that's where the majority of my talents lie. There's just something so satisfying about seeing things come to life in front of your eyes!</p>
    </ReadableSection>
    <ReadableSection>
      <ImageGrid>
        <AnnotatedImage src={img_tile_solage}/>
        <AnnotatedImage src={img_tile_solhotel}/>
        <AnnotatedImage src={img_tile_ab}/>
        <AnnotatedImage src={img_tile_apwan}/>
        <AnnotatedImage src={img_tile_e52}/>
        <AnnotatedImage src={img_tile_hannah}/>
        <AnnotatedImage src={img_tile_hklane}/>
        <AnnotatedImage src={img_tile_jerome}/>
        <AnnotatedImage src={img_tile_jwilliams}/>
        <AnnotatedImage src={img_tile_pd}/>
        <AnnotatedImage src={img_tile_shirtsbyme}/>
        <AnnotatedImage src={img_tile_visum}/>
      </ImageGrid>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage
