    #ifdef GL_ES
    precision highp float;
    #endif

    varying vec2 vTextureCoord;

    uniform sampler2D uperm_sampler;
    uniform sampler2D igrad_sampler;
    uniform float time;
    uniform float darkness;

    float fade(in float t)
    {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); // new curve
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

    void main(void) {
        //gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        //vec4 clr =  texture2D(uperm_sampler, vec2(vTextureCoord.s, 0));
        //gl_FragColor = texture2D(perm_sampler, vec2(vTextureCoord.s, vTextureCoord.t));
        //vec4 g = texture2D(igrad_sampler, vec2(vTextureCoord.s, vTextureCoord.t));

        //float noise = inoise(vec3(vTextureCoord.s * 30.0, vTextureCoord.t * 30.0, 0.0));

        float u = gl_FragCoord.x * 0.001;
        float v = gl_FragCoord.y * 0.001;
        float w = gl_FragCoord.z;
        float noiseCoef = 0.0;
        for (float level = 1.0; level < 5.0; level ++)
        {
            noiseCoef = noiseCoef + (0.1 * level)
                * abs(inoise(
                    vec3(level * u * 5.0,
                         level * v * 5.0,
                         time)));
        }

        //0.5 * Math.cos((u + v) * scale + noiseCoef) + 0.5;
        if (noiseCoef > 0.2){
            gl_FragColor = vec4(1, 0, 0, 1);
        }
        else if (noiseCoef > 0.15)
        {
            gl_FragColor = vec4(0.5, 0, 0, 1);
        }
        else if (noiseCoef > 0.1){
            gl_FragColor = vec4(0, 1, 0, 1);
        }
        else {
            gl_FragColor = vec4(0,0,1,1);
        }


        //gl_FragColor *= texture2D(grad_sampler, vec2(vTextureCoord.s, vTextureCoord.t));
        //gl_FragColor *= vec4(vTextureCoord.s, vTextureCoord.t, 1.0, 1.0);
    }