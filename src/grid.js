var THREE = require('three');
var settings = require('./settings');

module.exports = function() {
  var geometry = new THREE.Geometry();
  var xDim = settings.gridXDim;
  var yDim = settings.gridYDim;
  var yOffset = settings.gridYOffset;
  
  geometry.vertices.push(
    new THREE.Vector3(-xDim, yDim + yOffset, 0),
    new THREE.Vector3(-xDim, 0 + yOffset, 0),
    new THREE.Vector3(-xDim, 0 + yOffset, 0),
    new THREE.Vector3(xDim, 0 + yOffset, 0),
    new THREE.Vector3(xDim, 0 + yOffset, 0),
    new THREE.Vector3(xDim, yDim + yOffset, 0)
  );

  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

  var line = new THREE.LineSegments(geometry, material);

  return {
    object: line
  };
};
