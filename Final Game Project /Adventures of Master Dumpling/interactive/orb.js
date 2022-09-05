class Orb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.c = color(160, 0, 158);
    this.r = 32; //radius
  }

  draw() {
    this.c.setRed((2 * 102) * sin(millis() / 988)); //changes the red value of orb colour
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.r);

    fill(255, 255, 255, 200); // shine
    ellipse(this.x + 10, this.y, this.r - 25, this.r - 20);
    ellipse(this.x - 5, this.y + 8, this.r - 25, this.r - 27);
  }
}