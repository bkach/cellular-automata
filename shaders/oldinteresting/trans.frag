#version 130

uniform sampler2D cframe;
uniform sampler2D tframe;
uniform vec2 scrdim;
uniform int gen;

void main(void) {
	float q = 0.0005;

	vec4 c  = texture2D(cframe, gl_FragCoord.xy/scrdim.xy);
	vec4 t  = texture2D(tframe, gl_FragCoord.xy/scrdim.xy);
	gl_FragColor.rgb = q*t.rgb + (1-q)*c.rgb;
	gl_FragColor.a = 1.0;
}

