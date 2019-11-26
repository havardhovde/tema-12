// https://no.wikibooks.org/wiki/Formelsamling:Trigonometri#Cosinus

"use strict";

let bottomImg;
let topImg;
let bgImg;
let world = {};
let character = {};
let speed = 0;
let maxSpeed = 15;
let characterColor = `rgb(0, 0, 0)`;
let startRed = 260;
let endRed = 1085;
let redZone = startRed - endRed;
let redColor = redZone / 3.23

function preload() {
	bottomImg = loadImage('./assets/grotte_nede.png');
	topImg = loadImage("./assets/grotte_oppe.png");
}

function setup() {
	createCanvas(1280, 720);
	bottomImg.loadPixels();
	initGame();
	bgImg = loadImage('./assets/bg.png');
}

function initGame() {
	world.gravity = createVector(0, 0.6);
	world.position = createVector(0, 200);

	character.velocity = createVector(0, 0);
	character.position = createVector(30, 200);
}

function draw() {

	// draw background
	background(bgImg);
	image(topImg, 0 + world.position.x, 230 - world.position.y, topImg.width, topImg.height);
	image(bottomImg, 0 + world.position.x, 18 + world.position.y, bottomImg.width, bottomImg.height);

	// draw the character
	drawChar();

	character.velocity.y += world.gravity.y;
	speed /= 1.05;

	character.position.y += character.velocity.y;
	character.position.x += speed;

	let resolverCounter = 0;
	while(checkForCollision(character.position.x, character.position.y)) {
		character.position.y -= 1;
		character.velocity = createVector(0, 0);
		resolverCounter++;

		if(resolverCounter > 100) {
			console.log("wall collision");
			return;
		}
	}

	//Change color
	if (character.position.x > startRed && character.position.x < endRed) {
		
	}

	// if (character.position.x > 500) {
	// 	characterColor = "red";
	// } else {
	// 	characterColor = "black";
	// }

	// console.log(Math.round(character.position.x));

	//Scroll camera
	// if (character.position.x > width / 2) {
	// 	world.position.x = (character.position.x - width / 2) * -1;
	// }
	// if (character.position.x > width / 2) {
	// 	topImg.x = (character.position.x - width / 2) * -1;
	// }


	// handle user input
	if ((keyIsPressed) && (keyCode == 39)) { // right
		// console.log("right");
		speed += 0.2;
	}

	if ((keyIsPressed) && (keyCode == 37)) { // left
		// console.log("left");
		speed -= 0.2;
	}
}

function checkForCollision(posX, posY) {
	let pixelValue = getPixelAlphaValue(posX.toFixed(0), posY.toFixed(0));
	let collision = false;
	if (pixelValue > 0) collision = true;
	return collision;
}

function getPixelAlphaValue(x, y) {
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x > bottomImg.width) x = bottomImg.width;
	if (y > bottomImg.height) y = bottomImg.height;
	let p2d = ((x * 4) + (y * bottomImg.width * 4)) + 3;
	return bottomImg.pixels[p2d];
}

function drawChar() {
	let posInWorld = character.position.copy();
	posInWorld.add(world.position);
	drawPoint(40, characterColor, posInWorld);
}

function drawPoint(size, color, position) {
	strokeWeight(size);
	stroke(color);
	point(position.x, position.y);
}
