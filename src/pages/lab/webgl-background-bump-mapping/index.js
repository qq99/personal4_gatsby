import React from "react";
import Img from "gatsby-image";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";
import AnnotatedCanvas from "../../../components/AnnotatedCanvas";
import BackgroundBumps from "../../../components/BackgroundBumps";

import img_bumps1 from "./img/background-bumps.jpg";
import img_bumps2 from "./img/background-bumps2.jpg";

const IndexPage = ({ data }) => (
  <div>
    <StandardPage>
      <ReadableSection>
        <AnnotatedCanvas caption="Mouse over me to change the light position">
          <BackgroundBumps src="https://www.toptal.com/designers/subtlepatterns/patterns/cartographer.png" />
        </AnnotatedCanvas>
        <Typography.PageTitle>
          WebGL Background Bump Mapping
        </Typography.PageTitle>
        <p>
          <Typography.Subdued>May 12, 2012</Typography.Subdued>
        </p>
        <Typography.Header>What is it?</Typography.Header>
        <p>
          Background textures have always been fairly flat and static things. I
          set out to increase their (apparent) depth.
        </p>
        <p>
          It's not entirely practical, and in retrospect I'm not sure why I
          created it, but here it is! I think it's kind of neat and kind of
          pretty.
        </p>
        <p>
          This project features WebGL, bump mapping, and the Phong reflection
          model to 'enhance' a websites background.
        </p>
        <Typography.Header>Overview</Typography.Header>
        <p>
          The website's background <code>(0,0)x(viewportX,viewportY)</code> is
          mapped to a square <code>(-1,-1)x(1,1)</code>. Right about where your
          face is, a virtual light is pointed towards the screen. In practice,
          it seems that hanging this light from <code>0..2</code> units above
          the screen yields good results. At 2 units, the light provides a
          fairly even coverage of the square. Less than this, it seems to
          provide for an easy vignette effect. You provide a background
          (diffuse) color, and your image is consulted for the texture of the
          surface.
        </p>
        <p>
          Subtle tiling textures are care of{" "}
          <a href="http://subtlepatterns.com/" target="_blank">
            subtlepatterns.com
          </a>
        </p>
        <Typography.Header>Graphics Model</Typography.Header>
        <p>
          The image is represented in the XY plane. The normal is simply{" "}
          <code>(0,0,1)</code>. This allows us to easily place the light
          somewhere in the <code>(0,0,+z)</code> area, and use the mouse to
          control the X and Y positions of the light. The Phong reflection model
          is used for shading. The specular component is messed up, as you'll
          see if you increase rho. Since the viewport is defined to be between{" "}
          <code>(-1,-1)x(1,1)</code>, we can easily reason about the position of
          the light in this space. <code>(-1,-1)</code> being the bottom right,{" "}
          <code>(1,1)</code> being the top right. An offset can be applied to
          the mouse's modifier, allowing us to position the light off-screen but
          still have the mouse affect the shading; this can make the effect
          subtler.
        </p>
        <Typography.Header>Bump mapping</Typography.Header>
        <p>
          Forward differencing (via 3 texture lookups) in X (1,0,0) and Y
          (0,1,0) is performed on the provided pattern, and a magnitude is
          obtained. The stepsize can be controlled by delta_s and delta_t, and
          may need to be adjusted as the texture is scaled for better results.
          Currently, only the blue channel is consulted. This magnitude,
          modulated by a user specified scaling factor (bump_scale), is used to
          perturb the normals in the X and Y directions (or s and t).
        </p>
        <Typography.Header>Viewport Adjustments</Typography.Header>
        <p>
          It is very rare that a browser will have a viewport aspect ratio of
          1:1. The canvas is stretched to the browser viewport dimensions, but
          internally has a square of aspect 1:1. As such, we'd notice stretching
          on any textures due to this aspect ratio difference. So, on
          draw/resize, the texture coordinates are modulated by the browser's
          viewport aspect ratio. This results in square textures displaying as
          they were intended.
        </p>
        <Typography.Header>WebGL and non-POT textures</Typography.Header>
        <p>
          As I was experimenting with the textures, I noticed that a lot of the
          tiling textures that exist in the wild are non-power-of-two (non-POT)
          in dimension. Furthermore, almost none of the textures are perfectly
          square.
        </p>
        <p>
          WebGL only currently supports power-of-two pixel dimensions, so the
          image is redrawn using a temporary 2D canvas if it isn't POT. This is
          fine for getting the texture to simply display, but there are still
          rescaling problems (mapping an arbitrary rectangle into a perfect
          square squashes the texture). Ultimately, this is due to a deficiency
          in the simplified model I constructed, but it is easily circumvented:
          the texture coordinates are further modulated by the texture's aspect
          ratio. This results in textures of any aspect ratios rendering as the
          author intended.
        </p>
        <Typography.Header>Texture Coordinate Scaling</Typography.Header>
        <p>
          As the dimensions of the images used for textures vary, so must their
          scaling factor -- some of the patterns you may try might be outright
          invisible due to their scaling factor. This is also performed with a
          straight-forward multiplication to the texture coordinates; gl.REPEAT
          in the texture wrap parameters handles the rest.
        </p>
        <p>
          All texture coordinate modulations are done via vertex shader
          uniforms, rather than modulating and re-uploading the texture
          coordinates. This was done to keep the implementation simple. Since
          there are only two triangles, I don't anticipate this as being
          particularly inefficient.
        </p>
        <Typography.Header>Limitations & Concerns</Typography.Header>
        <p>
          The light is less circular the further away the window viewport is
          from 1:1. Smart semi-automatic setting of texture coordinate scale and
          bump scale would be nice, but for now it is a manual tweaking process.
        </p>
        <p>
          The code is a mess, and I couldn't figure out why the specular was
          failing in Linux. The lighting model isn't terribly standard since
          there's no actual geometry, so I imagine this could be contributing to
          my frustrations. Could be what I thought was working specular in
          Windows was actually just silently failing. I've disabled specular and
          as far as I can see, it looks how it always looked in Windows.
        </p>
        <AnnotatedImage>
          <Img sizes={ data.bumps1.sizes } />
        </AnnotatedImage>
        <AnnotatedImage>
          <Img sizes={ data.bumps2.sizes } />
        </AnnotatedImage>
      </ReadableSection>
    </StandardPage>
  </div>
);

export default IndexPage;

export const query = graphql`
  query IndexQueryBackgroundBumps {
    bumps1: imageSharp(id: { regex: "/img/background-bumps.jpg/" }) {
      ...LabImageFragment
    }
    bumps2: imageSharp(id: { regex: "/img/background-bumps2.jpg/" }) {
      ...LabImageFragment
    }
  }
`;
