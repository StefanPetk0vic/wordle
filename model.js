import { ButtonPress } from "./core/gameLogic.js";
import { AddScreenLetter, DeleteLetter, AddLetter, ResetGame, SwitchMode } from "./core/uiHandler.js";
import { GetWord, getMeaning } from "./services/apiService.js";
import { ErrorHandler, GenerateGrid, ShowHint,ShowInfo } from "./utils/utils.js";

window.AddLetter = AddLetter;
window.DeleteLetter = DeleteLetter;
window.ButtonPress = ButtonPress;
window.getMeaning = getMeaning;
window.AddScreenLetter = AddScreenLetter;
window.ErrorHandler = ErrorHandler;
window.ShowHint = ShowHint;
window.ShowInfo = ShowInfo;

window.SwitchMode = SwitchMode;

console.log("STARTED...");
GetWord();
GenerateGrid();

document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.slider');
    // Check if slider should be active
    if (localStorage.getItem('sliderActive') === 'true') {
        slider.classList.add('active');
    }
});