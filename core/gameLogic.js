import { GameState } from "../data/gameState.js";
import { FreeColumn, EndHandler, ErrorHandler, LockColumn } from "../utils/utils.js";

async function ButtonPress() {

    if (GameState.answer.length != GameState.tryWord.length) {
        ErrorHandler("The length of the word isn't 5 letters");
        return;
    }
    const exists = await getMeaning(GameState.tryWord.join(""));

    if (!exists) {
        ErrorHandler("The word does not exist");
        return;
    }

    console.log("THE WORD YOU ENTERED: "+GameState.tryWord);
    

    let answerChars = [...GameState.answer];
    let tryWordChars = [...GameState.tryWord];

    for (let i = 0; i < GameState.answer.length; i++) {
        const inputId = `r${GameState.row}c${i}`;
        const targetBox = document.getElementById(inputId);

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
        EndHandler("You did it!");
        GameState.score+=100;
        GameState.won = true;
    }
    else if (GameState.row == 5) {
        ans.classList.add("wrong-answer");
        EndHandler("You failed!");
        GameState.won = false;
    }
    End(GameState.won);
}

function End(winFlag) {
    console.log("The total score was: "+ GameState.score);
    
    GameState.row++;
    GameState.column = 0;
    GameState.tryWord = [];
    LockColumn(GameState.row - 1);
    if(GameState.won==true || GameState.row === 6){
        FreeColumn();
        return;
    }
    FreeColumn(GameState.row);
    return;
}

export { ButtonPress }