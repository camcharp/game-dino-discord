class Board {
	constructor(size) {
		this.size = size;
	}
}

/* const playerMovements = {
	1 : {
		'left' : 37,
		'right' : 39,
		'top' : 38,
		'bottom' : 40,
	},
	2 : {
		'left' : 81,
		'right' : 83,
		'top' : 90,
		'bottom' : 68,
	}
} */

class Player {
	constructor(x, y, points, playerNumber) {
		this.x = x;
		this.y = y;
		this.points = points;
		/* 		this.movements = playerMovements[playerNumber]; 
		console.log(this.movements);*/
	}

	/*  	move(event) {
		if (event.keyCode === this.movements['left'] && this.y > 0) {
			this.y -= 1;
		} else if (event.keyCode === this.movements['top'] && this.x > 0) {
			//top
			this.x -= 1;
		} else if (event.keyCode === this.movements['right'] && this.y < 9) {
			//right
			this.y += 1;
		} else if (event.keyCode === this.movements['bottom'] && this.x < 9) {
			//bottom
			this.x += 1;
		}
	} */
}

var boardGame = new Board(10);
var playerOne = new Player(0, 0, 1, 1);
var playerTwo = new Player(9, 9, 1, 2);
