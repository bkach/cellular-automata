uniform vec2 scale;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){

	float r = rand(gl_FragCoord.xy);

	if(r > 0.5){
    gl_FragColor = vec4(1.0);
  }
	else{
    gl_FragColor = vec4(0.0);
  }
}
