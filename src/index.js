var THREE = require('three');

var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
camera.position.set(0, 0, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var grid = require('./grid')();
scene.add(grid.object);

var physics = require('./physics')();

var pieces = require('./pieces')({
  scene: scene,
  physics: physics
});

var input = require('./input')({
  camera: camera,
  pieces: pieces,
  physics: physics,
  scene: scene
});

pieces.add();

function render() {
  renderer.render(scene, camera);
  physics.update();
};

function animate() {
  render();
  setTimeout(animate, 1000 / 60);
};

animate();
