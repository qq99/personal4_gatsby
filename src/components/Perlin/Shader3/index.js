import React from "react";
import PerlinBase from "../Base";

import fragment_shader from "raw-loader!./shader.frag";
import vertex_shader from "raw-loader!./shader.vert";

class PerlinShader3 extends React.Component {
  render() {
    return (
      <PerlinBase
        fallback={ this.props.fallback }
        shaders={ [
          {
            code: vertex_shader,
            type: "vertex"
          },
          {
            code: fragment_shader,
            type: "fragment"
          }
        ] }
      />
    );
  }
}

export default PerlinShader3;
