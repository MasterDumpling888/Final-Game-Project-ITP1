class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.vel = createVector(0, 0);
  }

  draw() {

  }

  update() {

  }
}

//Enemy Sumo - moves horizontally
class Sumo extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.distance = 200;
    this.anchorX = this.x;
  }

  draw() {
    let index = floor((frameCount / 15) % 4);

    image(sumo_img, this.x, this.y, blockSize, blockSize, index * 160, 0, 160, 160);
    this.update();
  }

  update() {
    this.speed += 0.0125;
    this.vel.x = this.anchorX + cos(this.speed) * this.distance - this.x;
    this.x += this.vel.x;
  }
}

// Enemy Ninja - moves elliptically
class Ninja extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.distance = 120;
    this.anchorX = this.x;
    this.anchorY = (this.y - blockSize) - this.distance / 2;
  }
  draw() {
    let index = floor((frameCount / 15) % 3);

    image(ninja_img, this.x, this.y, blockSize, blockSize, index * 160, 0, 160, 160);
    this.update();
  }

  update() {
    this.speed += 0.0175;
    this.vel.y = this.anchorY + sin(this.speed) * this.distance - this.y;
    this.y += this.vel.y;
    this.vel.x = this.anchorX + cos(this.speed) * this.distance - this.x;
    this.x += this.vel.x;
  }
}