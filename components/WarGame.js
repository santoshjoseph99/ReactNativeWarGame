import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import CurrentCards from './CurrentCards';
import HandResult from './HandResult';
import PlayerScore from './PlayerScore';
import {Deck} from 'deckjs';
import cardMap from './Cards';

const deck = new Deck(1);

export default function WarGame() {
  const [player1Card, setPlayer1Card] = React.useState();
  const [player2Card, setPlayer2Card] = React.useState();

  const play = () => {
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
  };
  React.useEffect(() => {
    deck.shuffle();
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
  }, []);
  return (
    <View style={styles.container}>
      {player1Card && player2Card && (
        <CurrentCards
          player1Card={cardMap.get(player1Card.toShortString())}
          player2Card={cardMap.get(player2Card.toShortString())}
        />
      )}
      <HandResult />
      <PlayerScore />
      <Button title="Play" onPress={play} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
