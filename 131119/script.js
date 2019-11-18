let canvas = document.querySelector(".game");
let context = canvas.getContext("2d");

let snakeBody = [
    {x: 250, y: 250},
    {x: 260, y: 250},
    {x: 270, y: 250}
];

let snakeLength = 10;
let x = 250;
let y = 250;
let tileSize = 10;
let speed = 10;
let xSpeed = 10;
let ySpeed = 0;
let fruitX = Math.round(Math.random() * 490 / 10) * 10;
let fruitY = Math.round(Math.random() * 490 / 10) * 10;


function draw() {
    //Reset canvas
    canvas.width = canvas.width;

    //Draw snake tiles
    context.fillStyle = "limegreen";
    for (let tile of snakeBody) {
        context.fillRect(tile.x, tile.y, tileSize, tileSize);
    }

    //Generate fruit
    let fruitSpawnInSnake;

    for (let i = 0; i < snakeBody.length; i++) {
        if (fruitX == snakeBody[i].x && fruitY == snakeBody[i].y) {
            fruitSpawnInSnake == true;
        } else {
            fruitSpawnInSnake == false;
        }
    };

    if (fruitSpawnInSnake == true) {
        fruitX = Math.round(Math.random() * 490 / 10) * 10;
        fruitY = Math.round(Math.random() * 490 / 10) * 10;
    } else {
        context.fillRect(fruitX, fruitY, tileSize, tileSize);
    };


    //Move the snake
    let oldHeadPos = snakeBody[snakeBody.length - 1];
    let newHeadPos = {};
    let eatSelf = false;

    newHeadPos.x = oldHeadPos.x + xSpeed;
    newHeadPos.y = oldHeadPos.y + ySpeed;
    
    //Check for self-collision
    for (let i = 0; i < snakeBody.length; i++) {
        if((newHeadPos.x == snakeBody[i].x ) && (newHeadPos.y == snakeBody[i].y)) {
            eatSelf = true;
        };
    };

    if (eatSelf == true) {
        resetGame();
    } else {
        snakeBody.push(newHeadPos);
    };

    x += xSpeed;
    y += ySpeed;

    //Eating fruit
    if ((newHeadPos.x == fruitX) && (newHeadPos.y == fruitY)) {
        snakeLength += 2;
        fruitX = Math.round(Math.random() * 490 / 10) * 10;
        fruitY = Math.round(Math.random() * 490 / 10) * 10;
    };

    //Remove old tail tiles
    while(snakeBody.length > snakeLength) {
        snakeBody.shift();
    };

    //Side wall collision
    if ((newHeadPos.x >= canvas.width - (tileSize / 2)) || (newHeadPos.x <= 0 - (tileSize/2))) {
        resetGame();
    };

    //Top/Bottom wall collision
    if ((newHeadPos.y >= canvas.height - (tileSize / 2)) || (newHeadPos.y <= 0 - (tileSize/2))) {
        resetGame();
    };
};

function resetGame() {
    snakeBody = [
        {x: 250, y: 250},
        {x: 260, y: 250},
        {x: 270, y: 250}
    ];
    speed = 10;
    xSpeed = 10;
    ySpeed = 0;
    snakeLength = 10;
    fruitX = Math.round(Math.random() * 490 / 10) * 10;
    fruitY = Math.round(Math.random() * 490 / 10) * 10;
};

setInterval(draw, 1000/speed);

window.addEventListener("keydown", (e) => {
    //Right/left
    if (event.code == "ArrowRight" && xSpeed != -10) {
        xSpeed = 10;
        ySpeed = 0;
    } else if (event.code == "ArrowLeft" && xSpeed != 10) {
        xSpeed = -10;
        ySpeed = 0;
    };

    //Up/down
    if (event.code == "ArrowUp" && ySpeed != 10) {
        ySpeed = -10;
        xSpeed = 0;
    } else if (event.code == "ArrowDown" && ySpeed != -10) {
        ySpeed = 10;
        xSpeed = 0;
    }
});