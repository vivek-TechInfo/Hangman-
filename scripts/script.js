const wordDisplay = document.querySelector(".word-display")
const hangman = document.querySelector(".hangman-box img")
const guessText = document.querySelector(".guesses-text b")
const keyboard = document.querySelector(".keyboard")
const gameModel =  document.querySelector(".game-model")
const palyAgain =  document.querySelector(".play-again")


let currentWord ,correctLetter ,wrongGuessCount 
const maxGuesses = 6


const resetGame = ()=>{
    correctLetter = []
    wrongGuessCount = 0
    hangman.src = `images/hangman-${wrongGuessCount}.svg`
    guessText.innerText =  `${wrongGuessCount} / ${maxGuesses}`
    keyboard.querySelectorAll("button").forEach((btn)=>btn.disabled =  false)
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("")
    gameModel.classList.remove("show")


}


const getRandomWords = ()=>{
    const {word,hint} = wordList[Math.floor(Math.random() * wordList.length) ]
    // console.log(word ,hint);
    currentWord    =  word
    document.querySelector(".hint-text b").innerText = hint
    // console.log(word)

    resetGame()


    
}

const gameOver = (isVictory)=>{
    setTimeout(()=>{
        const modelText = isVictory ? `You found the word`:"The correct word was"
        gameModel.querySelector("img").src = `images/${isVictory ? "victory":"lost"}.gif`
        gameModel.querySelector("h4").innerText = `${isVictory ? "Congrats":"Game Over"}`
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`
        gameModel.classList.add("show")

    },300 )
}

const initGame = (button,clickedLeters)=>{
    // console.log(button,clickedLeters)

    if(currentWord.includes(clickedLeters)){
        // console.log(clickedLeters,"is exist on the word");
        // console.log([...currentWord]);
        [...currentWord].forEach((letter,index)=>{
            if(letter===clickedLeters){
                correctLetter.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }else{
        // console.log(clickedLeters,"is not exist on the word");
        wrongGuessCount++
        hangman.src = `images/hangman-${wrongGuessCount}.svg`
    }

    button.disabled =  true

    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`


    if(wrongGuessCount === maxGuesses) return gameOver(false)
    if(correctLetter.length === currentWord.length) return gameOver(true)




}



for (let i = 97; i <122; i++) {
    const button = document.createElement("button")
    button.innerText =  String.fromCharCode(i)
    keyboard.appendChild(button)
    
    // console.log(String.fromCharCode(i));

    button.addEventListener("click",(e)=>initGame(e.target,String.fromCharCode(i) ))
    
    
    }
getRandomWords()

palyAgain.addEventListener("click",getRandomWords)