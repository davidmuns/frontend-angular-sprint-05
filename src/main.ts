window.onload = () => {
    navigator.geolocation.getCurrentPosition(requestWeatherToApi);
}
async function requestWeatherToApi(position: any): Promise<void> {
    const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
    let lon: number = position.coords.longitude;
    let lat: number = position.coords.latitude;
    let URL_WEATHER: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
    let htmlElement: HTMLElement = document.getElementById('weather-in-dom') as HTMLElement;
    try {
        let response = await fetch(URL_WEATHER)
        if (!response.ok) throw new Error(`Error! status: ${response.status}`);
        let weather = await response.json();
        htmlElement.innerHTML = weather.name + " | " + parseInt(weather.main.temp) + "ºC";
    } catch (e: any) {
        htmlElement.innerHTML = e.message;
    }
}

async function requestJokeToApi(): Promise<void> {
    let randomNumber: number = Math.random();
    let randomURL: string;
    let isChuckNorrisJoke: boolean = false;
    let htmlElement: HTMLElement = document.getElementById('joke-in-dom') as HTMLElement;
    const header = {
        headers: {
            Accept: "application/json",
        }
    };
    if (randomNumber > 0.4) {
        randomURL = "https://icanhazdadjoke.com/";
    } else {
        randomURL = "https://api.chucknorris.io/jokes/random";
        isChuckNorrisJoke = true;
    }
    try {
        let response: Response = await fetch(randomURL, header)
        if (!response.ok) throw new Error(`Error! status: ${response.status}`);
        let jokeJson: any = await response.json();
        let joke: string = isChuckNorrisJoke ? jokeJson.value : jokeJson.joke;
        htmlElement.innerText = `" ${joke} " | Chuck Norris joke? ${isChuckNorrisJoke}`;
    } catch (e: any) {
        htmlElement.innerText = e.message;
    }
}

class Joke {
    private joke: string;
    private score: number;
    private date: string;

    constructor(joke: string, score: number, date: string) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}

const jokeRepository: Joke[] = [];
function scoreJoke(score: number) {
    const htmlElement: HTMLElement = document.getElementById('joke-in-dom') as HTMLElement;
    jokeRepository.push(new Joke(htmlElement.innerText, score, new Date().toISOString()));
    console.log("Joke repository:", jokeRepository);
    requestJokeToApi();
}

