#version 130

uniform sampler2D prevframe;
uniform vec2 scr_dim;
uniform int gen; //generation

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 neighbor(int a, int b) {
	return texture2D(prevframe, vec2(gl_FragCoord.x+a,gl_FragCoord.y+b)/scr_dim.xy);
}

void main(void) {

	//initial seeding, random stuff
	if(gen == 0) {
		float r = rand(gl_FragCoord.xy);
		if(r > 0.5) gl_FragColor.rgb = vec3(1.0);
		else gl_FragColor.rgb = vec3(0.0);
		gl_FragColor.a = 1.0;	
		return;
	}

	vec4 c  = texture2D(prevframe, vec2(gl_FragCoord.x,gl_FragCoord.y)/scr_dim.xy); //current pixel

	//visualization:
	//p1 p2 p3
	//p4 c  p5
	//p6 p7 p8


	vec4 p1 = neighbor(-1,-1);
	vec4 p2 = neighbor(0,-1);
	vec4 p3 = neighbor(1,-1);
	vec4 p4 = neighbor(-1,0);
	vec4 p5 = neighbor(1,0);
	vec4 p6 = neighbor(-1,1);
	vec4 p7 = neighbor(0,1);
	vec4 p8 = neighbor(1,1);


	vec4 p9 =  neighbor(-2,-2);
	vec4 p10 = neighbor(-2, 2);
	vec4 p11 = neighbor( 2,-2);
	vec4 p12 = neighbor( 2, 2);

	vec4 p13 = neighbor(0,-3);
	vec4 p14 = neighbor(0,3);
	vec4 p15 = neighbor(3,0);
	vec4 p16 = neighbor(-3,0);


	//vec4 sum = floor(p1+p2+p3+p4+p5+p6+p7+p8 +p9+p10+p10+p11);
	vec4 sum = floor(p1+p2+p3+p4+p5+p6+p7+p8 +p9+p10+p11+p12 +p13+p14+p15+p16);

	vec2 b = gl_FragCoord.xy - scr_dim.xy/2.0;

	float a = 1.0 - distance(b,vec2(0.0))/330;



	//the rule(s)
	if(sum.r == 3.0)
		gl_FragColor.rgb = vec3(1.0);
	else if(sum.r < 2.0 || sum.r > 3.0)
		gl_FragColor.rgb = c.rgb - vec3(0.001) - a;
	else
		gl_FragColor.rgb = c.rgb + vec3(0.7);

	gl_FragColor.a = 1.0;
}

