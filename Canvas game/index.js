// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);



// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";


// border image L-R
var blReady = false;
var blImage = new Image();
blImage.onload = function () {
	blReady = true;
};
blImage.src = "images/BorderLeft.jpg";

// border image T-B
var btReady = false;
var btImage = new Image();
btImage.onload = function () {
	btReady = true;
};
btImage.src = "images/BorderTop.jpg";



// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
//heroImage.src = "images/hero.png";

heroImage.src = "images/1shipsprite.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
//monsterImage.src = "images/monster.png";
monsterImage.src = "images/spacestation.png";

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
var monstersCaught = 0;

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
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	//Place the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 150));
	monster.y = 32 + (Math.random() * (canvas.height - 148));

	if(monstersCaught === 5) {
		alert("you won");

	}
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		if (hero.y < ( 32) ) {
			hero.y = 32;
		}

	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		if (hero.y > (1000 - ( 81) )) {
			hero.y = 1000 	 -81;
		}
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if (hero.x < ( 21) ) {
			hero.x = 21;
		}
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if (hero.x > ( 1000 - (32 +55 ) ) ) {
			hero.x = 1000 - (32 +55 );
		}
	}

	// Are they touching?
	//55 w  60 h
	// station 83 w 81 h
	if (
		hero.x+5 <= (monster.x + 81)
		&& monster.x <= (hero.x + 55)
		&& hero.y <= (monster.y + 83)
		&& monster.y <= (hero.y + 52)
	) {
		++monstersCaught;
		reset();
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
		ctx.drawImage(blImage, 1000-32, 0);
	} 


	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
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
	ctx.fillText("Space Stations Destroyed: " + monstersCaught, 32, 32);
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;

	if (monstersCaught < 5) {
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