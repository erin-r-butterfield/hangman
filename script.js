var shown_word = document.getElementById("shown_word");
var left_div = document.getElementById("left_div");
var hangman = [];

// Hangman Steps
hangman[0] = document.getElementById("vertical_1");
hangman[1] = document.getElementById("horizontal_1");
hangman[2] = document.getElementById("horizontal_2");
hangman[3] = document.getElementById("vertical_2"); 
hangman[4] = document.getElementById("head");
hangman[5] = document.getElementById("body");
hangman[6] = document.getElementById("arm_1");
hangman[7] = document.getElementById("arm_2");
hangman[8] = document.getElementById("leg_1");
hangman[9] = document.getElementById("leg_2");
hangman[10] = document.getElementById("face");


var current_word = mywords[(Math.floor(Math.random() * mywords.length))];
var display_word = "";
var attempts = 0;
var available = document.getElementById("letters");
var letters = ["A" ,"B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

for (let i = 0; i < current_word.length; i++){
    display_word += "_ ";
}


document.getElementById("available").style.display = 'none';
var word = document.getElementById("word");

function game_start(event){
    left_div.style.display = 'none';
    hangman.forEach(element => {
        element.style.display = 'none';
    });
    shown_word.style.display = 'block';
    word.innerHTML = display_word;
    document.getElementById("available").style.display = 'block';
    available.innerHTML = letters.join(" ");
    // console.log(letters.join(" "));
    document.addEventListener('keypress', guess);
    }

function guess(event){
    // console.log(event.key);
    var x = event.key;
    x = x.toUpperCase();
    var z = check_letters(x, letters);
    if (z > -1) { // only splice array when item is found
        // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
        letters.splice(z, 1); // 2nd parameter means remove one item only
      } 
    available.innerHTML = letters.join(" ");
    if (current_word.includes(x)){
        display_word = correct(x)
        // console.log('yay you guessed correctly');
        word.innerHTML = display_word;
        // upper = current_word.toUpperCase()
        if (display_word.replace(/\s/g, '') == current_word){
            YouWin()
        }
    } else if (attempts < (hangman.length - 1)){
        // console.log('you suck, '+x+' is not in '+current_word);
        hangman[attempts].style.display = 'block';
        // console.log('attempt number '+attempts);
        attempts++;
        // console.log('now at '+attempts);
    } else {
        // console.log("YOU REALLY SUCK, GAME OVER")
        hangman[attempts].style.display = 'block';
        GameOver()
    }
}


function matchall(x){
    var matches = []
    
    for (let i = 0; i < current_word.length; i++){
        if (current_word[i] == x) {
            // console.log("hooray, I worked")
            // console.log(current_word[i]+' matches '+x);
            matches.push(i)
            // console.log("matches = " +matches)
        } 
    }
    return matches;
}

function update_string(str,index,chr){
    // adapted from https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
    // console.log(index)
    return str.substring(0,(index*2)) + chr + str.substring((index*2)+1);
}

function correct(x){
    var matches = matchall(x)
    // console.log("matches= " + matches)
    for (let i = 0; i < matches.length; i++){
        // console.log("i= " +i)
        // console.log("matches[i] = " + matches[i])
        display_word = update_string(display_word, matches[i], x)
    }
    return display_word
}

function GameOver(){
    setTimeout(function(){
        if(confirm("Game Over \nYour word was " + current_word + "\n\nClick OK to play again.")==true){
        location.reload();
        }
    },500);
}

function YouWin(){
    setTimeout(function(){
        if(confirm("CONGRATULATIONS - You Win\n\nClick OK to play again.")==true){
            location.reload();
        }
    }, 500)
}

function check_letters(x, array){
    var z = x.toUpperCase();
    if (array.includes(z)){
        // console.log("Is my if statement checking index working?")
        let index = array.indexOf(z);
        return index
    }
}
// TODO:
// 1. Show available letters
// 2. Expand available words
// 3. Include phrases?
// 4. Sanitise inputs so only legit characters allowed?
// 5. Allow repeat attempts of the same letter?
// 6. Document code
// 7. Styling