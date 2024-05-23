// assume integer coords

const AttackKind = {
  NoAttempt: 0,
  Miss: 1,
  AlreadyMiss: 2,
  Hit: 3,
  AlreadyHit: 4
};

function Vec2(x, y) {
  return {
    get x() {
      return x;
    },

    get y() {
      return y
    },

    set x(value) {
      x = value;
    },

    set y(value) {
      y = value;
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

export { Vec2, AttackKind };
