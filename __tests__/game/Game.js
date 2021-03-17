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
