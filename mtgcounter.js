//arrays for image URLs and bg color values
var symbolArray = ["img/w.png", "img/u.png", "img/b.png", "img/r.png", "img/g.png", "img/x.png"]; // w u b r g colorless
var symbolTransparentArray = ["img/tr/w.png", "img/tr/u.png", "img/tr/b.png", "img/tr/r.png", "img/tr/g.png", "img/tr/x.png"]; // w u b r g colorless
var bgColorArray = ["rgb(254, 251, 216)", "rgb(169, 224, 250)", "rgb(208, 208, 208)", "rgb(250, 169, 144)", "rgb(155, 210, 176)", "rgb(203, 161, 53)"]; //w u b r g gold

//inits for global vars
var numberOfPlayers;
var playersSoFar;
var players = [];
var customPlayer = {};

//DOM variables for screenspaces
var menuContainer = document.querySelector("#menuContainer");
var choiceContainer = document.querySelector("#choiceContainer");
var playContainer = document.querySelector("#playContainer");

//DOM variables for play screen
var playerNameDisplays = document.querySelectorAll(".pName");
var lifeTotalDisplays = document.querySelectorAll(".pLife");
var playerCountButtons = document.querySelectorAll(".playerCountBtn");
var customBtn = document.querySelector("#customBtn");
var playNowBtn = document.querySelector("#playNowBtn");

//DOM variables for customization screen
var nameLabel = document.querySelector("input[type='text']");
var lifeLabel = document.querySelector("input[type='number']");
var changeSymbol = document.querySelector("#symbolImg");
var colorPicker = document.querySelector("#choiceColorPicker");
var playerDone = document.querySelector("#playerDone");

//DOM variables for play screen
var p1Box = document.querySelector("#boxP1");
var p2Box = document.querySelector("#boxP2");
var p3Box = document.querySelector("#boxP3");
var p4Box = document.querySelector("#boxP4");
var playerBoxes = document.querySelectorAll(".playerBox");
var zeroLifeOptions = document.querySelectorAll(".zeroLife");
var resurrectButtons = document.querySelectorAll(".resBtn");
var endGameBtns = document.querySelectorAll(".endGameBtn");

function init() {
	numberOfPlayers = 2;
	playersSoFar = 0;

	players = [
		{
			name: "Player 1",
			lifeTotal: 20,
			isAlive: true,
			symbol: "img/tr/w.png",
			background: "#fefbd8"
		},
		{
			name: "Player 2",
			lifeTotal: 20,
			isAlive: true,
			symbol: "img/tr/u.png",
			background: "#a9e0fa"
		},
		{
			name: "Player 3",
			lifeTotal: 20,
			isAlive: true,
			symbol: "img/tr/b.png",
			background: "#d0d0d0"
		},
		{
			name: "Player 4",
			lifeTotal: 20,
			isAlive: true,
			symbol: "img/tr/r.png",
			background: "#faa990"
		}
	];

	customPlayer = {
		name: "Player 1",
		lifeTotal: 20,
		isAlive: true,
		symbol: "img/tr/w.png",
		background: "#fefbd8"
	}

	menuContainer.classList.remove("hidden");
	playContainer.classList.add("hidden");
	choiceContainer.classList.add("hidden");
	playerCountButtons[0].classList.add("selected");
	playerCountButtons[1].classList.remove("selected");
	playerCountButtons[2].classList.remove("selected");
	playContainer.classList.remove("player3Container");

	for (var i = 0; i < 4; i ++) {
		playerBoxes[i].classList.remove("playerBox2p","playerBox3p","playerBox4p","flipdiv","hidden");
		zeroLifeOptions[i].classList.add("hidden");
		playerNameDisplays[i].style.color = "#333";
		lifeTotalDisplays[i].classList.remove("pLife2P","pLife3P","pLife4P")
	}
}

init();

//Menu screen functionality
playNowBtn.addEventListener("click", function(){
	playScreen();
});

playerCountButtons.forEach(function(player, i) {
	playerCountButtons[i].addEventListener("click", function(){
		numberOfPlayers = i + 2;	//button 0 sets to 2 players, button 1 to 3, etc
		for (var b = 0; b < playerCountButtons.length; b++) {
			playerCountButtons[b].classList.remove("selected");
		}
		playerCountButtons[i].classList.add("selected");
	});
});

//Customize screen functionality
playerDone.addEventListener("click", function(){
	copyCustomToPlayer(playersSoFar);
	playersSoFar++;

	if (playersSoFar < numberOfPlayers) {
		resetCustomToDefaults(playersSoFar);
		customizeScreenInit(playersSoFar);
	} else {
		document.body.classList.remove("altBodyBG");
		playScreen();
	}
});

customBtn.addEventListener("click", function(){
	menuContainer.classList.add("hidden");
	playContainer.classList.add("hidden");
	choiceContainer.classList.remove("hidden");
	customizeScreenInit(playersSoFar);

});

function customizeScreenInit (whichPlayer) {
	nameLabel.value = players[whichPlayer].name;
	lifeLabel.value = players[whichPlayer].lifeTotal;
	changeSymbol.src = symbolArray[whichPlayer];
	colorPicker.style.backgroundColor = players[whichPlayer].background;
	playerDone.style.backgroundColor = players[whichPlayer].background;
	document.body.classList.toggle("altBodyBG");
}

function copyCustomToPlayer(whichPlayer) {
	players[whichPlayer].name = customPlayer.name;
	players[whichPlayer].lifeTotal = customPlayer.lifeTotal;
	players[whichPlayer].symbol = customPlayer.symbol;
	players[whichPlayer].background = customPlayer.background;
}

function resetCustomToDefaults(whichPlayer) {
	customPlayer.name = players[whichPlayer].name;
	customPlayer.lifeTotal = players[whichPlayer].lifeTotal;
	customPlayer.symbol = players[whichPlayer].symbol;
	customPlayer.background = players[whichPlayer].background;
}


//customizeScreenEvents

nameLabel.addEventListener("change", function() {
	customPlayer.name = nameLabel.value;
});

lifeLabel.addEventListener("change", function() {
	customPlayer.lifeTotal = lifeLabel.value;
});

changeSymbol.addEventListener("click", function() {
	var currentSymbolSrc = changeSymbol.src.slice(changeSymbol.src.indexOf("img"),changeSymbol.length);
	if (symbolArray.indexOf(currentSymbolSrc) === symbolArray.length - 1) {
		changeSymbol.src = symbolArray[0];
		customPlayer.symbol = symbolTransparentArray[0];
	} else {
		changeSymbol.src = symbolArray[symbolArray.indexOf(currentSymbolSrc) + 1];
		customPlayer.symbol = symbolTransparentArray[symbolArray.indexOf(currentSymbolSrc) + 1];
	}
});

colorPicker.addEventListener("click", function(){
	var currColor = colorPicker.style.backgroundColor;
	if (bgColorArray.indexOf(currColor) === bgColorArray.length - 1) {
		colorPicker.style.backgroundColor = bgColorArray[0];
		playerDone.style.backgroundColor = bgColorArray[0];
		customPlayer.background = bgColorArray[0];
	} else {
		colorPicker.style.backgroundColor = bgColorArray[bgColorArray.indexOf(currColor) + 1];
		playerDone.style.backgroundColor = bgColorArray[bgColorArray.indexOf(currColor) + 1];
		customPlayer.background = bgColorArray[bgColorArray.indexOf(currColor) + 1];			
	}
});

//GAMEPLAY FUNCTIONS
function playScreen() {
	initPlayScreen();
	menuContainer.classList.add("hidden");
	choiceContainer.classList.add("hidden");	
	playContainer.classList.remove("hidden");

	for (i = 0; i < playerBoxes.length; i++) {
		if (i > numberOfPlayers - 1) {
			playerBoxes[i].classList.add("hidden");
		}
	}
}

function initPlayScreen() {
	for (var i = 0; i < numberOfPlayers; i++) {
		playerNameDisplays[i].textContent = players[i].name;
		lifeTotalDisplays[i].textContent = players[i].lifeTotal;
		playerBoxes[i].style.backgroundImage = "url(" + players[i].symbol + ")";
		playerBoxes[i].style.backgroundSize = "contain";
		playerBoxes[i].style.backgroundRepeat = "no-repeat";
		playerBoxes[i].style.backgroundPosition = "center";
		playerBoxes[i].style.backgroundColor = players[i].background;

	}
	if (numberOfPlayers === 2) {
		playerBoxes[0].classList.add("playerBox2p","flipdiv");
		playerBoxes[1].classList.add("playerBox2p");
		lifeTotalDisplays[0].classList.add("pLife2P")
		lifeTotalDisplays[1].classList.add("pLife2P")

	} else if (numberOfPlayers === 3) {
		playerBoxes[0].classList.add("playerBox3p");
		playerBoxes[1].classList.add("playerBox3p","flipdiv");
		playerBoxes[2].classList.add("playerBox3p");
		playContainer.classList.add("player3Container");
		lifeTotalDisplays[0].classList.add("pLife3P")
		lifeTotalDisplays[1].classList.add("pLife3P")
		lifeTotalDisplays[2].classList.add("pLife3P")	
	
	} else if (numberOfPlayers === 4) {
		playerBoxes[0].classList.add("playerBox4p","flipdiv");
		playerBoxes[1].classList.add("playerBox4p","flipdiv");
		playerBoxes[2].classList.add("playerBox4p");
		playerBoxes[3].classList.add("playerBox4p");
		lifeTotalDisplays[0].classList.add("pLife4P")
		lifeTotalDisplays[1].classList.add("pLife4P")
		lifeTotalDisplays[2].classList.add("pLife4P")
		lifeTotalDisplays[3].classList.add("pLife4P")	
	}
}

function changeLife(event, id) {
	var x = event.clientX;
	var ele = document.getElementById("boxP" + (id+1));
	var rect = ele.getBoundingClientRect();
	var half = ((rect.left + rect.right) / 2);

	if (players[id].isAlive){
		if (playerBoxes[id].classList.contains("flipdiv")) {
			if(x < half) {
				addLife(id);
			}
			else {
				loseLife(id);
			}
		} else {
			if(x > half) {
				addLife(id);
			}
			else {
				loseLife(id);
			}			
		}
	}
}

function addLife (i) {
	flashColor(i, "green");
	players[i].lifeTotal++;
	lifeTotalDisplays[i].textContent = players[i].lifeTotal;
}

function loseLife (i) {
	flashColor(i, "#800000");
	players[i].lifeTotal--;
	lifeTotalDisplays[i].textContent = players[i].lifeTotal;
	checkIfDead(i);
}

function checkIfDead(i) {
	if (players[i].lifeTotal <= 0) { 
		players[i].isAlive = false;
		killPlayer(i);
	}
}

function killPlayer(i) {
	playerNameDisplays[i].textContent = players[i].name + " has died.";
	zeroLifeOptions[i].classList.remove("hidden");
	playerNameDisplays[i].style.color = "#fff";
	playerBoxes[i].style.backgroundColor = "#222";
}

endGameBtns.forEach(function(player, i) {
	endGameBtns[i].addEventListener("click", function(){
		init();
	});
});

resurrectButtons.forEach(function(player, i) {
	resurrectButtons[i].addEventListener("click", function(){
		revivePlayer(i);
	});
});

function revivePlayer(i) {
	addLife(i);
	addLife(i); //have to do it twice because "resurrect" exists on left side, meaning clicking it ALSO triggers a loseLife()
	players[i].isAlive = true;
	playerNameDisplays[i].textContent = players[i].name;
	zeroLifeOptions[i].classList.add("hidden");
	playerNameDisplays[i].style.color = "#333";
	playerBoxes[i].style.backgroundColor = players[i].background;
}

function flashColor (i, color) {
	lifeTotalDisplays[i].style.color = color;
	setTimeout(function(){
		lifeTotalDisplays[i].style.color = "#333";
	},40);
}