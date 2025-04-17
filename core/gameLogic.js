import { GameState } from "../data/gameState.js";
import { EndHandler, ErrorHandler, LockGame } from "../utils/utils.js";
import { AddShakingAnimation } from "../animations/animations.js";

async function ButtonPress() {

    if (GameState.answer.length != GameState.tryWord.length) {

        AddShakingAnimation();

        ErrorHandler("The length of the word isn't 5 letters");
        return;
    }
    const exists = await getMeaning(GameState.tryWord.join(""));

    if (!exists) {

        AddShakingAnimation();
        
        ErrorHandler("The word does not exist");
        return;
    }

    let answerChars = [...GameState.answer];
    let tryWordChars = [...GameState.tryWord];

    for (let i = 0; i < GameState.answer.length; i++) {
        const inputId = `r${GameState.row}c${i}`;
        const targetBox = document.getElementById(inputId);
        

        targetBox.classList.add('flip-box'); 

        if (GameState.tryWord[i] === GameState.answer[i]) {
            targetBox.classList.add("correct-box");

            answerChars[i] = null;
            tryWordChars[i] = null;
        }

        if (!GameState.answer.includes(GameState.tryWord[i])) {
            const key = document.getElementById(tryWordChars[i]);
            key.classList.add("wrong-letter");
        }
    }

    for (let i = 0; i < tryWordChars.length; i++) {
        const inputId = `r${GameState.row}c${i}`;
        const targetBox = document.getElementById(inputId);

        if (tryWordChars[i] !== null && answerChars.includes(tryWordChars[i])) {
            targetBox.classList.add("close-box");
            answerChars[answerChars.indexOf(tryWordChars[i])] = null;
        } else if (tryWordChars[i] !== null) {
            targetBox.classList.add("wrong-box");

        }
    }
  
    let ans = document.getElementById("answerText");
    
    if (GameState.tryWord.join("") === GameState.answer) {
       
        ans.classList.add("correct-answer");
        GameState.gameOver=true;
        EndHandler("You did it!");
    }
    else if (GameState.row == 5) {

        ans.classList.add("wrong-answer");
        GameState.gameOver=true;
        EndHandler("You failed!");
    }
    End();
    LockGame(`r${GameState.row}c${GameState.column}`);
}

function End() {
    GameState.row++;
    GameState.column = 0;
    GameState.tryWord = [];
}

export { ButtonPress }