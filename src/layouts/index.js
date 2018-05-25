import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./index.css";
import "./styles.scss";

import metaImg from "../favicon.png";

const metaTitle = "Anthony Cameron";
const metaDescription =
  "Everything you need to know about Anthony Cameron: A collection of personal projects, featuring WebGL, GLSL shaders, JavaScript, C++.  A sample of my portfolio.  My resume.  My philosophy.";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Anthony Cameron"
      meta={ [
        { name: "author", content: metaTitle },
        {
          name: "description",
          content: metaDescription
        },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
        { name: "og:title", content: metaTitle },
        {
          name: "og:description",
          content: metaDescription
        },
        {
          name: "google-site-verification",
          content: "lKOTFc8NabMteeKOno8uNXPXiL4ojDd9slzRRf7ocCc"
        },
        {
          name: "og:image",
          content: metaImg
        },
        {
          name: "twitter:title",
          content: metaTitle
        },
        {
          name: "twitter:description",
          content: metaDescription
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:site",
          content: "@dontqq"
        },
        {
          name: "twitter:creator",
          content: "@dontqq"
        },
        {
          name: "twitter:image",
          content: metaImg
        }
      ] }
    />
    <div className="main-container">
      <Header />
      <div className="main-content">{children()}</div>
      <Footer />
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
