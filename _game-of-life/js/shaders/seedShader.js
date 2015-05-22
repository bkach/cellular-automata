THREE.seedShader = {

  vertexShader: [
    'void main(){',
    '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}',
  ].join('\n'),

  fragmentShader: [
    'uniform vec2 scale;',

    'void main(){',
    '  if(distance(gl_FragCoord.xy,scale/2.0) < scale.x/4.0){',
    '     gl_FragColor = vec4(1.0); ',
    '  }',
    '  else{',
    '     gl_FragColor = vec4(0.0); ',
    '  }',
    '}'
  ].join('\n')

};
