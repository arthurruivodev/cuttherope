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
var ground
var rope
var fruit_con
var bgImg
var coelhoImg
var coelho
function preload(){
  bgImg = loadImage("./assts/bg.png")
  fruitImg  = loadImage("./assts/candy.png")
  coelhoImg = loadImage("./assts/per1.png")


  bk_snog = loadSound("assts/sound1.mp3")
  sad_sound = loadSound('assts/sad.wav')
  cut_sound = loadSound('assts/rope_cut.mp3')
  eating_sound = loadSound('assts/eating_sound.mp3')
  air = loadSound('assts/air.wav')
  
 blink = loadAnimation('assts/per1.png')
 eat = loadAnimation('assts/bocaaber.png', 'assts/per1.png') 

sad = loadAnimation('assts/per2.png')
eat.looping = false
}


function setup() 
{
  createCanvas(500,700);
  imageMode(CENTER)
  coelho = createSprite(250,610,40,40)
  coelho.addImage(coelhoImg)
  coelho.scale =0.3

coelho.addAnimation('normal',blink)
coelho.addAnimation('comendo',eat)
coelho.addAnimation('triste',sad)
coelho.changeAnimation('normal')









  frameRate(80);
  engine = Engine.create();
  world = engine.world;
 ground = new Ground(200,690,600,20)
 rope = new Rope(8,{x:255,y:5})
 rope2 = new Rope(7,{x:45,y:30})
 rope3 = new Rope(10,{x:456,y:200})



 var fruitOptions ={
  density:0.001

 }
  fruit = Bodies.circle(300,300,15,fruitOptions)
  Composite.add(rope.body, fruit)


  fruit_con= new Link(rope,fruit)
  fruit_con_2= new Link(rope2,fruit)
  fruit_con_3= new Link(rope3,fruit)
//butom1
  button = createImg("assts/tes.png")
  button.position(30, 30)
button.size(50, 50)
button.mouseClicked(drop2)
//butom2
button2 = createImg("assts/tes.png")
button2.position(230, 5)
button2.size(50, 50)
button2.mouseClicked(drop)

//butom3
button3 = createImg("assts/tes.png")
button3.position(410,190 )
button3.size(50, 50)
button3.mouseClicked(drop3)

//butom
mutebtm = createImg("assts/mute.png")
mutebtm .position(450, 20)
mutebtm .size(50, 50)
mutebtm .mouseClicked(mute)






  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{

  background(51);
image(bgImg,  width/2, height/2 ,500, 700)
  
  Engine.update(engine);
ground.show()
rope.show()
rope2.show()
rope3.show()

if(fruit!=null){
  image(fruitImg, fruit.position.x, fruit.position.y,60,60)  
}

drawSprites()

 if (collide(fruit, coelho) == true) {
  coelho.changeAnimation('comendo')
  eating_sound.play()
 }
  if (fruit != null && fruit.position.y >= 650) {
    coelho.changeAnimation('triste')
    bk_song.stop()
    sad_sound.play()
    fruit = null
  }


}

  function drop(){
    cut_sound.play()
  rope.break()
    fruit_con.corta()
    fruit_con = null
  }

  function drop2(){
    cut_sound.play()
  rope2.break()
    fruit_con_2.corta()
    fruit_con_2 = null
  }

  function drop3(){
    cut_sound.play()
  rope3.break()
    fruit_con_3.corta()
    fruit_con_3 = null
  }

function mute (){
  if (bk_song.isPLaying()){
    bk_song.stop()
    }else{
      bk_song.play()
    }

  }

function collide(body, sprite){
if ( body != null) {
  var d = dist(
  body.position.x,
  body.position.y,
    sprite.position.x,
    sprite.position.y
  )
  if (d <= 80) {
    World.remove(engine.world, fruit)
     fruit = null
    return true
  }else{
    
    return false
  }
}
}