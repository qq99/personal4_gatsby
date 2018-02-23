import React from "react";
import Canvas from "../Canvas";

import perlinPermutation from "../Perlin/PerlinPermutation";
import fragment_shader from "raw-loader!./shader.frag";
import vertex_shader from "raw-loader!./shader.vert";
import fallback from "./crazyeye.png";

class CrazyEye extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ctx: null };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }

  componentWillUnmount() {
    this.paused = true;
    this.unbind();
  }

  unbind() {
    window.removeEventListener("resize", this.resizeCanvas.bind(this));
  }

  onFail() {
    this.paused = true;
    this.unbind();
  }

  onWebgl(canvas, gl, shaderProgram) {
    this.canvas = canvas;
    this.gl = gl;
    this.shaderProgram = shaderProgram;

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.perm_sampler = gl.getUniformLocation(shaderProgram, "uperm_sampler");
    shaderProgram.grad_sampler = gl.getUniformLocation(shaderProgram, "igrad_sampler");
    shaderProgram.time = gl.getUniformLocation(shaderProgram, "time");
    shaderProgram.resX = gl.getUniformLocation(shaderProgram, "resX");
    shaderProgram.resY = gl.getUniformLocation(shaderProgram, "resY");

    // initBuffers:
    const cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    const vertices = [
      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0, -1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 4;
    this.cubeVertexPositionBuffer = cubeVertexPositionBuffer;

    const cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 4;
    this.cubeVertexTextureCoordBuffer = cubeVertexTextureCoordBuffer;

    const cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Back face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 6;
    this.cubeVertexIndexBuffer = cubeVertexIndexBuffer;

    // initTexture:
    const perlinTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, perlinTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 256, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, perlinPermutation);
    this.perlinTexture = perlinTexture;

    var g = new Uint8Array([1,1,0,    -1,1,0,    1,-1,0,    -1,-1,0,
      1,0,1,    -1,0,1,    1,0,-1,    -1,0,-1,
      0,1,1,    0,-1,1,    0,1,-1,    0,-1,-1,
      1,1,0,    0,-1,1,    -1,1,0,    0,-1,-1]);
    const p_gradient = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, p_gradient);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 16, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, g);
    this.p_gradient = p_gradient;

    this.resizeCanvas();
    this.time = 0.0;
    this.paused = false;
    this.animate();
  }

  animate(timestamp) {
    if (this.paused) { return; }
    this.time = timestamp / 1000.0;
    requestAnimationFrame(this.animate.bind(this));
    this.drawScene();
  }

  resizeCanvas() {
    const canvas = this.canvas;
    if (this.paused) { return; }
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
  }

  drawScene() {
    const canvas = this.canvas;
    const gl = this.gl;
    const shaderProgram = this.shaderProgram;
    const cubeVertexTextureCoordBuffer = this.cubeVertexTextureCoordBuffer;
    const cubeVertexPositionBuffer = this.cubeVertexPositionBuffer;
    const cubeVertexIndexBuffer = this.cubeVertexIndexBuffer;
    const perlinTexture = this.perlinTexture;
    const p_gradient = this.p_gradient;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, perlinTexture);
    gl.uniform1i(shaderProgram.perm_sampler, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, p_gradient);
    gl.uniform1i(shaderProgram.grad_sampler, 1);

    gl.uniform1f(shaderProgram.time, this.time);
    gl.uniform1f(shaderProgram.resX, canvas.width);
    gl.uniform1f(shaderProgram.resY, canvas.height);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }

  render() {
    return (
      <Canvas
        fallback={ fallback }
        shaders={ [{
          code: vertex_shader,
          type: "vertex",
        }, {
          code: fragment_shader,
          type: "fragment",
        }] }
        onFail={ this.onFail.bind(this) }
        onWebgl={ this.onWebgl.bind(this) }
      />
    );
  }
}

export default CrazyEye;
