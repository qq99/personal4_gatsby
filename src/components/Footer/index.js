import React from "react";
import ReadableSection from "../ReadableSection";
import Nav from "../Nav";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faCodepen,
  faTwitter,
  faLinkedin
} from "@fortawesome/fontawesome-free-brands";

import "./footer.css";

const Footer = () => (
  <footer className="primary-footer screen-only">
    <ReadableSection>
      <Nav>
        <a href="https://github.com/qq99" target="_blank" title="Github">
          <FontAwesomeIcon icon={ faGithub } />
        </a>

        <a href="http://codepen.io/qq99" target="_blank" title="CodePen">
          <FontAwesomeIcon icon={ faCodepen } />
        </a>

        <a href="https://twitter.com/dontqq" target="_blank" title="Twitter">
          <FontAwesomeIcon icon={ faTwitter } />
        </a>

        <a
          href="http://ca.linkedin.com/in/anthonycameron/"
          target="_blank"
          title="LinkedIn"
        >
          <FontAwesomeIcon icon={ faLinkedin } />
        </a>
      </Nav>
    </ReadableSection>
  </footer>
);

export default Footer;
