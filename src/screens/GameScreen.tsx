import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import AppButton from '../components/AppButton';
import ButtonsContainer from '../components/ButtonsContainer';

import Colors from '../styles/colors';
import FontSize from '../styles/fontSize';

interface Props {
  userChoice: number;
  restartGame: () => void;
}

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number,
): number => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);

  const randomNumber =
    Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return randomNumber;
};

const GameScreen: React.FC<Props> = (props) => {
  const [currentGuess, setCurrentGuess] = useState<number>(
    generateRandomBetween(1, 100, props.userChoice),
  );

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {
          text: 'Sorry',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.result}>
        <Text style={styles.title}>Opponent's Guess</Text>
        <NumberContainer
          numberValue={props.userChoice}
          textColor={`${Colors.textColor.secondary_color}`}
          borderColor={`${Colors.textColor.secondary_color}`}
        />
        <ButtonsContainer>
          <AppButton
            onPress={() => nextGuessHandler('lower')}
            style={styles.lowerButton}
            title="Lower"
          />
          <AppButton
            onPress={() => nextGuessHandler('greater')}
            style={styles.greaterButton}
            title="Greater"
          />
        </ButtonsContainer>
      </Card>
      <View>
        <AppButton
          onPress={() => props.restartGame()}
          style={{
            backgroundColor: '#ffcbbe',
            width: 200,
            color: Colors.textColor.secondary_color,
            fontSize: FontSize.general,
            marginTop: 20,
          }}
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
  title: {
    color: Colors.textColor.secondary_color,
    fontSize: FontSize.general,
  },
  result: {
    width: 400,
    maxWidth: '90%',
    alignItems: 'center',
  },
  lowerButton: {
    backgroundColor: Colors.buttons.secondary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general,
  },
  greaterButton: {
    backgroundColor: Colors.buttons.primary_color,
    width: 100,
    color: Colors.textColor.primary_color,
    fontSize: FontSize.general,
  },
});

export default GameScreen;
