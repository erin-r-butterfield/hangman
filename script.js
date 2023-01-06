var shown_word = document.getElementById("shown_word")
// shown_word.style.display = 'none';

var left_div = document.getElementById("left_div")
var hangman = document.getElementById("hangman_image")


var mywords = ["phylogenetics", "matrix", "cluster", "bayesian", "bioinformatics"];
var current_word = mywords[(Math.floor(Math.random() * mywords.length))];
var display_word = "";
// const wordArr = current_word.split("");

for (let i = 0; i < current_word.length; i++){
    display_word += "_ ";
}

var word = document.getElementById("word")

function game_start(event){
    left_div.style.display = 'none';
    hangman.style.display = 'none';
    shown_word.style.display = 'block';
    word.innerHTML = display_word;
    document.addEventListener('keypress', guess);
    }

function guess(event){
    // var x = event.key;
    // match to character/s in string
    console.log(event.key);
    if (current_word.includes(event.key)){
        display_word = correct(event.key)
        console.log('yay you guessed correctly')
        word.innerHTML = display_word
    } else {
        console.log('you suck, '+event.key+' is not in '+current_word)
        // false = reveal next bodypart
    } 
}


function matchall(x){
    var matches = []
    for (let i = 0; i < current_word.length; i++){
        if (current_word[i] == x) {
            console.log("hooray, I worked")
            console.log(current_word[i]+' matches '+x.toLowerCase());
            matches.push(i)
            console.log("matches = " +matches)
          } else {
              console.log("my if statement didn't work :(")
          }
    }
    // var index = 0
    // do {
    //     index = current_word.indexOf(x, index);
    //     matches.push(index);

    // }
    // while (index !== -1);
    return matches;
}

function update_string(str,index,chr){
    // from https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
    // if(index > str.length-1) return str;
    console.log(index)
    return str.substring(0,index) + chr + str.substring(index+1);
}

function correct(x){
    var matches = matchall(x)
    console.log("matches= " + matches)
    for (let i = 0; i < matches.length; i++){
        console.log("i= " +i)
        console.log("matches[i] = " + matches[i])
        display_word = update_string(display_word, matches[i], x)
    }
    return display_word
}

// function incorrect(){

// }