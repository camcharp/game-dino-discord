var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
var currentPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

const playAudio = (sound) => new Audio(sound).play();
const restart = () => location.reload();
const getRandomInt = (min, max) => Math.floor(Math.random(min) * Math.floor(max));
const displayInstruction = () => {
	instructions.classList.remove('hidden');
	startScreen.classList.add('hidden');
};

buttonInstructions.onclick = () => {
	displayInstruction();
	playAudio('./music/bip.wav');
}

function init() {
	for (let i = 0; i < boardGame.size; i++) {
		for (let j = 0; j < boardGame.size; j++) {
			var cell = document.createElement('div');
			cell.className = 'cell';
			cell.id = `${i}-${j}`;
			board.appendChild(cell);
		}
	}
}
init(); // let's create the board

startButton.onclick = function startGame() {
	playAudio('./music/bip.wav');
	createMeterorites();
	startButton.classList.add('hidden');
	ready.classList.add('hidden');
	countdown.classList.remove('hidden');
	seconds.classList.remove('hidden');

	var x = setInterval(function() { 	// compte à rebours avant le début du jeu
		var seconds = document.getElementById('seconds');
		seconds.textContent -= 1;
		if (seconds.textContent == 0) {
			seconds.innerHTML = 'Go go go!';
			setTimeout(function() {
				seconds.innerHTML = '';
				countdownText.classList.remove('hidden');
			}, 1500);
			clearInterval(x);
		}
	}, 1000);

	// compte à rebours du jeu
	setTimeout(() => {
		var y = setInterval(function() {
			var countdownDisplay = document.getElementById('countdown');
			countdownDisplay.textContent -= 1;
			if (countdownDisplay.textContent == 0) {
				document.removeEventListener('keyup', move);
				clearInterval(y);
				setTimeout(function() {
					determineWinner();
				}, 4000);
			}
		}, 1000);
		document.addEventListener('keyup', move);
	}, 3000);
};

buttonPlay.onclick = function() {
	main.classList.remove('hidden');
	startScreen.classList.add('hidden');
	playAudio('./music/bip.wav');
	chooseColor();
};

function chooseColor() {
	var positionPlayerOne = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	var positionPlayerTwo = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

	function setPlayerOne(color) {
		positionPlayerOne.classList.add(`player-one-${color}`, `active-player-one-${color}`, `taken`);
		playerOneColorCell = `${color}`;
		playerOne.color = `${color}`;
		playerOne.activeClass = `active-player-one-${playerOne.color}`;
		image1.innerHTML = `<img src="./images/${color}_dino_short.gif" alt"dino-${color}">`;
	}

	function setPlayerTwo(color) {
		positionPlayerTwo.classList.add(`player-two-${color}`, `active-player-two-${color}`, `taken`);
		playerTwoColorCell = `${color}`;
		playerTwo.color = `${color}`;
		playerTwo.activeClass = `active-player-two-${playerTwo.color}-right`;
		image2.innerHTML = `<img src="./images/${color}_dino_short_left.gif" alt"dino-${color}">`;
	}

	for (const dino of dinos1) {
		dino.addEventListener('click', function() {
			playAudio('./music/bip.wav');
			setPlayerOne(`${dino.dataset.color}`);
			removeChooseDinoMenu(1);
		})
	}

	red1.onclick = function() {
		red2.classList.add('invisible');
	};

	yellow1.onclick = function() {
		yellow2.classList.add('invisible');
	};

	green1.onclick = function() {
		green2.classList.add('invisible');
	};

	blue1.onclick = function() {
		blue2.classList.add('invisible');
	};

	for (const dino of dinos2) {
		dino.addEventListener('click', function() {
			playAudio('./music/bip.wav');
			setPlayerTwo(`${dino.dataset.color}`);
			removeChooseDinoMenu(2);
		})
	}

	red2.onclick = function() {
		red1.classList.add('invisible');
	};

	yellow2.onclick = function() {
		yellow1.classList.add('invisible');
	};

	green2.onclick = function() {
		green1.classList.add('invisible');
	};

	blue2.onclick = function() {
		blue1.classList.add('invisible');
	};

	const removeChooseDinoMenu = (playerNumber) => document.getElementById(`dino-display-${playerNumber}`).classList.add('invisible');

	var window = setInterval(function() {
		if (playerOne.color && playerTwo.color) {
			document.getElementById('dino-display-1').classList.add('hidden');
			document.getElementById('dino-display-2').classList.add('hidden');

			var buttonStart = document.getElementById('start');
			buttonStart.classList.remove('hidden');

			var ready = document.getElementById('ready');
			ready.classList.remove('hidden');

			var pointsP1 = document.getElementById('player-one-text-points');
			pointsP1.classList.remove('hidden');

			var pointsP2 = document.getElementById('player-two-text-points');
			pointsP2.classList.remove('hidden');

			var textP1 = document.getElementById('player-one-text');
			textP1.classList.remove('hidden');

			var textP2 = document.getElementById('player-two-text');
			textP2.classList.remove('hidden');

			var image1 = document.getElementById('dino-one-image');
			image1.classList.remove('hidden');

			var image2 = document.getElementById('dino-two-image');
			image2.classList.remove('hidden');

			clearInterval(window);
		}
	}, 100);
}

function placeMeteorite(){
	var randomCell = document.getElementById(`${getRandomInt(0, 10)}-${getRandomInt(0, 10)}`);
	if (randomCell != currentPositionP1 && randomCell != currentPositionP2) {
		randomCell.classList.add('meteorite', 'taken');
	}
}

function createMeterorites() {
	for (i = 1; i < 3; i++) { // meteorites at the beginning of the game
		placeMeteorite();
	}
	window.setInterval(function() { // random meteorites during the game
		setTimeout(function() {
			placeMeteorite();
		}, 5000);
		clearInterval(window);
	}, 4000);
}

function move(event) {
	var oldPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	oldPositionP1.classList.remove(`active-player-one-${playerOne.color}`,`active-player-one-${playerOne.color}-left`,'taken');

	var oldPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	oldPositionP2.classList.remove(`active-player-two-${playerTwo.color}`,`active-player-two-${playerTwo.color}-right`,'taken');

	var leftP1 = document.getElementById(`${playerOne.x}-${playerOne.y - 1}`);
	var topP1 = document.getElementById(`${playerOne.x - 1}-${playerOne.y}`);
	var rightP1 = document.getElementById(`${playerOne.x}-${playerOne.y + 1}`);
	var bottomP1 = document.getElementById(`${playerOne.x + 1}-${playerOne.y}`);

	var leftP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y - 1}`);
	var topP2 = document.getElementById(`${playerTwo.x - 1}-${playerTwo.y}`);
	var rightP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y + 1}`);
	var bottomP2 = document.getElementById(`${playerTwo.x + 1}-${playerTwo.y}`);

	if (event.keyCode === 81 && playerOne.y > 0) { //left
		playAudio('./music/move.wav');
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x}-${playerOne.y - 1}` && !leftP1.classList.contains('meteorite')) playerOne.y -= 1;
		playerOne.activeClass = `active-player-one-${playerOne.color}-left`;
	} else if (event.keyCode === 90 && playerOne.x > 0) { //top
		playAudio('./music/move.wav');
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x - 1}-${playerOne.y}` && !topP1.classList.contains('meteorite')) playerOne.x -= 1;
		playAudio('./music/move.wav');
	} else if (event.keyCode === 68 && playerOne.y < 9) { //right
		playAudio('./music/move.wav');
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x}-${playerOne.y + 1}` && !rightP1.classList.contains('meteorite')) playerOne.y += 1;
		playerOne.activeClass = `active-player-one-${playerOne.color}`
	} else if (event.keyCode === 83 && playerOne.x < 9) { //bottom
		playAudio('./music/move.wav');
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x + 1}-${playerOne.y}` && !bottomP1.classList.contains('meteorite')) playerOne.x += 1;
	}

	if (event.keyCode === 37 && playerTwo.y > 0) { // left
		playAudio('./music/move.wav');
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x}-${playerTwo.y - 1}` && !leftP2.classList.contains('meteorite')) playerTwo.y -= 1;
		playerTwo.activeClass = `active-player-two-${playerTwo.color}`;
	} else if (event.keyCode === 38 && playerTwo.x > 0) { //top
		playAudio('./music/move.wav');
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x - 1}-${playerTwo.y}` && !topP2.classList.contains('meteorite')) playerTwo.x -= 1;
	} else if (event.keyCode === 39 && playerTwo.y < 9) { //right
		playAudio('./music/move.wav');
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x}-${playerTwo.y + 1}` && !rightP2.classList.contains('meteorite')) playerTwo.y += 1;
		playerTwo.activeClass = `active-player-two-${playerTwo.color}-right`;
	} else if (event.keyCode === 40 && playerTwo.x < 9) { //bottom
		playAudio('./music/move.wav');
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x + 1}-${playerTwo.y}` && !bottomP2.classList.contains('meteorite')) playerTwo.x += 1;
	}
	color();
}

function displayPoints() {
	document.getElementById('player-one-points').textContent = playerOne.points;
	document.getElementById('player-two-points').textContent = playerTwo.points;
}

function color() {
	var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	var currentPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

	currentPositionP1.classList.add(`${playerOne.activeClass}`, 'taken');
	currentPositionP2.classList.add(`${playerTwo.activeClass}`, 'taken');

	if (currentPositionP1.classList.contains(`player-two-${playerTwo.color}`)) {
		currentPositionP1.classList.replace(`player-two-${playerTwo.color}`, `player-one-${playerOne.color}`);
		playerOne.points += 1;
		playerTwo.points -= 1;
	} else if (!currentPositionP1.classList.contains(`player-one-${playerOne.color}`)) {
		currentPositionP1.classList.add(`player-one-${playerOne.color}`);
		playerOne.points += 1;
	}

	if (currentPositionP2.classList.contains(`player-one-${playerOne.color}`)) {
		currentPositionP2.classList.replace(`player-one-${playerOne.color}`, `player-two-${playerTwo.color}`);
		playerTwo.points += 1;
		playerOne.points -= 1;
	} else if (!currentPositionP2.classList.contains(`player-two-${playerTwo.color}`)) {
		currentPositionP2.classList.add(`player-two-${playerTwo.color}`);
		playerTwo.points += 1;
	}
	displayPoints();
}

function determineWinner() {
	main.classList.add('hidden');
	endScreen.classList.remove('hidden');
	endText.classList.remove('hidden');
	buttonPlayAgain.classList.remove('hidden');
	winnerImage.classList.remove('hidden');
	if (playerOne.points > playerTwo.points) {
		winnerImage.innerHTML = `<img src='./images/${playerOne.color}_dino_short.gif' alt='dino-winner'>`;
		endText.innerHTML = "Player 1, you win! You're the most ferocious dino out there.";
	} else if (playerOne.points < playerTwo.points) {
		winnerImage.innerHTML = `<img src='./images/${playerTwo.color}_dino_short.gif' alt='dino-winner'>`;
		endText.innerHTML = "Player 2, you win! You're the most ferocious dino out there.";
	} else {
		winnerImage.innerHTML = "<img src='./images/red_dino_running.gif' alt='red dino'><img src='./images/yellow_dino_running.gif' alt='yellow dino'><img src='./images/green_dino_running.gif' alt='green dino'><img src='./images/blue_dino_running.gif' alt='blue dino'>";
		endText.innerHTML = 'Dinosaurs can be diplomats too. You have found a way to share your territory peacefully.';	
	}
}

buttonPlayAgain.onclick = () => {
	restart();
	playAudio('./music/bip.wav');
}

buttonMenu.onclick = () => restart();