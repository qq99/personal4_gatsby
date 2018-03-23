import React from "react";

import "./annotated-image.scss";

class AnnotatedImage extends React.Component {
  render() {
    return (
      <figure className="annotated-image">
        {this.props.children}
        <figcaption style={{ display: this.props.caption ? "block" : "none" }}>
          {this.props.caption}
        </figcaption>
      </figure>
    );
  }
}

export default AnnotatedImage;
