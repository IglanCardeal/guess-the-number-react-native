import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../components/Card';
import AppButton from '../components/AppButton';
import NumberContainer from '../components/NumberContainer';

import Colors from '../styles/colors';
import FontSize from '../styles/fontSize';

interface Props {
  restartGame: () => void;
  numberOfRounds: number;
  userNumber: number;
}

const GameOverScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Game Over</Text>
      <Card style={styles.result}>
        <Text style={styles.text}>Number of rounds:</Text>
        <NumberContainer numberValue={props.numberOfRounds} />
        <Text style={styles.text}>User number:</Text>
        <NumberContainer numberValue={props.userNumber} />
      </Card>
      <View>
        <AppButton
          onPress={() => props.restartGame()}
          style={styles.restarButton}
          title="Restart Game"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  result: {
    width: 400,
    height: 'auto',
    maxWidth: '90%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#313638',
    paddingVertical: 20,
  },
  title: {
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.h2,
  },
  text: {
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general,
    marginVertical: 10,
  },
  restarButton: {
    backgroundColor: '#ffcbbe',
    width: 200,
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.general,
    marginTop: 20,
  },
});

export default GameOverScreen;
