module.exports = function(size) {
  var yz = size * size;
  var data = [];

  function getIndex(i, j, k) {
    return i * yz + j * size + k;
  };

  function get(i, j, k) {
    var index = getIndex(i, j, k);
    return data[index];
  };

  function set(i, j, k, v) {
    var index = getIndex(i, j, k);
    data[index] = v;
  };

  return {
    get: get,
    set: set,
    size: size
  };
};
