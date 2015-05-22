uniform sampler2D tDiffuse;
uniform vec2 scale;
uniform vec2 mouse;

float neighbor(int x, int y){
  float fx = float(x);
  float fy = float(y);
  float result = texture2D(tDiffuse, vec2(gl_FragCoord.x - fx, gl_FragCoord.y - fy) / scale ).x;
  return result;
}

void main(){

  vec4 texel = texture2D(tDiffuse, vec2(gl_FragCoord.x,gl_FragCoord.y)/scale);

  int sum = 
    int(
    neighbor(-1, -1) +
    neighbor(0, -1) +
    neighbor(1, -1) +
    neighbor(-1, 0) +
    neighbor(1, 0) +
    neighbor(-1, 1) +
    neighbor(0, 1) +
    neighbor(1, 1));

  if(distance(vec2(gl_FragCoord.x,gl_FragCoord.y),mouse) < 5.0){
    gl_FragColor = vec4(1.0);
  }
  else if(sum == 3){
    gl_FragColor = vec4(1.0);
  }
  else if(sum < 2 || sum > 3)
  {
    gl_FragColor = vec4(0.0);
  }
  else
  {
    gl_FragColor = texel;
  }
}
