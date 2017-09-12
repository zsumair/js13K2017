
// Capture Canvas and declare the Context
var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d'); 

// Enemy Planets Variables
var planetX;
var planetY = 0;
var planetRadius = 20;

// Player Variables
var winkieX = canvas.width/2;
var winkieY = canvas.height/2;
var winkieWidth = 50;
var winkieHeight = 50;

// Score Variable
var score = 0;

// Run On Load
window.onload = function(){

    // Planet appearance on canvas
    planetX = canvas.width * Math.random();

		requestAnimationFrame(mainLoop);    
}


function mainLoop(){
        drawEverything();
        moveEverything();  
        animatePlanets();     
        drawStars();
        drawScore();
        collisionDetection();
        
        // Player Movements Through mouse

    document.addEventListener('mousemove', mouseMoveHandler);
    
            function mouseMoveHandler(e){
                var relativeX = e.clientX - canvas.offsetLeft; 
                //console.log(relativeX);
                if(relativeX > 0 + winkieWidth/2 && relativeX < canvas.width - winkieWidth/2){
                        winkieX = relativeX - winkieWidth/2; 
                }
            }


        requestAnimationFrame(mainLoop);
    }

// Drawing Canvas Rectangle
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height, drawColor);
}

// Drawing Planet Circles 
function colorPlanet(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    canvasContext.fill();
    canvasContext.closePath();
}

// Get Random numbers for Planets Speed
function getRandomSpeed(min, max){
    return Math.floor(Math.random() * (max + min)) + min;
}

// Drawing Game Canvas, Enemies and player
function drawEverything(){

        // Draw Game Canvas
        colorRect(0, 0, canvas.width, canvas.height, 'black');

        // Draw the Player
        colorRect(winkieX, winkieY, winkieWidth, winkieHeight, 'white');

}



// Collision Detection of Player and Planets
function collisionDetection(){
    for(var i=0; i < planets.length; i++){
        var planet = planets[i];
           if(planet.x > winkieX && planet.x < winkieX + winkieWidth && planet.y > winkieY && planet.y < winkieY + winkieHeight){
            alert('Your Highest Score: ' + score); 
            document.location.reload();
           } else if (planet.y >= canvas.height - planetRadius){
                score++;
           }
    }
}

// ScoreBoard
function drawScore(){
	canvasContext.font = "16px Arial";
	canvasContext.fillStyle = "#0095DD";
	canvasContext.fillText("Score: "+score,8,20);
}

// Moving the Enemy Planet
function moveEverything(){
	planets.forEach(function(planet){
		planet.x += planet.SpeedX;
        planet.y += planet.SpeedY;

    if(planet.x < planetRadius){
        planet.SpeedX = -planet.SpeedX;
        planet.x = planetRadius+(planetRadius-planet.x);
    } else if(planet.x > canvas.width - planetRadius) {
        planet.SpeedX = -planet.SpeedX;
        planet.x -= planet.x - (canvas.width - planetRadius)
    }
    else if(planet.y > canvas.height - planetRadius){
        planet.y -= planet.y - (canvas.height - planetRadius);
        planet.SpeedY = -planet.SpeedY;
    }
    
  })
}

// Spawning Planets Here

var planets = [];
var spawnTime = 1500;
var lastSpawn = -1;
var startTime = Date.now();

function spawnPlanets() {
    var planet = {
        x: planetX,
        y: planetY,
        SpeedX: getRandomSpeed(1, 7),
        SpeedY: getRandomSpeed(2, 8)
    }
        planets.push(planet);
        
}


function animatePlanets() {
    var time = Date.now();

    if (time > lastSpawn + spawnTime) {
        lastSpawn = time;
        spawnPlanets();
    }
    

    for(var i=0; i < planets.length; i++){
        var planet = planets[i];

        var r = getRandomNumber(0, 255);
        var g = getRandomNumber(0, 255);
        var b = getRandomNumber(0, 255);

            canvasContext.beginPath();
            canvasContext.arc(planet.x, planet.y, planetRadius, 0, Math.PI * 2, false);
            //canvasContext.fillStyle  = "hsl(" + hue + ", " + sat + "%, 88%)";
            canvasContext.fillStyle  = "rgb(" + r + "," + g + "," + b + ")";
            canvasContext.fill();
        
        
    }

}


// Draw Star Particles

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var stars = 20,
colorrange = [0,60,240];

function drawStars(){
    for (var i = 0; i < stars; i++) {
        var x = Math.random() * canvas.offsetWidth;
        y = Math.random() * canvas.offsetHeight,
        radius = Math.random() * 1.2,
        hue = colorrange[getRandomNumber(0,colorrange.length - 1)],
        sat = getRandomNumber(50,100);
        canvasContext.beginPath();
        canvasContext.arc(x, y, radius, 0, 360);
        canvasContext.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
        canvasContext.fill();
    }
}
