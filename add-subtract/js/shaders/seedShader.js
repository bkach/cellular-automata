THREE.seedShader = {

  vertexShader: [
    'varying vec2 vUv;',

    'void main(){',

    '    vUv = uv;',

    '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}',
  ].join('\n'),

  fragmentShader: [
    'varying vec2 vUv;',

//     'float random(vec2 co){',
//       'return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
//     '}',

    'void main(){',

//     'float r = random(gl_FragCoord.xy);',
//     'if(r > 0.5){',
//     '  gl_FragColor = vec4(0.0);',
//     '}',
//     'else',
//     '{',
//       'gl_FragColor = vec4(1.0);',
//     '}',

    ' float boxRange = 0.4;',
	'  if(distance(vec2(vUv.x,vUv.y),vec2(0.5,0.5)) < 0.1){',
    '     gl_FragColor = vec4(1.0); ',
    '  }',
    '  else{',
    '     gl_FragColor = vec4(0.0); ',
    '  }',
    '}'

//     ' float boxRange = 0.4;',
//     '  if(vUv.x + boxRange > 0.5 && vUv.x - boxRange < 0.5 &&',
//         'vUv.y + boxRange > 0.5 &&  vUv.y - boxRange < 0.5){',
//     '     gl_FragColor = vec4(1.0); ',
//     '  }',
//     '  else{',
//     '     gl_FragColor = vec4(0.0); ',
//     '  }',
//     '}'
  ].join('\n')

};
