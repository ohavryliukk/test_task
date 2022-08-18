const GENDE = {
    COMEDY: "comedy",
    SCI_FI: "sci-fi",
    ACTION: "action",
    DRAMA: "drama"
}

class Show {
    name;
    genre;
    releaseDate;
    duration;

    constructor (name, genre, releaseDate, duration) {
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.duration = duration;
    }

    getDuration () {
        return this.duration;
    }
}

class Movie extends Show {
}

class Episode extends Show {
}

class Series extends Show {
    episodes = new Set();
    addEpisode (episode) {
        this.episodes.add(episode);
    }
}

class StreamingService {
    serviceName;
    shows = [];
    viewsByShowNames = new Map();
    constructor (serviceName) {
        this.serviceName = serviceName;
    }

    addShow (show) {
        if (!this.shows.includes(show)) {
            this.shows.push(show);
            this.viewsByShowNames.set(show.name, 0);
        }
    }
    getMostViewedShowsOfYear(year) {
        const showsOfYear = this.shows.filter(show => show.releaseDate.includes(year));
        showsOfYear.sort((a, b) => this.viewsByShowNames.get(b.name) - this.viewsByShowNames.get(a.name));
        return showsOfYear.slice(0, 10);
    }
    getMostViewedShowsOfGenre(genre) {
        const showsOfYear = this.shows.filter(show => show.genre.includes(genre));
        showsOfYear.sort((a, b) => this.viewsByShowNames.get(b.name) - this.viewsByShowNames.get(a.name));
        return showsOfYear.slice(0, 10);
    }
}

class Subscription {
    streamingService;
    constructor(streamingService){
        this.streamingService = streamingService;
    }
    watch(showName) {
        const currentShowViews = this.streamingService.viewsByShowNames.get(showName);
        if (currentShowViews !== undefined) {
            this.streamingService.viewsByShowNames.set(showName, currentShowViews + 1);
        }
    }
    getRecommendationTrending() {
        const trendingShows = this.streamingService.getMostViewedShowsOfYear(2022);
        return trendingShows[Math.floor(Math.random() * trendingShows.length)];
    }
    getRecommendationByGenre(genre) {
        const trendingGenreShows = this.streamingService.getMostViewedShowsOfGenre(genre);
        return trendingGenreShows[Math.floor(Math.random() * trendingGenreShows.length)];
    }
}

class User {
    subscriptions = new Set();

    subscribe(streamingService) {
        this.subscriptions.add(streamingService);
        return streamingService;
    }
}



let movie1 = new Movie ("Ocean's Eight", GENDE.COMEDY, "02.04.2018", 97);
let movie2 = new Movie ("The 5th Wave", GENDE.SCI_FI, "05.12.2016", 112);
let movie3 = new Movie ("Doctor Strange", GENDE.SCI_FI, "04.05.2022", 120);
let movie4 = new Movie ("BumbleBee", GENDE.ACTION, "04.05.2018", 123);
let movie5 = new Movie ("Senior Year", GENDE.COMEDY, "09.01.2022", 98);
let movie6 = new Movie ("Joy", GENDE.DRAMA, "23.12.2015", 106);
let movie7 = new Movie ("33", GENDE.DRAMA, "16.08.2015", 99);
let movie8 = new Movie ("Fantastic Beasts", GENDE.SCI_FI, "30.06.2022", 126);
let movie9 = new Movie ("Thor", GENDE.SCI_FI, "01.08.2022", 131);
let movie10 = new Movie ("Avatar", GENDE.SCI_FI, "12.01.2009", 98);
let movie11 = new Movie ("The Wolverine", GENDE.ACTION, "04.05.2013", 118);
let series1 = new Series ("Friends", GENDE.COMEDY, "04.03.2003", 20);

series1.addEpisode("episode 1");
series1.addEpisode("episode 2");
series1.addEpisode("episode 3");
series1.addEpisode("episode 3"); // не добавить, так як використовується Set

let netflix = new StreamingService("Netflix");

netflix.addShow(movie1);
netflix.addShow(movie2);
netflix.addShow(movie3);
netflix.addShow(movie4);
netflix.addShow(movie5);
netflix.addShow(movie6);
netflix.addShow(movie7);
netflix.addShow(movie8);
netflix.addShow(movie9);
netflix.addShow(movie10);
netflix.addShow(movie11);
netflix.addShow(series1);
netflix.addShow(series1); // не добавить, бо відбувається перевірка за допомогою indexOf
console.log(netflix);

let netflixSubscription = new Subscription(netflix);
for (let i = 0; i < 18; i++) {
    netflixSubscription.watch("Ocean's Eight");
}
for (let i = 0; i < 34; i++) {
    netflixSubscription.watch("Thor");
}
for (let i = 0; i < 46; i++) {
    netflixSubscription.watch("Friends");
}
for (let i = 0; i < 23; i++) {
    netflixSubscription.watch("BumbleBee");
}
for (let i = 0; i < 17; i++) {
    netflixSubscription.watch("Doctor Strange");
}
for (let i = 0; i < 58; i++) {
    netflixSubscription.watch("Fantastic Beasts");
}
for (let i = 0; i < 12; i++) {
    netflixSubscription.watch("Senior Year");
}

console.log("getMostViewedShowsOfYear function:");
console.log(netflix.getMostViewedShowsOfYear("2022"));
console.log("the end of getMostViewedShowsOfYear function.");
console.log("------------");
console.log("getMostViewedShowsOfGenre function:");
console.log(netflix.getMostViewedShowsOfGenre("comedy"));
console.log("the end of getMostViewedShowsOfGenre function.");
console.log("------------");
console.log("getRecommendationTrending function:");
console.log("RecommendationTrending: ", netflixSubscription.getRecommendationTrending());
console.log("the end of getRecommendationTrending function.");
console.log("------------");
console.log("getRecommendationByGenre function:");
console.log("RecommendationByGenre: ", netflixSubscription.getRecommendationByGenre("comedy"))
console.log("the end of getRecommendationByGenre function.");

let user1 = new User();
user1.subscribe(netflixSubscription);
user1.subscribe(netflixSubscription); // не оформить, так як використовується Set
console.log(user1);


