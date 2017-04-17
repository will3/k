module.exports = function(size) {
  var map = {};

  var size = size || 16;

  function getOrigin(i, j, k) {
    return [
      Math.floor(i / 16) * 16,
      Math.floor(j / 16) * 16,
      Math.floor(k / 16) * 16
    ];
  };

  function get(i, j, k) {
    var id = getOrigin(i, j, k).join(',');
    var region = map[id];
    if (region == null) {
      return null;
    }

    var chunk = region.chunk;

    return chunk.get(i - region.origin[0], j - region.origin[0], k - region.origin[0]);
  };

  function set(i, j, k, v) {
    var origin = getOrigin(i, j, k);
    var id = origin.join(',');

    var region = map[id];

    if (region == null) {
      region = map[id] = {
        chunk: require('./chunk')(size),
        origin: origin
      };
    }

    region.dirty = true;

    region.chunk.set(i - region.origin[0], j - region.origin[0], k - region.origin[0], v);
  };

  return {
    get: get,
    set: set,
    map: map,
    getSize: function() {
      return size;
    }
  }
};
