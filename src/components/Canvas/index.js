import React from "react";
import autobind from "autobind-decorator";
import debounce from "lodash/debounce";

import "./canvas.scss";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      status: "uninitialized"
    };
    this.debouncedResizeCanvas = debounce(this.resizeCanvas, 50);
    this.time = 0;
  }

  componentDidMount() {
    window.addEventListener("resize", this.debouncedResizeCanvas);
    if (this.props.autoplay) {
      this.play();
    }
  }

  componentDidUpdate() {
    this.resizeCanvas();
  }

  componentWillUnmount() {
    this.pause();
    window.removeEventListener("resize", this.debouncedResizeCanvas);
  }

  initializeWebgl() {
    const canvas = this.refs.canvas;

    try {
      // throw "foo"; // test error handling
      let gl;
      gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      this.gl = gl;

      const shaderProgram = this.compileAndLinkShaderProgram();

      if (shaderProgram) {
        gl.useProgram(shaderProgram);
        this.props.onWebgl(canvas, gl, shaderProgram);
      } else {
        this.fail();
      }

      this.setState({ initialized: true, status: "paused" });
    } catch (e) {
      this.fail();
      throw e;
    }
  }

  @autobind
  resizeCanvas() {
    const canvas = this.refs ? this.refs.canvas : null;
    if (!canvas) {
      return;
    }
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
  }

  @autobind
  play() {
    if (!this.state.initialized) {
      this.initializeWebgl();
    }
    this.resizeCanvas();

    this.lastTimestamp = performance.now();

    this.setState({ status: "play" });
    if (this.props.onPlay) {
      this.props.onPlay();
    }
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  @autobind
  pause() {
    cancelAnimationFrame(this.animationFrame);
    this.setState({ status: "paused" });
    if (this.props.onPause) {
      this.props.onPause();
    }
  }

  @autobind
  animate(timestamp) {
    const dTime = (timestamp - this.lastTimestamp) / 1000;
    this.time += dTime;
    this.lastTimestamp = timestamp;

    this.props.onAnimate(timestamp, dTime, this.time);
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  fail() {
    this.setState({ status: "failure" });
    if (this.props.onFail) {
      this.props.onFail();
    }
  }

  compileAndLinkShaderProgram() {
    console.log("Initializing shaders...");
    const { shaders } = this.props;
    const gl = this.gl;

    const shaderProgram = gl.createProgram();

    shaders.map(shaderProp => {
      const { type, code } = shaderProp;
      let shaderType;
      if (type == "fragment") {
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

  renderPlaybackControls() {
    let controls;

    if (["paused", "uninitialized"].includes(this.state.status)) {
      controls = (
        <div className="canvas-button" onClick={this.play}>
          <i className="fa fa-play" />
        </div>
      );
    } else if (this.state.status === "play") {
      controls = (
        <div
          className="canvas-button canvas-button--pause"
          onClick={this.pause}
        >
          <i className="fa fa-pause" />
        </div>
      );
    }

    return <div className="canvas-playback-controls">{controls}</div>;
  }

  render() {
    let pauseControls;

    if (this.state.initialized) {
    }

    return (
      <div className="canvas-container">
        {this.props.showPlayControls ? this.renderPlaybackControls() : null}
        <div
          className="fallback"
          style={{
            display: ["failure", "uninitialized"].includes(this.state.status)
              ? "block"
              : "none"
          }}
        >
          {this.props.fallback ? this.props.fallback : null}
        </div>
        <canvas
          ref="canvas"
          style={{
            display: this.state.initialized ? "block" : "none"
          }}
        />
      </div>
    );
  }
}

Canvas.defaultProps = {
  autoplay: false,
  showPlayControls: true
};

export default Canvas;
