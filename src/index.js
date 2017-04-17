var THREE = require('three');

var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});

var object = new THREE.Mesh(geometry, material);
scene.add(object);

function render() {
  renderer.render(scene, camera);
};

function animate() {
  render();
  setTimeout(1 / 60, animate);
};

animate();