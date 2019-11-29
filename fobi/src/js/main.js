// https://no.wikibooks.org/wiki/Formelsamling:Trigonometri#Cosinus

"use strict";

let bottomImg;
let topImg;
let bgImg;
let characterImage;
let world = {};
let character = {};
let speed = 0;
let maxSpeed = 15;
let characterColor = `rgb(255, 0, 0)`;
let startRed = 260;
let endRed = 1085;
let redZone = endRed - startRed;
let shakeStart = 670;

function preload() {
	bottomImg = loadImage('./assets/grotte_nede.png');
	topImg = loadImage("./assets/grotte_oppe.png");
	characterImage = loadImage("./assets/phobo4.png")
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

	while(checkForCollision(character.position.x, character.position.y)) {
		character.position.y -= 1;
		character.velocity = createVector(0, 0);
	}
	
	//Change color
	let characterRed = Math.round((character.position.x - 260)/(redZone/100)*2.55);

	if (character.position.x > startRed && character.position.x < endRed) {
		characterColor = `rgb(${characterRed}, 0, 0)`
	} else {
		characterColor = "black"
	}

	//character input and shake)
	if (character.position.x > shakeStart && character.position.x < endRed) {
		character.position.y += Math.random() * 7
		if ((keyIsPressed) && (keyCode == 39)) {
			speed += 0.05;
			// speed += Math.random() < 0.5 ? -1 : 1;
		}

		//left
		if ((keyIsPressed) && (keyCode == 37)) {
			speed -= 0.08;
		}
	} else {
		if ((keyIsPressed) && (keyCode == 39)) {
			speed += 0.08;
		}

		//left
		if ((keyIsPressed) && (keyCode == 37)) {
			speed -= 0.08;
		}
	}

	if (character.position.x > 850 && character.position.x < endRed) {
		if ((keyIsPressed) && (keyCode == 39)) {
			speed -= 0.02;
		}

		//left
		if ((keyIsPressed) && (keyCode == 37)) {
			speed -= 0.1;
		}
	}

	// Scroll camera
	// if (character.position.x > width / 2) {
	// 	world.position.x = (character.position.x - width / 2) * -1;
	// }
	// if (character.position.x > width / 2) {
	// 	topImg.x = (character.position.x - width / 2) * -1;
	// }

	console.log(Math.round(character.position.x))

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
	image(characterImage, character.position.x - 25, character.position.y + 175, 50, 50);
	// tint(characterColor);
	// drawPoint(40, characterColor, posInWorld);
}

// function drawPoint(size, color, position) {
// 	strokeWeight(size);
// 	stroke(color);
// 	point(position.x, position.y);
// }
