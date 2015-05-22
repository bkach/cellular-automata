var camera, textures, renderer, resultScene, quad;
var flag = 0;

var container = document.getElementById( 'canvas' );
container.style.textAlign = 'center';

var width = window.innerWidth,
    height = window.innerHeight;

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
  rootScene = new THREE.Scene();
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

  var plane = new THREE.PlaneBufferGeometry( 
      width, height);

  // Add a quad to the root scene
  quad = new THREE.Mesh( plane,
		 new THREE.ShaderMaterial( {
         uniforms: {
           'scale' : {type: 'v2', value: new THREE.Vector2(width,height)}
         },
					vertexShader: THREE.seedShader.vertexShader,
					fragmentShader: THREE.seedShader.fragmentShader,
					//depthWrite: false
				})
     );
  quad.position.z = -100;
  rootScene.add( quad );

  shader = THREE.celAutShader;

  // Add a quad to the result scene
  quad = new THREE.Mesh( plane,
		 new THREE.ShaderMaterial( {
       uniforms: {
         'tDiffuse' : {type: 't', value: textures[0]},
         'scale' : {type: 'v2', value: new THREE.Vector2(width,height)},
         'mouse' : {type: 'v2', value: new THREE.Vector2(-10,-10)}
       },
					vertexShader: shader.vertexShader,
					fragmentShader: shader.fragmentShader,
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

  // Render the root scene
  renderer.render( rootScene, camera, textures[0], true );
  renderer.render( rootScene, camera );
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
