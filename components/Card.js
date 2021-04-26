import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 166,
    height: 158,
    resizeMode: 'contain',
  },
});

const Card = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.cardImage} style={styles.image} />
    </View>
  );
};

export default Card;
