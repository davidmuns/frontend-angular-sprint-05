"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DAD_JOKE_URL = "https://icanhazdadjoke.com/";
const header = {
    headers: {
        Accept: "application/json",
    }
};
class Joke {
    constructor(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}
let tempJoke = '';
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(DAD_JOKE_URL, header);
            if (!response.ok)
                throw new Error(`Error! status: ${response.status}`);
            const joke = yield response.json()
                .then(jokeJson => jokeJson.joke);
            document.getElementById('text-joke').innerHTML = `" ${joke} "`;
            tempJoke = joke;
        }
        catch (e) {
            document.getElementById('text-joke').innerHTML = e.message;
        }
    });
}
const reportJokes = [];
function jokeScore(score) {
    getJoke();
    const joke = new Joke(tempJoke, score, new Date().toISOString());
    reportJokes.push(joke);
    console.log(reportJokes);
}
