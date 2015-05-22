var camera, textures, renderer, resultScene, quad;
var seed = {},
    shader = {};
var flag = 0;

var container = document.getElementById( 'canvas' );

var width = window.innerWidth,
    height = window.innerHeight;

seedFragName = 'squareSeed';
seedVertName = 'seed';
shaderFragName = 'pulse';
shaderVertName = 'gameOfLife';

// Load seed fragment shader
loadTextFile('shaders/' + seedFragName + '.frag',function(t){seed.frag = t});
// Load seed vertex shader
loadTextFile('shaders/' + seedVertName + '.vert',function(t){seed.vert = t});
// Load shader fragment
loadTextFile('shaders/' + shaderFragName + '.frag',function(t){shader.frag = t});
// Load shader vertex
loadTextFile('shaders/' + shaderVertName + '.vert',function(t){shader.vert = t});

init();
animate();

function init(){

  // Initialize Camera
  camera = new THREE.OrthographicCamera( 
      width / - 2, 
      width / 2, 
      height / 2,
      height / - 2,
      -10000, 10000 );
  camera.position.z = 100;

  // Create a Root Scene and
  // a result to iterate upon
  seedScene = new THREE.Scene();
  resultScene = new THREE.Scene();

  function newTexture(){
    return new THREE.WebGLRenderTarget( 
        width, 
        height,
        { minFilter: THREE.LinearFilter, 
          magFilter: THREE.NearestFilter, 
          format: THREE.RGBFormat } );
  }

  textures = [newTexture(), newTexture()];

  var plane = new THREE.PlaneBufferGeometry(width, height);

  // Add a quad to the seed scene
  quad = new THREE.Mesh( plane,
		 new THREE.ShaderMaterial( {
         uniforms: {
           'scale' : {type: 'v2', value: new THREE.Vector2(width,height)}
         },
					vertexShader: seed.vert,
					fragmentShader: seed.frag,
					//depthWrite: false
				})
     );
  quad.position.z = -100;
  seedScene.add( quad );


  // Add a quad to the result scene
  quad = new THREE.Mesh( plane,
		 new THREE.ShaderMaterial( {
       uniforms: {
         'tDiffuse' : {type: 't', value: textures[0]},
         'scale' : {type: 'v2', value: new THREE.Vector2(width,height)},
         'mouse' : {type: 'v2', value: new THREE.Vector2(-10,-10)}
       },
					vertexShader: shader.vert,
					fragmentShader: shader.frag,
					//depthWrite: false
				})
     );
  quad.position.z = -100;
  resultScene.add( quad );

  // Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height);
  container.appendChild( renderer.domElement );

  renderer.domElement.addEventListener( "mousemove", onMouseMove, false );

  // Render the seed scene
  renderer.render( seedScene, camera, textures[0], true );
}

function animate() {
  requestAnimationFrame( animate );
  //setTimeout(animate,1000/1);
	render();
}

function render() {

  // Alternate between two textures
  // (renderTargets)
  flag = Math.abs(flag - 1);

  renderer.render(resultScene, camera, textures[flag]);
  quad.material.uniforms['tDiffuse'].value = textures[flag];

  // Final Render
  renderer.render( resultScene, camera );

}

function onWindowResize(){

}

function onMouseMove(event){
  quad.material.uniforms['mouse'].value = new THREE.Vector2(event.offsetX,height-event.offsetY);
}

function keyup(e){

}

function loadTextFile(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.addEventListener('load', function() {
     callback(request.responseText);
  })
  request.send();
}
