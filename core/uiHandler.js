import { GameState } from "../data/gameState.js";
import { GetWord } from "../services/apiService.js";
import { ClearGrid, UnLockGame, LockGame } from "../utils/utils.js";
import { ButtonPress } from "./gameLogic.js";


document.addEventListener("keydown", function (event) {
    
    if (
        event.key === "Backspace" ||
        event.key === "Enter" ||
        (event.key.length === 1 && /^[a-z]$/i.test(event.key))
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        if (GameState.column > 0) {
            GameState.column--;

            let inputBox = document.getElementById(`r${GameState.row}c${GameState.column}`);
            if (inputBox) {
                inputBox.value = "";
                inputBox.disabled = false;
                inputBox.classList.remove("added-character");
                inputBox.focus();

                GameState.tryWord.pop();

                for (let i = 0; i < GameState.column; i++) {
                    let prevInput = document.getElementById(`r${GameState.row}c${i}`);
                    if (prevInput) prevInput.disabled = true;
                }
            }

            console.log("Backspace: ", GameState.tryWord);
        } else {
            console.log("Nothing to delete");
        }
    }
    else if (event.key === "Enter") {
        ButtonPress();
    }
    else if (event.key.length === 1 && /^[a-z]$/i.test(event.key) && GameState.column < 5) {

        if (GameState.gameOver) {
            return;
        }
        
        const letter = event.key.toUpperCase();
        console.log(`Letter pressed: ${letter}`);
        GameState.tryWord.push(letter);

        let prevInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
        prevInput.classList.add("added-character");
        prevInput.disabled = true;
        prevInput.value = letter;

        GameState.column++;

        if (GameState.column < 5) {
            let nextInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
            nextInput.disabled = false;
        }

        console.log("Added letter with EventListener");
    }
});


function AddLetter(clicked_id, input_value) {

    if(GameState.gameOver)
        return;

    let x = document.getElementById(clicked_id);
    if (GameState.tryWord.length < GameState.letterCount) {
        GameState.tryWord.push(x.innerHTML);
        AddScreenLetter(x.innerHTML);
        let prevInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
        prevInput.disabled = true;

        GameState.column++;

        if(GameState.column<5)
            {   let nextInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
                nextInput.disabled = false;
            }
        //Changed for easier stacking of logs in inspect
        console.log("Added from AddLetter(): " + GameState.tryWord);
        
    } else {
        console.log("All letters are added");
    }
}

function AddScreenLetter(letter) {
    const inputId = `r${GameState.row}c${GameState.column}`;
    const targetInput = document.getElementById(inputId);
    targetInput.value = letter;
    targetInput.classList.add("added-character");
}

function DeleteLetter() {
    if (GameState.tryWord.length > 0) {
        //console.log("The letter:", GameState.tryWord[GameState.tryWord.length - 1]);
        GameState.tryWord.pop();
        
        console.log("After deleting:", GameState.tryWord);
        //console.log(`Current row n col: r${GameState.row}c${GameState.column - 1}`);

        let prevInput = document.getElementById(`r${GameState.row}c${GameState.column-1}`);
        prevInput.disabled = true;

        prevInput.classList.remove("added-character");

        if (prevInput.value !== "") {
            prevInput.value = "" // Correct way to remove the <p> element
            GameState.column--;
        }
    } else {
        console.log("Empty word");
    }
}

function ResetGame() {
    ClearGrid();
    console.log("getting new word for reset");
    GetWord();
    GameState.row = 0;
    GameState.column = 0;
    GameState.gameOver = false;
    UnLockGame();
}

function SwitchMode() {
    const slider = document.querySelector('.slider');
    const body = document.body;
    
   
      body.classList.toggle('night');
      
      slider.classList.toggle('active');
}

export { AddScreenLetter, DeleteLetter, AddLetter, ResetGame, SwitchMode };
