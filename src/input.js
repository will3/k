var THREE = require('three');
var CANNON = require('cannon');
var keycode = require('keycode');

module.exports = function(params) {
  var camera = params.camera;
  var pieces = params.pieces;
  var physics = params.physics;
  var scene = params.scene;

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var selectedPiece = null;

  var mass = 0,
    radius = 1;
  var sphereShape = new CANNON.Sphere(radius); // Step 1
  var mouseBody = new CANNON.Body({
    mass: mass,
    shape: sphereShape
  });
  mouseBody.position.set(0, 20, 0);

  var plane = new THREE.PlaneGeometry(1000, 1000);
  var planeMesh = new THREE.Mesh(plane);
  planeMesh.updateMatrixWorld();

  function onMousedown(e) {
    getMousePiece();
    pieces.add();
  };

  function onMouseup(e) {
    if (selectedPiece != null) {
      selectedPiece.highlight(false);
      selectedPiece = null;
    }
  };

  function onMousemove(e) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
      var point = intersects[0].point;
      mouseBody.position.set(point.x, point.y, point.z);
    }
  };

  function getMousePiece() {
    var intersects = raycaster.intersectObject(pieces.layer, true);
    if (intersects.length == 0) {
      return null;
    }

    var id = intersects[0].object.parent._id;
    var piece = pieces.get(id);
    if (piece != null) {
      piece.highlight();
      selectedPiece = piece;
    }
  };

  window.addEventListener('mousedown', onMousedown);
  window.addEventListener('mouseup', onMouseup);
  window.addEventListener('mousemove', onMousemove);
};
