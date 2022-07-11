const DAD_JOKE_URL: string = "https://icanhazdadjoke.com/";
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
let tempJoke: string = '';
async function getJoke(): Promise<void> {

    try {
        const response: Response = await fetch(DAD_JOKE_URL, header)

        if (!response.ok) throw new Error(`Error! status: ${response.status}`);

        const joke: string = await response.json()
            .then(jokeJson => jokeJson.joke);

        document.getElementById('text-joke').innerHTML = `" ${joke} "`;
        
        
        tempJoke = joke;

    } catch (e: any) {
        document.getElementById('text-joke').innerHTML = e.message;
    }

}
const reportJokes: Joke[] = [];
function jokeScore(score: number) {
    getJoke();
    
    const joke: Joke = new Joke(tempJoke, score, new Date().toISOString());

    reportJokes.push(joke);

    console.log(reportJokes);

}
