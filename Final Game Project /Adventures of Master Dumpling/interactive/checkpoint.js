class Checkpoint{
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;   
  }
  draw() {
    //draw flagpole
    push()
    stroke(0);
    strokeWeight(5)
    line(this.x + 150, this.y - 200, this.x + 150, this.y);
    pop();

    //draw castle
    fill(76, 78, 126)
    rect(this.x, this.y, this.w, 200);

    let c = color(255, 112, 200);
    c.setBlue((2 * 100) * sin(millis() / 1000)); //changes blue value of spikes
    fill(c);
    for (let i = 0; i < 3; i++) {
      triangle(this.x + (i * 100), this.y, this.x + (50 + (i * 100)), this.y - 75, this.x + (100 + (i * 100)), this.y);
    }
    this.checkCheckpoint();
  }
  checkCheckpoint(){
    if (collisionDetection(player, this) && orbList.length == 0) {
      this.drawAwake();
    } else {
      this.drawSleep();
    }
  }

  //when checkpoint is activated
  drawAwake(){
    push();
    rectMode(CENTER);
    //eyes
    fill(250);
    for(let i = 0; i < 2; i++){
      ellipse(this.x + (100 + (i * 100)), this.y + 75, 50);
    }
    fill(0);
    for(let i = 0; i < 2; i++){
      ellipse(this.x + (100 + (i * 100)), this.y + 75, 30);
    }

    //mouth
    fill(242,142,142);
    stroke(0);
    strokeWeight(5);
    rect(this.x + 150, this.y + 150, 200, 75, 10);
    
    //draw flag
    fill(255,0,0);
    noStroke();
    triangle(this.x + 150, this.y - 100, this.x + 150, this.y - 200, this.x + 50, this.y - 150);  
    pop();
  }
  //when checkpoint is idle
  drawSleep(){
    stroke(0);
    strokeWeight(5)
    line(this.x + 75, this.y + 75, this.x + 125, this.y + 75);
    line(this.x + 175, this.y + 75, this.x + 225, this.y + 75);
  }   
}