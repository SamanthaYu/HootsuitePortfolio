/* Instead of asking the player how many cards they would like to draw, they just keep on pressing the "hit" button to draw a card (I thought that this would be easier for the player, and that they could change their bet before drawing any cards).
I changed the loop, so that the computer will continue to draw cards until it either goes over 21 or has a higher total than the player.

What I added:
	The money aspect:
		I added radio buttons and a prompt box when the player selects "Choose your own value"
			Different alerts pop up:
				If the player types in a value that is not a number (used isNaN()), less than 1, more than they have, or has a decimal in it (used indexOf()).
			If the player clicks cancel, it automatically selects the first radio button
		If after a certain round, the player has less money than they had previously bet, the highest possible amount is selected.
		If the player goes bankrupt, the game ends.
			Used an absolute function, so that the alerts can say "You lost $____ amount", and not "You won $-____ amount"
	
	When the game ends:
		Once the player played ten rounds, a confirm box pops up saying that the game has ended
			If the player clicks "yes", another confirm box asks if they would like to restart with the same amount they finished with or the $500 they started with.
			If the player clicks "no", the window will refresh automatically by using the function location.reload(true);
*/
yourTotal = 0
yourWin = 0
compWin = 0
compLoss = 0
yourLoss = 0
numRounds = 0
yourOriginalMoneyTotal = 500
	
function selectBet() {	// When the player clicks on a radio button with pre-determined bets
	// The money in the pot is set to the value of the selected radio button
	yourMoneyRadio = document.blackJack.yourMoney
	for(i=0; i<yourMoneyRadio.length; i++) {
		if (yourMoneyRadio[i].checked) {
			document.blackJack.potMoney.value = yourMoneyRadio[i].value
		}
	}
}
	
function allYourMoney() {	// When the player chooses to go all in
	// The money in the pot is set to the player's money total
	var yourMoneyTotal = document.blackJack.yourMoneyTotal.value
	document.blackJack.potMoney.value = yourMoneyTotal
}
	
function chooseMoney() {	// When the player clicks on the radio button to choose their own amount
	// Their input is verified that the amount is valid (eg The amount is a number)
	yourMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
	yourMoneyBet = 0
		
	while ((yourMoneyBet == 0) || (yourMoneyBet == "") || (yourMoneyBet < 1) || (yourMoneyBet > yourMoneyTotal) || (isNaN(yourMoneyBet)) || (yourMoneyBet.indexOf(".") > 0)) {
		yourMoneyBet = prompt("How much money do you want to bet?","")
		document.blackJack.potMoney.value = yourMoneyBet
	
		if (yourMoneyBet == null) {	// If the player decides to click cancel, their bet is set to the first radio button, $10
			document.blackJack.yourMoney[0].checked=true;
			yourMoneyBet = document.blackJack.yourMoney[0].value
		}
		else if ((yourMoneyBet == "") || (yourMoneyBet == "0") || (yourMoneyBet < "1")) {
			alert("You must bet at least $1.")
		}
		else if (isNaN(yourMoneyBet)) {
			alert("You cannot bet something that is not a number, that includes not adding in $ sign.")
		}
		else if (yourMoneyBet > yourMoneyTotal) {
			alert("You cannot bet more money than you have.")
		}
		else if (yourMoneyBet.indexOf(".") > 0) {
			alert("You cannot bet a number with a decimal in it.")
		}
	}
}
	
function hit() {	// The player draws a random card and the card total is updated
	ranNum = Math.floor(Math.random()*10)+1
	document.blackJack.yourCard.value = ranNum
	yourCard = parseInt(document.blackJack.yourCard.value)
	yourTotal = parseInt(document.blackJack.yourTotal.value) + yourCard
	document.blackJack.yourTotal.value = yourTotal
	yourMoneyBet = document.blackJack.potMoney.value
		
	if (yourTotal > 21) {	// If the player's card total is greater than 21, the computer has won the round
		alert("Your total is over 21. You lose this round and $" + yourMoneyBet + ".")
		yourLoss = parseInt(document.blackJack.yourLoss.value) + 1
		document.blackJack.yourLoss.value = yourLoss

		compWin = parseInt(document.blackJack.compWin.value) + 1
		document.blackJack.compWin.value = compWin

		document.blackJack.yourCard.value = 0
		document.blackJack.yourTotal.value = 0
		yourTotal = 0
		numRounds = parseInt(document.blackJack.numRounds.value)
		document.blackJack.numRounds.value = numRounds + 1
		
		yourMoneyTotal = document.blackJack.yourMoneyTotal.value
		yourMoneyBet = document.blackJack.potMoney.value
		document.blackJack.yourMoneyTotal.value = yourMoneyTotal - yourMoneyBet

		checkMoney();
		checkNumRounds();
		
		if ((document.blackJack.yourMoneyTotal.value < document.blackJack.potMoney.value) && (document.blackJack.yourMoney[4].checked == true)) {	// If the player decided their own amount
			// After losing some money, the player might be betting more than they have
			chooseMoney();
		}
	}
	else if (yourTotal == 21) {	// If the player's card total is 21, the player has automatically won the round
		alert("Your total is 21. You won this round and $" + yourMoneyBet + ".")
		yourWin = parseInt(document.blackJack.yourWin.value) + 1
		document.blackJack.yourWin.value = yourWin

		compLoss = parseInt(document.blackJack.compLoss.value) + 1
		document.blackJack.compLoss.value = compLoss

		document.blackJack.yourCard.value = 0
		document.blackJack.yourTotal.value = 0
		yourTotal = 0
		numRounds = parseInt(document.blackJack.numRounds.value)
		document.blackJack.numRounds.value = numRounds + 1
			
		yourMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
		yourMoneyBet = parseInt(document.blackJack.potMoney.value)
		document.blackJack.yourMoneyTotal.value = yourMoneyTotal + yourMoneyBet
			
		checkNumRounds();

		if (document.blackJack.yourMoney[3].checked == true) {	// If the player decided to go all in
			// After winning some money, the amount of money in the pot must be updated
			allYourMoney();
		}
	}
}

function stand() {	// The player decides to end their turn 
	alert("Your total is " + yourTotal + ".")
	yourMoneyBet = document.blackJack.potMoney.value

	// The computer continues to draw random cards until either its card total is greater than 21 or the player's card total
	for (compTotal = 0; compTotal < 21; compTotal + compCard) {
		ranNum = Math.floor(Math.random()*10)+1
		document.blackJack.compCard.value = ranNum
		compCard = parseInt(document.blackJack.compCard.value)
		compTotal = compTotal + compCard
		document.blackJack.compTotal.value = compTotal
		alert("Computer's card is " + compCard+", and the computer's total is "+compTotal+".")
		
		// If the computer's greater card total than the player's but is still less than 21, the computer has won the round 
		if (compTotal > yourTotal && compTotal <= 21) {
			alert("The computer has automatically won this round since it has a total greater than yours and yet, is still under or equal to 21. \nYou have lost $" + yourMoneyBet + ".")
			document.blackJack.compCard.value = 0
			document.blackJack.compTotal.value = 0
			document.blackJack.yourTotal.value = 0
			document.blackJack.yourCard.value = 0

			yourLoss = parseInt(document.blackJack.yourLoss.value) + 1
			document.blackJack.yourLoss.value = yourLoss

			compWin = parseInt(document.blackJack.compWin.value) + 1
			document.blackJack.compWin.value = compWin
	
			numRounds = parseInt(document.blackJack.numRounds.value)
			document.blackJack.numRounds.value = numRounds + 1
				
			yourMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
			yourMoneyBet = parseInt(document.blackJack.potMoney.value)
			document.blackJack.yourMoneyTotal.value = yourMoneyTotal - yourMoneyBet
			
			checkMoney();
			checkNumRounds();
			
			if ((document.blackJack.yourMoneyTotal.value < document.blackJack.potMoney.value) && (document.blackJack.yourMoney[4].checked == true)) {	// If the player decided their own amount
				// After losing some money, the player might be betting more than they have
				chooseMoney();
			}			
			break
		}
	}
	// If the computer has a card total greater than 21, the player has won that round
	if (compTotal > 21) {
		alert("The computer's total is over 21. You won this round and $" + yourMoneyBet + ".")
		document.blackJack.compCard.value = 0
		document.blackJack.compTotal.value = 0
		document.blackJack.yourTotal.value = 0
		document.blackJack.yourCard.value = 0

		yourWin = parseInt(document.blackJack.yourWin.value) + 1
		document.blackJack.yourWin.value = yourWin

		compLoss = parseInt(document.blackJack.compLoss.value) + 1
		document.blackJack.compLoss.value = compLoss
			
		numRounds = parseInt(document.blackJack.numRounds.value)
		document.blackJack.numRounds.value = numRounds + 1
			
		yourMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
		yourMoneyBet = parseInt(document.blackJack.potMoney.value)
		document.blackJack.yourMoneyTotal.value = yourMoneyTotal + yourMoneyBet
			
		checkNumRounds();
		if (document.blackJack.yourMoney[3].checked == true) {	// If the player decided to go all in
			// After winning some money, the amount of money in the pot must be updated
			allYourMoney();
		}
	}
	
	// The cards and card totals are reset for the next round
	compCard = 0
	compTotal = 0
	yourCard = 0
	yourTotal = 0
}
	
function checkMoney() {	// Checks that the player has enough money to play again
	yourMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
	yourMoneyBet = parseInt(document.blackJack.potMoney.value)		
	
	// If the player has less than $50 left, then their bet is automatically chosen to the highest possible bet
	if (yourMoneyTotal < 50 && yourMoneyTotal >= 25) {
		document.blackJack.yourMoney[1].checked=true;
		document.blackJack.potMoney.value = document.blackJack.yourMoney[1].value
	}
	else if (yourMoneyTotal < 25 && yourMoneyTotal >= 10) {
		document.blackJack.yourMoney[0].checked=true;
		document.blackJack.potMoney.value = document.blackJack.yourMoney[0].value
	}
	else if (yourMoneyTotal < 10 && yourMoneyTotal > 0) {
		document.blackJack.yourMoney[4].checked=true;
		chooseMoney();
		document.blackJack.yourMoney[0].checked=false;
		document.blackJack.yourMoney[4].checked=true;
	}
	else if (yourMoneyTotal == 0 || yourMoneyTotal < 0) {	// If the player has gone bankrupt
		// They are given the option to play again
		playAgain();
	}
}
	
function checkNumRounds() {	// The game continues if the maximum number of rounds (10) has not been reached yet
	numRounds = parseInt(document.blackJack.numRounds.value)
	yourMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
	moneyEarn = yourMoneyTotal - yourOriginalMoneyTotal
	yourWin = document.blackJack.yourWin.value
		
	if (numRounds == 10) {	// After 10 rounds, the game is over and the player is notified of
		// How many rounds the player has won and how much money the player won or lost throughout the game.
		if (moneyEarn < 0) {
			absMoneyEarn = Math.abs(moneyEarn)
			playAgain = confirm("You have lost $" + absMoneyEarn + ", and have won " + yourWin + " rounds. \nThe game is over, because you have played ten rounds already. Would you like to play again?")
		}
		if (moneyEarn >= 0) {
			playAgain = confirm("You have earned $" + moneyEarn + ", and have won " + yourWin + " rounds. \nThe game is over, because you have played ten rounds already. Would you like to play again?")
		}
		if (playAgain == true) {	// If the player wants to play again
			// They are given the option to restart with $500 or with their current money total
			restartMoney = confirm("Click 'OK' to start with the $" + yourMoneyTotal + " from the previous game. Click 'Cancel', if you would like to restart at $500.")
			if (restartMoney == false) {
				document.blackJack.yourMoneyTotal.value = 500
				yourOriginalMoneyTotal = parseInt(document.blackJack.yourMoneyTotal.value)
			}
			document.blackJack.numRounds.value = 0
			document.blackJack.yourWin.value = 0
			document.blackJack.yourLoss.value = 0
			document.blackJack.compWin.value = 0
			document.blackJack.compLoss.value = 0
			document.blackJack.yourMoney[0].checked=true;
			document.blackJack.potMoney.value = document.blackJack.yourMoney[0].value
		}
		else {	// When I submitted this game for my Computers 11 class, the page would close if the player did not want to play another game
			// I decided to change closing the page to refreshing the page.
			location.reload(true);
		}
	}
}
	
function playAgain() {	// When the game ends because to the player has gone bankrupt
	// The player is given the option to restart
	var playAgain = confirm("The game is over, because you have gone bankrupt. Would you like to play again?")
		
	if (playAgain == true) {
		document.blackJack.yourMoneyTotal.value = 500
		document.blackJack.numRounds.value = 0
		document.blackJack.yourWin.value = 0
		document.blackJack.yourLoss.value = 0
		document.blackJack.compWin.value = 0
		document.blackJack.compLoss.value = 0
		document.blackJack.yourMoney[0].checked=true;
		document.blackJack.potMoney.value = document.blackJack.yourMoney[0].value
	}
	else {	// When I submitted this game for my Computers 11 class, the page would close if the player did not want to play another game
		// I decided to change closing the page to refreshing the page.
		location.reload(true);
	}
}