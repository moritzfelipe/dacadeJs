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
const carWidth = 60
const carHeigth = carWidth
const carSpeed = 3

const runnerWidth = 60
const runnerHeight = runnerWidth
const runnerXCoordinate = 10
let runnerYCoordinate = ground - runnerHeight

const gravity = 4
let distance = 0
let username

// Car coordinates
const carXCoordinates = []
carXCoordinates[0] = canvas.width

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
  for(let i = 0; i < carXCoordinates.length; i++){
    // Move car
    carXCoordinates[i] = carXCoordinates[i] - carSpeed
    // Create new car
    if( carXCoordinates[i] < 180 && carXCoordinates.length <= 1){
      carXCoordinates.push(canvas.width + randomGapDistance)
    }
    // Delete car when it is out of the screen
    if(carXCoordinates[i] < - carWidth){
      setTimeout( function() {
        carXCoordinates.shift()
      }, 0);
    }
    context.drawImage(carImg, carXCoordinates[i], ground-carHeigth, carWidth, carHeigth)
    
    // Collision
    if (runnerXCoordinate + runnerWidth/2 >= carXCoordinates[i]
      && runnerXCoordinate <= carXCoordinates[i] + carWidth
      && runnerYCoordinate + runnerHeight > ground - carHeigth) {
        context.drawImage(collisionImg, carXCoordinates[i], ground-carHeigth, carWidth, carHeigth)
        distance = 0
        crashSnd.play()
    }
    distance += 0.05
  }

  // Animate jump
  if (jumpCondition === 'up') {
    runnerYCoordinate -= gravity
  }
  if (jumpCondition === 'down'){
    runnerYCoordinate += gravity
  }
  if (jumpCondition === 'up' && runnerYCoordinate < 220) {
    jumpCondition = 'down'
  }
  if (jumpCondition === 'down' && runnerYCoordinate === ground - runnerHeight) {
    jumpCondition = 'none'
  }

  context.drawImage(runnerImg, runnerXCoordinate, runnerYCoordinate, runnerHeight, runnerWidth)

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

