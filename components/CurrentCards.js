import React from 'react';
import {View} from 'react-native';
import Card from './Card';

const CurrentCards = ({player1Card, player2Card}) => {
  return (
    <View>
      <Card cardImage={player1Card} />
      <Card cardImage={player2Card} />
    </View>
  );
};

export default CurrentCards;
