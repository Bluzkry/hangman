const axios = require('axios');
const Promise = require('bluebird');
const {lettersToGuess, urlStart, urlPost} = require('./helpers/helpers');
const {email} = require('./helpers/config');

class Hangman {
  constructor() {
    this.count = 0;
    this.email = email;
    this.lettersToGuess = lettersToGuess;
    
    this.urlStart = urlStart;
    this.gameId = null;
    this.urlPost = null;

    this.guessCharacters = this.guessCharacters.bind(this);
    this.start = this.start.bind(this);
    this.startNextRound = this.startNextRound.bind(this);
  }

  checkIfGameHasEnded(response) {
    return response.msg === 'Congrats! You have solved this hangman!' || response.guessesLeft === 0;
  }

  guessCharacters() {
    const postChar = {
      char: this.lettersToGuess[this.count]
    };

    axios.post(this.urlPost, postChar)
      .then(({data}) => {
       console.log(`Word: ${data.word} Guesses left: ${data.guessesLeft} Message: ${data.msg}`);
        this.startNextRound(data);
      })
      .catch(err => console.error(err));
  }

  start(callback) {
    const postEmail = {
      email: this.email
    };

    axios.post(this.urlStart, postEmail)
      .then(({data}) => {
        this.gameId = data.gameId;
        this.urlPost = urlPost(this.gameId);
        // normally the callback would take in the result i.e. callback(null, data)
        // but our promisified function doesn't need the result in order to work
        callback()
      })
      .catch(err => callback(err, null));
  }

  startNextRound(data) {
    if (this.checkIfGameHasEnded(data)) {
      console.log('Game has ended: ', data.msg);
      return `Game has ended: ${data.msg}`;
    } else {
      this.count += 1;
      this.guessCharacters();
    }
  }

  playGame() {
    const startAsync = Promise.promisify(this.start);
    startAsync()
      .then(this.guessCharacters)
      .catch(err => console.error(err));
  }
}

const hangman = new Hangman();
hangman.playGame();