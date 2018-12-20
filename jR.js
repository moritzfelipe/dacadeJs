var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var policeCar = new Image();
var racingCar = new Image();
var taxi = new Image();



bird.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/runner_1f3c3.png";
//bg.src = "images/bg.png";
//fg.src = "images/fg.png";
policeCar.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/police-car_1f693.png";
racingCar.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/racing-car_1f3ce.png";
taxi.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/taxi_1f695.png";


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 340;

var gravity = 1.5;

var score = 0;
var jumpCondition = 'none';

// audio files

//var fly = new Audio();
//var scor = new Audio();

//fly.src = "sounds/fly.mp3";
//scor.src = "sounds/score.mp3";

// on key down

canvas.addEventListener("click",jumpUp);

function jumpUp(){
    if (jumpCondition=='none'){
        jumpCondition = 'up';
        //fly.play();
    }

}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 356
};

// draw images

function draw(){

    //ctx.drawImage(bg,0,0);
    ctx.fillStyle = "#3977ff";
    ctx.fillRect(0, 0, 288, 512);

    var gap2 = Math.floor(Math.random() * 100) + 40;
    var obstacleRdn2 = Math.floor(Math.random() * 3) + 1;

    for(var i = 0; i < pipe.length; i++){

        //console.log(pipeNorth.height);
        //constant = pipeNorth.height+gap;
        //ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);

        pipe[i].x--;

        if( pipe[i].x == 180 ){
            pipe.push({
                x : cvs.width+gap2,
                y : 356,
                lala: obstacleRdn2
                //y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
            console.log(gap2)
        }

        obstacleRdn = pipe[i].lala;

        if (obstacleRdn == 2) {
          var obstacle = policeCar;
        } else if (obstacleRdn == 3){
          var obstacle = racingCar;
        } else {
          var obstacle = taxi;
        }
        //console.log(pipe[i]);
        ctx.drawImage(obstacle,pipe[i].x,pipe[i].y,40,40);


        // detect collision
        //if(this.x+30>obs.x && this.x<obs.x+obs.width && this.y+30>obs.y){


        if( bX+60 >= pipe[i].x+40 && bX <= pipe[i].x && bY+60>pipe[i].y) {
            console.log("hit");
            location.reload(); // reload the page

        }

        //&& (bY <= pipe[i].y + pipeNorth.height)) || bY+bird.height >= pipe[i].y) || bY + bird.height >=  cvs.height - fg.height)

        if(pipe[i].x == 5){
            score++;
            //scor.play();
        }


    }

    if (jumpCondition=='up') {
        bY=bY-2;
    }
    if (jumpCondition=='down'){
        bY=bY+2;
    }
    if (jumpCondition=='up' && bY<200) {
        jumpCondition='down';
    }
    if (jumpCondition=='down' && bY==340) {
        jumpCondition='none';
    }

    //console.log(jumpCondition);
    //console.log(bY);

    ctx.fillStyle = "#a6a6a6";
    ctx.fillRect(0, 396, 288, 530);

    //ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY,60,60);

    //bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,20,40);

    requestAnimationFrame(draw);

}

draw();
