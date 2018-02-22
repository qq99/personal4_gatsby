import React from 'react'

import './canvas.scss';

class Canvas extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      failure: false
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;

    try {
      let gl;
      gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true })
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      this.gl = gl;

      const shaderProgram = this.compileAndLinkShaderProgram();

      if (shaderProgram) {
        gl.useProgram(shaderProgram);
        this.props.onWebgl(canvas, gl, shaderProgram);
      } else {
        this.setState({failure: true});
        this.props.onFail();
      }
    } catch (e) {
      this.setState({failure: true});
      this.props.onFail();
      throw e;
    }
  }

  compileAndLinkShaderProgram() {
    console.log("Initializing shaders...");
    const { shaders } = this.props;
    const gl = this.gl;

    const shaderProgram = gl.createProgram();


    shaders.map((shaderProp) => {
      const { type, code } = shaderProp;
      let shaderType;
      if (type == 'fragment') {
        shaderType = gl.FRAGMENT_SHADER;
      } else {
        shaderType = gl.VERTEX_SHADER;
      }

      const shader = gl.createShader(shaderType);
      gl.shaderSource(shader, code);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        return null;
      } else {
        gl.attachShader(shaderProgram, shader);
      }
    });

    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log("Could not link shaders");
      return null;
    } else {
      console.log("Linked shaders...");
    }

    return shaderProgram;
  }

  render() {
    return (
      <div className="canvas-container">
        <div className="fallback" style={{
          backgroundImage: `url('${this.props.fallback}')`,
          display: this.state.failure ? 'block' : 'none',
        }}/>
        <canvas ref="canvas" style={{
          display: this.state.failure ? 'none' : 'block',
        }} />
      </div>
    )
  }
}

export default Canvas