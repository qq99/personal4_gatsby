import React from "react";

import "./annotated-image.scss";

class AnnotatedImage extends React.Component {
  render() {
    return (
      <figure className="annotated-image">
        <div className="annotated-image__image">{this.props.children}</div>
        <figcaption style={{ display: this.props.caption ? "block" : "none" }}>
          {this.props.caption}
        </figcaption>
      </figure>
    );
  }
}

export default AnnotatedImage;
