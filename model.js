import { ButtonPress } from "./core/gameLogic.js";
import { handleInput, AddScreenLetter, DeleteLetter, AddLetter, ResetGame, SwitchMode } from "./core/uiHandler.js";
import { GetWord, getMeaning } from "./services/apiService.js";
import { ErrorHandler, FreeColumn, GenerateGrid, ShowHint } from "./utils/utils.js";

window.AddLetter = AddLetter;
window.DeleteLetter = DeleteLetter;
window.handleInput = handleInput;
window.ButtonPress = ButtonPress;
window.getMeaning = getMeaning;
window.AddScreenLetter = AddScreenLetter;
window.ErrorHandler = ErrorHandler;
window.FreeColumn = FreeColumn;
window.ResetGame = ResetGame;
window.ShowHint = ShowHint;
window.SwitchMode = SwitchMode;

GetWord();
GenerateGrid();
FreeColumn();
console.log("STARTED...");