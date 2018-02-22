attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform float mouseX;
uniform float mouseY;
uniform float viewport_aspect;
uniform float texture_aspect;
uniform float texture_coord_scale;

varying vec3 vNormal;
varying vec2 vTextureCoord;
varying vec3 vPosition;
varying vec2 mouse;
void main(void) {
  gl_Position = vec4(aVertexPosition, 1.0);
  vPosition = aVertexPosition;
  vNormal = vec3(0.0, 0.0, 1.0);
  vTextureCoord = texture_coord_scale * aTextureCoord; // scale
  vTextureCoord.s = texture_aspect * viewport_aspect * vTextureCoord.s; // adjust in S to account for viewport and texture variations
  mouse = vec2(mouseX, mouseY);
}