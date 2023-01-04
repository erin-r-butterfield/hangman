(function(){
    "use strict";
    document.addEventListener("DOMContentLoaded", function() {
        var left_div = document.getElementById("left_div")
        var hangman = document.getElementById("hangman_image")

        // document
        //     .getElementById("start_button")
        //     .addEventListener("click", game_start);


    function game_start(event){
        left_div.style.display = 'none';
        hangman.style.display = 'none';
    }

    });
});