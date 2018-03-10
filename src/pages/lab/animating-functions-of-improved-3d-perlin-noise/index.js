import React from "react";
import Img from "gatsby-image";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";
import AnnotatedCanvas from "../../../components/AnnotatedCanvas";

import Shader1 from "../../../components/Perlin/Shader1";
import Shader2 from "../../../components/Perlin/Shader2";
import Shader3 from "../../../components/Perlin/Shader3";
import Shader4 from "../../../components/Perlin/Shader4";

const IndexPage = ({ data }) => (
  <StandardPage twoColumn>
    <ReadableSection>
      <AnnotatedCanvas caption="Multi-function scene">
        <Shader1
          fallback={
            <Img
              className="canvas-background-image"
              sizes={ data.shader1Fallback.sizes }
            />
          }
        />
      </AnnotatedCanvas>
      <Typography.PageTitle>
        Animating Functions of Improved 3D Perlin Noise
      </Typography.PageTitle>
      <p>
        <Typography.Subdued>
          Oct 27, 2011 &ndash; a sleepless night
        </Typography.Subdued>
      </p>
      <Typography.Header>Overview</Typography.Header>
      <p>
        In this experiment, I made a quick port of Ken Perlin's{" "}
        <a href="http://mrl.nyu.edu/~perlin/noise/" target="_blank">
          classical noise
        </a>{" "}
        in 3 dimensions. Due to its continuity properties, we can take a 2D
        cross-section and step through the 3rd dimension in time. The end result
        is a continuous animation.
      </p>

      <Typography.Header>Technical Overview</Typography.Header>
      <p>
        After reading some of Perlin's work, namely some of his early SIGGRAPH
        slides, I became intrigued with the potential this has for both 3D
        texturing and the animation of 2D textures. Many of these 2D textures,
        when animated, can produce some very compelling effects.
      </p>
      <p>
        I employ fragment shaders to calculate per-pixel Perlin noise. Geometry
        is minimal, consisting of only 2 triangles that are un-transformed.
        Texture co-ordinates are generated and used in some animations, but for
        others only Fragment.xy is used. In all cases, time is used as an index
        to the Z plane of the 3D noise.
      </p>
      <Typography.Header>Benchmarks & Comparisons</Typography.Header>
      <p>
        All I can say is: Wow. WebGL (or more accurately, GLSL) fragment shaders
        are a huge step up in terms of performance when we compare to my old CPU
        implementation.
      </p>
      <p>In the old implementation, on a 1GHz machine:</p>
      <ul>
        <li>Firefox 7 would fail to achieve >30FPS on a 128x128 square.</li>
        <li>
          Chrome 15 seemed to achieve >30FPS, or if not, the visual stutter
          wasn't too noticeable.
        </li>
      </ul>
      <p>In the WebGL shader implementation, on a 1GHz machine:</p>
      <ul>
        <li>
          Firefox 7 easily seems to achieve >30FPS on a 1680x945 rectangle.
        </li>
        <li>
          As it did for the old implementation, Chrome 15 seems to outshine
          Firefox again.
        </li>
        <li>
          Furthermore, both browsers can render arbitrary transforms (the
          texture mapped cube) of the noise, which is something that I would
          have considered impossible for real-time in the old implementation.
        </li>
      </ul>
      <p>
        How do we account for the speed improvements? I would estimate that 99%
        of it is due to the change from CPU to GPU shaders; programming a highly
        parallelizable task on the GPU will naturally outperform its
        corresponding CPU-only implementation. Moreover, the computation of
        Perlin noise is relatively simple, which makes it a good fit for
        approximation on the GPU. I hypothesize that less JavaScript being
        employed might account for some of the speed improvement.
      </p>
      <h4>Resources</h4>
      <ul>
        <li>
          <a
            href="http://http.developer.nvidia.com/GPUGems2/gpugems2_chapter26.html"
            target="_blank"
          >
            Implementing Improved Perlin Noise (GPU Gems, by S Green)
          </a>
        </li>
        <li>
          <a
            href="http://http.developer.nvidia.com/GPUGems/gpugems_ch05.html"
            target="_blank"
          >
            Implementing Improved Perlin Noise (GPU Gems, by K Perlin)
          </a>
        </li>
        <li>
          <a href="http://learningwebgl.com/blog/?p=507" target="_blank">
            Learning WebGL &ndash; Lesson 5
          </a>
        </li>
      </ul>
    </ReadableSection>
    <ReadableSection>
      <AnnotatedCanvas caption="Perlin's standard turbulence">
        <Shader2
          fallback={
            <Img
              className="canvas-background-image"
              sizes={ data.shader2Fallback.sizes }
            />
          }
        />
      </AnnotatedCanvas>
      <AnnotatedCanvas caption="Oscillator">
        <Shader3
          fallback={
            <Img
              className="canvas-background-image"
              sizes={ data.shader3Fallback.sizes }
            />
          }
        />
      </AnnotatedCanvas>
      <AnnotatedCanvas caption="Toon shaded / Heatmap">
        <Shader4
          fallback={
            <Img
              className="canvas-background-image"
              sizes={ data.shader4Fallback.sizes }
            />
          }
        />
      </AnnotatedCanvas>
      <AnnotatedImage caption="Jupiter-esque: Old CPU implementation, src RIP">
        <Img sizes={ data.jupiter.sizes } />
      </AnnotatedImage>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
  query PerlinIndexQuery {
    shader1Fallback: imageSharp(id: { regex: "/img/gpu-perlin1.png/" }) {
      ...LabImageFragment
    }
    shader2Fallback: imageSharp(id: { regex: "/img/gpu-perlin2.png/" }) {
      ...LabImageFragment
    }
    shader3Fallback: imageSharp(id: { regex: "/img/gpu-perlin3.png/" }) {
      ...LabImageFragment
    }
    shader4Fallback: imageSharp(id: { regex: "/img/gpu-perlin4.png/" }) {
      ...LabImageFragment
    }
    jupiter: imageSharp(id: { regex: "/img/cpu-perlin2.jpg/" }) {
      ...LabImageFragment
    }
  }
`;
