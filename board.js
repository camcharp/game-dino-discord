class Board {
	constructor(size) {
		this.size = size;
	}
}

class Player {
	constructor(x, y, points, playerNumber) {
		this.x = x;
		this.y = y;
		this.points = points;
		/* 		this.movements = playerMovements[playerNumber]; 
		console.log(this.movements);*/
	}
}

var boardGame = new Board(10);
var playerOne = new Player(0, 0, 1, 1);
var playerTwo = new Player(9, 9, 1, 2);
