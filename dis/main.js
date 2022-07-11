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
window.onload = () => {
    navigator.geolocation.getCurrentPosition(requestWeatherToApi);
};
function requestWeatherToApi(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        let URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
        let htmlElement = document.getElementById('weather-in-dom');
        try {
            let response = yield fetch(URL_WEATHER);
            if (!response.ok)
                throw new Error(`Error! status: ${response.status}`);
            let weather = yield response.json();
            console.log(weather);
            htmlElement.innerHTML = weather.name + " | " + parseInt(weather.main.temp) + "ºC";
        }
        catch (e) {
            htmlElement.innerHTML = e.message;
        }
    });
}
let savedJoke;
function requestJokeToApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const URL_JOKE = "https://icanhazdadjoke.com/";
        const header = {
            headers: {
                Accept: "application/json",
            }
        };
        let htmlElement = document.getElementById('joke-in-dom');
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
class Joke {
    constructor(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}
const jokeRepository = [];
function scoreJoke(score) {
    requestJokeToApi();
    jokeRepository.push(new Joke(savedJoke, score, new Date().toISOString()));
    console.log("Joke repository:", jokeRepository);
}
