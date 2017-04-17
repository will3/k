var CANNON = require('cannon');
var settings = require('./settings');

function LinkedObject(object, body) {
  function update() {
    if (object != null) {
      // var euler = new CANNON.Vec3();
      // body.quaternion.toEuler(euler);
      // body.quaternion.setFromEuler(0, 0, euler.z);

      object.quaternion.fromArray(body.quaternion.toArray());
      // object.rotation.x = 0;
      // object.rotation.y = 0;
      object.position.fromArray(body.position.toArray());
      // object.position.z = 0;
    }
  };

  return {
    update: update,
    object: object,
    body: body
  };
};

module.exports = function() {
  var world = new CANNON.World();
  world.gravity.set(0, -10.0, 0);
  var map = {};
  var timeStep = 1.0 / 60.0; // seconds

  initGridPlanes();

  function initGridPlanes() {
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    groundBody.position.y = -20;
    world.add(groundBody);

    var leftPlaneBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    leftPlaneBody.quaternion.setFromEuler(0, Math.PI / 2, 0);
    leftPlaneBody.position.x = -settings.gridXDim;
    world.add(leftPlaneBody);

    var rightPlaneBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    rightPlaneBody.quaternion.setFromEuler(0, -Math.PI / 2, 0);
    rightPlaneBody.position.x = settings.gridXDim;
    world.add(rightPlaneBody);
  };

  function add(object, body) {
    var linkedObject = LinkedObject(object, body);
    linkedObject._id = require('./guid');
    map[linkedObject._id] = linkedObject;
    world.add(body);

    // body.angularFactor = new CANNON.Vec3(0, 0, 0);

    return linkedObject;
  };

  function update() {
    world.step(timeStep);

    for (var id in map) {
      var linkedObject = map[id];
      linkedObject.update();
    }
  };

  return {
    add: add,
    update: update
  };
};
