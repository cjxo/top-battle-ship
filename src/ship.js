import { Vec2, AttackKind } from "./utils.js";

// assume P + length is valid, checked by whoever initialized Ship
function Ship(P, length, isHori) {
  let hitCount = 0;

  const startP = Vec2(P.x, P.y);
  const increaseDir = isHori ? Vec2(1, 0) : Vec2(0, 1);
  const possibleHits = new Array(length);
  for (let bodyIndex = 0; bodyIndex < length; ++bodyIndex) {
    possibleHits[bodyIndex] = { P: Vec2(P.x, P.y), isHit: false };
    P.add(increaseDir);
  }

  const hit = (hitP) => {
    const foundP = possibleHits.find(body => body.P.isEqual(hitP));
    if (foundP !== undefined) {
      if (foundP.isHit) {
        return AttackKind.AlreadyHit;
      } else {
        hitCount += 1;
        foundP.isHit = true;
        return AttackKind.Hit;
      } 
    } else {
      return AttackKind.Miss;
    }
  }

  const isSunk = () => {
    return hitCount === length;
  }

  return {
    get hori() {
      return isHori;
    },
    get length() {
      return length;
    },
    get startP() {
      return startP;
    },
    hit,
    isSunk
  };
}

export { Ship };
