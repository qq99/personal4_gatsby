import React from "react";

import "./nav.css";

const Nav = (props) => (
  <nav className="navigation" { ...props }>
    {props.children}
  </nav>
);

export default Nav;
