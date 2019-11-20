let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");


class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    getCircumfrence() {
        return 2 * Math.PI * this.radius;
    }
}

let ball1 = new Ball(10, 10, 10);
let ball2 = new Ball(20, 40, 20);
let ball3 = new Ball(40, 80, 40);

console.log(ball1.getCircumfrence());
console.log(ball2.getCircumfrence());
console.log(ball3.getCircumfrence());

let ball = {};
ball.x = 300;
ball.y = 50;
ball.radius = 30;
ball.speedY = 5;

function circle(x, y, r, color) {
    context.fillStyle= color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
};

function draw() {
    canvas.width = canvas.width;

    context.fillStyle ="black";
    context.fillRect(0, canvas.height - 20, canvas.width, 20);

    ball.speedY += 0.98;

    ball.y += ball.speedY;

    if(ball.y + ball.radius > canvas.height - 20) {
        ball.y = canvas.height-20 - ball.radius;
        ball.speedY *= -0.8;
    };

    circle(canvas.width/2, ball.y, ball.radius, "red");

    requestAnimationFrame(draw);

};

draw();