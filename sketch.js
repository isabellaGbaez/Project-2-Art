/* Project 2- Art*/

let morningBg;
let noonBg;
let eveningBg;
let realBg;
let character;
let direction;
let posY;
let posX;
let sink;
let stove;
let couch;
let tv;
let shower;
let tasksDone;
let dayCounter;
let wall1;
let wall2;
let wall3;
let wall4;
let wall5;
let wall6;
let wall7;
let pixelFont;
let task1;
let task2;
let task3;
let task4;
let task5;
let task6;
let showerColor1;
let showerColor2;
let light;
let clothes;
let phone;
let button;
let textCount = 0;
let counter = 0;

function preload() {
	morningBg = loadImage('assets/morn-room.png');
	noonBg = loadImage('assets/reg-room.png');
	eveningBg = loadImage('assets/night-room.png');

	showerColor1 = loadImage('assets/bath-color1.png');
	showerColor2 = loadImage('assets/bath-color2.png');
	light = loadImage('assets/light-gradient.png');
	button = loadImage('assets/button.png');

	pixelFont = loadFont('assets/Minecraftia-Regular.ttf');
	
	list = loadImage('assets/notepad.png');
	phone = new Sprite(777, 425, 400, 500, 'none');
	phone.spriteSheet = 'assets/phone-sprite-sheet.png';
	sink = new Sprite(1067, 251, 75, 75, 'static');
	sink.image = 'assets/sink-color.png';
	stove = new Sprite(1236, 120, 166, 96, 'static');
	stove.image = 'assets/stove.png';
	couch = new Sprite(432, 408, 287, 95, 'static');
	couch.image = 'assets/couch.png';
	tv = new Sprite(468, 108, 167, 72, 'none');
	tv.image = 'assets/tv-reg.png';
	shower = new Sprite(1367, 733, 145, 167, 'static');
	shower.image = 'assets/shower.png';
	clothes = new Sprite(730, 231, 100, 75, 'none');
	clothes.image = 'assets/clothes.png';


	wall1 = new Sprite(865, 33, 1190, 15, 'static');
	wall1.color = color(255, 255, 255, 0);
	wall2 = new Sprite(275, 200, 15, 320, 'static');
	wall2.color = color(255, 255, 255, 0);
	wall3 = new Sprite(372, 465, 598, 12, 'static');
	wall3.color = color(255, 255, 255, 0);
	wall4 = new Sprite(83, 656, 20, 270, 'static');
	wall4.color = color(255, 255, 255, 0);
	wall5 = new Sprite(780, 827, 1350, 15, 'static');
	wall5.color = color(255, 255, 255, 0);
	wall6 = new Sprite(1452, 350, 20, 600, 'static');
	wall6.color = color(255, 255, 255, 0);
	wall7 = new Sprite(1187, 588, 500, 20, 'static');
	wall7.color = color(255, 255, 255, 0);

	character = new Sprite(windowWidth/2, windowHeight/2 +60, 117, 150 );
	character.spriteSheet = 'assets/spritesheet.png';

	character.offset.x = 2;
	//character.offset.y = 2;
	character.anis.frameDelay = 4;
	character.rotationLock = true;

	character.addAnis({
		up: { row: 1, frames: 4 },
		down: { row: 0, frames: 4 },
		left: { row: 2, frames: 2},
		right: { row: 3, frames: 2 },
		standR: { row: 3 },
		standL: { row: 2 },
		standD: { row: 0 },
		standU: { row: 1 },
		cooking: {row : 4, frames: 7},
		clear: {row: 5, frames: 4}
	});

	phone.anis.frameDelay = 8;
	phone.addAnis({
		load: {row: 0, frames: 10},
		msg1: {row: 1},
		switch1 : {row: 1, frames: 6},
		msg2: {row: 2},
		switch2 : {row: 2, frames: 7},
		msg3: {row: 3}
	});
	phone.visible = false;

	direction = "down";
	//allSprites.pixelPerfect = true;
}

function setup() {
    new Canvas(1536, 864);
    background(200);
	tasksDone = 0;
	dayCounter = 0;
	realBg = morningBg;
	task1 = false;
	task2 = false;
	task3 = false;
	task4 = false;
	task5 = false;
	task6 = false;
}

function update() {
	clear();
	if(kb.pressing('g')){
        direction = "up";
        character.changeAni('up');
		character.vel.y = -7;
    }
    else if (kb.pressing('d')){
        direction = "left";
        character.changeAni('left');
		character.vel.x = -7;
    }
    else if (kb.pressing('r')){
		direction = "right";
        character.changeAni('right');
		character.vel.x = 7;
    }
    else if (kb.pressing('f')){
		direction = "down";
        character.changeAni('down');
		character.vel.y = 7;
    }
    else{
        //character is still. facing last direction, but still
		character.vel.y = 0;
		character.vel.x = 0;
		switch(direction) {
			case "up":
				character.changeAni('standU');
				break;
			case "left":
				character.changeAni('standL');
				break;
			case "right":
				character.changeAni('standR');
				break;
			case "down":
				character.changeAni('standD');
				break;
			case "cooking":
				character.changeAni('cooking');
				break;
			case "clear":
				character.changeAni('clear');
				break;
		}
    }

	if (task1 == true && task2 == true && task3 == true && task4 == true && task5 == true){
		//change ani to sleep, play for a few seconds

		if (kb.pressed('a')){
			realBg = morningBg;
			dayCounter++;
			tasksDone = 0;
			if (dayCounter != 4){
				task1 = false;
				task2 = false;
				task3 = false;
				task4 = false;
				task5 = false;
				clothes.visible = true;
				sink.image = 'assets/sink-color.png';

				//reset tv
				//reset shower
				world.timeScale -= 0.25;
			}
		}
	}
	else if (character.collides(sink) || dist(character, sink) < 100){
		if (kb.pressed('a')){
			sink.image = 'assets/sink-reg.png';
			task1 = true;
			tasksDone++;
		}
	}
	else if (character.collides(clothes) || dist(character, clothes) < 150){
		if (kb.pressed('a')) {
			clothes.visible = false;
			task2 = true;
			tasksDone++;
		}
	}
	else if (character.collides(shower) || dist(character, shower) < 200){
		if(kb.pressed('a')) {
			direction = "clear";
			tasksDone++;
			task3 = true;
		}
	}
	else if (character.collided(stove) || dist(character, stove) < 150){
		//change ani to cook, play for a few seconds
		if(kb.pressed('a')) {
			direction = "cooking";
			tasksDone++;
			task4 = true;
		}
	}
	else if (character.collides(couch) || dist(character, couch) < 200){
		//change ani to watchTv, play for a few seconds
		if (kb.pressed('a')) {
			tasksDone++;
			task5 = true;
		}
	}
	else {
		//make it a new day & "slow time"
	}
	
	if (dayCounter == 5){
		realBg = noonBg;
		world.timeScale = 1;
		task6 = true;
		wall6.remove();
		phone.visible = true;
		if (kb.pressed('a') && textCount == 0) {
			phone.changeAni('load');
			textCount++;
		}
		else if (kb.pressed('a') && textCount == 1) {
			phone.changeAni('msg1');
			textCount++;
		}
		else if (kb.pressed('a') && textCount == 2) {
			phone.changeAni('msg2');
			textCount++;
		}
		else if (kb.pressed('a') && textCount == 3) {
			phone.changeAni('msg3');
			textCount++;
		}
		else if (kb.pressed('a') && textCount == 4) {
			phone.visible = false;
		}
	}
}

function draw() {
    background(realBg);
	image(list, 10, 10, 250, 313);
	textFont(pixelFont);
	textSize(15);

	if (dayCounter != 5){
		if (task1 == false)
			text('- wash the dishes', 33, 100);
		if (task2 == false)
			text('- clean the room', 33, 135);
		if (task3 == false)
			text('- shower', 33, 168);
		if (task4 == false)
			text('- cook something', 33, 200);
		if (task5 == false)
			text('- watch TV', 33, 232);
		if (task6 == false)
			text('- sleep', 33, 265);
		image(button, 108, 265, 25, 32);
	
		if (task1 == true && task2 == true && task3 == true && task4 == true && task5 == true)
			text('- Press         for a New\n    Day', 33, 297);
		else
			text('- Press         to complete\n    task', 33, 297);
	
		if (tasksDone == 2){
			realBg = noonBg;
		}
		else if (tasksDone == 4){
			realBg = eveningBg;
		}
	}

	if (dayCounter == 5){
		image(light, 1364, 457, 100, 118);
		image(button, 108, 265, 25, 32);
		text('- leave', 33, 200);
	}
}