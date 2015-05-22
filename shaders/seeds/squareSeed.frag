uniform vec2 scale;

void main(){

  float hs = scale.x/8.0;

  if(gl_FragCoord.x + hs > scale.x/2.0 && 
     gl_FragCoord.x - hs < scale.x/2.0 &&
     gl_FragCoord.y + hs > scale.y/2.0 && 
     gl_FragCoord.y - hs < scale.y/2.0)
  {
     gl_FragColor = vec4(1.0); 
  }
  else
  {
     gl_FragColor = vec4(0.0); 
  }
}
