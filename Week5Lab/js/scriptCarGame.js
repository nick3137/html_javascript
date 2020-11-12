//JavaScript goes here

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var mario = new Image();
mario.src = 'images/mario.png';

var x = 0;
//Timer
var timer = requestAnimationFrame(main)

//variables for starting and finish line
var start = 110;
var finish = 700;

// fuel variables
var startFuel = randomRange(600,100);
var fuel = startFuel;
var barFullWidth = 300;

//Start timer stuff
var sec = 3;
var fps = 60;
var frames = fps;

var someNum = randomRange(10, 5);
console.log(someNum);

var car = new GameObject();
car.y = c.height/2;
car.w = 100;
car.x = 5;
car.color = "blue"

var car2 = new GameObject();
car2.y = 400;
car2.color = "red";
car2.w =75;

var car3 = new GameObject();
car3.y = 500;
car3.color = "yellow";
car3.w = 25;


function main() {
    timer = requestAnimationFrame(main)
    //clear the canvas
    ctx.clearRect(0, 0, 800, 600);
    //draw the game object
    //drawStartLine();
    drawBox("red", start, 100, 10, 400);
    //drawFinishLine();
    drawBox("green", finish, 100, 10, 400);
    //drawBox();
    drawSprite();
    drawFuelBar();
    drawFuelText();
   
    
    
    if(sec > 0){
        runStartTimer();
        drawStartTimer();
    }

    else{
        if(fuel > 0){
        //update x
        car.x+=1;
        car2.x+=2;
        car3.x+=1;
        x += 1;
        fuel -= 1;
        } 
    } 
    //draw instance of a car
    car.draw();
    car2.draw();
    car3.draw();

    

    //Draw some Text
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.font = "50px Arial";
        ctx.textAlign = 'center';
        ctx.fillText("Week 4 Lab", c.width / 2, 50);
        ctx.strokeText("Week 4 Lab", c.width / 2, 50);
    

    //checks to see if player made it to finish line
    if(fuel <= 0 || x + 100 > finish){
        drawResults();
    }
}

 function drawSprite() {
    //Draw iamge to canvas
    ctx.drawImage(mario, x, 110, 100, 100);
}  

/*function drawBox() {
    ctx.fillStyle = 'purple'
    ctx.fillRect(x, c.height / 2, 100, 50);
}

function drawStartLine() {
    ctx.fillStyle = 'red'
    ctx.fillRect(start, 100, 10, 400);
}

function drawFinishLine() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(finish, 100, 10, 400);
}
*/
function drawBox(color, x, y, w, h){
ctx.fillStyle = color;
ctx.fillRect(x,y,w,h)
}

function drawFuelBar() {
    var barCurrentWidth = barFullWidth * getFuelPercentage();
    ctx.fillStyle = 'orange'
    ctx.fillRect(start, 80, barCurrentWidth, 10);
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

