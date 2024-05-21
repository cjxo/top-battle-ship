import { Vec2 } from "./utils.js";

// assume P + length is valid, checked by whoever initialized Ship
function Ship(P, length, isHori) {
  let hitCount = 0;

  const increaseDir = isHori ? Vec2(1, 0) : Vec2(0, 1);
  const possibleHits = new Array(length);
  for (let bodyIndex = 0; bodyIndex < length; ++bodyIndex) {
    possibleHits[bodyIndex] = { P: Vec2(P.x, P.y), isHit: false };
    P.add(increaseDir);
  }

  const hit = (hitP) => {
    const foundP = possibleHits.find(body => body.P.isEqual(hitP) && !body.isHit);
    if (foundP !== undefined) {
      hitCount += 1;
      foundP.isHit = true;
      return true;
    } else {
      return false;
    }
  }

  const isSunk = () => {
    return hitCount === length;
  }

  return { hit, isSunk };
}

export { Ship };
