THREE.celAutShader = {

	vertexShader: [
    'void main(){',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

      '}'].join("\n"),

	fragmentShader:[
    'uniform sampler2D tDiffuse;',
    'uniform vec2 scale;',
    'uniform vec2 mouse;',

    'int neighbor(int x, int y){',
    '  float fx = float(x);',
    '  float fy = float(y);',
    '  int result = int(texture2D(tDiffuse, vec2(gl_FragCoord.x - fx, gl_FragCoord.y - fy) / scale ).x);',
    '  return (result - 1) * -1;',
    '}',

    'void main(){',

    '  vec4 texel = texture2D(tDiffuse, vec2(gl_FragCoord.x,gl_FragCoord.y)/scale);',

    '  int sum = ',
    '    neighbor(-1, -1) +',
    '    neighbor(0, -1) +',
    '    neighbor(1, -1) +',
    '    neighbor(-1, 0) +',
    '    neighbor(1, 0) +',
    '    neighbor(-1, 1) +',
    '    neighbor(0, 1) +',
    '    neighbor(1, 1);',

   '  if(distance(vec2(gl_FragCoord.x,gl_FragCoord.y),mouse) < 5.0){',
	//'	if(int(gl_FragCoord.x) == int(mouse.x)){',
	'    gl_FragColor = vec4(0.0);',
	'  }',
    '  else if(sum == 3){',
    '    gl_FragColor = vec4(0.0);',
    '  }',
    '  else if(sum < 2 || sum > 3)',
    '  {',
    //'    gl_FragColor = texel + vec4(0.01);',
    '    gl_FragColor = vec4(1.0);',
    '  }',
    '  else',
    '  {',
    '    gl_FragColor = texel;',
    '  }',
      
    '}'].join("\n")
};
