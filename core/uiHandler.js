import { GameState } from "../data/gameState.js";
import { GetWord } from "../services/apiService.js";
import { ClearGrid } from "../utils/utils.js";
import { ButtonPress } from "./gameLogic.js";

document.addEventListener("keydown", function (event) {

    if (event.key == "Backspace") {
        //console.log("Backspace Pressed");
        try {
            let InputBox = document.getElementById(`r${GameState.row}c${GameState.column - 1}`);
            GameState.tryWord.pop();
            InputBox.classList.remove("added-character");
            console.log(GameState.tryWord);
            InputBox.focus();
            GameState.column--;
            return;
        } catch {
            console.error("Left grid area");
        }
    }
})

document.addEventListener("keydown", function (event) {

    if (event.key == "Enter") {
        console.log("Enter pressed");
        ButtonPress();
    }
})

function handleInput(input_id, input_value) {
    let targetInput;
    if (input_value !== "") {
        if (GameState.tryWord[input_id[3]] === undefined) {
            targetInput = document.getElementById(input_id);
            targetInput.classList.add("added-character");
            GameState.tryWord.push(input_value.toUpperCase());
            GameState.column++;
        }
        else {
            GameState.tryWord[input_id[3]]=input_value.toUpperCase();
            console.log(GameState.tryWord);
        }
        //console.log("Added from handleInput(): " + GameState.tryWord.join(""));
        if (GameState.column < 5) {
            targetInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
            //console.log(`r${GameState.row}c${GameState.column}`);
            targetInput.focus();
        }
    }
    return;
}

function AddLetter(clicked_id, input_value) {

    let x = document.getElementById(clicked_id);
    if (GameState.tryWord.length < GameState.letterCount) {
        GameState.tryWord.push(x.innerHTML);
        AddScreenLetter(x.innerHTML);
        GameState.column++;
        //console.log("Added from AddLetter(): " + GameState.tryWord);        
    } else {
        console.log("All letters are added");
    }
}

function AddScreenLetter(letter) {
    const inputId = `r${GameState.row}c${GameState.column}`;
    const targetInput = document.getElementById(inputId);
    targetInput.value += letter;
    targetInput.classList.add("added-character");
}

function DeleteLetter() {
    if (GameState.tryWord.length > 0) {
        //console.log("The letter:", GameState.tryWord[GameState.tryWord.length - 1]);
        GameState.tryWord.pop();
        //console.log("After deleting:", GameState.tryWord);
        //console.log(`Current row n col: r${GameState.row}c${GameState.column - 1}`);

        const inputId = `r${GameState.row}c${GameState.column - 1}`;
        const targetInput = document.querySelector(`#${inputId}`);

        targetInput.classList.remove("added-character");

        if (targetInput.value !== "") {
            targetInput.value = "" // Correct way to remove the <p> element
            GameState.column--;
        }
    } else {
        //console.log("Empty word");
    }
}

function ResetGame() {
    ClearGrid();
    GetWord();
    GameState.row = 0;
    GameState.column = 0;
    GameState.won=false;
    const targetInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
    targetInput.focus();
}

function SwitchMode() {
    const slider = document.querySelector('.slider');
    const body = document.body;
    
   
      body.classList.toggle('night');
      
      slider.classList.toggle('active');
}

export { handleInput, AddScreenLetter, DeleteLetter, AddLetter, ResetGame, SwitchMode };
