import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const container = document.getElementById("modelContainer")


// set scene and camera variables
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 100, 10000 );

// background
scene.background = new THREE.Color( 0xfbf3f3);


// set renderer to window size
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );



// set orbit controls and zoom limits
let controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;

controls.enableDamping = true;
controls.dampingFactor = 0.05;




// // stop camera going below ground
controls.maxPolarAngle = Math.PI / 2


// loading 3D model
const loader = new GLTFLoader();
let model;

loader.load( '/tokyo1.glb', function ( gltf ) {

    model = gltf.scene;
    scene.add(model);

}, undefined, function ( error ) {

    console.error( error );

} );



// adding light source
const light = new THREE.DirectionalLight( 0xFFFFFF );
scene.add( light );

// set default camera position
camera.position.x = -1254;
camera.position.y = 229;
camera.position.z = -875;

camera.rotation.x = -2.88;
camera.rotation.y = -0.94;
camera.rotation.z = -2.93;



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

    if (model) {
        model.rotation.y += 0.0005;
    }

    renderer.render(scene, camera);
    controls.update();
}

animate();

