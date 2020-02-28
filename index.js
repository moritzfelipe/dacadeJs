let username
let environment
let crash
let car
let runner

// game components
class Environment {
	constructor(locX, locY, gravity, image) {
		this._locX = locX
		this._locY = locY
		this._gravity = gravity
		this._image = image
	}
	draw(context) {
		context.drawImage(this._image, this._locX, this._locY)
	}
	get gravity() {
		return this._gravity
	}
}

class Runner {
	constructor(sizeX, sizeY, locX, locY, image, jumpEffect) {
		this._sizeX = sizeX
		this._sizeY = sizeY
		this._locX = locX
		this._locY = locY
		this.initialLocX = locX
		this.initialLocY = locY
		this._image = image
		this._jumpEffect = jumpEffect
	}
	draw(context) {
		context.drawImage(
			this._image,
			this._locX,
			this._locY,
			this._sizeY,
			this._sizeX
		)
	}
	jump() {}
	playSound() {
		this._jumpEffect.play()
	}
	checkPosition() {}
	get locX() {
		return this._locX
	}
	get locY() {
		return this._locY
	}
	get sizeX() {
		return this._sizeX
	}
}
class Car {
	constructor(sizeX, sizeY, locX, locY, speed, image) {
		this._sizeX = sizeX
		this._sizeY = sizeY
		this._locX = locX
		this._locY = locY
		this.initialLocX = locX
		this.initialLocY = locY
		this._speed = speed
		this._image = image
		this.collision = false
	}
	draw(context) {
		context.drawImage(
			this._image,
			this._locX,
			this._locY,
			this._sizeX,
			this._sizeY
		)
	}
	move() {
		this._locX -= this._speed
	}
	checkBorders() {
		if (this._locX <= -this._sizeX) {
			this.collision = false
			this._locX = this.initialLocX
		}
	}
	get locX() {
		return this._locX
	}
	get locY() {
		return this._locY
	}
}
class Crash {
	constructor(image, sound) {
		this._image = image
		this._sound = sound
	}
	draw(context, locX, locY) {
		context.drawImage(this._image, locX, locY, 30, 30)
	}
	playSound() {
		this._sound.play()
	}
}

const setMedia = (type, url) => {
	let media
	if (type === 'image') media = new Image()
	else if (type === 'audio') media = new Audio()
	media.src = url
	return media
}

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const setup = () => {
	document.getElementById('container-canvas').style.display = 'block'
	document.getElementById('userNameForm').style.display = 'none'
	context.fillStyle = '#fff'
	context.font = '24px helvetica'

	// set media
	const backgroundImg = setMedia('image', 'images/background.png')
	const carImg = setMedia('image', 'images/car.png')
	const runnerImg = setMedia('image', 'images/runner_ani.gif')
	const crashImg = setMedia('image', 'images/collision.png')
	const jumpEffect = setMedia('audio', 'sounds/jump_08.mp3')
	const crashEffect = setMedia('audio', 'sounds/qubodup-crash.mp3')

	// set variables
	const gravity = 4
	const groundLocY = 430
	const carSizeX = 60
	const carSizeY = 60
	const carLocX = canvas.width
	const carLocY = groundLocY - carSizeY
	const carSpeed = 3
	const runnerSizeX = 60
	const runnerSizeY = 60
	const runnerLocX = 10
	const runnerLocY = groundLocY - runnerSizeY

	// initialize game components
	environment = new Environment(0, 0, gravity, backgroundImg)
	crash = new Crash(crashImg, crashEffect)
	runner = new Runner(
		runnerSizeX,
		runnerSizeY,
		runnerLocX,
		runnerLocY,
		runnerImg,
		jumpEffect
	)
	car = new Car(carSizeX, carSizeY, carLocX, carLocY, carSpeed, carImg)
}
const draw = () => {
	environment.draw(context)

	// run car
	car.draw(context)
	car.move()
	car.checkBorders()

	// run runner
	runner.draw(context)
	runner.jump()
	runner.checkPosition()

	const distanceX = Math.abs(Math.floor(car.locX - runner.locX))
	console.log(car.locY)
	if (distanceX <= 30) {
		crash.draw(context, runner.locX + 30, runner.locY + 15)
		crash.playSound()
	}
	context.fillText(`${username}: ${distanceX}m`, 20, 40)
	requestAnimationFrame(draw)
}

const run = () => {
	// event.preventDefault()
	username = document.getElementById('username').value
	setup()
	draw()
}
run()
