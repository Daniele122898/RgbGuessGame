var numSquares = 6;
var colors= [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton= document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //Mode buttons
    setModeButtons();
    //load Blocks
    setupSquares();
    reset();
}

function setupSquares() {
    colorDisplay.textContent = pickedColor;
    for( var j = 0; j<squares.length; j++){
        //add click event
        squares[j].addEventListener("click", function () {
            //grab color of the clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedcolor
            if(clickedColor=== pickedColor){
                messageDisplay.textContent ="Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!"
            }
        })
    }
}

function setModeButtons() {
    //Mode buttons event listenes
    for (var i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}


function reset() {
    resetButton.textContent ="New Colors";
    messageDisplay.textContent = "";
    //generate all new colors
    colors= generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change color display
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for(var i = 0; i<squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "#4682b4";
}

resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    //loop through all squares
    for(var i=0; i<squares.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors to arr
    for(var i=0; i<num; i++){
        //get random Color push into array
        arr.push(randomColor())
    }
    //return array
    return arr;
}

function randomColor() {
    //pick red from 0-255
    var red = Math.floor(Math.random()*256);
    //pick green from 0-255
    var green = Math.floor(Math.random()*256);
    //pick blue from 0-255
    var blue = Math.floor(Math.random()*256);
    return "rgb("+red+", "+green+", "+blue+")";
}

function pickColor() {
    var random = Math.floor(Math.random()* colors.length);
    return colors[random];
}