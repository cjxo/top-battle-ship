// assume integer coords
function Vec2(x, y) {
  return {
    get x() {
      return x;
    },

    get y() {
      return y
    },

    isEqual(anotherVec) {
      return (x === anotherVec.x) && (y === anotherVec.y);
    },

    added(vec) {
      return Vec2(vec.x + x, vec.y + y);
    },
    
    add(vec) {
      x += vec.x;
      y += vec.y;
    }
  };
}

export { Vec2 };
