#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uperm_sampler;
uniform sampler2D igrad_sampler;
uniform float time;
uniform float resX;
uniform float resY;

float fade(in float t)
{
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
float perm(in float x)
{
    return texture2D(uperm_sampler, vec2(x / 256.0, 0)).r * 256.0;
}
float grad(in float x, in vec3 p)
{
    return dot(texture2D(igrad_sampler, vec2(x,0)).rgb, p);
}
float lerp(in float a, in float b, in float c)
{
    return mix(a,b,c);
}
float inoise(vec3 p)
{
    vec3 P = mod(floor(p), 256.0);
    p -= floor(p);
    vec3 f = vec3(fade(p.x), fade(p.y), fade(p.z));
    float A = perm(P.x) + P.y;
    float AA = perm(A) + P.z;
    float AB = perm(A + 1.0) + P.z;
    float B =  perm(P.x + 1.0) + P.y;
    float BA = perm(B) + P.z;
    float BB = perm(B + 1.0) + P.z;


    return lerp(
        lerp(lerp(grad(perm(AA), p),
            grad(perm(BA), p + vec3(-1.0, 0.0, 0.0)), f.x),
            lerp(grad(perm(AB), p + vec3(0.0, -1.0, 0.0)),
                grad(perm(BB), p + vec3(-1.0, -1.0, 0.0)), f.x), f.y),
        lerp(lerp(grad(perm(AA + 1.0), p + vec3(0.0, 0.0, -1.0)),
                grad(perm(BA + 1.0), p + vec3(-1.0, 0.0, -1.0)), f.x),
        lerp(grad(perm(AB + 1.0), p + vec3(0.0, -1.0, -1.0)),
            grad(perm(BB + 1.0), p + vec3(-1.0, -1.0, -1.0)), f.x), f.y),
    f.z);

}

float fbm(vec3 p){
  float f = 0.0;
  f += 0.5000*inoise(p); p*=2.02;
  f += 0.2500*inoise(p); p*=2.03;
  f += 0.1250*inoise(p); p*=2.01;
  f += 0.0625*inoise(p); p*=2.04;
  f /= 0.9375;
  return f;
}

void main(void) {
  float slowtime = 0.025 * time;
  vec2 q = gl_FragCoord.xy / vec2(resX,resY).xy;
  vec2 p = -1.0 + 2.0*q;
  p.x *= resX/resY;

  p /= 2.2; // effective zoom

  float u = p.x;
  float v = p.y;

  float r = sqrt( dot(p,p) );
  float a = atan( p.y, p.x );
  float noiseCoef = 0.1;
  for (float level = 1.0; level < 5.0; level ++)
  {
        noiseCoef = noiseCoef + (0.1 * level)
            * abs(inoise(
                vec3(level * u * 10.0,
                    level * v * 10.0,
                    time*0.75)));
  }

  float rednoise = 0.1;
  float xx = r;
  float yy = a;
  for (float level = 1.0; level < 5.0; level ++)
  {
        rednoise = rednoise + (0.078 * level)
            * abs(inoise(
                vec3(level * xx * 30.0,
                    level * yy * 10.0,
                    0.0)));
  }

  // calculate vein noise
  float veinnoise = 0.3;
  xx = r;
  yy = a;
  for (float level = 1.0; level < 3.0; level ++)
  {
        veinnoise = veinnoise + ((cos(time*0.25)*0.15 + 1.0) * 3.0 * level)
            * abs(inoise(
                vec3(level * xx * 15.0,
                    level * yy * 10.0,
                    0.15*time)));
  }

  // calculate nearly exactly same noise as vein noise, but a tiny bit off for specular highlight of vein
  vec2 hh = vec2(p.x+0.002, p.y-0.002);
  float rhh = sqrt( dot(hh,hh) );
  float ahh = atan( hh.y, hh.x );
  float veinnoise2 = 0.3;
  xx = rhh;
  yy = ahh;
  for (float level = 1.0; level < 3.0; level ++)
  {
        veinnoise2 = veinnoise2 + ((cos(time*0.25)*0.15 + 1.0) * 10.0 * level)
            * abs(inoise(
                vec3(level * xx * 15.0,
                    level * yy * 10.0,
                    0.15*time)));
  }



  vec3 sclera = vec3(0.9, 0.9, 0.9);
  vec3 color = vec3(0,0,0);
  float f = 1.0;
  if ( r < 0.85 ) {
    f = smoothstep( 0.842, 0.85, r);
    color = sclera;
    color = mix(color, vec3(0), f);

    // veins
    f = max(0.0, 1.0 - veinnoise);
    color = mix(color, vec3(1,0,0), 0.25*f);

    // specular highlight of vein
    f = max(0.0, 1.0 - veinnoise2);
    color = mix(color, vec3(1), f);

    // dull edges to black
    f = smoothstep( 0.45, 1.0, r);
    color = mix(color, vec3(0), f);

    // scelera texture
    f = rednoise;
    color = mix(color, vec3(0.10,0,0), 0.5*f);
  }
  if ( r < 0.39 ) {
    // base:
    vec3 blue = vec3(-0.1,0.15,0.24);

    f = 1.0 - smoothstep( 0.36, 0.37, r);
    color = mix (color, blue, f);

    // background noise of iris
    if (r < 0.34) {
      color = mix (color, vec3(0.2, 0.2, 0.7), noiseCoef);
    }

    // secondary iris colour
    f = 1.0 - smoothstep( 0.0, 0.32, r);
    color = mix(color, vec3(1.0,0.4,0.2), 2.0*f*noiseCoef );

    // spindels
    f = fbm( vec3(12.0*r,15.0*a, slowtime * 4.0) );
    color = mix(color, vec3(1.0), f);

    // spindels
    a = slowtime*fbm(20.0*vec3(p.xy,1.0));
    f = fbm( vec3(20.0*r,23.0*a, slowtime * 4.0) );
    color = mix(color, vec3(1.0), f);

    // pupil
    float step = smoothstep(0.13,0.14,r);
    step = smoothstep(0.13 - slowtime*noiseCoef,0.14,r);  // creepy shit with this line on
    color *= step;
  }
  // specular highlight
  f = 1.0 - smoothstep( 0.0, 0.125, length(p - vec2(-0.2, 0.23)));
  color += vec3(1.0,0.9,0.8)*f;
  gl_FragColor = vec4(color.xyz, 1);
}