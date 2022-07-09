const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var skeleton, deadskeleton;
var dropButton;
var backgroundImage;

var spike;
var collided = false;
function preload() {
  //skeleton = loadImage("./assets/.png");
  //deadskeleton = loadImage("./assets/.png");

  //backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    skeleton.positionY()
  }

  skeleton = createSprite(width / 2, height - 100, 50, 50);
  
  spike = createSprite()

  spike.scale = 0.1;
  spike.velocityX = 10;

  dropButton = createButton("");
  dropButton.position(width - 200, height / 2 - 50);
  dropButton.class("breakbutton");
  dropButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  for (var spike of spikes) {
    spike.show();
    var pos = spike.body.position;
    
    var distance = dist(skeleton.position.x, skeleton.position.y, pos.x, pos.y);

    if (distance <= 50) {
      skeleton.velocityX= 0;
      Matter.Body.setVelocity(spike.body, { x: 10, y: -10 });
      skeleton.changeImage("sad");
      collided = true;
    }


  }

  if (spike.position.x >= width - 300 && !collided) {
    spike.velocityX = -10;
  }

  if (spike.position.x <= 300 && !collided) {
    spike.velocityX = 10;
  }

  drawSprites();
}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}


