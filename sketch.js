var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var ground, groundImg;
var player,playerImg;
var gameOver,gameOverImg;
var select_meteor;
var meteorGrey, meteorGreyImg, meteorGreyGroup;
var meteorGrey2, meteorGrey2Img,meteorGrey2Group;
var meteorGrey3, meteorGrey3Img,meteorGrey3Group;
var meteorGrey4, meteorGrey4Img,meteorGrey4Group;
var laser,laserImg,laserGroup;
var explosionSound;
var laser5Sound;
function preload(){
  groundImg=loadImage("background.png");
  playerImg=loadImage("player.png");
  gameOverImg=loadImage("gameOver.png");
  meteorGreyImg=loadImage("meteorGrey_med1.png");
  meteorGrey2Img=loadImage("meteorGrey_big2.png");
  meteorGrey3Img=loadImage("meteorGrey_big3.png");
  meteorGrey4Img=loadImage("meteorGrey_big4.png");
  laserImg=loadImage("laser1.png");
  explosionSound=loadSound("explosion.wav");
  laser5Sound=loadSound("laser5.ogg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  score=0;
  
  ground=createSprite(width/2,height/2);
  ground.addImage("ground",groundImg);
  ground.scale=2;
  
  player=createSprite(width/2,height-50);
  player.addImage("player",playerImg);
  player.setCollider("rectangle",0,20,100,100);
  
  gameOver=createSprite(width/2,height/2);
  gameOver.addImage("gameOver",gameOverImg);
  
  
  laserGroup=new Group();
  meteorGreyGroup=new Group();
  meteorGrey2Group=new Group();
  meteorGrey3Group=new Group();
  meteorGrey4Group=new Group();
}

function draw() {
  background("lightblue");
  if (gameState == PLAY){
  gameOver.visible = false;
  if (ground.y < 100){
      ground.y = ground.height/2;
    }
  ground.velocityY = -(2 + score/100);
  if (keyDown("SPACE")) {
    createLasers();
  }
  player_x_y();
  createmeteor();
  Score();
  }
  if (gameState == END){
      gameOver.visible = true;
      ground.velocityY = 0;
      meteorGreyGroup.setLifetimeEach(-1);
      meteorGrey2Group.setLifetimeEach(-1);
      meteorGrey3Group.setLifetimeEach(-1);
      meteorGrey4Group.setLifetimeEach(-1);
      laserGroup.setLifetimeEach(-1);
      meteorGreyGroup.setVelocityYEach(0);
      meteorGrey2Group.setVelocityYEach(0);
      meteorGrey3Group.setVelocityYEach(0);
      meteorGrey4Group.setVelocityYEach(0);
      laserGroup.setVelocityYEach(0);
      score=0;
      if (keyDown("SPACE")&&gameState==END) {
        gameState = PLAY;
        meteorGreyGroup.destroyEach();
        meteorGrey2Group.destroyEach();
        meteorGrey3Group.destroyEach();
        meteorGrey4Group.destroyEach();
        laserGroup.destroyEach();
        }
      }
  drawSprites();
  textSize(22);
  fill(255);
  text("Score: "+ score+"  (¬‿¬)", width/6,height/10);
}
function player_x_y(){
  if (keyDown("left_arrow")) {
    player.x=player.x-5.5;
  }
  if (keyDown("right_arrow")) {
    player.x=player.x+5.5;
  }
}
function createLasers(){
  laser = createSprite(width/2,height-60);
  laser.addImage(laserImg);
  laser.y=height-50;
  laser.x=player.x;
  laser.velocityY = -4;
  laser.lifetime = 130;
  laserGroup.add(laser);
  player.depth = laser.depth;
  player.depth = player.depth + 1;
  laser5Sound.play();
}
function createmeteor(){
  if (frameCount % 120 === 0){
    select_meteor = Math.round(random(1,4));
    if (select_meteor == 1) {
    meteorGrey=createSprite(width,height-500);
    meteorGrey.addImage("meteorGrey",meteorGreyImg);
    meteorGrey.x=Math.round(random(20,600));
    meteorGrey.velocityY = +(2 + score/100);
    meteorGrey.lifetime = 850;
    meteorGreyGroup.add(meteorGrey);
    player.depth = meteorGrey.depth;
    player.depth = player.depth + 1;
    }
    if (select_meteor == 2) {
    meteorGrey2=createSprite(width,height-500);
    meteorGrey2.addImage
    ("meteorGrey2",meteorGrey2Img);
    meteorGrey2.x=Math.round(random(20,600));
    meteorGrey2.velocityY = +(2 + score/100);
    meteorGrey2.scale=0.5;
    meteorGrey2.lifetime = 850;
    meteorGrey2Group.add(meteorGrey2);
    player.depth = meteorGrey2.depth;
    player.depth = player.depth + 1;
    }
    if (select_meteor == 3) {
    meteorGrey3=createSprite(width,height-500);
    meteorGrey3.addImage
    ("meteorGrey3",meteorGrey3Img);
    meteorGrey3.x=Math.round(random(20,600));
    meteorGrey3.velocityY = +(2 + score/100);
    meteorGrey3.scale=0.5;
    meteorGrey3.lifetime = 850;
    meteorGrey3Group.add(meteorGrey3);
    player.depth = meteorGrey3.depth;
    player.depth = player.depth + 1;
    }
    if (select_meteor == 4) {
    meteorGrey4=createSprite(width,height-500);
    meteorGrey4.addImage
    ("meteorGrey4",meteorGrey4Img);
    meteorGrey4.x=Math.round(random(20,600));
    meteorGrey4.velocityY = +(2 + score/100);
    meteorGrey4.scale=0.5;
    meteorGrey4.lifetime = 850;
    meteorGrey4Group.add(meteorGrey4);
    player.depth = meteorGrey4.depth;
    player.depth = player.depth + 1;
    }
  }
}
function Score(){
  if (meteorGreyGroup.isTouching(laserGroup)){
      meteorGreyGroup.destroyEach();
      laserGroup.destroyEach();
      score=score+50;
      explosionSound.play();
      }
  if (meteorGrey2Group.isTouching(laserGroup)){
      meteorGrey2Group.destroyEach();
      laserGroup.destroyEach();
      score=score+100;
      explosionSound.play();
      }
  if (meteorGrey3Group.isTouching(laserGroup)){
      meteorGrey3Group.destroyEach();
      laserGroup.destroyEach();
      score=score+150;
      explosionSound.play();
      }
  if (meteorGrey4Group.isTouching(laserGroup)){
      meteorGrey4Group.destroyEach();
      laserGroup.destroyEach();
      score=score+25;
      explosionSound.play();
      }
  if (meteorGreyGroup.isTouching(player)||
      meteorGrey2Group.isTouching(player)||
      meteorGrey3Group.isTouching(player)||
      meteorGrey4Group.isTouching(player)){
      gameState = END;
      explosionSound.play();
      }
}