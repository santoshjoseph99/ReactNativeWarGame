import {Card, Rank, Suit} from 'deckjs';
import Game from '../../game/';
import GameResult from '../../game/GameResult';

it('Game', () => {
  const game = new Game();
});

it('Game deals 26 cards to each player', () => {
  const game = new Game();
  expect(game.player1.cards).toHaveLength(26);
  expect(game.player2.cards).toHaveLength(26);
});

it('play game: player 1 wins hand', () => {
  const game = new Game();
  game.player1.cards = [new Card(Rank.Ace, Suit.Club), new Card(Rank.King, Suit.Club)];
  game.player2.cards = [new Card(Rank.King, Suit.Spade), new Card(Rank.Queen, Suit.Spade)];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player1Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('ac');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  expect(game.player1.cards).toHaveLength(3);
  expect(game.player2.cards).toHaveLength(1);
});

it('play game: player 2 wins hand', () => {
  const game = new Game();
  game.player1.cards = [new Card(Rank.King, Suit.Club), new Card(Rank.King, Suit.Club)];
  game.player2.cards = [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Queen, Suit.Spade)];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player2Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('kc');
  expect(handResult.player2Cards[0].toShortString()).toBe('as');
  expect(game.player1.cards).toHaveLength(1);
  expect(game.player2.cards).toHaveLength(3);
});

it('play game: tie game, player 1 wins hand', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Club),
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Ace, Suit.Club),
    new Card(Rank.Six, Suit.Club),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Spade),
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
    new Card(Rank.Four, Suit.Spade),
    new Card(Rank.Queen, Suit.Spade),
    new Card(Rank.Seven, Suit.Spade),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('kc');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  expect(game.player1.cards).toHaveLength(5);
  expect(game.player2.cards).toHaveLength(5);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player1Wins);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(handResult2.player1Cards[3].toShortString()).toBe('ac');
  expect(handResult2.player2Cards[3].toShortString()).toBe('qs');
  expect(game.player1.cards).toHaveLength(11);
  expect(game.player2.cards).toHaveLength(1);
});

it('play game: tie game, player 2 wins hand', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Spade),
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
    new Card(Rank.Four, Suit.Spade),
    new Card(Rank.Queen, Suit.Spade),
    new Card(Rank.Seven, Suit.Spade),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Club),
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Ace, Suit.Club),
    new Card(Rank.Six, Suit.Club),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('ks');
  expect(handResult.player2Cards[0].toShortString()).toBe('kc');
  expect(game.player1.cards).toHaveLength(5);
  expect(game.player2.cards).toHaveLength(5);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player2Wins);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(handResult2.player1Cards[3].toShortString()).toBe('qs');
  expect(handResult2.player2Cards[3].toShortString()).toBe('ac');
  expect(game.player1.cards).toHaveLength(1);
  expect(game.player2.cards).toHaveLength(11);
});

it('play game: multiple ties, player 1 wins hand', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Spade), //initial tie
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
    new Card(Rank.Four, Suit.Spade),
    new Card(Rank.Queen, Suit.Spade), // 2nd tie
    new Card(Rank.Seven, Suit.Spade),
    new Card(Rank.Eight, Suit.Spade),
    new Card(Rank.Nine, Suit.Spade),
    new Card(Rank.Jack, Suit.Spade), //winner
    new Card(Rank.Ten, Suit.Spade),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Club), //initial tie
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Queen, Suit.Club), // 2nd tie
    new Card(Rank.Seven, Suit.Club),
    new Card(Rank.Eight, Suit.Club),
    new Card(Rank.Nine, Suit.Club),
    new Card(Rank.Two, Suit.Club), //loser
    new Card(Rank.Ten, Suit.Club),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('ks');
  expect(handResult.player2Cards[0].toShortString()).toBe('kc');
  expect(game.player1.cards).toHaveLength(9);
  expect(game.player2.cards).toHaveLength(9);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player2Tie);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(handResult2.player1Cards[3].toShortString()).toBe('qs');
  expect(handResult2.player2Cards[3].toShortString()).toBe('qc');
  expect(game.player1.cards).toHaveLength(5);
  expect(game.player2.cards).toHaveLength(5);
  const handResult3 = game.play();
  expect(handResult3.result).toBe(GameResult.Player1Wins);
  expect(handResult3.player1Cards).toHaveLength(4);
  expect(handResult3.player2Cards).toHaveLength(4);
  expect(handResult3.player1Cards[3].toShortString()).toBe('js');
  expect(handResult3.player2Cards[3].toShortString()).toBe('2c');
  expect(game.player1.cards).toHaveLength(19);
  expect(game.player2.cards).toHaveLength(1);
});

it('play game: multiple ties, player 2 wins hand', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Spade), //initial tie
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
    new Card(Rank.Four, Suit.Spade),
    new Card(Rank.Queen, Suit.Spade), // 2nd tie
    new Card(Rank.Seven, Suit.Spade),
    new Card(Rank.Eight, Suit.Spade),
    new Card(Rank.Nine, Suit.Spade),
    new Card(Rank.Two, Suit.Spade), // loser
    new Card(Rank.Ten, Suit.Spade),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Club), //initial tie
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Queen, Suit.Club), // 2nd tie
    new Card(Rank.Seven, Suit.Club),
    new Card(Rank.Eight, Suit.Club),
    new Card(Rank.Nine, Suit.Club),
    new Card(Rank.Jack, Suit.Club), // winner
    new Card(Rank.Ten, Suit.Club),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('ks');
  expect(handResult.player2Cards[0].toShortString()).toBe('kc');
  expect(game.player1.cards).toHaveLength(9);
  expect(game.player2.cards).toHaveLength(9);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player2Tie);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(handResult2.player1Cards[3].toShortString()).toBe('qs');
  expect(handResult2.player2Cards[3].toShortString()).toBe('qc');
  expect(game.player1.cards).toHaveLength(5);
  expect(game.player2.cards).toHaveLength(5);
  const handResult3 = game.play();
  expect(handResult3.result).toBe(GameResult.Player2Wins);
  expect(handResult3.player1Cards).toHaveLength(4);
  expect(handResult3.player2Cards).toHaveLength(4);
  expect(handResult3.player1Cards[3].toShortString()).toBe('2s');
  expect(handResult3.player2Cards[3].toShortString()).toBe('jc');
  expect(game.player1.cards).toHaveLength(1);
  expect(game.player2.cards).toHaveLength(19);
});

it('play game: tie, player 1 runs out of cards, player 2 wins', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Spade), //initial tie
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Club), //initial tie
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Queen, Suit.Club),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('ks');
  expect(handResult.player2Cards[0].toShortString()).toBe('kc');
  expect(game.player1.cards).toHaveLength(2);
  expect(game.player2.cards).toHaveLength(4);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player2Wins);
  expect(handResult2.player1Cards).toHaveLength(2);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(game.player1.cards).toHaveLength(0);
  expect(game.player2.cards).toHaveLength(8);
});

it('play game: tie, player 2 runs out of cards, player 1 wins', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Club), //initial tie
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Queen, Suit.Club),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Spade), //initial tie
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('kc');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  expect(game.player1.cards).toHaveLength(4);
  expect(game.player2.cards).toHaveLength(2);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player1Wins);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(2);
  expect(game.player1.cards).toHaveLength(8);
  expect(game.player2.cards).toHaveLength(0);
});

it('play game: player 1 wins game', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.Ace, Suit.Club),
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Queen, Suit.Club),
  ];
  game.player2.cards = [new Card(Rank.King, Suit.Spade)];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player1Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('ac');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  expect(game.player1.cards).toHaveLength(6);
  expect(game.player2.cards).toHaveLength(0);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player1WinsGame);
  expect(handResult2.player1Cards).toHaveLength(0);
  expect(handResult2.player2Cards).toHaveLength(0);
  expect(game.player1.cards).toHaveLength(6);
  expect(game.player2.cards).toHaveLength(0);
});

it('play game: player 2 wins game', () => {
  const game = new Game();
  game.player1.cards = [new Card(Rank.King, Suit.Spade)];
  game.player2.cards = [
    new Card(Rank.Ace, Suit.Club),
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Queen, Suit.Club),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player1Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('ks');
  expect(handResult.player2Cards[0].toShortString()).toBe('ac');
  expect(game.player1.cards).toHaveLength(0);
  expect(game.player2.cards).toHaveLength(6);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player2WinsGame);
  expect(handResult2.player1Cards).toHaveLength(0);
  expect(handResult2.player2Cards).toHaveLength(0);
  expect(game.player1.cards).toHaveLength(0);
  expect(game.player2.cards).toHaveLength(6);
});
