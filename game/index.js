import {Deck} from 'deckjs';
import GameResult from './GameResult';

export default class Game {
  constructor() {
    this.gameTied = false;
    this.player1TiedCards = [];
    this.player2TiedCards = [];
    this.player1 = {
      cards: [],
    };
    this.player2 = {
      cards: [],
    };
    this.deck = new Deck(1);
    this.deck.shuffle();
    for (let i = 0; i < 26; i++) {
      this.player1.cards.push(this.deck.getCard());
    }
    for (let i = 0; i < 26; i++) {
      this.player2.cards.push(this.deck.getCard());
    }
  }

  compareCards(card1, card2) {
    if (card1.getValue() > card2.getValue()) {
      return 1;
    } else if (card1.getValue() < card2.getValue()) {
      return -1;
    }
    return 0;
  }

  play() {
    const player1HiddenCards = [];
    const player2HiddenCards = [];
    if (this.gameTied) {
      player1HiddenCards.push(this.player1.cards.shift());
      player1HiddenCards.push(this.player1.cards.shift());
      player1HiddenCards.push(this.player1.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      this.gameTied = false;
    }
    const card1 = this.player1.cards.shift();
    const card2 = this.player2.cards.shift();
    if (this.compareCards(card1, card2) === 1) {
      this.player1.cards.push(card1);
      this.player1.cards.push(card2);
      this.player1.cards.push(
        ...player1HiddenCards,
        ...player2HiddenCards,
        ...this.player1TiedCards,
        ...this.player2TiedCards
      );
      this.player1TiedCards = [];
      this.player2TiedCards = [];
      return {
        result: GameResult.Player1Wins,
        player1Cards: player1HiddenCards.concat([card1]),
        player2Cards: player2HiddenCards.concat([card2]),
      };
    } else if (this.compareCards(card1, card2) === -1) {
      this.player2.cards.push(card1);
      this.player2.cards.push(card2);
      this.player2.cards.push(
        ...player1HiddenCards,
        ...player2HiddenCards,
        ...this.player1TiedCards,
        ...this.player2TiedCards
      );
      this.player1TiedCards = [];
      this.player2TiedCards = [];
      return {
        result: GameResult.Player2Wins,
        player1Cards: player1HiddenCards.concat([card1]),
        player2Cards: player2HiddenCards.concat([card2]),
      };
    } else {
      this.gameTied = true;
      this.player1TiedCards.push(card1);
      this.player2TiedCards.push(card2);
      return {
        result: GameResult.PlayerTie,
        player1Cards: player1HiddenCards.concat([card1]),
        player2Cards: player2HiddenCards.concat([card2]),
      };
    }
  }
}
