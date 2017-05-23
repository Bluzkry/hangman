const axios = require('axios');
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
  }

  static checkIfGameHasEnded(response) {
    return response.message === 'Congrats! You have solved this hangman!' || response.guessesLeft === 0;
  }

  guessCharacters() {
    const postChar = {
      char: this.lettersToGuess[this.count]
    };

    axios.post(this.urlPost, postChar)
      .then(({data}) => {
        this.startNextRound(data);
      })
      .catch(err => console.error(err));
  }

  start() {
    const postEmail = {
      email: this.email
    };

    axios.post(this.urlStart, postEmail)
      .then(({data}) => {
        this.gameId = data.gameId;
        this.urlPost = urlPost(this.gameId);
      })
      .catch(err => console.error(err));
  }

  startNextRound(data) {
    if (this.checkIfGameHasEnded(data)) {
      return `Game has ended: ${data.msg}`;
    } else {
      this.count += 1;
      this.guessCharacters();
    }
  }

  playGame() {
    this.start();
    this.guessCharacters();
  }
}

const hangman = new Hangman();
hangman.playGame();