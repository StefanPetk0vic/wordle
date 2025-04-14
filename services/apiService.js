import { GameState } from "../data/gameState.js";

async function GetWord() {

    const response = await fetch("https://random-word-api.vercel.app/api?words=1&length=5");
    const [word] = await response.json();

    GameState.answer = word.toUpperCase();

    if (GameState.answer === "" || GameState.answer === "YO-YO") {
        console.log("The word wasn't allowed");
        return GetWord(); 
    }

    console.log("%c" + GameState.answer, "color: blue; font-size: 12px;");

    const meaningFound = await getMeaning(GameState.answer, true);

    if (!meaningFound) {
        return GetWord(); 
    }
}

async function getMeaning(param, ADMIN = false) {
    let meaning;
    try {
        await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${param}`)
            .then(response => response.json())
            .then(([desc]) => {
                meaning = desc.meanings[0].definitions[0].definition;
            });
        if (ADMIN) {
            console.log("%c" + meaning, "color: blue; font-size: 12px;");
            GameState.desc = meaning;
        }
        return true;
    }
    catch {
        console.warn("The meaning wasn't found");
        return false;
    }
}

export { GetWord, getMeaning }; 