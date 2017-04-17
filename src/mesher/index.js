var mesher = require('./monotone').mesher;
var THREE = require('three');

module.exports = function(params) {
  var object = params.object;
  var chunks = params.chunks;
  var material = params.material;

  var size = chunks.getSize();
  var dims = [size, size, size];

  var updated = false;
  for (var id in chunks.map) {
    var region = chunks.map[id];

    if (!region.dirty) {
      continue;
    }

    updated = true;

    if (region.mesh != null) {
      object.remove(region.mesh);
      region.mesh.geometry.dispose();
    }

    function f(i, j, k) {
      return region.chunk.get(i, j, k);
    };

    var geometry = new THREE.Geometry();

    var results = mesher(f, dims);

    results.vertices.forEach(function(v) {
      var vertice = new THREE.Vector3(v[0], v[1], v[2]);
      geometry.vertices.push(vertice);
    });

    results.faces.forEach(function(f) {
      var face = new THREE.Face3(f[0], f[1], f[2]);
      face.materialIndex = f[3];
      geometry.faces.push(face);
    });

    var mesh = new THREE.Mesh(geometry, material);

    region.dirty = false;

    object.add(mesh);

    region.mesh = mesh;
  };

  return updated;
};
