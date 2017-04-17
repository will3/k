var CANNON = require('cannon');

module.exports = function() {

  var blocks = require('./voxel/blocks')({
    onUpdate: onUpdate
  });

  var coords = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
  ];

  var color = 0xffffff;
  var colorHighlight = 0xff0000;
  var highlighted = false;

  updateColor();

  function initBody(physics) {
    blocks.update();

    var mass = coords.length;

    var body = new CANNON.Body({
      mass: mass
    });

    for (var i = 0; i < coords.length; i++) {
      var coord = coords[i];
      var shape = new CANNON.Sphere(1);
      // new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
      body.addShape(shape, new CANNON.Vec3(coord.x, -coord.y, coord.z));
    }

    body.position.set(0, 20, 0);
    // body.quaternion.setFromEuler(0, 0, Math.random() * Math.PI * 2);

    physics.add(blocks.object, body);

    return body;
  };

  function updateColor() {
    var c = highlighted ? colorHighlight : color;
    for (var i = 0; i < coords.length; i++) {
      var coord = coords[i];
      blocks.set(coord[0], coord[1], coord[2], c);
    }
  };

  function onUpdate() {

  };

  function highlight(flag) {
    flag = flag === undefined ? true : false;

    highlighted = flag;
    updateColor();
  };

  return {
    object: blocks.object,
    highlight: highlight,
    initBody: initBody
  };
};
