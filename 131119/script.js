let canvas = document.querySelector(".game");
let context = canvas.getContext("2d");

let snakeBody = [
    {x: 250, y: 250},
    {x: 270, y: 250},
    {x: 290, y: 250}
];

let snakeLength = 10;
let x = 250;
let y = 250;
let tileSize = 20;
let speed = 10;
let xSpeed = 10;
let ySpeed = 0;

function draw() {
    //Reset canvas
    canvas.width = canvas.width;

    //Draw snake tiles
    context.fillStyle = "limegreen";
    for (let tile of snakeBody) {
        context.fillRect(tile.x, tile.y, tileSize, tileSize);
    }

    //TODO: Check if collision with self

    //Move the snake
    let oldHeadPos = snakeBody[snakeBody.length - 1];
    let newHeadPos = {};

    newHeadPos.x = oldHeadPos.x + xSpeed;
    newHeadPos.y = oldHeadPos.y + ySpeed;

    snakeBody.push(newHeadPos);

    x += xSpeed;
    y += ySpeed;

    //Remove old tail tiles
    while(snakeBody.length > snakeLength) {
        snakeBody.shift();
    }

    //Side wall collision
    if ((newHeadPos.x >= canvas.width - (tileSize / 2)) || (newHeadPos.x <= 0 - (tileSize/2))) {
        resetGame();
    }

    //Top/Bottom wall collision
    if ((newHeadPos.y >= canvas.height - (tileSize / 2)) || (newHeadPos.y <= 0 - (tileSize/2))) {
        resetGame();
    }
};

function resetGame() {
    snakeBody = [
        {x: 250, y: 250},
        {x: 270, y: 250},
        {x: 290, y: 250}
    ];
    speed = 10;
};

setInterval(draw, 1000/speed);

window.addEventListener("keydown", (e) => {
    //Right/left
    if (event.code == "ArrowRight") {
        xSpeed = 10;
        ySpeed = 0;
    } else if (event.code == "ArrowLeft") {
        xSpeed = -10;
        ySpeed = 0;
    };

    //Up/down
    if (event.code == "ArrowUp") {
        ySpeed = -10;
        xSpeed = 0;
    } else if (event.code == "ArrowDown") {
        ySpeed = 10;
        xSpeed = 0;
    }
})