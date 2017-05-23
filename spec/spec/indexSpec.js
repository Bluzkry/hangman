const axios = require('axios');
const Promise = require('bluebird');
const {Hangman} = require('./../../index');
const {lettersToGuess, urlStart, urlPost} = require('./../../helpers/helpers');
const {email} = require('./../../helpers/config');

describe('Hangman', () => {
  let hangman;
  beforeEach(() => {
    hangman = new Hangman();
  });

  it('changes the gameID and urlPost to the correct values when the game starts', () => {

    const response = {
      data: {
        gameId: 1
      }
    };
    const resolved = new Promise(resolveCB => resolveCB(response));
    spyOn(axios, 'post').and.returnValue(resolved);

    const callback = () => {
      expect(hangman.gameId).toEqual(1);
      expect(hangman.urlPost).toEqual('http://int-sys.usr.space/hangman/games/1/guesses');
    };

    hangman.start(callback);
  });

  describe('Next Round', () => {
    const endConditions = [
      {
        msg: 'Game has ended:  You have guessed e. But you didn\'t solve hangman! The answer was test',
        guessesLeft: 0
      },
      {
        msg: 'Congrats! You have solved this hangman!',
        guessesLeft: 5
      }
    ];

    const nonEndCondition = {
      msg: 'You have guessed e',
      guessesLeft: 5
    };

    it('finishes the game when the end conditions are met', () => {
      endConditions.forEach(data => {
        const expectedMessage = `Game has ended: ${data.msg}`;

        expect(hangman.checkIfGameHasEnded(data)).toBe(true);
        expect(hangman.startNextRound(data)).toEqual(expectedMessage);
      });
    });

    it('continues the game when the end conditions are not met', () => {
      expect(hangman.checkIfGameHasEnded(nonEndCondition)).toBe(false);

      spyOn(hangman, 'guessCharacters');
      hangman.startNextRound(nonEndCondition);
      expect(hangman.guessCharacters).toHaveBeenCalled();
    });

  });

});