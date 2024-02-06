const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');


async  function init() {
    let currentGuess = '';
    let currentRow = 0;


    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split("");
    setLoading(false);


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

        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts);
        console.log(map);
        
        for(let i = 0; i< 5; i++) {
            //mark as correct
            if (guessParts[i] === wordParts[i]) {
                letters[currentRow * 5 + i].classList.add("correct");
                map[guessParts[i]]--;
            }
        }

        for (let i = 0; i < 5; i++) {
          //mark as correct
          if (guessParts[i] === wordParts[i]) {
          } else if (
            wordParts.includes(map[guessParts[i]] && map[guessParts[i]] > 0)) 
            {
            letters[currentRow * 5 + i].classList.add("close");
            map[guessParts[i]]--;
            } 
            else {
            letters[currentRow * 5 + i].classList.add("wrong");
          }
          
        }

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


function setLoading(isLoading) {
    loadingDiv.classList.toggle('show' , isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}

init();