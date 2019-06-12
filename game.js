// créer le board
init(playerOne, playerTwo);

const startButton = document.getElementById('start');
const countdown = document.getElementById('countdown');
const ready = document.getElementById('ready');
const seconds = document.getElementById('seconds');
const startScreen = document.getElementById('start-screen');
const main = document.getElementById('main');
const endScreen = document.getElementById('end-screen');
const countdownText = document.getElementById('countdown-text');
var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
var currentPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

startButton.onclick = function startGame() {
	createMeterorites();
	addCoins();

	startButton.classList.add('hidden');
	ready.classList.add('hidden');
	countdown.classList.remove('hidden');
	seconds.classList.remove('hidden');

	// compte à rebours avant le début du jeu
	var x = setInterval(function() {
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
				}, 3000);
			}
		}, 1000);

		document.addEventListener('keyup', move);
		{
		}
	}, 3000);
};

var buttonPlay = document.getElementById('play');
buttonPlay.onclick = function() {
	var main = document.getElementById('main');
	main.classList.remove('hidden');

	var startScreen = document.getElementById('start-screen');
	startScreen.classList.add('hidden');
};

/* function gameLoop() {
	setInterval(() => {}, 5000);
} */

function init(playerOne, playerTwo) {
	// board
	var board = document.getElementById('game-board');

	for (let i = 0; i < boardGame.size; i++) {
		for (let j = 0; j < boardGame.size; j++) {
			var cell = document.createElement('div');
			cell.className = 'cell';
			cell.id = `${i}-${j}`;
			board.appendChild(cell);
		}
	}

	// player1
	var positionPlayerOne = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	positionPlayerOne.classList.add('player-one', 'active-player-one', 'taken');

	// player1
	var positionPlayerTwo = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	positionPlayerTwo.classList.add('player-two', 'active-player-two', 'taken');

	// items
}

function restart() {
	location.reload();
}

function move(event) {
	console.log(`player one position: ${playerOne.x}-${playerOne.y}`);
	console.log(`player two position: ${playerTwo.x}-${playerTwo.y}`);

	var oldPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	oldPositionP1.classList.remove('active-player-one');

	var oldPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	oldPositionP2.classList.remove('active-player-two');

	var leftP1 = document.getElementById(`${playerOne.x}-${playerOne.y - 1}`);
	var topP1 = document.getElementById(`${playerOne.x - 1}-${playerOne.y}`);
	var rightP1 = document.getElementById(`${playerOne.x}-${playerOne.y + 1}`);
	var bottomP1 = document.getElementById(`${playerOne.x + 1}-${playerOne.y}`);

	var leftP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y - 1}`);
	var topP2 = document.getElementById(`${playerTwo.x - 1}-${playerTwo.y}`);
	var rightP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y + 1}`);
	var bottomP2 = document.getElementById(`${playerTwo.x + 1}-${playerTwo.y}`);

	cell = document.querySelectorAll('.cell');

	//left
	if (event.keyCode === 81 && playerOne.y > 0) {
		if (
			`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x}-${playerOne.y - 1}` &&
			!leftP1.classList.contains('meteorite')
		) {
			playerOne.y -= 1;
		}
	} else if (event.keyCode === 90 && playerOne.x > 0) {
		//top
		if (
			`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x - 1}-${playerOne.y}` &&
			!topP1.classList.contains('meteorite')
		)
			playerOne.x -= 1;
	} else if (event.keyCode === 68 && playerOne.y < 9) {
		//right
		if (
			`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x}-${playerOne.y + 1}` &&
			!rightP1.classList.contains('meteorite')
		)
			playerOne.y += 1;
	} else if (event.keyCode === 83 && playerOne.x < 9) {
		//bottom
		if (
			`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x + 1}-${playerOne.y}` &&
			!bottomP1.classList.contains('meteorite')
		)
			playerOne.x += 1;
	}

	// left
	if (event.keyCode === 37 && playerTwo.y > 0) {
		if (
			`${playerOne.x}-${playerOne.y}` != `${playerTwo.x}-${playerTwo.y - 1}` &&
			!leftP2.classList.contains('meteorite')
		)
			playerTwo.y -= 1;
	} else if (event.keyCode === 38 && playerTwo.x > 0) {
		//top
		if (
			`${playerOne.x}-${playerOne.y}` != `${playerTwo.x - 1}-${playerTwo.y}` &&
			!topP2.classList.contains('meteorite')
		)
			playerTwo.x -= 1;
	} else if (event.keyCode === 39 && playerTwo.y < 9) {
		//right
		if (
			`${playerOne.x}-${playerOne.y}` != `${playerTwo.x}-${playerTwo.y + 1}` &&
			!rightP2.classList.contains('meteorite')
		)
			playerTwo.y += 1;
	} else if (event.keyCode === 40 && playerTwo.x < 9) {
		//bottom
		if (
			`${playerOne.x}-${playerOne.y}` != `${playerTwo.x + 1}-${playerTwo.y}` &&
			!bottomP2.classList.contains('meteorite')
		)
			playerTwo.x += 1;
	}

	color();
}

var pointsP1 = 1;
var pointsP2 = 1;

function color() {
	// player 1
	var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	currentPositionP1.classList.add('active-player-one', 'taken');
	if (currentPositionP1.classList.contains('player-two')) {
		currentPositionP1.classList.replace('player-two', 'player-one');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (!currentPositionP1.classList.contains('player-one')) {
		currentPositionP1.classList.add('player-one');
		pointsP1 += 1;
	}

	// player 2
	var currentPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	currentPositionP2.classList.add('active-player-two', 'taken');
	if (currentPositionP2.classList.contains('player-one')) {
		currentPositionP2.classList.replace('player-one', 'player-two');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (!currentPositionP2.classList.contains('player-two')) {
		currentPositionP2.classList.add('player-two');
		pointsP2 += 1;
	}

	countPoints();
}

function countPoints() {
	var displayPointsP1 = document.getElementById('player-one-points');
	displayPointsP1.textContent = pointsP1;

	var displayPointsP2 = document.getElementById('player-two-points');
	displayPointsP2.textContent = pointsP2;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random(min) * Math.floor(max));
}

function createMeterorites() {
	var randomCell1 = document.getElementById(`${getRandomInt(0, 10)}-${getRandomInt(0, 10)}`);
	if (randomCell1 != currentPositionP1 && randomCell1 != currentPositionP2) {
		randomCell1.classList.add('meteorite', 'taken');
	}
	var randomCell2 = document.getElementById(`${getRandomInt(0, 10)}-${getRandomInt(0, 10)}`);
	if (randomCell2 != currentPositionP1 && randomCell2 != currentPositionP2) {
		randomCell2.classList.add('meteorite', 'taken');
	}

	window.setInterval(function() {
		setTimeout(function() {
			var randomCell3 = document.getElementById(`${getRandomInt(0, 10)}-${getRandomInt(0, 10)}`);
			if (randomCell3 != currentPositionP1 && randomCell3 != currentPositionP2) {
				randomCell3.classList.add('meteorite', 'taken');
			}
		}, 2000);
	}, 1600);
	clearInterval(window);
}

function addCoins() {
	var randomCell1 = document.getElementById(`${getRandomInt(0, 10)}-${getRandomInt(0, 10)}`);
	var randomCell2 = document.getElementById(`${getRandomInt(0, 10)}-${getRandomInt(0, 10)}`);

	var pointsP1 = document.getElementById('player-one-points');
	var pointsP2 = document.getElementById('player-two-points');

	setTimeout(function() {
		if (!randomCell1.classList.contains('taken')) {
			randomCell1.classList.add('coin', 'taken');
		}
		if (!randomCell1.classList.contains('taken')) {
			randomCell2.classList.add('coin', 'taken');
		}
	}, getRandomInt(10000, 12000));

	var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	var currentPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

	if (currentPositionP1 === randomCell1) {
		randomCell1.classList.remove('coin', 'taken');
		pointsP1 += 5;
	}
	if (currentPositionP2 === randomCell1) {
		randomCell1.classList.remove('coin', 'taken');
		pointsP2 += 5;
	}

	if (currentPositionP1 === randomCell2) {
		randomCell2.classList.remove('coin', 'taken');
		pointsP1 += 5;
	}
	if (currentPositionP2 === randomCell2) {
		randomCell2.classList.remove('coin', 'taken');
		pointsP2 += 5;
	}
}

function determineWinner() {
	player1 = 'Player 1';
	player2 = 'Player 2';
	equality = 'equality';
	winner = null;

	// NOM DU GAGNANT EN FONCTION DES POINTS
	var pointsP1 = document.getElementById('player-one-points');
	var pointsP2 = document.getElementById('player-two-points');

	if (pointsP1.innerHTML > pointsP2.innerHTML) winner = player1;
	if (pointsP1.innerHTML < pointsP2.innerHTML) winner = player2;
	if (pointsP1.innerHTML === pointsP2.innerHTML) winner = equality;
	console.log(winner);
	winnerImage = document.getElementById('dino-winner');

	// PAGES A CACHER/AFFICHER
	main.classList.add('hidden');

	endScreen.classList.remove('hidden');

	var endText = document.getElementById('end-text');
	endText.classList.remove('hidden');

	var buttonPlayAgain = document.getElementById('play-again');
	buttonPlayAgain.classList.remove('hidden');

	winnerImage.classList.remove('hidden');

	if (winner === player1) {
		winnerImage.innerHTML = "<img src='./green_dino_short.gif' alt='dino-winner'>";
		endText.innerHTML = "Player 1, you win! There's no dino more ferocious than you.";
	} else if (winner === player2) {
		winnerImage.innerHTML = "<img src='./yellow_dino_short.gif' alt='dino-winner'>";
		endText.innerHTML = "Player 2, you win! There's no dino more ferocious than you.";
	} else if (winner === equality) {
		winnerImage.innerHTML =
			"<img src='./green_dino_short.gif' alt='dino-winner'> <img src='./yellow_dino_short.gif' alt='dino-winner'>";
		endText.innerHTML = 'Dinosaurs can be diplomats, too. You have found a way to share your territory peacefully.';
	}

	buttonPlayAgain.onclick = function restart() {
		location.reload();
	};
}
