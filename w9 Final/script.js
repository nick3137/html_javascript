var c = document.querySelector("canvas");
var ctx = c.getContext("2d");
var timer = requestAnimationFrame(main);
var gravity = 1;
var cannons = new Array();
var numCannons = 10;
var gameOver = true;
var score = 0;
var gameStates = [];
var currentState = 0;
var ship;
var highScore = 0;
var bgMain = new Image();
var cannonSprite = new Image();
var sunnySprite = new Image()

bgMain.src = "images/OnePiece.jpg";
cannonSprite.src = "images/CannonBall.png";
sunnySprite.src = "images/Sunny.png";


bgMain.onload = function(){
    main()
}

cannonSprite.onload = function(){
    main();
}

sunnySprite.onload = function(){
    main();
}

function randomRange(high, low){
    return Math.random() * ( high - low) + low;
}
//Asteroids GameObject Class
function Cannons(){
    this.radius = randomRange(15, 2);
    this.x = randomRange(0 - this.radius, c.width - this.radius);
    this.y = randomRange(0 - this.radius, c.height - this.radius)- c.height;
    this.vx = randomRange(5, 10);
    this.vy = randomRange(10, 5);
    
    this.draw = function (){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        ctx.drawImage(cannonSprite, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
        ctx.restore();
    }
}

//class for player ship 
function PlayerShip(){
    this.x = c.width/2;
    this.y = c.height/2;
    this.w = 20;
    this.h = 20;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.left = false;
    this.right = false;
    this.flamelength = 30;

    this.draw = function(){

        ctx.save();
        ctx.translate(this.x,this.y);
        
        if(this.up == true || this.left == true || this.right == true){

            ctx.save();
            
            
            if(this.flamelength == 30){
                this.flamelength = 10;
            }
            else{
                this.flamelength = 30;
            }
            ctx.beginPath();
            ctx.fillStyle = "orange";
            ctx.moveTo(this.flamelength, 5);
            ctx.lineTo(5, -5);
            ctx.lineTo(-15, 5);
            ctx.lineTo(this.flamelength, 5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        ctx.beginPath();
        //ctx.fillStyle = "red"
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 10);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, -10);
        ctx.closePath();
        ctx.fill();
        ctx.drawImage(sunnySprite, -40, -30);
        ctx.restore();
    }

    

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height - 10){
            this.y = c.height - 10;
            this.vy = 0;
        }
        //right boundary of screen
        if(this.x > c.width -10){
            this.x = c.width - 10;
            this.vx = 0;
        }
        //left boundary of screen
        if(this.x < 0 + 10){
            this.x = 0 + 10;
            this.vx = 0;
        }
        //top boundary of  screen
        if(this.y < 0 + 10){
            this.y = 0 + 10;
            this.vy = 0;
        }
    }
}

function gameStart(){
        //for loop to create ll instances of asteroids 
    for(var i = 0; i<numCannons; i++){
        cannons[i] = new Cannons();
    }
    //this creates an instance of the ship
     ship = new PlayerShip();

}


//adding event listeners
document.addEventListener("keydown", keyPressDown);
document.addEventListener("keyup", keyPressUp);

function keyPressUp(e){
    console.log("Key released" + e.keyCode);
    if(e.keyCode === 38){
        ship.up = false;
    }
    if(e.keyCode === 37){
        ship.left = false;
    }
    if(e.keyCode === 39){
        ship.right = false;
    }
    
}

function keyPressDown(e){
   // console.log("Key pressed" + e.keyCode);
    if(e.keyCode === 38){
        ship.up = true;
    }
    if(e.keyCode === 37){
        ship.left = true;
    }
    if(e.keyCode === 39){
        ship.right = true;
    }
    if(gameOver == true){
        if(e.keyCode === 13){

            if(currentState == 2){
                currentState = 0;
                score = 0;
                numCannons= 10;
                cannons = [];
                gameStart();
                main();
            }
            else{
                gameStart();
                gameOver = false;
                currentState = 1;
                main();
                scoreTimer();
            }
         }
    }
}

//GameStates state machine

gameStates[0] = function(){
    ctx.drawImage(bgMain, 0,0,c.width,c.height);
    ctx.save();
    ctx.font = "30px 'Dancing Script', cursive";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("The Sunny Escape", c.width/2, c.height/2 - 30);
    ctx.font = "15px 'Dancing Script', cursive";
    ctx.fillText("Press Enter to Start", c.width/2, c.height/2 + 20);
    ctx.restore();
}

gameStates[1] = function () {
    //Draws score to the HUD
    ctx.save();
    ctx.font = "15px 'Dancing Script', cursive";
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + score.toString(), c.width - 150, 30);
    ctx.restore();

    //ship.vy += gravity;

    //key presses move the ship
    if (ship.up == true) {
        ship.vy = -10
    }
    else {
        ship.vy = 3;
    }
    if (ship.left == true) {
        ship.vx = -10;
    }
    else if (ship.right == true) {
        ship.vx = 10;
    }
    else {
        ship.vx = 0;
    }

    for (var i = 0; i < cannons.length; i++) {
        var dX = ship.x - cannons[i].x;
        var dY = ship.y - cannons[i].y;
        var dist = Math.sqrt((dX * dX) + (dY * dY));


        if (detectCollision(dist, (ship.h / 2 + cannons[i].radius))) {
            console.log("Colliding with cannon" + i);
            currentState = 2;
            gameOver = true;
            //document.removeEventListener("keydown", keyPressDown);
            //document.removeEventListener("keyup", keyPressUp);
        }

        if (cannons[i].y > c.height + cannons[i].radius) {
            cannons[i].y = randomRange(c.height - cannons[i].radius, cannons[i].radius) - c.height;
            cannons[i].x = randomRange(c.width + cannons[i].radius, cannons[i].radius);
        }

        if (gameOver == false) {
            cannons[i].y += cannons[i].vy;
        }
        cannons[i].draw();
    }

    ship.draw();
    if (gameOver == false) {
        ship.move();
    }

    //Be careful with "While"
    while (cannons.length < numCannons) {
        cannons.push(new Cannons());
    }

}

gameStates[2] = function(){
    if(score > highScore){
        highScore = score;
        ctx.save();
        ctx.font = "30px 'Dancing Script', cursive";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your New High Score is: " + highScore.toString() + "\n New Record", c.width/2, c.height/2 - 30);
        ctx.fillText("New Record", c.width/2, c.height/2);
        ctx.font = "15px 'Dancing Script', cursive";
        ctx.fillText("Press Enter to Start", c.width/2, c.height/2 + 20);
        ctx.restore(); 
    }

    else{
        ctx.save();
        ctx.font = "30px 'Dancing Script', cursive";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.font = "15px 'Dancing Script', cursive";
        ctx.fillText("Press Enter to Start", c.width/2, c.height/2 + 20);
        ctx.restore(); 
    }
}


function main(){
    ctx.clearRect(0,0,c.width, c.height);

    if(gameOver == false){
        timer = requestAnimationFrame(main);
    }
   gameStates[currentState]();   
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
    }

    function scoreTimer() {
        if (gameOver == false) {
            score++;
            //using modulus divide the score by 5 and if the remainder is zero add asteroids
            if (score % 5 == 0) {
                numCannons += 5;
                console.log(numCannons);
            }
            //console.log(score);
            setTimeout(scoreTimer, 1000);
                }
        }