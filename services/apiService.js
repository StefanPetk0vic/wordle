import { GameState } from "../data/gameState.js";

async function GetWord() {
    await fetch("https://random-word-api.vercel.app/api?words=1&length=5")
        .then(response => response.json())
        .then(([word]) => {
            GameState.answer = word.toUpperCase();
        });
    if (GameState.answer === "" || GameState.answer === "yo-yo") {
        console.log("The word wasn't allowed");
        GetWord();
        return;
    }
    console.log("%c" + GameState.answer, "color: yellow; font-size: 12px;");
    if (!getMeaning(GameState.answer, true)) {
        GetWord();
    }
};

async function getMeaning(param, ADMIN = false) {
    let meaning;
    try {
        await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${param}`)
            .then(response => response.json())
            .then(([desc]) => {
                meaning = desc.meanings[0].definitions[0].definition;
            });
        if (ADMIN) {
            console.log("%c" + meaning, "color: yellow; font-size: 12px;");
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