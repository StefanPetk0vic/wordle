import { ResetGame } from "../core/uiHandler.js";
import { GameState } from "../data/gameState.js";


function ErrorHandler(errorInfo) {
    const popupContainer= document.getElementById('errorPopupContainer');
    const popup = document.getElementById("popup");
    let errorMsg = document.querySelector("#errorText");

    popupContainer.classList.add("show");
    errorMsg.textContent = errorInfo;
    console.log("error found by ErrorHandler()");

    console.log(errorInfo);
    
    GameState.popupTimeout = setTimeout(() => {
        popupContainer.classList.remove("show");
    }, 500);


}

const resetButton = document.getElementById("playAgain");
resetButton.addEventListener("click", () => {
    
    const popupContainer = document.getElementById('endPopupContainer');
    ResetGame();
    popupContainer.classList.remove("show");
});


function EndHandler(endInfo) {

    const popupContainer = document.getElementById('endPopupContainer');
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeEndPopup");
    let endMsg = document.querySelector("#endText");
    let desc = document.getElementById("descText");
    let ans = document.getElementById("answerText");


    
    popupContainer.classList.add("show");
    endMsg.textContent = endInfo;
    ans.textContent = `${GameState.answer}`;
    desc.textContent = `Meaning: ${GameState.desc}`;

    const computedColor = window.getComputedStyle(ans).color;
    resetButton.style.backgroundColor = computedColor;

    console.log("end of Game");

    closeButton.addEventListener("click", () => {
        popupContainer.classList.remove("show");
    });
  
}



function FreeColumn(row = 0, col = 0) {
    const targetInput = document.getElementById(`r${row}c${col}`);

    if (targetInput) {
        targetInput.removeAttribute("disabled");
    } else {
        console.warn(`Input element r${row}c${col} not found`);
    }
}


function GenerateGrid() {
    let gridContainer = document.querySelector(".grid-container");
    const rows = 6;
    const cols = 5;
    for (let r = 0; r < rows; r++) {
        let rowDiv = document.createElement('div');
        rowDiv.className = "box-row";
        for (let c = 0; c < cols; c++) {
            let InputBox = document.createElement('input');
            InputBox.className = "box";
            InputBox.type = "text";
            InputBox.maxLength = 1;
            InputBox.value = "";
            InputBox.autocomplete = "off";
            InputBox.disabled = true;
            InputBox.id = `r${r}c${c}`;
            rowDiv.appendChild(InputBox);
        }
        gridContainer.appendChild(rowDiv);
    }
}
function ClearGrid()
{
    let gridContainer = document.querySelector(".grid-container");
    const rows = 6;
    const cols=5;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellId = `r${r}c${c}`;
            const cell = document.getElementById(cellId);

            if (cell) {

                if (cell && cell.classList.contains("wrong-box") && cell.value) {
                    const keyBtn = document.getElementById(cell.value.toUpperCase());

                    if (keyBtn) 
                        {
                            keyBtn.classList.remove("wrong-letter");
                        }
                 
                }

                cell.value = "";
                cell.classList.remove("wrong-box", "correct-box", "close-box", "added-character");
            }
        }
    }
}

function ShowHint() {

    const popupContainer = document.getElementById('hintPopupContainer');
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeHintPopup");
    let desc = document.getElementById("descHint");

    popupContainer.classList.add("show");
    desc.textContent = `Meaning: ${GameState.desc}`
    console.log("hint shown");

    closeButton.addEventListener("click", () => {
        popupContainer.classList.remove("show");
    });

}

function LockGame(inputId) {
    if (GameState.column < 5) {
        console.log("Locking " + inputId);
        let nextInput = document.getElementById(inputId);
        if (nextInput) {
            nextInput.disabled = true;
        } else {
            console.log(`Element with ID ${inputId} not found.`);
        }
    }
}

function UnLockGame()
{

    const inputId = `r0c0`; 
    let nextInput = document.getElementById(inputId);
    if (nextInput) {
        nextInput.disabled = false;
        console.log(`Unlocking: r0c0.`);
    } else {
        console.log(`Error with unlocking r0c0.`);
    }

}

function InitPage() {
    document.addEventListener("click", function triggerEvent() {
      window.open("https://www.youtube.com/watch?v=51zjlMhdSTE", "_blank");
    }, { once: true });
  }



export { ErrorHandler, EndHandler, FreeColumn, GenerateGrid, ClearGrid, ShowHint, LockGame, UnLockGame, InitPage };