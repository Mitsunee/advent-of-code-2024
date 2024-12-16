export function getGPSScore(map: string[], box: string) {
  let score = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] != box) continue;
      score += 100 * y + x;
    }
  }
  return score;
}
