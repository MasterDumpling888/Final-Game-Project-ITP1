function getEnemies(temp, list) {
  temp.pos.forEach(([x, y]) => {

    let s = new Sumo(x, y);
    list.push(s);

    let n = new Ninja(x, y);
    list.push(n);
  })
}

function getGround(temp, list) {
  temp.pos.forEach(([x, y, w]) => {
    let g = new Ground(x, y, w);
    list.push(g);
  })
}

function getPlatforms(temp, list) {
  temp.pos.forEach(([x, y, tx, distX, distY]) => {
    let cp = new CollapsingPlat(2535, 0);
    list.push(cp);

    let mp = new MovingPlat(x, y, tx, distX, distY);
    list.push(mp);

    let numP = 4;
    for (let i = 0; i < numP; i++) {
      list.push(new Platforms
        (1344 + (656/numP * i),
          200 - (200/numP * i))
      );
    }
  });
}

function getOrb(temp, list) {
  temp.pos.forEach(([x, y]) => {
    let t = new Orb(x, y);
    list.push(t);
  });
}