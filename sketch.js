var zombies = [] , zombieImg, player, edges;
var bullet;
var gameState = "intro";
function preload(){
  zombieImg = loadImage("zombie.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  player = createSprite(50,200,20,50);

  spawnZombies();
 
}
function draw(){
  
  background(220);

  if(gameState === "intro"){
    textSize(40);
    text("storyline",100,100);
    if(keyDown("s")){
      gameState = "play";
    }
  }
  
  else if(gameState === "play"){

    edges = createEdgeSprites();
    if(keyDown(UP_ARROW)){
      player.y -= 5;
    }
    if(keyDown(DOWN_ARROW)){
      player.y += 5;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x += 5;
    }
    if(keyDown(LEFT_ARROW)){
      player.x -= 5;
    }
   
    for(var i = 0; i < 5; i++) {
      zombies[i].bounceOff(edges);
    }

    for(var i = 0; i < 5; i++) {
      if(player.isTouching(zombies[i])){
        gameState = "lose";
      }
      
    }
    drawSprites();
  }

  else if(gameState === "lose"){
    textSize(40);
    text("Better luck next time!!!!",100,100);
  }

  else {

  }
  
  
}

function spawnZombies() {
  var x, y, vx, vy;
  for(var i = 0; i < 5; i++) {
      x = Math.round(random(0,width));
      y = Math.round(random(0, height));
      zombies.push( createSprite(x,y,50,50));
      vx = Math.round(random(-2,2));
      vy = Math.round(random(-2,2));
      zombies[i].addImage(zombieImg);
      zombies[i].scale = 0.5;
      zombies[i].velocityX = vx;
      zombies[i].velocityY = vy;
  }
}

function mouseClicked() {
  console.log("hit");
  for(var i = 0; i < 5; i++) {
    if((mouseX >= zombies[i].x-25 && mouseX <= zombies[i].x+25) && (mouseY >= zombies[i].y-25 && mouseY <= zombies[i].y+25)){
      zombies[i].shapeColor = "red";
    }
  }
  bullet = createSprite(player.x,player.y,20,20);
  bullet.setSpeed(8,90);
}
