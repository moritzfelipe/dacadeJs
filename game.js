const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Images
const backgroundImg = new Image()
backgroundImg.src = "images/background.png"
const carImg = new Image()
carImg.src = "images/car.png"
const runnerImg = new Image()
runnerImg.src = "images/runner_ani.gif"
const collisionImg = new Image()
collisionImg.src = "images/collision.png"

// Sounds
const jumpSnd = new Audio()
jumpSnd.src = "sounds/jump_08.mp3"
const crashSnd = new Audio()
crashSnd.src = "sounds/qubodup-crash.mp3"

// Variables
const ground = 430
let car = {
  width: 60,
  height: 60,
  speed: 3,
  coordinates: {
    x: [],
    y: ''
  }
}

let runner = {
  width: 60,
  height: 60,
  coordinates: {
    x: 10,
    y: 0
  }
}
runner.coordinates.y = ground -  runner.height

const gravity = 4
let distance = 0
let username

// Car coordinates
car.coordinates.x[0] = canvas.width

// Jump functionality
let jumpCondition = 'none'

function jumpUp(){
  if (jumpCondition == 'none'){
    jumpCondition = 'up'
    jumpSnd.play()
  }
}
canvas.addEventListener("click", jumpUp)

function draw(){
  context.drawImage(backgroundImg, 0, 0)
  const randomGapDistance = Math.floor(Math.random() * 100) + 80

  // Cars
  for(let i = 0; i < car.coordinates.x.length; i++){
    // Move car
    car.coordinates.x[i] = car.coordinates.x[i] - car.speed
    // Create new car
    if( car.coordinates.x[i] < 180 && car.coordinates.x.length <= 1){
      car.coordinates.x.push(canvas.width + randomGapDistance)
    }
    // Delete car when it is out of the screen
    if(car.coordinates.x[i] < - car.width){
      setTimeout( function() {
        car.coordinates.x.shift()
      }, 0);
    }
    context.drawImage(carImg, car.coordinates.x[i], ground-car.height, car.width, car.height)
    
    // Collision
    if (runner.coordinates.x + runner.width/2 >= car.coordinates.x[i]
      && runner.coordinates.x <= car.coordinates.x[i] + car.width
      && runner.coordinates.y + runner.height > ground - car.height) {
        context.drawImage(collisionImg, car.coordinates.x[i], ground-car.height, car.width, car.height)
        distance = 0
        crashSnd.play()
    }
    distance += 0.05
  }

  // Animate jump
  if (jumpCondition === 'up') {
    runner.coordinates.y -= gravity
  }
  if (jumpCondition === 'down'){
    runner.coordinates.y += gravity
  }
  if (jumpCondition === 'up' && runner.coordinates.y < 220) {
    jumpCondition = 'down'
  }
  if (jumpCondition === 'down' && runner.coordinates.y === ground - runner.height) {
    jumpCondition = 'none'
  }

  context.drawImage(runnerImg, runner.coordinates.x, runner.coordinates.y, runner.height, runner.width)

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

