var mesher = require('../mesher');
var THREE = require('three');
var engine = require('./engine');

module.exports = function(params) {
  params = params || {};
  var onUpdate = params.onUpdate || function() {};
  var chunks = require('../chunks')();
  var object = new THREE.Object3D();
  var useOwnMaterial = params.useOwnMaterial || false;

  var material;
  if (useOwnMaterial) {
    material = new THREE.MultiMaterial();
    material.materials = [null];
  } else {
    material = engine.sharedMaterial;
  }

  var colors = {};

  function set(i, j, k, v) {
    var color = v;
    var index = getBasicMaterial(color);
    chunks.set(i, j, k, index);
  };

  function get(i, j, k) {
    return chunks.get(i, j, k);
  }

  function getBasicMaterial(color) {
    if (colors[color] == null) {
      var m = new THREE.MeshBasicMaterial({
        color: color
      });
      var index = material.materials.length;
      material.materials[index] = m;

      colors[color] = {
        index: index
      }
    }

    return colors[color].index;
  };

  function update() {
    var updated = mesher({
      object: object,
      chunks: chunks,
      material: material
    });
    if (updated) {
      onUpdate();
    }
  };

  function animate() {
    update();
    setTimeout(animate, 1000 / 60);
  };

  animate();

  return {
    object: object,
    get: get,
    set: set,
    update: update
  };
};
