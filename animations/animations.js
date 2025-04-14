import { GameState } from "../data/gameState.js";

function AddShakingAnimation()
{
    for (let i = 0; i < GameState.letterCount; i++) {
        let box = document.getElementById(`r${GameState.row}c${i}`);
        box.classList.add("shake");

        box.addEventListener('animationend', () => {
            box.classList.remove("shake");
        }, { once: true });
    }
}
export {  AddShakingAnimation }