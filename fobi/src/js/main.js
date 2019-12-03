"use strict";

let bottomImg;
let topImg;
let bgImg;
let characterImage;
let world = {};
let character = {};
let speed = 0;
let maxSpeed = 15;
let startRed = 260;
let endRed = 1085;
let redZone = endRed - startRed;
let shakeStart = 670;
let startLevelSound;
let caveSound;
let breathingSound;
let heartBeat;
let title;
let sentence;
let simplifica;

function preload() {
	bottomImg = loadImage('./assets/grotte_nede.png');
	topImg = loadImage("./assets/grotte_oppe.png");
	characterImage = loadImage("./assets/phobogif.gif")
	startLevelSound = loadSound("./assets/nyfobi.wav")
	caveSound = loadSound("./assets/vanndrypp_hule.wav");
	breathingSound = loadSound("./assets/tung_pust.mp3");
	heartBeat = loadSound("./assets/hjerteslag.wav");
	simplifica = loadFont("./assets/SIMPLIFICA_Typeface.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	bottomImg.loadPixels();
	initGame();
	bgImg = loadImage('./assets/bg.png');
	startLevelSound.setVolume(0.1);
	startLevelSound.play();
	caveSound.setVolume(0.1);
	caveSound.play();
	caveSound.setLoop(true);
	breathingSound.setVolume(1);
	heartBeat.setVolume(0.3);
	textFont(simplifica);
}

function initGame() {
	world.gravity = createVector(0, 0.6);
	world.position = createVector(0, 200);

	character.velocity = createVector(0, 0);
	character.position = createVector(30, 200);
}

function draw() {
	// draw background, level and text
	background(bgImg);
	image(topImg, 0 + world.position.x, 230 - world.position.y, topImg.width, topImg.height);
	image(bottomImg, 0 + world.position.x, 18 + world.position.y, bottomImg.width, bottomImg.height);
	textSize(40);
	fill("#941a28");
	text("Claustrophobia", 175, 335);
	textSize(25);
	text("fear of being in a small space, room, or confined area and unable to escape", 400, 525);

	// draw the character
	drawChar();

	// camera settings
	camera.zoom = 2;
	camera.position.y = 450;

	// characterspeed and movement
	character.velocity.y += world.gravity.y;
	speed /= 1.05;

	character.position.y += character.velocity.y;
	character.position.x += speed;

	cameraScroll();

	movementInputs();

	while(checkForCollision(character.position.x, character.position.y)) {
		character.position.y -= 1;
		character.velocity = createVector(0, 0);
	}

	if (character.position.x > startRed && character.position.x < endRed) {
		blackOut();
	}	

	if (character.position.x > endRed) {
		breathingSound.stop();
		heartBeat.stop();
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

function blackOut() {	
	let blackoutZone = Math.round((character.position.x - 260)/(redZone/100)*2.55);
	let blackoutColor = color(0, 0, 0, blackoutZone);
	fill(blackoutColor);
	rect(-100, 0, 1920, 720);
	if (breathingSound.isPlaying() == false && heartBeat.isPlaying() == false) {
		breathingSound.play();
		breathingSound.setLoop(true);
		heartBeat.play();
		heartBeat.setLoop(true);
	}
}

function movementInputs() {
	if (character.position.x > shakeStart && character.position.x < endRed) {
		character.position.y += Math.random() * 7
		heartBeat.rate(1.5);

		if ((keyIsPressed) && (keyCode == 39)) {
			speed += 0.05;
		}
		//left
		if ((keyIsPressed) && (keyCode == 37)) {
			speed -= 0.1;
		}
	} else {
		if ((keyIsPressed) && (keyCode == 39)) {
			speed += 0.1;
		}
		//left
		if ((keyIsPressed) && (keyCode == 37)) {
			speed -= 0.1;
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
}

function cameraScroll() {
	if (character.position.x < startRed && character.position.x < 960) {
		camera.position.x = 385;
	}
	if (character.position.x > startRed + 124) {
		camera.position.x = character.position.x;
	}
	if (character.position.x > 890) {
		camera.position.x = 890;
	}
}

function drawChar() {
	let posInWorld = character.position.copy();
	posInWorld.add(world.position);
	image(characterImage, character.position.x - 25, character.position.y + 175, 50, 50);
}
