import React from 'react';
import {StyleSheet, View} from 'react-native';
import CurrentCards from './CurrentCards';
import HandResult from './HandResult';
import PlayerScore from './PlayerScore';

export default function WarGame() {
  return (
    <View style={styles.container}>
      <CurrentCards />
      <HandResult />
      <PlayerScore />
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
