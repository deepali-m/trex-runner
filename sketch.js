var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloud1,obstacle,ob1,ob2,ob3,ob4,ob5,ob6;
var PLAY;
var END;
var gameState= PLAY;
var cloudgrp;
var obstaclegrp;
var score=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloud1=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  obstaclegrp=new Group();
  cloudgrp=new Group();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}

function draw() {
  background("grey");
  fill("white");
  text("Score= "+score,500,50)
  trex.collide(invisibleGround);
  if(gameState===PLAY){
    if(obstaclegrp.isTouching(trex)){
      gameState=END;
    }
    score=score+Math.round(getFrameRate()/60);

  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  drawSprites();
  clouds();
  obstacles();
  }
  else if(gameState===END){
        gameOver.visible = true;
    restart.visible = true;
    
  
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgrp.setVelocityXEach(0);
    cloudsgrp.setVelocityXEach(0);
    
    
    trex.addAnimation("trex_collided");
    
    
    obstaclegrp.setLifetimeEach(-1);
    cloudgrp.setLifetimeEach(-1);
    
  }
}
function clouds(){
  
  if(frameCount % 60==0){
    var cloud = createSprite(600,random(10,100),20,10);
    cloud.velocityX= -5;
    cloud.addImage(cloud1);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1 ;
  //console.log(trex.depth);
  //console.log(cloud.depth);
  cloud.lifetime=134;
    cloudgrp.add(cloud);
  }
}
function obstacles(){
    if (frameCount % 60==0){
     var obstacle = createSprite(600,170,10,20);
     obstacle.velocityX= -5;
     var ob = Math.round(random(1,6));
      switch(ob){
          case 1:obstacle.addImage(ob1);
          break;
          case 2:obstacle.addImage(ob2);
          break;
          case 3:obstacle.addImage(ob3);
          break;
          case 4:obstacle.addImage(ob4);
          break;
          case 5:obstacle.addImage(ob5);
          break;
          case 6:obstacle.addImage(ob6);
          break;
          default:break;
      }
     obstacle.scale=1/2;
    obstacle.lifetime=134;
      obstaclegrp.add (obstacle);
    
    
    }
  }