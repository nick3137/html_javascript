var c = document.querySelector("canvas");
var ctx = c.getContext("2d")
var rps = [];
rps[0] = "Rock";
rps[1] = "Paper";
rps[2] = "Scissors";

var BPS = new Image();

BPS.src = "images/BPS.jpg";

//Array of buttons
var btn = document.querySelectorAll('a');
//assign event listeners to the buttons
btn[0].addEventListener('click', function(e){play(0)})
btn[1].addEventListener('click', function(e){play(1)})
btn[2].addEventListener('click', function(e){play(2)})





function play(playersChoice){
    var cpuChoice = Math.floor (Math.random() *2.999);
    ctx.clearRect(0,0, c.width, c.height);
    ctx.font ="20px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'black';
    ctx.fillText("Player Choice " + rps[playersChoice] + " vs. Computer Choice " + rps[cpuChoice], c.width/2,c.height/2);

    switch(playersChoice){
        case 0:
            if(cpuChoice === 0){
                ctx.fillStyle = '#ff8300';
                ctx.fillText("It's a tie", c.width/2, c.height/2 + 100)
            } 
            else if(cpuChoice === 1){
                ctx.fillStyle = '#04d9ff';
                ctx.fillText("You lose :(", c.width/2, c.height/2 + 100)
            }
            else{
                ctx.fillStyle = ' #ff66cc';
                ctx.fillText("You're the winner!", c.width/2, c.height/2 + 100)
            }
            break;
        case 1: 
            if(cpuChoice === 0){
                ctx.fillStyle = '#ff66cc';
                ctx.fillText("You're the winner!", c.width/2, c.height/2 + 100)
            } 
            else if(cpuChoice === 1){
                ctx.fillStyle = '#ff8300';
                ctx.fillText("It's a tie", c.width/2, c.height/2 + 100)
            }
            else{
                ctx.fillStyle = '#04d9ff';
                ctx.fillText("You lose :(", c.width/2, c.height/2 + 100)
            }
            break;
        case 2: 
            if(cpuChoice === 0){
                ctx.fillStyle = '#04d9ff';
                ctx.fillText("You lose :(", c.width/2, c.height/2 + 100)
            } 
            else if(cpuChoice === 1){
                ctx.fillStyle = '#ff66cc';
                ctx.fillText("You're the winner!", c.width/2, c.height/2 + 100)
            }
            else{
                ctx.fillStyle = '#ff8300';
                ctx.fillText("It's a tie", c.width/2, c.height/2 + 100)
            }
            break;
    } 
}