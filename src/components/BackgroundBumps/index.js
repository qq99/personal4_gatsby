import React from 'react'
import Canvas from '../Canvas'

import fragment_shader from 'raw-loader!./shader.frag'
import vertex_shader from 'raw-loader!./shader.vert'

const fallback = '';

// http://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Non-Power_of_Two_Texture_Support
function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

// http://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Non-Power_of_Two_Texture_Support
function nextHighestPowerOfTwo(x) {
  --x;
  for (var i = 1; i < 32; i <<= 1) {
      x = x | x >> i;
  }
  return x + 1;
}

class BackgroundBumps extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.drawContext = {
      light_z: 0.5,
      mouseX: 0.0,
      mouseY: 0.0,
      offset_x: 0.01,
      offset_y: 0.01,
      rho: 0,
      bump_scale: 25.9,
      delta_s: 0.005,
      delta_t: 0.005,
      texture_coord_scale: 1.2,
      diffuse: [64, 255, 76, 255],
      texture_aspect: 1,
      texture_diffuse_rgba: [64/255.0, 67/255.0, 76/255.0, 1],
    }

    this.state = {
      ctx: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  componentWillUnmount() {
    this.paused = true;
    this.unbind();
  }

  bindMouseListeners() {
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  unbind() {
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }

  onMouseMove(evt) {
    const mouseX = (evt.offsetX / this.canvas.width) - 0.5;
    const mouseY = (evt.offsetY / this.canvas.height) - 0.5;

    this.drawContext.mouseX = mouseX;
    this.drawContext.mouseY = -mouseY;
  }

  onFail() {
    this.paused = true;
    this.unbind();
  }

  onWebgl(canvas, gl, shaderProgram) {
    this.canvas = canvas;
    this.gl = gl;
    this.shaderProgram = shaderProgram;

    this.bindMouseListeners();

    shaderProgram.aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.aVertexPosition);

    shaderProgram.aTextureCoord = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.aTextureCoord);

    shaderProgram.background_sampler = gl.getUniformLocation(shaderProgram, "background_sampler");
    shaderProgram.mouseX = gl.getUniformLocation(shaderProgram, "mouseX");
    shaderProgram.mouseY = gl.getUniformLocation(shaderProgram, "mouseY");
    shaderProgram.light_z = gl.getUniformLocation(shaderProgram, "light_z");
    shaderProgram.rho = gl.getUniformLocation(shaderProgram, "rho");
    shaderProgram.bump_scale = gl.getUniformLocation(shaderProgram, "bump_scale");
    shaderProgram.delta_s = gl.getUniformLocation(shaderProgram, "delta_s");
    shaderProgram.delta_t = gl.getUniformLocation(shaderProgram, "delta_t");
    shaderProgram.viewport_aspect = gl.getUniformLocation(shaderProgram, "viewport_aspect");
    shaderProgram.texture_aspect = gl.getUniformLocation(shaderProgram, "texture_aspect");
    shaderProgram.texture_coord_scale = gl.getUniformLocation(shaderProgram, "texture_coord_scale");
    shaderProgram.diffuse_material = gl.getUniformLocation(shaderProgram, "diffuse_material");

    const drawing_quad = {};
    drawing_quad.vertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, drawing_quad.vertices);
    var vertices = [
        // Back face
        -1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    drawing_quad.vertices.itemSize = 3;
    drawing_quad.vertices.numItems = 4;

    drawing_quad.texture_coords = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, drawing_quad.texture_coords);
    var textureCoords = [
      // Back face
      -1.0, 0.0,
      -1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    drawing_quad.texture_coords.itemSize = 2;
    drawing_quad.texture_coords.numItems = 4;

    drawing_quad.indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawing_quad.indices);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Back face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    drawing_quad.indices.itemSize = 1;
    drawing_quad.indices.numItems = 6;

    this.drawing_quad = drawing_quad;

    const sampleTexture = this.props.src || 'https://www.toptal.com/designers/subtlepatterns/patterns/vintage-concrete.png';

    this.loadTexture(sampleTexture);

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

  loadTexture(src) {
    const gl = this.gl;
    const drawing_quad = this.drawing_quad;
    if (drawing_quad.texture) {
      gl.deleteTexture(drawing_quad.texture);
    }
    drawing_quad.texture = gl.createTexture();
    drawing_quad.texture.image = new Image();
    drawing_quad.texture.image.crossOrigin = 'anonymous';
    drawing_quad.texture.image.onload = this.handleLoadedTexture.bind(this);
    drawing_quad.texture.image.src = src;
  }

  handleLoadedTexture(textureRef) {
    const texture = this.drawing_quad.texture;
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    this.drawContext.texture_aspect = texture.image.height / texture.image.width; // calculate aspect ratio of pre-POT-converted image
    if (!isPowerOfTwo(texture.image.width) || !isPowerOfTwo(texture.image.height)) {
      // Scale up the texture to the next highest power of two dimensions.
      var temp_canvas = document.createElement("canvas");
      temp_canvas.width = nextHighestPowerOfTwo(texture.image.width);
      temp_canvas.height = nextHighestPowerOfTwo(texture.image.height);
      var ctx = temp_canvas.getContext("2d");
      ctx.drawImage(texture.image, 0, 0, temp_canvas.width, temp_canvas.height);
      texture.image = temp_canvas;
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  drawScene() {
    const canvas = this.canvas;
    const gl = this.gl;
    const shaderProgram = this.shaderProgram;
    const drawing_quad = this.drawing_quad;

    // calculate viewport aspect:
    var viewport_aspect = canvas.width / canvas.height;

    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, drawing_quad.vertices);
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, drawing_quad.vertices.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, drawing_quad.texture_coords);
    gl.vertexAttribPointer(shaderProgram.aTextureCoord, drawing_quad.texture_coords.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, drawing_quad.texture);
    gl.uniform1i(shaderProgram.background_sampler, 0);
    gl.uniform1f(shaderProgram.mouseX, this.drawContext.mouseX);
    gl.uniform1f(shaderProgram.mouseY, this.drawContext.mouseY);
    gl.uniform1f(shaderProgram.light_z, this.drawContext.light_z);
    gl.uniform1f(shaderProgram.rho, this.drawContext.rho);
    gl.uniform1f(shaderProgram.bump_scale, this.drawContext.bump_scale);
    gl.uniform1f(shaderProgram.delta_s, this.drawContext.delta_s);
    gl.uniform1f(shaderProgram.delta_t, this.drawContext.delta_t);
    gl.uniform1f(shaderProgram.texture_coord_scale, this.drawContext.texture_coord_scale);
    gl.uniform1f(shaderProgram.viewport_aspect, viewport_aspect);
    gl.uniform4f(shaderProgram.diffuse_material, this.drawContext.texture_diffuse_rgba[0], this.drawContext.texture_diffuse_rgba[1], this.drawContext.texture_diffuse_rgba[2], this.drawContext.texture_diffuse_rgba[3]);
    gl.uniform1f(shaderProgram.texture_aspect, this.drawContext.texture_aspect);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawing_quad.indices);
    gl.drawElements(gl.TRIANGLES, drawing_quad.indices.numItems, gl.UNSIGNED_SHORT, 0);
  }

  render() {
    return (
      <Canvas
        fallback={fallback}
        shaders={[{
          code: vertex_shader,
          type: 'vertex',
        }, {
          code: fragment_shader,
          type: 'fragment',
        }]}
        onFail={this.onFail.bind(this)}
        onWebgl={this.onWebgl.bind(this)} />
    )
  }
}

export default BackgroundBumps
