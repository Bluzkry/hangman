# Hangman

This version of Hangman (back-end only) is played with an online REST API. The computer automatically plays and attempts to win the game (sadly, the user is not given the opportunity to plan).

## Configuring the E-mail Address
This version of Hangman can be played with any e-mail address that you choose. Before playing, **you must set-up a configuration file** that has the e-mail address.

1) Create a file called `config.js`. This file should be in the helpers directory, as follows:
```
root/
  README.md
  node_modules/
  package.json
  .gitignore
  index.js
  helpers/
    helpers.js
    config.js
```
2) In the `config.js` file, post the following code:
````
module.exports = {
  email: "<<YOUR EMAIL HERE>>"
}
````

## How to Play
0) If you do not have npm or node, please install these on your computer. There are a plethora of useful and informative tutorials about npm and node which can be found about through Google or Youtube (these are often arguably clearer than the official documentation).
1) Go to the root directory of this game.
2) Set-up your `config.js` file.
3) Open your command line and run:
```
npm install
node index.js
```

## How to Run Tests
0) If you have not done so, please complete steps 0 to 3 of "How to Play".
1) Open your command line and run:
```
npm test
```
