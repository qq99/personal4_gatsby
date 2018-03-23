import React from "react";

import "./annotated-canvas.scss";

const AnnotatedCanvas = props => (
  <figure className="annotated-canvas">
    <div className="annotated-canvas__container">{props.children}</div>
    <figcaption style={{ display: props.caption ? "block" : "none" }}>
      {props.caption}
    </figcaption>
  </figure>
);

export default AnnotatedCanvas;
