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

let savedJoke: string;
async function requestJokeToApi(): Promise<void> {
    const URL_JOKE: string = "https://icanhazdadjoke.com/";
    const header = {
        headers: {
            Accept: "application/json",
        }
    };
    let htmlElement: HTMLElement = document.getElementById('joke-in-dom') as HTMLElement;
    try {
        let response: Response = await fetch(URL_JOKE, header)
        if (!response.ok) throw new Error(`Error! status: ${response.status}`);
        let joke: string = await response.json()
            .then(jokeJson => jokeJson.joke);
        htmlElement.innerHTML = `" ${joke} "`;
        savedJoke = joke;
    } catch (e: any) {
        htmlElement.innerHTML = e.message;
    }
}

const jokeRepository: Joke[] = [];
function scoreJoke(score: number) {
    requestJokeToApi();
    jokeRepository.push(new Joke(savedJoke, score, new Date().toISOString()));
    console.log("Joke repository:", jokeRepository);
}

function setCoordinatesToApiWeatherUrl() {
    navigator.geolocation.getCurrentPosition(requestWeatherToApi);
}

async function requestWeatherToApi(position: any): Promise<void> {
    const apiKey = 'd0047952dfbeb9ec30622425fe11ed84';
    let lon: number = position.coords.longitude;
    let lat: number = position.coords.latitude;
    let URL_WEATHER: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
    let htmlElement: HTMLElement = document.getElementById('weather-in-dom') as HTMLElement;
    try {
        let response = await fetch(URL_WEATHER)
        if (!response.ok) throw new Error(`Error! status: ${response.status}`);
        let weather = await response.json();
        console.log(weather);
        htmlElement.innerHTML = weather.name + " | " + parseInt(weather.main.temp) + "ºC";
    } catch (e: any) {
        htmlElement.innerHTML = e.message;
    }
}

window.onload = () => {
    setCoordinatesToApiWeatherUrl();
}
