var playerTurn = false;
var characters = ["-", "X", "O"];
var playerChar = 0;
var computerChar = 0;
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var wins = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
var turn = 0;

function clicked(n) {
	if (playerTurn == true && board[n] == 0) {
		document.getElementById(n.toString()).innerHTML = characters[playerChar];
		playerTurn = false;
		board[n] = playerChar;
		turn ++;
		if (winCheck()) {
			document.getElementById("gameText").innerHTML = "You Win! Restarting in 3 seconds";
			setTimeout(function (){newGame(playerChar);}, 3000);
		} else {
			if (turn == 9){
				console.log("Tie Game!");
			}else{
				document.getElementById("gameText").innerHTML = "Please Wait";
				setTimeout(function (){computerTurn();}, 500);
			}
		}
	}
}

function newGame(player) {
	reset();
	playerChar = player;
	if (player == 2) {
		computerChar = 1;
		playerTurn = false;
		computerTurn();
	} else {
		playerTurn = true;
		computerChar = 2;
		document.getElementById("gameText").innerHTML = "Your Turn!";
	}
}

function computerTurn() {
	// will infinite loop if called with a full board
	var place;
	place = Math.floor(Math.random() * 9);
	while (board[place] != 0) {
		place = Math.floor(Math.random() * 9);
	}
	document.getElementById(place.toString()).innerHTML = characters[computerChar];
	board[place] = computerChar;
	turn ++;
	if(winCheck()){
		document.getElementById("gameText").innerHTML = "You Lose! Restarting in 3 seconds";
		setTimeout(function (){newGame(playerChar);}, 3000);
	}else if (turn == 9){
		console.log("Tie Game!");
	}else{
		document.getElementById("gameText").innerHTML = "Your Turn";
		playerTurn = true;
	}
}

function reset() {
	playerTurn = false;
	var buttons = document.getElementsByClassName("gameButton");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = "-";
	}
	board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	playerChar = 0;
	computerChar = 0;
	turn = 0;
	gameText = "Press a button to start a new game. X goes first.";
}

function winCheck() {
	//this is 50% code, 50% magic
	for (var i = 0; i < wins.length; i++) {
		for (var j = 1; j <= 2; j++) {
			var wc = 0; //if this goes to 3, you've made 3 in a row.
			for (var k = 0; k < wins[i].length; k++) {
				if (board[wins[i][k]] == j) {
					wc += 1;
				}
			}
			if (wc == 3) {
				return true;
			}
		}
	}
	return false;
}