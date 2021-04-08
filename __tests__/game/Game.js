import {Card, Rank, Suit} from 'deckjs';
import Game from '../../game/';
import GameResult from '../../game/GameResult';

function getRank(r) {
  switch (r) {
    case 'a':
      return Rank.Ace;
    case 'k':
      return Rank.King;
    case 'q':
      return Rank.Queen;
    case 'j':
      return Rank.Jack;
    case 't':
      return Rank.Ten;
    case '9':
      return Rank.Nine;
    case '8':
      return Rank.Eight;
    case '7':
      return Rank.Seven;
    case '6':
      return Rank.Six;
    case '5':
      return Rank.Five;
    case '4':
      return Rank.Four;
    case '3':
      return Rank.Three;
    case '2':
      return Rank.Two;
  }
}

function getSuit(s) {
  switch (s) {
    case 'c':
      return Suit.Club;
    case 's':
      return Suit.Spade;
    case 'd':
      return Suit.Diamond;
    case 'h':
      return Suit.Heart;
  }
}

function createCards(cardStr) {
  return cardStr.split(' ').map((c) => new Card(getRank(c[0]), getSuit(c[1])));
}

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
  game.player1.cards = createCards('ac kc');
  game.player2.cards = createCards('ks qs');

  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player1Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('ac');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  expect(game.player1.cards).toHaveLength(3);
  expect(game.player2.cards).toHaveLength(1);
});

it('play game: player 2 wins hand', () => {
  const game = new Game();
  game.player1.cards = createCards('kc jc');
  game.player2.cards = createCards('as qs');

  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player2Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('kc');
  expect(handResult.player2Cards[0].toShortString()).toBe('as');
  expect(game.player1.cards).toHaveLength(1);
  expect(game.player2.cards).toHaveLength(3);
});

it('play game: tie game, player 1 wins hand', () => {
  const game = new Game();
  game.player1.cards = createCards('kc 3c 4c 5c ac 6c');
  game.player2.cards = createCards('ks 3s 5s 4s qs 7s');

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
  game.player1.cards = createCards('ks 3s 5s 4s qs 7s');
  game.player2.cards = createCards('kc 3c 4c 5c ac 6c');

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
  game.player1.cards = createCards('ks 3s 5s 4s qs 7s 8s 9s js ts');
  game.player2.cards = createCards('kc 3c 5c 4c qc 7c 8c 9c 2c tc');

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
  game.player1.cards = createCards('ks 3s 5s 4s qs 7s 8s 9s 2s ts');
  game.player2.cards = createCards('kc 3c 5c 4c qc 7c 8c 9c jc tc');

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
  game.player1.cards = createCards('ks 3s 5s');
  game.player2.cards = createCards('kc 3c 5c 4c qc');

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
  game.player1.cards = createCards('kc 3c 5c 4c qc');
  game.player2.cards = createCards('ks 3s 5c');

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
  game.player1.cards = createCards('ac 3c 5c 4c qc');
  game.player2.cards = createCards('ks');

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
  game.player1.cards = createCards('ks');
  game.player2.cards = createCards('ac 3c 5c 4c qc');

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
