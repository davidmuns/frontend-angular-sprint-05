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
const URL_JOKE = "https://icanhazdadjoke.com/";
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
let savedJoke;
function requestJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let htmlElement = document.getElementById('joke-in-paragraph');
        try {
            let response = yield fetch(URL_JOKE, header);
            if (!response.ok)
                throw new Error(`Error! status: ${response.status}`);
            let joke = yield response.json()
                .then(jokeJson => jokeJson.joke);
            htmlElement.innerHTML = `" ${joke} "`;
            savedJoke = joke;
        }
        catch (e) {
            htmlElement.innerHTML = e.message;
        }
    });
}
const jokeRepository = [];
function jokeScore(score) {
    requestJoke();
    jokeRepository.push(new Joke(savedJoke, score, new Date().toISOString()));
    console.log("Joke repository:", jokeRepository);
}
