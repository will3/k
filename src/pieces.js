var guid = require('./guid');
var THREE = require('three');

module.exports = function(params) {
  var scene = params.scene;
  var physics = params.physics;

  var layer = new THREE.Object3D();
  scene.add(layer);

  var pieces = {};

  function add() {
    var piece = require('./piece')();
    layer.add(piece.object);

    var id = guid();
    piece._id = id;
    piece.object._id = id;

    pieces[piece._id] = piece;

    piece.initBody(physics);
  };

  function get(id) {
    return pieces[id];
  };

  return {
    add: add,
    get: get,
    layer: layer
  };
};
