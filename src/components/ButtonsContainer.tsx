import React from 'react';
import { View, StyleSheet } from 'react-native';

const ButtonsContainer: React.FC = props => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  }
});

export default ButtonsContainer;
