import React from 'react'

import fragment_shader from 'raw-loader!./shader.frag'
import vertex_shader from 'raw-loader!./shader.vert'

const perlin = new Uint8Array([151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]);

// http://www.hugodaniel.pt/posts/2016-06-17-react-redux-canvas.html
class Canvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;

    let gl;
    gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true })
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    this.gl = gl;

    const shaderProgram = this.compileAndLinkShaderProgram();
 
    gl.useProgram(shaderProgram);

    this.props.onWebgl(canvas, gl, shaderProgram);
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
        alert(gl.getShaderInfoLog(shader));
        return null;
      } else {
        gl.attachShader(shaderProgram, shader);
      }
    });

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    } else {
      console.log("Linked shaders...");
    }

    return shaderProgram;
  }

  render() {
    return (
      <div className="canvas-container" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'hidden',
      }}>
        <canvas ref="canvas" style={{
          width: '100%',
          height: '100%',
        }} />
      </div>
    )
  }
}

class CrazyEye extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ctx: null };
  }

  componentDidMount() {
    this.paused = false;
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }
  
  componentWillUnmount() {
    this.paused = true;
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
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
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 256, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, perlin);
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
    console.log('onWebgl');

    this.resizeCanvas();
    this.time = 0.0;
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
    if (this.state.ctx) { this.renderWebgl(); }

    return (
      <Canvas
        shaders={[{
          code: vertex_shader,
          type: 'vertex',
        }, {
          code: fragment_shader,
          type: 'fragment',
        }]}
        onWebgl={this.onWebgl.bind(this)} />
    )
  }
}

export default CrazyEye
