const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var batAnimation,bat;
var drops=[]
var maxDrops=100


var engine, world;

var rand;

var thunder, thunder1,thunder2,thunder3,thunder4;


var thunderCreatedFrame=0;
function preload(){

    thunder1 = loadImage("image/thunderbolt/1.png");
    thunder2 = loadImage("image/thunderbolt/2.png");
    thunder3 = loadImage("image/thunderbolt/3.png");
    thunder4 = loadImage("image/thunderbolt/4.png");

    batAnimation = loadAnimation("image/bat/bat1.png","image/bat/bat2.png","image/bat/bat3.png",
    "image/bat/bat4.png","image/bat/bat5.png","image/bat/bat6.png",
    "image/bat/bat7.png","image/bat/bat8.png","image/bat/bat9.png",
    "image/bat/bat10.png","image/bat/bat11.png","image/bat/bat12.png"); 

}

function setup(){
    createCanvas(400,900);

    engine = Engine.create();
	world = engine.world;

    umbrella = new Umbrella(200,500);


//creating drops
if(frameCount % 150 === 0){

    for(var i=0; i<maxDrops; i++){
        drops.push(new createDrop(random(0,400), random(0,400)));
    }

}
Engine.run(engine);

    
}

function draw(){
    Engine.update(engine);
    background(0); 

    //creating thunder
    rand = Math.round(random(1,4));
    if(frameCount%80===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(10,370), random(10,30), 10, 10);
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.3,0.6)
    }
    bat= createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addAnimation("moving_bat",batAnimation);
    bat.visible = false;
    if(frameCount % 100 === 0){
       bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
        
       
    }
    

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }

    umbrella.display();

    for(var i = 0; i<maxDrops; i++){
        drops[i].showDrop();
        drops[i].updateY()
        
    }
   

    drawSprites();
}   
