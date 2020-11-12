var rps = [];
rps[0] = "Rock";
rps[1] = "Paper";
rps[2] = "Scissors";

//Array of buttons
var btn = document.querySelectorAll('a');
//assign event listeners to the buttons
btn[0].addEventListener('click', function(e){play(0)})
btn[1].addEventListener('click', function(e){play(1)})
btn[2].addEventListener('click', function(e){play(2)})





function play(playersChoice){
    var cpuChoice = Math.floor (Math.random() *2.999);
    alert("Player Choice " + rps[playersChoice] + " vs. Computer Choice " + rps[cpuChoice]);

    switch(playersChoice){
        case 0:
            if(cpuChoice === 0){
                alert("It's a tie!")
            } 
            else if(cpuChoice === 1){
                    alert("You lose whomp whomp")
            }
            else{
                alert("You win woo")
            }
            break;
        case 1: 
            if(cpuChoice === 0){
                alert("You win woo!")
            } 
            else if(cpuChoice === 1){
                    alert("It's a tie")
            }
            else{
                alert("You lose whomp whomp")
            }
            break;
        case 2: 
            if(cpuChoice === 0){
                alert("You lose whomp whomp")
            } 
            else if(cpuChoice === 1){
                    alert("You win woo")
            }
            else{
                alert("You tie")
            }
            break;
    }
}