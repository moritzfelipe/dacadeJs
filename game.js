// Variables
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const backgroundImage = new Image()
const ground = 430
const gravity = 4
let distance = 0
let username

let car = {
  image: new Image(),
  width: 60,
  height: 60,
  speed: 3
}

let cars = []
cars[0] = {
  x: canvas.width,
  y: ground - car.height
}

let runner = {
  image: new Image(),
  width: 60,
  height: 60,
  coordinates: {
    x: 10,
    y: ground - 60
  }
}

const collision = {
  image: new Image(),
  sound: new Audio()
}

let jump = {
  state: 'none',
  sound: new Audio()
}

// Image sources
backgroundImage.src = "images/background.png"
runner.image.src = "images/runner_ani.gif"
car.image.src = "images/car.png"
collision.image.src = "images/collision.png"

// Sound sources
jump.sound.src = "sounds/jump_08.mp3"
collision.sound.src = "sounds/qubodup-crash.mp3"

// Jump functionality
function jumpUp(){
  if (jump.state == 'none'){
    jump.state = 'up'
    jump.sound.play()
  }
}
canvas.addEventListener("click", jumpUp)

function draw(){
  context.drawImage(backgroundImage, 0, 0)
  const randomGapDistance = Math.floor(Math.random() * 100) + 80

  // Cars
  for(let i = 0; i < cars.length; i++){
    // Move car
    cars[i].x = cars[i].x - car.speed
    // Create new car
    if( cars[i].x < 180 && cars.length === 1){
      cars.push({
        x: canvas.width + randomGapDistance,
        y: ground - car.height
      })
    }
    // Delete car when it is out of the screen
    if(cars[i].x < - car.width){
      setTimeout( function() {
        cars.shift()
      }, 0);
    }
    context.drawImage(car.image, cars[i].x, cars[i].y, car.width, car.height)
    
    // Collision
    if (runner.coordinates.x + runner.width/2 >= cars[i].x
      && runner.coordinates.x <= cars[i].x + car.width
      && runner.coordinates.y + runner.height > ground - car.height) {
        context.drawImage(collision.image, cars[i].x, cars[i].y, car.width, car.height)
        distance = 0
        collision.sound.play()
    }
    distance += 0.05
  }

  // Animate jump
  if (jump.state === 'up') {
    runner.coordinates.y -= gravity
  }
  if (jump.state === 'down'){
    runner.coordinates.y += gravity
  }
  if (jump.state === 'up' && runner.coordinates.y < 220) {
    jump.state = 'down'
  }
  if (jump.state === 'down' && runner.coordinates.y === ground - runner.height) {
    jump.state = 'none'
  }

  context.drawImage(runner.image, runner.coordinates.x, runner.coordinates.y, runner.height, runner.width)

  // Display distance
  context.fillStyle = "#fff"
  context.font = "24px helvetica"
  context.fillText(`${username}: ${Math.floor(distance)}m`, 20, 40)
  
  requestAnimationFrame(draw)
}

function startGame() {
  event.preventDefault()
  username = document.getElementById("username").value
  document.getElementById("container-canvas").style.display = "block"
  document.getElementById("userNameForm").style.display = "none"
  draw()
}
