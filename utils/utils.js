import { ResetGame } from "../core/uiHandler.js";
import { GameState } from "../data/gameState.js";


let resetButton = document.getElementById("playAgain");
const popupContainer = document.getElementById('endPopupContainer');
resetButton.addEventListener("click", () => { 
    ResetGame();
    popupContainer.classList.remove("show");
});

function ErrorHandler(errorInfo) {
    const popupContainer = document.getElementById('errorPopupContainer');
    const popup = document.getElementById("popup");
    let errorMsg = document.querySelector("#errorText");

    popupContainer.classList.add("show");
    errorMsg.textContent = errorInfo;
    console.log("error found by ErrorHandler()");

    clearTimeout(GameState.popupTimeout);

    GameState.popupTimeout = setTimeout(() => {
        popupContainer.classList.remove("show");
    }, 1000);

    const hidePopup = () => {
        popupContainer.classList.remove("show");
        document.removeEventListener("click", hidePopup); 
    };

    document.addEventListener("click", hidePopup);
}

function EndHandler(endInfo) {

    const popupContainer = document.getElementById('endPopupContainer');
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeEndPopup");
    let endMsg = document.querySelector("#endText");
    let desc = document.getElementById("descText");
    let ans = document.getElementById("answerText");
    let resetButton = document.getElementById("playAgain");
    
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

function FreeColumn(param = 0) {
    let targetInput;
    let FocusFirst;
    for (let i = 0; i < 5; i++) {
        targetInput = document.getElementById(`r${param}c${i}`);
        FocusFirst = document.getElementById(`r${param}c${0}`);
        if (targetInput) {
            targetInput.removeAttribute("disabled");
        } else {
            console.warn(`Input element r${param}c${i} not found`);
        }
        if (i == 0) { setTimeout(() => { FocusFirst.focus(); }, 0); }
    }
}
function LockColumn(param) {
    let targetInput;
    for (let i = 0; i < 5; i++) {
        targetInput = document.getElementById(`r${param}c${i}`);
        if (targetInput) {
            targetInput.setAttribute("disabled", "true");
        } else {
            console.warn(`Error something went wrong on the ${i}th attempt`);
        }
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
            InputBox.setAttribute('oninput', `handleInput(this.id,this.value)`);

            InputBox.addEventListener('focus', function () {
                this.select();
            });

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
                const cellColor = cell.style.backgroundColor;
                const cellValue = cell.value;

                if (cell && cell.classList.contains("wrong-box") && cell.value) {
                    const keyBtn = document.getElementById(cellValue.toUpperCase());

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
    GameState.score-=25;
}

export { ErrorHandler, EndHandler, FreeColumn, GenerateGrid, ClearGrid, ShowHint, LockColumn };