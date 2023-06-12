import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

import * as THREE from "three";

console.log("linked");

const [canvas] = document.getElementsByTagName("canvas");

const loader = new GLTFLoader();

const clock = new THREE.Clock();
let time = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x = -10;

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor("#ffffff");
renderer.setSize( window.innerWidth, window.innerHeight );

const light = new THREE.AmbientLight( 0x404040 );
scene.add(light);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let hearts = [];
loader.load('heart-reduced.glb', function (gltf) {
  console.log("loaded");
  const geometry = gltf.scene.children[0].geometry;

  const wireframeMesh = new THREE.MeshBasicMaterial({
    color: 0xfc03d7,
    wireframe: true,
    transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, wireframeMesh);

  for(let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, wireframeMesh);
    mesh.position.y = Math.floor(Math.random() * 40 - 20);
    mesh.position.x = Math.floor(Math.random() * 40 - 20);
    mesh.rotation.y = Math.random() * 100;
    mesh.position.z = Math.floor(Math.random() * 400 - 200);

    scene.add(mesh);
    hearts.push(mesh);
  }

  // mesh.position.z -= 30; //distance away
  // mesh.position.y -= 10; //up down

  // scene.add(mesh);

  animate();

}, undefined, function (error) {
  console.error(error);
})

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0xff22ee });
const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);

camera.position.set(0, 0, 0);

let target = {x: 0, y: 0, z: 0};
let camera_offset = {x: 7, y: 7, z: 7};
let camera_speed = 0.2;

let direction = 1;

function animate(){
  requestAnimationFrame(animate);

  clock.getDelta();
  time = clock.elapsedTime.toFixed(2);


  renderer.render(scene, camera);
  cube.rotation.x += 0.005 * direction;
  heartRotate(0.01);
  let random = Math.floor(Math.random() * 200);
  if(random == 15) {
    // direction = -direction;
    // heart.rotation.y += Math.random() * 100;
    hearts[Math.floor(Math.random() * 10)].rotation.y += Math.random() * 100;
    console.log("GYAT");
  }
}

function heartRotate(amt) {
  for(let i = 0; i < hearts.length; i++){
    hearts[i].rotation.y += amt * direction;
  }
}