import React from 'react';
import {View, Image, StyleSheet, Button} from 'react-native';
import cardMap from './Cards';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 166,
    height: 158,
    resizeMode: 'contain',
  },
});

const Card = () => {
  const [imageOne, setImageOne] = React.useState(cardMap.get('ac'));
  const [imageTwo, setImageTwo] = React.useState(cardMap.get('as'));
  return (
    <View style={styles.container}>
      <Image source={imageOne} style={styles.logo} />
      <Image source={imageTwo} style={styles.logo} />
      <Button
        title="Change Image1"
        color="#841584"
        onPress={() => setImageOne(cardMap.get('qs'))}
      />
      <Button
        title="Change Image2"
        color="#841584"
        onPress={() => setImageTwo(cardMap.get('6d'))}
      />
    </View>
  );
};

export default Card;
