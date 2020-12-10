window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');
    var deg = 25;
    var x = 10;
    var timer = requestAnimationFrame(draw);

    function draw(){
        //Line
        ctx.strokeStyle = 'rgb(255,0,0)';
        ctx.lineWidth = 5;
        ctx.moveTo(86,682);
        ctx.lineTo(278,550);
        ctx.stroke();

        //Pentagon
        ctx.strokeStyle = '#00ffff';
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.moveTo(558, 309);
        ctx.lineTo(667,284);
        ctx.lineTo(725,380);
        ctx.lineTo(651,465);
        ctx.lineTo(548,420);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Star
        ctx.strokeStyle = 'rgb(32,32,32)';
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(636, 497);
        ctx.lineTo(667, 554);
        ctx.lineTo(733, 567);
        ctx.lineTo(688, 615);
        ctx.lineTo(696, 682);
        ctx.lineTo(636, 653);
        ctx.lineTo(575, 681);
        ctx.lineTo(584, 617);
        ctx.lineTo(538, 567);
        ctx.lineTo(603, 554);
        ctx.lineTo(603, 554);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Square
        ctx.fillStyle = 'yellow'; 
        ctx.strokeStyle = 'black';
        ctx.fillRect(85, 303, 100, 100);
        ctx.strokeRect(85,303, 100, 100);

        //Circle
        ctx.fillStyle = '#ffff00';
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(385, 441, 65, 0, 2 * Math.PI, false)
        ctx.closePath;
        ctx.fill();
        ctx.stroke();
    }
}