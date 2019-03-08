/* GAME FUNCTION
-player must guess a number between a min and max
-player gets a certain amount of guesses
-notify player of guesses remaining
-notify the player of the correct anwer if they lose
-let player choose to play again
*/

//game values
let min = 1,
    max = 10;
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements we will be working with
const gameWrapper = document.querySelector('#game'),
      guessBtn = document.querySelector('#guess-btn'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num')
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// //claculates our random #
//   function calcRandomNumber() {
//     var randomNum = Math.floor((Math.random() * 10) + 1);
//     parseInt(randomNum);
//     return randomNum;
//   }

// //our random # is stored here
//  var returnedRandomNum = calcRandomNumber();
 

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event Listener
gameWrapper.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate number from input amke sure it is a number, it is greater than min number fo gamwe rules and greater than max number.
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } 
  //check if won
  if(guess === winningNum){
    //game over - won
    gameOver(true, `${winningNum} is correct, you win!`, 'green');
  } else {
    //wrong number take away a guess
    guessesLeft -= 1;
    //check to see if any guesses left
    if(guessesLeft === 0){
      //game over - lost
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
    } else {
      //game continues - answer was wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);
      //change border color
      guessInput.style.borderColor = 'red';
      // clear input for new guess
      guessInput.value = '';
    }

  }
});

//game over FX will take in 2 params
function gameOver(won, msg){
    let color;
    //this reads as if won equals true then(?) color equals green else(:) color equals red
    won === true ? color = 'green' : color ='red';
    setMessage(msg);
    //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';   
  }

//Get winning Num
function getRandomNum(min, max){
  return Math.floor(Math.floor(Math.random()*(max-min+1)+min));
}

//set message
function setMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
}