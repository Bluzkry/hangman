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

  postStart() {
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

  start() {
    this.count = 0;
    this.gameID = null;
    this.postStart();
  }

  playGame() {
    this.start();
    // this.playRound()
  }
}

const hangman = new Hangman();
hangman.start();