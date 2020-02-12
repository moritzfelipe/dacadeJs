var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var bg = new Image();
var fg = new Image();


// load images
var jumpMan = new Image();
var policeCar = new Image();

jumpMan.src = "https://media.giphy.com/media/348soIaCn0PKLdZc3Z/giphy.gif"
bg.src = "images/bg3.png"
policeCar.src = "images/police_car.png"

// variables
const ground = 430

const obstacleHeigth = 60
const obstacleWidth = obstacleHeigth
const jumpManHeight = 60
const jumpManWidth = jumpManHeight
var jumpManXCoordinate = 10;
var jumpManYCoordinate = ground-jumpManHeight;

const gap = 85;
const obstacleSpeed = 4
var gravity = 5;

var score = 0;
var jumpCondition = 'none';

// on key down
canvas.addEventListener("click",jumpUp);

function jumpUp(){
    if (jumpCondition == 'none'){
        jumpCondition = 'up';
    }
}

// obstacle coordinates
const obstacleCoordinates = [];

obstacleCoordinates[0] = {
    x : cvs.width,
    y : ground-obstacleHeigth
};

// draw images
function draw(){
    ctx.drawImage(bg,0,0);

    var randomGapDistance = Math.floor(Math.random() * 100) + 80;

    for(var i = 0; i < obstacleCoordinates.length; i++){

        obstacleCoordinates[i].x = obstacleCoordinates[i].x - obstacleSpeed

        // Create a new obstacle if current obstacle is at x-coordinate 180.
        if( obstacleCoordinates[i].x < 180 && obstacleCoordinates.length <= 1){
            obstacleCoordinates.push({
                x : cvs.width+randomGapDistance,
                y : ground-obstacleHeigth
            })
        }

        // detect collision
        if (jumpManXCoordinate + jumpManWidth/2 >= obstacleCoordinates[i].x
            && jumpManXCoordinate <= obstacleCoordinates[i].x + obstacleWidth
            && jumpManYCoordinate + jumpManHeight > obstacleCoordinates[i].y) {
                score = 0
        }

        // delete obstacle after out of screen
        if(obstacleCoordinates[i].x < -obstacleWidth){
            setTimeout( function() {
                obstacleCoordinates.shift()
            }, 0);
            score++
        }
        ctx.drawImage(policeCar,obstacleCoordinates[i].x,obstacleCoordinates[i].y,obstacleWidth,obstacleHeigth);
    }

    if (jumpCondition=='up') {
        jumpManYCoordinate -= gravity;
    }
    if (jumpCondition=='down'){
        jumpManYCoordinate += gravity;
    }
    if (jumpCondition=='up' && jumpManYCoordinate<220) {
        jumpCondition='down';
    }
    if (jumpCondition=='down' && jumpManYCoordinate==ground-jumpManHeight) {
        jumpCondition='none';
    }
    ctx.drawImage(jumpMan,jumpManXCoordinate,jumpManYCoordinate,60,60);

    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score,20,40);

    requestAnimationFrame(draw);
}

draw();
