// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

let chessBoard = [
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
	['x', 'x', 'x', 'x', 'x', 'x', 'x',],
];

var soundEfx = document.getElementById("soundEfx"); //soundfx
var soundWinner = "sounds/mixkit-excited-monkey-thumping-chest-97.wav";
var soundGameOver = "sounds/mixkit-cartoon-creature-pain-scream-101.wav";

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/Jungle.jpeg";


// border image L-R
var blReady = false;
var blImage = new Image();
blImage.onload = function () {
	blReady = true;
};
blImage.src = "images/BorderLeft1.jpg";

// border image T-B
var btReady = false;
var btImage = new Image();
btImage.onload = function () {
	btReady = true;
};
btImage.src = "images/BorderTop1.jpg";



// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
//heroImage.src = "images/hero.png";

heroImage.src = "images/Monkey.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
//monsterImage.src = "images/monster.png";
monsterImage.src = "images/banana.png";

// Monster image
var monsterReady1 = false;
var monsterImage1 = new Image();
monsterImage1.onload = function () {
	monsterReady1 = true;
};
//monsterImage.src = "images/monster.png";
monsterImage1.src = "images/watermellon.png";

//blackhole
var blackholeReady = false;
var blockholeImage = new Image();
blockholeImage.onload = function () {
	blackholeReady = true;
};
blockholeImage.src = "images/poacher.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};
var monster1 = {
	x: 0,
	y: 0
};

var black1 = {
	x: 0,
	y: 0
};

var black2 = {
	x: 0,
	y: 0
};

var black3 = {
	x: 0,
	y: 0
};
var monstersCaught = 0;
let died = false;

// Handle keyboard controls
var keysDown = {}; // object were we add up to 4 properties when keys go down
// and then delete them when the key goes up

addEventListener("keydown", function (e) {
	console.log(e.keyCode + " down")
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	console.log(e.keyCode + " up")
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;

	//Place the monster somewhere on the screen randomly
	// monster.x = 32 + (Math.random() * (canvas.width - 150));
	// monster.y = 32 + (Math.random() * (canvas.height - 148));

	placeItem(hero);
	placeItem(monster);
	placeItem(monster1);
	placeItem(black1);
	placeItem(black2);
	placeItem(black3);

	if (monstersCaught === 5) {
		soundEfx.src = soundWinner;
		alert("you won");
		soundEfx.play();
	}
};

let placeItem = function (character) {
	let X = 5;
	let Y = 6;
	let success = false;
	while (!success) {
		X = Math.floor(Math.random() * 9);
		Y = Math.floor(Math.random() * 9);
		if (chessBoard[X][Y] === 'x') {
			success = true;
		}
	}
	chessBoard[X][Y] = 'O';
	character.x = (X * 100) + 32;
	character.y = (Y * 100) + 32;
}

var gameOver = function () {
	died = true;
	soundEfx.src = soundGameOver;
	soundEfx.play();
	alert("You died");

};
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		if (hero.y < (32)) {
			hero.y = 32;
		}

	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		if (hero.y > (1000 - (81))) {
			hero.y = 1000 - 81;
		}
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if (hero.x < (21)) {
			hero.x = 21;
		}
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if (hero.x > (1000 - (32 + 55))) {
			hero.x = 1000 - (32 + 55);
		}
	}

	// Are they touching?
	//55 w  60 h
	// station 83 w 81 h
	if (
		hero.x + 5 <= (monster.x + 81)
		&& monster.x <= (hero.x + 55)
		&& hero.y <= (monster.y + 83)
		&& monster.y <= (hero.y + 52)
	) {
		soundEfx.play();
		++monstersCaught;
		reset();
	}
	if (
		hero.x + 5 <= (monster1.x + 81)
		&& monster1.x <= (hero.x + 55)
		&& hero.y <= (monster1.y + 83)
		&& monster1.y <= (hero.y + 52)
	) {
		soundEfx.play();
		++monstersCaught;
		reset();
	}

	if (
		hero.x + 5 <= (black1.x + 40)
		&& black1.x <= (hero.x + 30)
		&& hero.y <= (black1.y + 40)
		&& black1.y <= (hero.y + 30)
	) {
		gameOver()
	}

	if (
		hero.x + 5 <= (black2.x + 40)
		&& black2.x <= (hero.x + 30)
		&& hero.y <= (black2.y + 40)
		&& black2.y <= (hero.y + 30)
	) {
		gameOver()
	}

	if (
		hero.x + 5 <= (black3.x + 40)
		&& black3.x <= (hero.x + 30)
		&& hero.y <= (black3.y + 40)
		&& black3.y <= (hero.y + 30)
	) {
		gameOver()
	}
};
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (btReady) {
		ctx.drawImage(btImage, 0, 0);
		ctx.drawImage(btImage, 0, 1000 - 32);
	}

	if (blReady) {
		ctx.drawImage(blImage, 0, 0);
		ctx.drawImage(blImage, 1000 - 32, 0);
	}


	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (monsterReady1) {
		ctx.drawImage(monsterImage1, monster1.x, monster1.y);
	}

	if (blackholeReady) {
		ctx.drawImage(blockholeImage, black1.x, black1.y);
		ctx.drawImage(blockholeImage, black2.x, black2.y);
		ctx.drawImage(blockholeImage, black3.x, black3.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	if (monstersCaught === 5) {
		ctx.fillText("YOU WON! ", 32, 32);
	}
	else {
		ctx.fillText("Fruits Collected: " + monstersCaught, 32, 32);
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;

	if (monstersCaught < 5 && died == false) {
		//  Request to do this again ASAP
		requestAnimationFrame(main);
	}
};

// Cross-browser support for requestAnimationFrame
//var w = window;
//requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();