var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImg
var ob1, ob2, ob3, ob4, ob5, ob6
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count = 0
//var gameOver 
//var restart 
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImg = loadImage("cloud.png")
  groundImage = loadImage("ground2.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle4.png")
  ob6 = loadImage("obstacle5.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  ObstaclesGroup =  new Group();
  CloudsGroup =  new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  text("score: "+count,400, 50);
 
  trex.collide(invisibleGround);
  

  if(gameState === PLAY){
    //move the ground
    
    //scoring
    count = count + Math.round(frameRate()/60);
    ground.velocityX = -(6 + 3*count/100);
    if (count>0 && count%100 === 0){
     // playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 150){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    //gameOver.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  
  

  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    ObstaclesGroup.add(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   console.log(rand)
    switch(rand){
      case 1: obstacle.addAnimation("ob1",ob1);
        break;
      case 2: obstacle.addAnimation("ob2",ob2);
        break;
      case 3: obstacle.addAnimation("ob3",ob3);
        break;  
      case 4: obstacle.addAnimation("ob4",ob4);
        break;
      case 5: obstacle.addAnimation("ob5",ob5);
        break; 
      case 6: obstacle.addAnimation("ob6",ob6);
        break;
      default:console.log("unexpected value") 
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,120,40,10);
    cloud.y = random(80,100);
    cloud.addAnimation("cloud", cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud)
  }
  
}