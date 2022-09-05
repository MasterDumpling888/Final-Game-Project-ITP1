/*
    Adventures of Master Dumpling by Danica

 I created all image assets (i.e., game character, enemies) using Figma.

 I downloaded all audio assets from Mixkit.
*/

//declare global variables

/*  variables for parallax scrolling  */
const damp = 0.95;
let gameScreenA, gameScreenB, gameScreenC;
let camA, camB, camC;

/*  variables for tile size, life, score  */
const blockSize = 64; //for player and enemies
let lives;
let orbs;

/*  declare arrays for collision detection  */
let platformList
let groundList
let enemyList

function preload() {
  /*-----load images-----*/
  player_img = loadImage("./assets/images/dumpling.png");
  sumo_img = loadImage("./assets/images/sumo.png");
  ninja_img = loadImage("./assets/images/ninja.png");

  temp = loadJSON("./lib/template.json");

  /*-----sounds-----*/
  //set general audio settings
  soundFormats('mp3', 'wav');
  outputVolume(0.5);
  
  //load sounds
  jumpSound = loadSound("./assets/sounds/jump.wav");
  collectingSound = loadSound("./assets/sounds/collect orb.wav");
  walkingSound = loadSound("./assets/sounds/walking.wav");
  enemySound = loadSound("./assets/sounds/battle.wav");
  restartSound = loadSound("./assets/sounds/restartGame.wav");
  gameoverSound = loadSound("./assets/sounds/dead.wav");
  bgSound = loadSound("./assets/sounds/bgm.mp3");
  
  //set specific audio settings
  walkingSound.setVolume(0.5);
  bgSound.setVolume(0.1);
  bgSound.setLoop(true);
}

function setup() {
  bgSound.play(); //background music
  createCanvas(720, 480);
  lives = 3;
  orbs = 3;
  initGame();
}

function draw() {
  if (lives > 0) {
    startGame(); //will draw game
    finishGame(); //when game is completed
  } else if (lives <= 0) {
    gameoverState(); //when gameover
  }
}

function initGame() {
  //initialise variables for 2D camera
  gameScreenA = createVector(width / 4, height - 180);
  gameScreenB = createVector(width / 4, height - 180);
  gameScreenC = createVector(width / 4, height - 180);

  camA = createVector(0, 0);
  camB = createVector(0, 0);
  camC = createVector(0, 0);

  //initialise global classes
  worldMap = new Map(temp, 4000, 300);
  checkpoint = new Checkpoint(2850, -200, 300);
  player = new Player();

  //initialise global arrays
  platformList = [];
  orbList = [];
  groundList = [];
  enemyList = [];

  //retrieve interactive objects and push to arrays
  getGround(temp.decals[3], groundList);
  getEnemies(temp.activeObj[0], enemyList);
  getPlatforms(temp.activeObj[1], platformList);
  getOrb(temp.activeObj[2], orbList);
};

// draw game
function startGame() {
  background(176, 206, 251); //draw sky

  /*-----Parallax Scrolling-----*/
  //FOREMOST LAYER
  const n_camA = createVector(
    player.pos.x - gameScreenA.x,
    player.pos.y - gameScreenA.y
  );

  camA = createVector(
    (n_camA.x * (1 - damp) + camA.x * damp),
    (n_camA.y * (1 - damp) + camA.y * damp)
  );

  //MID LAYER
  const n_camB = createVector(
    player.pos.x - gameScreenB.x,
    player.pos.y - gameScreenB.y
  )

  camB = createVector(
    (n_camA.x * (0.96 - damp) + camB.x * damp),
    (n_camB.y * (1 - damp) + camB.y * damp)
  );

  //BACKMOST LAYER
  const n_camC = createVector(
    (player.pos.x - gameScreenC.x),
    (player.pos.y - gameScreenC.y)
  );

  camC = createVector(
    (n_camA.x * (0.9625 - damp) + camC.x * damp),
    (n_camC.y * (1 - damp) + camC.y * damp)
  );

  //draw background - BACKMOST LAYER
  push();
  translate(-camC.x, -camC.y);
  worldMap.drawBackmostLayer();
  pop();
  
  //draw middle ground - MID LAYER
  push();
  translate(-camB.x, -camB.y);
  worldMap.drawMiddleLayer();
  pop();

  //draw objects in front layer of scene - FOREMOST LAYER
  push();
  translate(-camA.x, -camA.y);
  worldMap.drawForemostLayer();
  checkpoint.draw();
  for (ground of groundList) {
    ground.draw();
  }

  for (platform of platformList) {
    platform.draw();
  }

  for (enemy of enemyList) {
    enemy.draw();
  }

  for (orb of orbList) {
    orb.draw();
  }
  player.draw();
  player.update();
  pop();

  // draw orb counter & lives
  worldMap.drawPCounter(640, 30, 128, 32);
  for (let i = 1; i <= lives; i++) {
    worldMap.drawLives(40 * i, 30);
  }
}

// game finished screen
function finishGame() {
  if (orbList.length == 0) {
    if (collisionDetection(player, checkpoint)) {
      noStroke();
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      textFont('Trebuchet MS');
      text("CONGRATS! YOU'VE FINISHED THE GAME!", width / 2, height / 2);
      textSize(20);
      text("Press space twice to play again!", width / 2, height / 2 + 80);
      return true;
    }
  }
  return false;
}

// gameover screen
function gameoverState() {
  background(20);
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  textFont('Trebuchet MS');
  text("OH NO! GAME OVER!", width / 2, height / 2);
  textSize(12);
  text("Press space to play again!", width / 2, height / 2 + 80);
}

// key functions
function keyPressed() {
  if (key == 'a' || keyCode == 37) {
    if (lives > 0) {
      player.isLeft = true;
      walkingSound.play();
    }
  }

  if (key == 'd' || keyCode == 39) {
    if (lives > 0) {
      player.isRight = true;
      walkingSound.play();
    }
  }

  if (key == 'w' || key == " " || keyCode == 38) {
    if (player.isContact && lives > 0) {
      player.changeImg = 10;
      player.isContact = false;
      player.vel.y = -35;
    } else if (lives <= 0) {
      gameoverSound.play();
      lives = 3;
      initGame();
    } else if (finishGame()) {
      restartSound.play();
      initGame();
    }
  }
}

function keyReleased() {
  if (key == 'a' || keyCode == 37) {
    player.changeImg = 0;
    player.isLeft = false;
  }
  if (key == 'd' || keyCode == 39) {
    player.changeImg = 0;
    player.isRight = false;
  }
  if(key == 'w' || key == " " || keyCode == 38){
    player.changeImg = 0;
  }
}