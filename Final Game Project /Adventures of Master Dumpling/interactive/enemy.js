class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = 0;
  }

  draw() {

  }

  update() {

  }
}

//Enemy Sumo - moves horizontally
class Sumo extends Enemy {
  constructor(x, y,) {
    super(x, y);

    this.anchorX = x;
    this.vel = 2.5;
    this.distance = 500;
  }

  draw() {
    let index = floor((frameCount / 15) % 4);

    image(sumo_img, this.x, this.y, blockSize, blockSize, index * 160, 0, 160, 160);
    this.update();
  }

  update() {
    this.x -= this.vel;
    if (this.x + blockSize > this.anchorX + this.distance || this.x < this.anchorX) {
      this.vel = this.vel * -1;
    }
  }
}

// Enemy Ninja - moves vertically
class Ninja extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.anchorY = y;
    this.vel = createVector(0, 0);
  }
  draw() {
    let index = floor((frameCount / 15) % 3);

    image(ninja_img, this.x, this.y, blockSize, blockSize, index * 160, 0, 160, 160);
    this.update();
  }

  update() {
    // this.y -= this.vel;
    // if (this.y > this.anchorY || this.y < this.anchorY - 250) {
    //   this.vel = this.vel * -1;
    // }
    this.dY += 0.01;
    let distY = (250 - blockSize) / 2 // distance traveled by enemy from centre
    // this.vel = 0;
    this.vel.y = this.anchorY + sin(this.dY) * distY - this.y;
    this.y += this.vel.y;

    // this.dX


  }
}