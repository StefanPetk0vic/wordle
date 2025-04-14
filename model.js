import { ButtonPress } from "./core/gameLogic.js";
import {  AddScreenLetter, DeleteLetter, AddLetter, ResetGame, SwitchMode } from "./core/uiHandler.js";
import { GetWord, getMeaning } from "./services/apiService.js";
import { ErrorHandler, FreeColumn, GenerateGrid, ShowHint, InitPage } from "./utils/utils.js";

window.AddLetter = AddLetter;
window.DeleteLetter = DeleteLetter;
window.ButtonPress = ButtonPress;
window.getMeaning = getMeaning;
window.AddScreenLetter = AddScreenLetter;
window.ErrorHandler = ErrorHandler;
window.FreeColumn = FreeColumn;
window.ShowHint = ShowHint;
window.SwitchMode = SwitchMode;

InitPage();
GetWord();
GenerateGrid();
FreeColumn();
console.log("STARTED...");
