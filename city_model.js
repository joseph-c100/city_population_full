import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const container = document.getElementById("hero-section")


// set scene and camera variables
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 100, 10000 );

// background
scene.background = new THREE.Color( 0xf8f8ec);


// set renderer to window size
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );



// set orbit controls and zoom limits
let controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;



// // stop camera going below ground
controls.maxPolarAngle = Math.PI / 2


// loading 3D model
const loader = new GLTFLoader();
let model;

loader.load( './public/low_city.glb', function ( gltf ) {

    model = gltf.scene;
    scene.add(model);

}, undefined, function ( error ) {

    console.error( error );

} );



// adding light source
const light = new THREE.DirectionalLight( 0xFFFFFF );
scene.add( light );

// set default camera position
camera.position.x = -1914;
camera.position.y = 387;
camera.position.z = -431;

camera.rotation.x = -2.409;
camera.rotation.y = -1.276;
camera.rotation.z = -2.43;



// test camera angles
// window.addEventListener('mouseup', function() {
//     console.log(camera.position)
//     console.log(camera.rotation)
// })





// detect window resize event and run onWindowResize function
window.addEventListener( 'resize', onWindowResize );




// resize camera aspect ratio and renderer size on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}


// render the scene and animate
function animate() {
	requestAnimationFrame( animate );

    model.rotation.y += 0.0005;
    
	renderer.render( scene, camera );
    controls.update();
}

animate();

