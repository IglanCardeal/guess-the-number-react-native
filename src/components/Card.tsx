import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  style: {
    width: number;
    maxWidth: string;
    alignItems: 'center' | 'flex-end' | 'flex-start' | 'baseline' | 'stretch';
  };
}

const Card: React.FC<Props> = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  // estilo padrao do Card
  card: {
    backgroundColor: 'white',
    elevation: 6,
    padding: 10,
    borderRadius: 10,
    // --- IOS ---
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
});

export default Card;
