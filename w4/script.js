var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var SkyrimDova = new Image();
SkyrimDova.src = 'images/SkyrimDova.png';

var x = 0;

var timer = requestAnimationFrame(main);

var start = 110
var finish = 900

var startFuel = 200;
var fuel = startFuel;
var barFullWidth = 300;

var sec = 3;
var fps = 60;
var frames = fps;

function main(){
    timer = requestAnimationFrame(main)
    ctx.clearRect(0, 0, 800, 600);
    drawStartLine();
    drawFinishLine();
    drawSprite();
    drawFuelBar();
    drawFuelText();

    if(sec > 0){
        runStartTimer();
        drawStartTimer();
    }

    ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.font = "50px Arial";
        ctx.textAlign = 'center';
        ctx.fillText("Week 4", c.width / 2, 50);
        ctx.strokeText("Week 4", c.width / 2, 50);
    

    
    if(fuel <= 0 || x + 100 > finish){
        drawResults();
    }
}

function drawStartLine() {
    ctx.fillStyle = 'slategray'
    ctx.fillRect(start, 100, 10, 500);
}

function drawFinishLine() {
    ctx.fillStyle = 'slategray'
    ctx.fillRect(finish, 100, 10, 500);
}

function drawSprite(){
    ctx.drawImage(SkyrimDova,x, 300, 100, 100 )
}

function drawFuelBar() {
    var barCurrentWidth = barFullWidth * getFuelPercentage();
    ctx.fillStyle = 'skyblue'
    ctx.fillRect(start,70, barCurrentWidth, 10);
}

function drawFuelText(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(fuel, start, 50);
}

function getFuelPercentage(){
    return fuel/startFuel;
}

function drawResults(){
    if(x + 100 > finish){
        //Winning Condition
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("You made it to the finish line! You won!", c.width/2, c.height/2);
    }
    else{
        //Losing Condition
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("You ran out of fuel... whomp whomp :( you lose", c.width/2, c.height/2);
    }
}

function runStartTimer(){
    frames -= 1;
    if(frames < 0){
        frames = fps;
        sec -= 1;
    }
}

function drawStartTimer(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(sec, c.width/2, c.height/2);
}