
class Player {
  constructor() {
    this.pos = createVector(100, 0);
    this.vel = createVector(0, 0);
    this.gravity = 3;
    this.friction = 0.3;
    this.dim = { w: 160, h: 160 };
    this.changeImg = 0;
    this.isRight = false;
    this.isLeft = false;
    this.isContact = false;
    this.isPlummenting = false;
    this.isInjured = false;
    this.injuryTimer = 0;
  }

  draw() {
    let index = floor((frameCount / 15) % 2) + this.changeImg;

    image(player_img, this.pos.x, this.pos.y, blockSize, blockSize, this.dim.w * index, 0, this.dim.w, this.dim.h);
  }

  update() {
    if (lives > 0) {
      this.updateVel();

      this.onGround();
      this.onPlatform();
      this.collectOrb();

      this.checkInjury();

      //if player is hit by enemy, begin injury timer
      if (this.onEnemy()) {
        this.isInjured = true;
        if (this.injuryTimer == 0) {
          lives--;
        }
      }
      if (this.isInjured && this.injuryTimer % 10 == 0) {
        this.changeImg = 12;
      }

      //player movements
      if (this.isRight && this.pos.x + blockSize < 3500) {
        this.vel.x = 5;
        this.changeImg = 2;
      }
      if (this.isRight && !this.isContact) {
        this.changeImg = 6;
      }
      if (this.isLeft && this.pos.x > 0) {
        this.vel.x = -5;
        this.changeImg = 4;
      }
      if (this.isLeft && !this.isContact) {
        this.changeImg = 8;
      }
    }
  }

  updateVel() {
    this.vel.y += this.gravity;
    this.vel.x -= this.vel.x * this.friction;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    //when player hits spikes/ when player is plummenting
    if (this.pos.y >= 512 + blockSize) {
      this.isPlummenting = true;
    } else {
      this.isPlummenting = false;
    }
    if (this.isPlummenting) {
      this.changeImg = 14;
      this.isContact = false;
      const spike_y = 670;
      if (this.pos.y + blockSize >= spike_y) {
        this.isContact = true;
        this.isInjured = true;
        this.pos.y = spike_y - blockSize;
        if (this.injuryTimer == 0) {
          lives--;
        }
      }
    }
  }

  onPlatform() {
    for (let i = 0; i < platformList.length; i++) {
      if (collisionDetection(this, platformList[i])) {
        this.isContact = true;
        this.pos.y = platformList[i].y - blockSize;
        this.vel.y = 0;
        if (platformList[i] instanceof CollapsingPlat) {
          platformList[i].collapse(platformList, i);
        }
        if (platformList[i] instanceof MovingPlat) {
          this.vel.x = platformList[i].vel.x;
          this.pos.x += this.vel.x * this.friction;
          this.vel.y = platformList[i].vel.y;
        }
      }
    }
  }

  onGround() {
    for (let i = 0; i < groundList.length; i++) {
      if (collisionDetection(this, groundList[i])) {
        this.isContact = true;
        this.pos.y = groundList[i].y - blockSize;
        this.vel.y = 0;
        break;
      }
    }
  }

  onEnemy() {
    for (let i = 0; i < enemyList.length; i++) {
      if (collisionDetection(this, enemyList[i])) {
        enemySound.play();
        return true;
      }
    }
    return false;
  }

  collectOrb() {//
    for (let i = 0; i < orbList.length; i++) {
      if (collisionDetection(this, orbList[i])) {
        collectingSound.play();
        orbList.splice(i, 1);
      }
    }
  }

  checkInjury() {
    if (this.isInjured) {
      if (this.injuryTimer < 90) {
        this.injuryTimer++;
      } else {
        this.changeImg = 0;
        this.isInjured = false;
        this.injuryTimer = 0;
      }
    }
  }
}