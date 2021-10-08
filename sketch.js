var gameState = "play"
var play = 1
var end = 0
var sus,red
var tiky,cloud,impostorgroup,cloudgroup,ground,invisground,cucumber;
var tikyimg,susimg,cloudimg,redimg,groundimg,cucumberimg,hankimg;
var startsound,jumpsound,deathsound;
var score = 0;


function preload(){

  tikyimg = loadImage("tiky.jpg");
  susimg = loadImage("JermaSus.jpg");
  cloudimg = loadImage("cloud.png");
  groundimg = loadImage("ground2.png");
  redimg = loadImage("Impostor.png");
  cucumberimg = loadImage("cucumber.jpg");
  hankimg = loadImage("hank.png");



  startsound = loadSound("start.mp3");
  jumpsound = loadSound("jump.mp3");
  deathsound = loadSound("death.mp3");


}


function setup() {
  createCanvas(windowWidth,windowHeight);

  tiky = createSprite(50,height-70,20,50);
  tiky.addImage("runtiky",tikyimg);
  tiky.addAnimation("tikyded",cucumberimg);
  tiky.scale = 0.3;
  tiky.setCollider("rectangle",10,1)
  tiky.debug = true;

  ground = createSprite(width/2,height-30,width,20);
  ground.addImage(groundimg);
  ground.x = ground.width/2;

  invisground = createSprite(width/2,height-20,width,10);
  invisground.visible = false;

  cloudgroup = createGroup();
  impostorgroup = createGroup();

  score = 0;

  
 
}

function draw() {

  background("white");

  text("Score: " + score,50,50);
  

  if(gameState==="play"){

    console.log("go tiky")
    
    ground.velocityX = -(6+ 3*score/100);

    score = score + Math.round(frameRate()/60);

    tiky.changeAnimation("runtiky",tikyimg)

    
    

    if(ground.x < 0){

      ground.x = ground.width/2;
    }

    if(touches.length > 0 || keyDown("space") && tiky.y>=height-470){

      jumpsound.play();
      tiky.velocityY = -18;

      touches = [];
      
    }

    tiky.velocityY = tiky.velocityY +0.8;
    spawnimposter();
    spawnClouds();

    if(impostorgroup.isTouching(tiky) || cloudgroup.isTouching(tiky)){

      gameState = "end";
      deathsound.play();
    }

   
  }

  else if(gameState==="end"){

    console.log("YOUR SO SUSSY I KNOW YOU TOOK MY FORTNITE CARD")
    ground.velocityX = 0;
    tiky.velocityY = 0;

    tiky.changeAnimation("tikyded",cucumberimg);

    

    cloudgroup.setLifetimeEach(-1);
    impostorgroup.setLifetimeEach(-1);
    cloudgroup.setVelocityXEach(0);
    impostorgroup.setVelocityXEach(0);

    if(touches.length > 0 || keyDown("up")){

      reset();

      touches = [];
    }
  }


  tiky.collide(invisground);

  
  drawSprites();

}

function spawnimposter(){

  if(frameCount % 120 === 0){

    var obstacle = createSprite(2000,height-60,10,40);
    obstacle.velocityX = -(6+ 3*score/100);

    var rand = Math.round(random(1,3));
    var big = Math.random(random(0,1));
    switch(rand){

      case 1: obstacle.addImage(susimg);
      break;
      case 2: obstacle.addImage(redimg);
      break;
      case 3: obstacle.addImage(hankimg);
      break;

      default: break;
    }

    obstacle.scale = big;
    obstacle.lifetime = 800;
    obstacle.setCollider("circle",20,20,200)
    obstacle.debug = true
    tiky.depth = obstacle.depth
    tiky.depth += 1
    

    impostorgroup.add(obstacle);
  }



}

function spawnClouds(){

  if(frameCount % 170 === 0){

    cloud = createSprite(width+30,300,40,10);
    cloud.y = Math.round(random(50,height-500));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -5;
    cloud.lifetime = 1000;
    cloud.setCollider("circle",1,1,100)
    cloud.debug = true;
    cloud.depth = tiky.depth;
    tiky.depth = tiky.depth + 1;
    cloudgroup.add(cloud);
  }
}

function reset(){

  gameState = "play";
  impostorgroup.destroyEach();
  cloudgroup.destroyEach();
  startsound.play();
  score = 0;
}

