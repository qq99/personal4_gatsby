import React from "react";

import classNames from "classnames";

class StandardPage extends React.Component {
  render() {
    return (
      <div className={ classNames("page-content", {
        "two-column-grid": this.props.twoColumn,
      }) }
      >
        {this.props.children}
      </div>
    );
  }
}

export default StandardPage;
