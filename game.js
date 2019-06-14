
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

var playerOneColor = null;
var playerTwoColor = null;

startButton.onclick = function startGame() {
	createMeterorites();

	startButton.classList.add('hidden');
	ready.classList.add('hidden');
	countdown.classList.remove('hidden');
	seconds.classList.remove('hidden');

	// compte à rebours avant le début du jeu
	var x = setInterval(function() {
		var seconds = document.getElementById('seconds');
		seconds.textContent -= 1;
		if (seconds.textContent == 0) {
			var audio = new Audio('./mix.mp3');
			audio.play();

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

	chooseColor();
};

function chooseColor() {
	var positionPlayerOne = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	var positionPlayerTwo = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

	var red1 = document.getElementById('red-one');
	var yellow1 = document.getElementById('yellow-one');
	var green1 = document.getElementById('green-one');
	var blue1 = document.getElementById('blue-one');

	var red2 = document.getElementById('red-two');
	var yellow2 = document.getElementById('yellow-two');
	var green2 = document.getElementById('green-two');
	var blue2 = document.getElementById('blue-two');

	var image1 = document.getElementById('dino-one-image');
	var image2 = document.getElementById('dino-two-image');

	red1.onclick = function() {
		if (playerTwoColor != 'red') {
			positionPlayerOne.classList.add('player-one-red', 'active-player-one-red', 'taken');
			playerOneColorCell = 'red';
			playerOneColor = 'red';
			image1.innerHTML = '<img src="./red_dino_short.gif" alt"dino-red">';
			removeColorChoose1();
		}
		if (playerOneColor === 'red') red2.classList.add('invisible');
	};

	yellow1.onclick = function() {
		if (playerTwoColor != 'yellow') {
			positionPlayerOne.classList.add('player-one-yellow', 'active-player-one-yellow', 'taken');
			playerOneColorCell = 'yellow';
			playerOneColor = 'yellow';
			image1.innerHTML = '<img src="./yellow_dino_short.gif" alt"dino-yellow">';
			removeColorChoose1();
		}
		if (playerOneColor === 'yellow') yellow2.classList.add('invisible');
	};

	green1.onclick = function() {
		if (playerTwoColor != 'green') {
			positionPlayerOne.classList.add('player-one-green', 'active-player-one-green', 'taken');
			playerOneColorCell = 'green';
			playerOneColor = 'green';
			image1.innerHTML = '<img src="./green_dino_short.gif" alt"dino-green">';
			removeColorChoose1();
		}
		if (playerOneColor === 'green') green2.classList.add('invisible');
	};

	blue1.onclick = function() {
		if (playerTwoColor != 'blue') {
			positionPlayerOne.classList.add('player-one-blue', 'active-player-one-blue', 'taken');
			playerOneColorCell = 'blue';
			playerOneColor = 'blue';
			image1.innerHTML = '<img src="./blue_dino_short.gif" alt"dino-blue">';
			removeColorChoose1();
		}
		if (playerOneColor === 'blue') blue2.classList.add('invisible');
	};

	red2.onclick = function() {
		if (playerOneColor != 'red') {
			positionPlayerTwo.classList.add('player-two-red', 'active-player-two-red', 'taken');
			playerTwoColor = 'red';
			playerTwoColorCell = 'red';
			image2.innerHTML = '<img src="./red_dino_short_left.gif" alt"dino-red">';
			removeColorChoose2();
		}
		if (playerTwoColor === 'red') red1.classList.add('invisible');
	};

	yellow2.onclick = function() {
		if (playerOneColor != 'yellow') {
			positionPlayerTwo.classList.add('player-two-yellow', 'active-player-two-yellow', 'taken');
			playerTwoColor = 'yellow';
			playerTwoColorCell = 'yellow';
			image2.innerHTML = '<img src="./yellow_dino_short_left.gif"  alt"dino-yellow">';
			removeColorChoose2();
		}
		if (playerTwoColor === 'yellow') yellow1.classList.add('invisible');
	};

	green2.onclick = function() {
		if (playerOneColor != 'green') {
			positionPlayerTwo.classList.add('player-two-green', 'active-player-two-green', 'taken');
			playerTwoColor = 'green';
			playerTwoColorCell = 'green';
			image2.innerHTML = '<img src="./green_dino_short_left.gif" alt"dino-green">';
			removeColorChoose2();
		}
		if (playerTwoColor === 'green') green1.classList.add('invisible');
	};

	blue2.onclick = function() {
		if (playerOneColor != 'blue') {
			positionPlayerTwo.classList.add('player-two-blue', 'active-player-two-blue', 'taken');
			playerTwoColor = 'blue';
			playerTwoColorCell = 'blue';
			image2.innerHTML = '<img src="./blue_dino_short_left.gif" alt"dino-blue">';
			removeColorChoose2();
		}
		if (playerTwoColor === 'blue') blue1.classList.add('invisible');
	};

	function removeColorChoose1() {
		var chooseYourColor = document.getElementById('dino-display-one');
		chooseYourColor.classList.add('invisible');
	}

	function removeColorChoose2() {
		var chooseYourColor2 = document.getElementById('dino-display-two');
		chooseYourColor2.classList.add('invisible');
	}

	var window = setInterval(function() {
		if (playerOneColor != null && playerTwoColor != null) {
			var dino1 = document.getElementById('dino-display-one');
			dino1.classList.add('hidden');
			var dino2 = document.getElementById('dino-display-two');
			dino2.classList.add('hidden');

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
	// items
}

function restart() {
	location.reload();
}

function move(event) {
	console.log(`player one position: ${playerOne.x}-${playerOne.y}`);
	console.log(`player two position: ${playerTwo.x}-${playerTwo.y}`);

	var oldPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	oldPositionP1.classList.remove(
		'active-player-one-red',
		'active-player-one-yellow',
		'active-player-one-green',
		'active-player-one-blue',
		'taken'
	);

	var oldPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	oldPositionP2.classList.remove(
		'active-player-two-red',
		'active-player-two-yellow',
		'active-player-two-green',
		'active-player-two-blue',
		'taken'
	);

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
	var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	var currentPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);

	if (playerOneColor === 'red') currentPositionP1.classList.add('active-player-one-red', 'taken');
	else if (playerOneColor === 'yellow') currentPositionP1.classList.add('active-player-one-yellow', 'taken');
	else if (playerOneColor === 'green') currentPositionP1.classList.add('active-player-one-green', 'taken');
	else if (playerOneColor === 'blue') currentPositionP1.classList.add('active-player-one-blue', 'taken');

	if (playerTwoColor === 'red') currentPositionP2.classList.add('active-player-two-red', 'taken');
	else if (playerTwoColor === 'yellow') currentPositionP2.classList.add('active-player-two-yellow', 'taken');
	else if (playerTwoColor === 'green') currentPositionP2.classList.add('active-player-two-green', 'taken');
	else if (playerTwoColor === 'blue') currentPositionP2.classList.add('active-player-two-blue', 'taken');

	// SI P1 EST RED
	if (currentPositionP1.classList.contains('player-two-yellow') && playerOneColor === 'red') {
		currentPositionP1.classList.replace('player-two-yellow', 'player-one-red');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-green') && playerOneColor === 'red') {
		currentPositionP1.classList.replace('player-two-green', 'player-one-red');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-blue') && playerOneColor === 'red') {
		currentPositionP1.classList.replace('player-two-blue', 'player-one-red');
		pointsP1 += 1;
		pointsP2 -= 1;
	}
	if (playerOneColor === 'red' && !currentPositionP1.classList.contains('player-one-red')) {
		currentPositionP1.classList.add('player-one-red');
		pointsP1 += 1;
	}

	// SI P1 EST YELLOW
	if (currentPositionP1.classList.contains('player-two-red') && playerOneColor === 'yellow') {
		currentPositionP1.classList.replace('player-two-red', 'player-one-yellow');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-green') && playerOneColor === 'yellow') {
		currentPositionP1.classList.replace('player-two-green', 'player-one-yellow');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-blue') && playerOneColor === 'yellow') {
		currentPositionP1.classList.replace('player-two-blue', 'player-one-yellow');
		pointsP1 += 1;
		pointsP2 -= 1;
	}
	if (playerOneColor === 'yellow' && !currentPositionP1.classList.contains('player-one-yellow')) {
		currentPositionP1.classList.add('player-one-yellow');
		pointsP1 += 1;
	}

	// SI P1 EST GREEN
	if (currentPositionP1.classList.contains('player-two-yellow') && playerOneColor === 'green') {
		currentPositionP1.classList.replace('player-two-yellow', 'player-one-green');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-red') && playerOneColor === 'green') {
		currentPositionP1.classList.replace('player-two-red', 'player-one-green');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-blue') && playerOneColor === 'green') {
		currentPositionP1.classList.replace('player-two-blue', 'player-one-green');
		pointsP1 += 1;
		pointsP2 -= 1;
	}
	if (playerOneColor === 'green' && !currentPositionP1.classList.contains('player-one-green')) {
		currentPositionP1.classList.add('player-one-green');
		pointsP1 += 1;
	}

	// SI P1 EST BLUE
	if (currentPositionP1.classList.contains('player-two-red') && playerOneColor === 'blue') {
		currentPositionP1.classList.replace('player-two-red', 'player-one-blue');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-yellow') && playerOneColor === 'blue') {
		currentPositionP1.classList.replace('player-two-yellow', 'player-one-blue');
		pointsP1 += 1;
		pointsP2 -= 1;
	} else if (currentPositionP1.classList.contains('player-two-green') && playerOneColor === 'blue') {
		currentPositionP1.classList.replace('player-two-green', 'player-one-blue');
		pointsP1 += 1;
		pointsP2 -= 1;
	}
	if (playerOneColor === 'blue' && !currentPositionP1.classList.contains('player-one-blue')) {
		currentPositionP1.classList.add('player-one-blue');
		pointsP1 += 1;
	}

	// SI P2 EST RED
	if (currentPositionP2.classList.contains('player-one-yellow') && playerTwoColor === 'red') {
		currentPositionP2.classList.replace('player-one-yellow', 'player-two-red');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-green') && playerTwoColor === 'red') {
		currentPositionP2.classList.replace('player-one-green', 'player-two-red');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-blue') && playerOneColor === 'red') {
		currentPositionP2.classList.replace('player-one-blue', 'player-two-red');
		pointsP2 += 1;
		pointsP1 -= 1;
	}
	if (playerTwoColor === 'red' && !currentPositionP2.classList.contains('player-two-red')) {
		currentPositionP2.classList.add('player-two-red');
		pointsP2 += 1;
	}

	// SI P2 EST YELLOW
	if (currentPositionP2.classList.contains('player-one-red') && playerTwoColor === 'yellow') {
		currentPositionP2.classList.replace('player-one-red', 'player-two-yellow');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-green') && playerTwoColor === 'yellow') {
		currentPositionP2.classList.replace('player-one-green', 'player-two-yellow');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-blue') && playerOneColor === 'yellow') {
		currentPositionP2.classList.replace('player-one-blue', 'player-two-yellow');
		pointsP2 += 1;
		pointsP1 -= 1;
	}
	if (playerTwoColor === 'yellow' && !currentPositionP2.classList.contains('player-two-yellow')) {
		currentPositionP2.classList.add('player-two-yellow');
		pointsP2 += 1;
	}

	// SI P2 EST GREEN
	if (currentPositionP2.classList.contains('player-one-red') && playerTwoColor === 'green') {
		currentPositionP2.classList.replace('player-one-red', 'player-two-green');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-yellow') && playerTwoColor === 'green') {
		currentPositionP2.classList.replace('player-one-yellow', 'player-two-green');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-blue') && playerTwoColor === 'green') {
		currentPositionP2.classList.replace('player-one-blue', 'player-two-green');
		pointsP2 += 1;
		pointsP1 -= 1;
	}
	if (playerTwoColor === 'green' && !currentPositionP2.classList.contains('player-two-green')) {
		currentPositionP2.classList.add('player-two-green');
		pointsP2 += 1;
	}

	// SI P2 EST BLUE
	if (currentPositionP2.classList.contains('player-one-red') && playerTwoColor === 'blue') {
		currentPositionP2.classList.replace('player-one-red', 'player-two-blue');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-yellow') && playerTwoColor === 'blue') {
		currentPositionP2.classList.replace('player-one-yellow', 'player-two-blue');
		pointsP2 += 1;
		pointsP1 -= 1;
	} else if (currentPositionP2.classList.contains('player-one-green') && playerTwoColor === 'blue') {
		currentPositionP2.classList.replace('player-one-green', 'player-two-blue');
		pointsP2 += 1;
		pointsP1 -= 1;
	}
	if (playerTwoColor === 'blue' && !currentPositionP2.classList.contains('player-two-blue')) {
		currentPositionP2.classList.add('player-two-blue');
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
		}, 5000);
		clearInterval(window);
	}, 4000);
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
		if (playerOneColor === 'red') {
			winnerImage.innerHTML = "<img src='./red_dino_short.gif' alt='dino-winner'>";
		} else if (playerOneColor === 'yellow') {
			winnerImage.innerHTML = "<img src='./yellow_dino_short.gif' alt='dino-winner'>";
		} else if (playerOneColor === 'green') {
			winnerImage.innerHTML = "<img src='./green_dino_short.gif' alt='dino-winner'>";
		} else if (playerOneColor === 'blue') {
			winnerImage.innerHTML = "<img src='./blue_dino_short.gif' alt='dino-winner'>";
		}
		endText.innerHTML = "Player 1, you win! You're the most ferocious dino out there.";
	} else if (winner === player2) {
		if (playerTwoColor === 'red') {
			winnerImage.innerHTML = "<img src='./red_dino_short.gif' alt='dino-winner'>";
		} else if (playerTwoColor === 'yellow') {
			winnerImage.innerHTML = "<img src='./yellow_dino_short.gif' alt='dino-winner'>";
		} else if (playerTwoColor === 'green') {
			winnerImage.innerHTML = "<img src='./green_dino_short.gif' alt='dino-winner'>";
		} else if (playerTwoColor === 'blue') {
			winnerImage.innerHTML = "<img src='./blue_dino_short.gif' alt='dino-winner'>";
		}
		endText.innerHTML = "Player 2, you win! You're the most ferocious dino out there.";
	} else if (winner === equality) {
		winnerImage.innerHTML =
			"<img src='./red_dino_running.gif' alt='red dino'><img src='./yellow_dino_running.gif' alt='yellow dino'><img src='./green_dino_running.gif' alt='green dino'><img src='./blue_dino_running.gif' alt='blue dino'>";
		endText.innerHTML = 'Dinosaurs can be diplomats, too. You have found a way to share your territory peacefully.';
	}
	buttonPlayAgain.onclick = function restart() {
		location.reload();
	};
}

// DISPLAY INSTRUCTIONS
var buttonInstructions = document.getElementById('instruction');
buttonInstructions.onclick = function displayInstruction() {
	var instructions = document.getElementById('instructions');
	instructions.classList.remove('hidden');

	startScreen.classList.add('hidden');

	var buttonMenu = document.getElementById("menu");
	buttonMenu.onclick = function restart() {
		location.reload();
	};
};
