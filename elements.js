// INTRO 
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start');
var buttonMenu = document.getElementById("menu");
var buttonPlay = document.getElementById('play');

// BOARD
const main = document.getElementById('main');
var board = document.getElementById('game-board');
var cell = document.querySelectorAll('.cell');
const endScreen = document.getElementById('end-screen');
const buttonInstructions = document.getElementById('instruction');
const instructions = document.getElementById('instructions');

// COUNTDOWN
const ready = document.getElementById('ready');
const countdownText = document.getElementById('countdown-text');
const countdown = document.getElementById('countdown');
const seconds = document.getElementById('seconds');

// DINOS 
const red1 = document.getElementById('red-one');
const yellow1 = document.getElementById('yellow-one');
const green1 = document.getElementById('green-one');
const blue1 = document.getElementById('blue-one');

var dinos1 = document.querySelectorAll('.dino-1');
var dinos2 = document.querySelectorAll('.dino-2');

const red2 = document.getElementById('red-two');
const yellow2 = document.getElementById('yellow-two');
const green2 = document.getElementById('green-two');
const blue2 = document.getElementById('blue-two');

var image1 = document.getElementById('dino-one-image');
var image2 = document.getElementById('dino-two-image');

// SCORE
var pointsP1 = document.getElementById('player-one-points');
var pointsP2 = document.getElementById('player-two-points');

// END
var winnerImage = document.getElementById('dino-winner');
const endText = document.getElementById('end-text'); 
var buttonPlayAgain = document.getElementById('play-again');

