uniform vec2 scale;

void main(){
  float radius = scale.x / 8.0;

  if(distance(gl_FragCoord.xy,scale/2.0) < radius){
     gl_FragColor = vec4(1.0); 
  }
  else{
     gl_FragColor = vec4(0.0); 
  }
}
