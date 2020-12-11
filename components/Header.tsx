import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Colors from '../constants/colors';
import FontSize from '../constants/fontSize';

interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/guess.png')} style={styles.image} />
      <Text style={styles.headerTitle}>{props.title}</Text>
      <Image source={require('../assets/guess.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.header.background_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 32,
    width: 32,
    marginHorizontal: 20,
  },
  headerTitle: {
    color: Colors.header.text_color,
    fontSize: FontSize.h1,
  },
});

export default Header;
