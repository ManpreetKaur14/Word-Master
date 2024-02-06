const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');


async  function init() {
    let currentGuess = '';
    let currentRow = 0;


    const res = await fetch("https://words.dev-apis.com/word-of-the-day");

    // funtion to add letter in the box
    function addLetter(letter){
        if (currentGuess.length < 5) {
            //add letter in the end
            currentGuess += letter;
        } else {
            //replace the last letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter; 
        }
        //adding the letter in the box
        letters[5 * currentRow + currentGuess.length - 1].innerText = letter;
    }
    

    //function to enter
    async function commit() {
        if (currentGuess.length != 5) {
            // DO NOTHING
            return;
        }

        //validate the word

        // do all marking


        // won or loose 

        currentRow++;
        currentGuess = "";
    }

    function backspace () {
         currentGuess = currentGuess.substring(0, currentGuess.length - 1);
         letters[5 * currentRow + currentGuess.length].innerText = "";
    }

    document.addEventListener('keydown' , function handleKeyPress (event) {
        const action = event.key;
        console.log(action);
        if(action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if(isLetter(action)) {
            addLetter(action.toUpperCase())
        } else {
            // do nothing
        }
    });
}

function isLetter(letter){
    return /^[a-zA-Z]$/.test(letter);
}

init();