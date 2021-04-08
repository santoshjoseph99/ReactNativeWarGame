import {Deck} from 'deckjs';
import GameResult from './GameResult';

const CARD1_HIGHER = 1;
const CARD2_HIGHER = -1;
const CARDS_TIED = 0;
const MIN_PLAYABLE_LENGTH = 4;
const CARDS_FOR_WAR_LEN = 4;

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
      return CARD1_HIGHER;
    } else if (card1.getValue() < card2.getValue()) {
      return CARD2_HIGHER;
    }
    return CARDS_TIED;
  }

  addCards(player, card1, card2, player1HiddenCards, player2HiddenCards) {
    player.cards.push(card1);
    player.cards.push(card2);
    player.cards.push(
      ...player1HiddenCards,
      ...player2HiddenCards,
      ...this.player1TiedCards,
      ...this.player2TiedCards
    );
    this.player1TiedCards = [];
    this.player2TiedCards = [];
  }

  addHiddenCards(hiddenCards, cards) {
    hiddenCards.push(cards.shift());
    hiddenCards.push(cards.shift());
    hiddenCards.push(cards.shift());
  }

  isEmpty(cards) {
    return cards.length === 0;
  }

  play() {
    if (this.isEmpty(this.player2.cards)) {
      return {
        result: GameResult.Player1WinsGame,
        player1Cards: [],
        player2Cards: [],
      };
    } else if (this.isEmpty(this.player1.cards)) {
      return {
        result: GameResult.Player2WinsGame,
        player1Cards: [],
        player2Cards: [],
      };
    }
    const player1HiddenCards = [];
    const player2HiddenCards = [];
    if (this.gameTied) {
      if (this.player1.cards.length < MIN_PLAYABLE_LENGTH) {
        const player1Cards = this.player1.cards.slice(0);
        this.player2.cards.push(
          ...this.player1TiedCards,
          ...this.player2TiedCards,
          ...player1Cards
        );
        this.player1.cards = [];
        return {
          result: GameResult.Player2Wins,
          player1Cards: player1Cards,
          player2Cards: this.player2.cards.slice(0, CARDS_FOR_WAR_LEN),
        };
      } else if (this.player2.cards.length < MIN_PLAYABLE_LENGTH) {
        const player2Cards = this.player2.cards.slice(0);
        this.player1.cards.push(
          ...this.player1TiedCards,
          ...this.player2TiedCards,
          ...player2Cards
        );
        this.player2.cards = [];
        return {
          result: GameResult.Player1Wins,
          player1Cards: this.player1.cards.slice(0, CARDS_FOR_WAR_LEN),
          player2Cards: player2Cards,
        };
      }
      this.addHiddenCards(player1HiddenCards, this.player1.cards);
      this.addHiddenCards(player2HiddenCards, this.player2.cards);
      this.gameTied = false;
    }

    const card1 = this.player1.cards.shift();
    const card2 = this.player2.cards.shift();

    if (this.compareCards(card1, card2) === CARD1_HIGHER) {
      this.addCards(this.player1, card1, card2, player1HiddenCards, player2HiddenCards);
      return {
        result: GameResult.Player1Wins,
        player1Cards: player1HiddenCards.concat([card1]),
        player2Cards: player2HiddenCards.concat([card2]),
      };
    } else if (this.compareCards(card1, card2) === CARD2_HIGHER) {
      this.addCards(this.player2, card1, card2, player1HiddenCards, player2HiddenCards);
      return {
        result: GameResult.Player2Wins,
        player1Cards: player1HiddenCards.concat([card1]),
        player2Cards: player2HiddenCards.concat([card2]),
      };
    } else {
      this.gameTied = true;
      this.player1TiedCards.push(card1, ...player1HiddenCards);
      this.player2TiedCards.push(card2, ...player2HiddenCards);
      return {
        result: GameResult.PlayerTie,
        player1Cards: player1HiddenCards.concat([card1]),
        player2Cards: player2HiddenCards.concat([card2]),
      };
    }
  }
}
