class Ground {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  draw() {
    noStroke();
    //grass
    fill(108, 211, 119);
    rect(this.x, this.y, this.w, blockSize, 10);

    //soil
    fill(64, 50, 33);
    rect(this.x, this.y + 20, this.w, blockSize - 20, 10);
  }
}