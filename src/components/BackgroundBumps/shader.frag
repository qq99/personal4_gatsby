#ifdef GL_ES
precision highp float;
#endif

varying vec3 vNormal;
varying vec2 vTextureCoord;
varying vec3 vPosition;
uniform sampler2D background_sampler;
varying vec2 mouse;

uniform vec4 diffuse_material;
uniform float light_z;
uniform float rho;
uniform float bump_scale;
uniform float delta_s;
uniform float delta_t;

vec3 bump_map(vec3 normal)
{
  float scale = bump_scale;
  vec4 tex = texture2D(background_sampler,vTextureCoord);
  float deltaS = vTextureCoord.s+delta_s;
  float deltaT = vTextureCoord.t+delta_t;


  vec4 ds = texture2D(background_sampler,vec2(deltaS,vTextureCoord.t)) - tex;
  vec4 dt = texture2D(background_sampler,vec2(vTextureCoord.s,deltaT)) - tex;
  float magX = ds.b;
  float magY = dt.b;

  normal += scale*magX*vec3(1.0,0.0,0.0);
  normal += scale*magY*vec3(0.0,1.0,0.0);
  return normalize(normal);
}

void main(void) {
  vec3 N = vNormal;
  N = bump_map(N);
  // lights:
  vec4 ambient = vec4(0.01, 0.01, 0.01, 1.0); //colours
  vec4 light_spec = vec4(0.1, 0.1, 0.1, 1.0); // ^
  vec4 light_diffuse = vec4(1.0, 1.0, 1.0, 1.0);// ^
  vec3 test_light = vec3(0.0,0.0,light_z); //position
  vec3 light_position = vec3(mouse.xy, light_z); // the one controlled by mouse

  vec3 view = vPosition;

  vec3 L_m = normalize(light_position - view);

  // materials:
  //vec4 md = texture2D(background_sampler, vTextureCoord);
  //vec4 md = vec4(0.7,0.0,0.0,1.0);
  vec4 md = diffuse_material;
  vec4 ms = vec4(0.1,0.1,0.1,1.0);
  //ms = md*0.5;


  // Diffuse
  float Idiff = max(dot(N,L_m), 0.0);
  Idiff = clamp(Idiff, 0.0, 1.0);
  // Specular:
  vec3 R_m = reflect(-L_m, N);
  float Ispec = dot(R_m,view);      // calculate Phong specular intensity, Ispec
  Ispec = 0.0;

  //gl_FragColor = 0.8* texture2D(background_sampler,vTextureCoord) + cd * vec4(1,0,0,1.0);

  vec4 combination = (Idiff * light_diffuse * md) + (Ispec * light_spec * ms) + ambient;
  gl_FragColor = combination;
}