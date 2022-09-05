class Map {
  constructor(ref, width, height) {
    this.temp = ref.temp;
    this.width = width;
    this.height = height;
    this.rectCRad = 10;
    this.greenFieldY = 400;

    rectMode(CORNER);
    noStroke();
  }
  /*----drawing layers of parallax scrolling----*/
  drawBackmostLayer(){ 
    translate(100, 200);
    scale(0.5);
    this.drawClouds(temp.decals[0]); 
    this.drawMountains(temp.decals[1]);

  }

  drawMiddleLayer() {
    this.drawField();
    this.drawClouds(temp.decals[0]);
    this.drawMountains(temp.decals[1]);

  }
  drawForemostLayer() {
    this.drawTrees(temp.decals[2]);
    this.drawText(2275,-250);
    this.drawSpikeFloor(0, 700, 4000, 200);
  }

  // warning text before invisible collapsing platform
  drawText(x, y) {
    fill((1.5 * frameCount) % 360, (frameCount) % 360, (2 * frameCount) % 360)
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(35);
    textStyle(BOLD);
    textFont('Trebuchet MS');
    text("Have a little faith...\nbut not too much ;P", x, y);
  }

  // floor for plumment
  drawSpikeFloor(x, y, w, h) {
    fill(54);
    push();
    rect(x, y, w, h);
    fill(112);
    stroke(100);
    strokeWeight(3);
    for (let i = 0; i < w / 32; i++) {
      triangle(x + (32 * i), y, x + (16 + (32 * i)), y - 32, x + (32 + (32 * i)), y);
    }
    pop();
  }

  // field of green for background
  drawField() {
    noStroke();
    push();
    fill(116, 173, 122);
    rect(-300, this.greenFieldY, this.width, this.height);

    //body of water
    fill(94, 134, 193);
    rect(this.width / 4, this.greenFieldY, this.width / 2, this.height / 2, 50);
    pop();
  }

  drawClouds(decal) {
    decal.pos.forEach(([x, y, width, height, alpha]) => {
      noStroke();
      fill(255, 255, 255, alpha);
      ellipse(x + 70, y + 25, width + 35, height - 20);

      fill(255, 255, 255, alpha + 50);
      ellipse(x, y, width, height + 25);

      fill(255, 255, 255, alpha);
      ellipse(x - 100, y + 35, width + 10, height - 30);

      fill(255, 255, 255, alpha - 50);
      ellipse(x - 75, y, width, height - 20);
    })
  }

  drawMountains(decal) {
    decal.pos.forEach(([x, y, x2, y2]) => {
      noStroke();
      fill(57, 115, 135, 180);
      triangle(x, y, x - 112, y + 375, x + 138, y + 375);
      triangle(x2, y2, x2 - 125, y + 375, x2 + 125, y + 375);
      triangle(x2 - 100, y2 + 200, x2 - 175, y + 375, x2 - 25, y + 375);
      triangle(x + 130, y + 200, x + 50, y + 375, x + 200, y + 375);
    })
  }

  drawTrees(decal) {
    decal.pos.forEach(([x, y]) => {
      noStroke();
      push()
      let width = 128, height = 90;
      //trunk
      fill(120, 95, 66);
      rectMode(CENTER);
      rect(x, y + 100, width - 100, height + 10, 17);

      //bush
      fill(250, 220, 253);
      ellipse(x, y, width, height);
      ellipse(x - 40, y + 40, width - 45, height - 40);
      ellipse(x + 40, y + 40, width - 45, height - 40);
      ellipse(x, y + 40, width - 45, height - 40);

      //face//
      //eyes
      fill(0);
      ellipse(x - 15, y, width - 120, height - 80);
      ellipse(x + 15, y, width - 120, height - 80);
      //smile
      stroke(0);
      strokeWeight(2);
      noFill();
      bezier(x - 10, y + 10, x - 5, y + 15, x + 5, y + 15, x + 10, y + 10);
      pop();
    })
  }

  //point counter
  drawPCounter(x, y, w, h) {
    push()
    fill(255);
    stroke(250, 103, 103);
    strokeWeight(3);
    rectMode(CENTER);
    rect(x, y, w, h, 2);

    fill(0)
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textFont('Trebuchet MS');
    text("Orbs remaining:" + orbList.length, x, y);
    pop();
  }

  drawLives(xpos, ypos) {
    push();
    translate(xpos, ypos);
    fill(242, 42, 42);
    noStroke();
    beginShape();
    for (var i = 0; i < TWO_PI; i += 0.1) {
      let x = 16 * pow(sin(i), 3);
      let y = (13 * cos(i)) - (5 * cos(2 * i)) - (2 * cos(3 * i)) - cos(4 * i);
      vertex(x, -y);
    }
    endShape();
    pop();
  }
}