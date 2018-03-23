import React from "react";
import ReadableSection from "../ReadableSection";
import Nav from "../Nav";

import "./footer.css";

const Footer = () => (
  <footer className="primary-footer screen-only">
    <ReadableSection>
      <Nav>
        <a href="https://github.com/qq99" target="_blank" title="Github">
          <i className="fa fa-github" />
        </a>

        <a href="http://codepen.io/qq99" target="_blank" title="CodePen">
          <i className="fa fa-codepen" />
        </a>

        <a href="https://twitter.com/dontqq" target="_blank" title="Twitter">
          <i className="fa fa-twitter" />
        </a>

        <a
          href="http://ca.linkedin.com/in/anthonycameron/"
          target="_blank"
          title="LinkedIn"
        >
          <i className="fa fa-linkedin" />
        </a>
      </Nav>
    </ReadableSection>
  </footer>
);

export default Footer;
