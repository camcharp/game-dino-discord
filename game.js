var buttonPlay = document.getElementById('play');
buttonPlay.onclick = function() {
	var main = document.getElementById('main');
	main.classList.remove('hidden');

	var startScreen = document.getElementById('start-screen');
	startScreen.classList.add('hidden');
};

init(playerOne, playerTwo);

/* setTimeout(() => {
		setInterval(countdown(), 1000);
	}, 3000); */

const startButton = document.getElementById('start');
const countdown = document.getElementById('countdown');
const ready = document.getElementById('ready');
const seconds = document.getElementById('seconds');

startButton.onclick = function startGame() {
	startButton.classList.add('hidden');
	ready.classList.add('hidden');
	countdown.classList.remove('hidden');
	seconds.classList.remove('hidden');

	var x = setInterval(function() {
		var seconds = document.getElementById('seconds');
		seconds.textContent -= 1;
		if (seconds.textContent == 0) {
			seconds.innerHTML = 'Go go go!';
			clearInterval(x);
		}
	}, 1000);

	setTimeout(() => {
		var y = setInterval(function() {
			var countdownDisplay = document.getElementById('countdown');
			countdownDisplay.textContent -= 1;
			if (countdownDisplay.textContent == 0) {
				document.removeEventListener('keyup', move);
				clearInterval(y);
			}
		}, 1000);

		document.addEventListener('keyup', move);
		{
		}
	}, 3000);

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
	positionPlayerOne.classList.add('player-one', 'active-player-one');

	// player1
	var positionPlayerTwo = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	positionPlayerTwo.classList.add('player-two', 'active-player-two');
}

function move(event) {
	console.log(`player one position: ${playerOne.x}-${playerOne.y}`);
	console.log(`player two position: ${playerTwo.x}-${playerTwo.y}`);

	var oldPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	oldPositionP1.classList.remove('active-player-one');

	var oldPositionP2 = document.getElementById(`${playerTwo.x}-${playerTwo.y}`);
	oldPositionP2.classList.remove('active-player-two');

	//left
	if (event.keyCode === 81 && playerOne.y > 0) {
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x}-${playerOne.y - 1}`) {
			playerOne.y -= 1;
		}
	} else if (event.keyCode === 90 && playerOne.x > 0) {
		//top
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x - 1}-${playerOne.y}`) playerOne.x -= 1;
	} else if (event.keyCode === 68 && playerOne.y < 9) {
		//right
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x}-${playerOne.y + 1}`) playerOne.y += 1;
	} else if (event.keyCode === 83 && playerOne.x < 9) {
		//bottom
		if (`${playerTwo.x}-${playerTwo.y}` != `${playerOne.x + 1}-${playerOne.y}`) playerOne.x += 1;
	}

	// left
	if (event.keyCode === 37 && playerTwo.y > 0) {
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x}-${playerTwo.y - 1}`) playerTwo.y -= 1;
	} else if (event.keyCode === 38 && playerTwo.x > 0) {
		//top
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x - 1}-${playerTwo.y}`) playerTwo.x -= 1;
	} else if (event.keyCode === 39 && playerTwo.y < 9) {
		//right
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x}-${playerTwo.y + 1}`) playerTwo.y += 1;
	} else if (event.keyCode === 40 && playerTwo.x < 9) {
		//bottom
		if (`${playerOne.x}-${playerOne.y}` != `${playerTwo.x + 1}-${playerTwo.y}`) playerTwo.x += 1;
	}

	color();
}

var pointsP1 = 1;
var pointsP2 = 1;
function color() {
	// player 1
	var currentPositionP1 = document.getElementById(`${playerOne.x}-${playerOne.y}`);
	currentPositionP1.classList.add('active-player-one');
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
	currentPositionP2.classList.add('active-player-two');
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

var winner = null;

function determineWinner() {
	player1 = "Player 1"
	player2 = "Player 2"
	var P1 = document.getElementById('player-one-points');
	var P2 = document.getElementById('player-two-points');

	if (P1.innerHTML > P2.innerHTML) winner = player1;
	if (P1.innerHTML < P2.innerHTML) winner = player2;
	console.log(winner);

	var main = document.getElementById('main');
	main.classList.add('hidden');


	var endScreen = document.getElementById('end-screen');
	var winnerName = document.getElementById('winner');
	winner.innerHTML = winner;
}
