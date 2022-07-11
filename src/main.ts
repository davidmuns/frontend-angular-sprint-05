const URL_JOKE: string = "https://icanhazdadjoke.com/";
const header = {
    headers: {
        Accept: "application/json",
    }
};

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
async function requestJoke(): Promise<void> {
    let htmlElement: HTMLElement = document.getElementById('joke-in-paragraph') as HTMLElement;
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
function jokeScore(score: number) {
    requestJoke();
    jokeRepository.push(new Joke(savedJoke, score, new Date().toISOString()));
    console.log("Joke repository:", jokeRepository);
}
