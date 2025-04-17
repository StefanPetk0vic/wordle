import { ResetGame } from "../core/uiHandler.js";
import { GameState } from "../data/gameState.js";

const resetButton = document.getElementById("playAgain");
resetButton.addEventListener("click", () => {

    const popupContainer = document.getElementById('endPopupContainer');
    ResetGame();
    popupContainer.classList.remove("show");
});

function ErrorHandler(errorInfo) {
    const popupContainer = document.getElementById('errorPopupContainer');
    const popup = document.getElementById("popup");
    let errorMsg = document.querySelector("#errorText");

    popupContainer.classList.add("show");
    errorMsg.textContent = errorInfo;
    //console.log("error found by ErrorHandler()");
    console.log(errorInfo);

    GameState.popupTimeout = setTimeout(() => {
        popupContainer.classList.remove("show");
    }, 500);
}

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
    for (let r = 0; r < GameState.gameRows; r++) {
        let rowDiv = document.createElement('div');
        rowDiv.className = "box-row";
        for (let c = 0; c < GameState.gameCols; c++) {
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
    setTimeout(GridLoaded, 500);
}

function GridLoaded() {
    let main = document.querySelector("main")
    main.classList.remove('loading-disabled');
    main.classList.add('show');
    let loadingPopup = document.getElementById("loading-page");
    loadingPopup.classList.add('loading-disabled');
}

function ClearGrid() {
    let gridContainer = document.querySelector(".grid-container");
    for (let r = 0; r < GameState.gameRows; r++) {
        for (let c = 0; c < GameState.gameCols; c++) {
            const cellId = `r${r}c${c}`;
            const cell = document.getElementById(cellId);

            if (cell) {

                if (cell && cell.classList.contains("wrong-box") && cell.value) {
                    const keyBtn = document.getElementById(cell.value.toUpperCase());

                    if (keyBtn) {
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
    GameState.score -= 25;

}

function ShowInfo() {

    const popupContainer = document.getElementById('infoPopupContainer');
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeInfoPopup");
    let info = document.getElementById("descTitle");
    info.textContent=`Welcome to Wordle !`;
    info = document.getElementById("descEmoji");
    info.textContent=`🟥🟧🟩`;
    
    info = document.getElementById("descInfo");
    info.textContent=` The following colors represent:`;
    
    info = document.getElementById("descGreen");
    info.textContent=`🟩 <- The position matches the letter`;

    info = document.getElementById("descOrange");
    info.textContent=`🟧 <- The position doesn't match the letter`;

    info = document.getElementById("descRed");
    info.textContent=`🟥 <- The letter doesn't exist in the word`;

    info = document.getElementById("descGoodLuck");
    info.textContent=`Good luck and have fun !`;

    
    popupContainer.classList.add("show");    
    console.log("info shown");

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
        } 
        else {
            console.log(`Element with ID ${inputId} not found.`);
        }
    }
}

function UnlockGame() {

    const inputId = `r0c0`;
    let nextInput = document.getElementById(inputId);
    if (nextInput) {
        nextInput.disabled = false;
        console.log(`Unlocking: r0c0.`);
    } else {
        console.log(`Error with unlocking r0c0.`);
    }

}

export { ErrorHandler, EndHandler, GenerateGrid, ClearGrid, ShowHint, LockGame, UnlockGame, LockColumn,ShowInfo };