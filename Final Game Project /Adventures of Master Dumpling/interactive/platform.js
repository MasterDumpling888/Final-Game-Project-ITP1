class Platforms {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = 0;
    this.vel = createVector(1.5, 1.5);
    this.w = blockSize * 2;
    this.h = blockSize / 2;
    this.colour = color(250, 103, 103);
    this.shake = 0;
  }

  draw() {
    rectMode(CORNER);
    fill(this.colour);
    noStroke();
    rect(this.x + this.shake, this.y, this.w, 32, 5);

    rectMode(CENTER);
    noFill();
    stroke(35, 35, 35);
    strokeWeight(1);
    rect(this.x + 64 + this.shake, this.y + 16, this.w - 8, 25, 5);

    for (let i = 0.1; i < 2; i++) {
      for (let h = 1.09; h <= 3; h++) {
        fill(35, 35, 35);
        noStroke();
        ellipse(this.x + (105 * i) + this.shake, this.y + 10 * h, 5);
      }
    }
  }

  update() {

  }
}

class CollapsingPlat extends Platforms {
  constructor(x, y) {
    super(x, y);
    this.collapseTimer = 10;
  }
  draw() {
    noStroke();
    rectMode(CORNER);
    fill(0);
    if (this.collapseTimer < 10 && this.collapseTimer > 0) {
      this.colour.setRed(2 * 100 * (sin(millis() / 100))); 
      super.draw();
    }
  }
  collapse(list, index) {
    this.collapseTimer--;
    if (this.collapseTimer < 3) {
      this.shake = random(-5, 5);
    }
    if (this.collapseTimer < 0) {
      list.splice(index, 1);
    }
  }
}

class MovingPlat extends Platforms {
  constructor(x, y, tx, distanceX, distanceY) {
    super(x, y);
    this.tx = tx;
    this.distanceX = distanceX;
    this.distanceY = distanceY;
    this.anchorX = this.x + (this.distanceX - this.w) / 2;
    this.anchorY = this.y + this.distanceY / 2;
  }
  draw() {
    super.draw();
    textAlign(CENTER, CENTER);
    textSize(20);
    textFont('Trebuchet MS');
    text(this.tx, this.x + 64, this.y + 17);
    this.update();
  }
  update() {
    if (this.tx == "X") {
      let dist = (this.distanceX - this.w) / 2 // distance traveled by platform from centre
      this.d += 0.01;
      this.vel.y = 0;
      this.vel.x = this.anchorX + cos(this.d) * dist - this.x;
      this.x += this.vel.x
    }

    if (this.tx == "Y") {
      this.d += 0.011;
      let dist = (this.distanceY) / 2;
      this.vel.x = 0;
      this.vel.y = this.anchorY + sin(this.d) * dist - this.y;
      this.y += this.vel.y;
    }
  }
}