const lettersToGuess = [
  'e',
  't',
  'a',
  'i',
  'n',
  'o',
  's',
  'h',
  'r',
  'd',
  'l',
  'u',
  'c',
  'm',
  'f',
  'w',
  'y',
  'g',
  'p',
  'b',
  'v',
  'k',
  'q',
  'j',
  'x',
  'z'];

const urlStart = 'http://int-sys.usr.space/hangman/games';
const urlPost = (gameId) => `http://int-sys.usr.space/hangman/games/${gameId}/guesses`;

module.exports = {
  lettersToGuess: lettersToGuess,
  urlStart: urlStart,
  urlPost: urlPost
};
