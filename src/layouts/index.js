import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./index.css";
import "./styles.scss";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Anthony Cameron"
      meta={ [
        { name: "author", content: "Anthony Cameron" },
        {
          name: "description",
          content:
            "Everything you need to know about Anthony Cameron: A collection of personal projects, featuring WebGL, GLSL shaders, JavaScript, C++.  A sample of my portfolio.  My resume.  My philosophy."
        },
        { name: "viewport", content: "width=device-width,initial-scale=1" }
      ] }
    >
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
    </Helmet>
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
