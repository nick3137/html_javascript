window.onload = function(){ 

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 1;


function randomRange(high, low){
    return Math.random() * ( high - low) + low;
}

function GameObject(){
    this.radius = randomRange(10,2);
    this.color = `rgb(${randomRange(255,0)},${randomRange(255,0)},${randomRange(255,0)})`;
    this.x = c.width/2; //Math.random() *c.width;
    this.y = c.height/2; //Math.random() *c.height;
    this.vx = randomRange(30,-30);
    this.vy = randomRange(30,-30);

    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height - this.radius){
            //this.y = 0 - this.radius;
            this.y = c.height - this.radius;
            this.vy = -this.vy * 1;
        }   
        if(this.x < 0 + this.radius || this.x > c.width - this.radius){
            this.vx = -this.vx * 1;
        }
        
    }
}
//New Array can also be defined as []
var particles = new Array();
var numberofParticles = 10000;

for(var i = 0; i<numberofParticles; i++){
    particles[i] = new GameObject();
    particles[i].drawCircle();
}

function main(){
    //clears the canvas
    ctx.clearRect(0,0,c.width,c.height);

    for(var i = 0; i<particles.length; i++){
        particles[i].vy += gravity;
        //updates  the positions
        particles[i].move();
        //draws the stuff
        particles[i].drawCircle();
    }
    timer = requestAnimationFrame(main);
}
}