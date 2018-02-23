import React from "react";
import classNames from "classnames";

import "./readable-section.css";

class ReadableSection extends React.Component {
  render() {
    const classes = classNames("readable-section", {
      "readable-section--wide": this.props.wide
    });

    return (
      <div className={ classes }>
        {this.props.children}
      </div>
    );
  }
}

export default ReadableSection;
