var THREE = require('three');

module.exports = function() {

  function update() {

  };

  function animate() {
    update();
    setTimeout(animate, 1000 / 60);
  };

  animate();

  var sharedMaterial = new THREE.MultiMaterial();
  sharedMaterial.materials = [null];

  return {
    sharedMaterial: sharedMaterial
  };

}();
