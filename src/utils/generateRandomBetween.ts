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
    // maquina nao pode acertar de primeira
    return generateRandomBetween(min, max, exclude);
  }

  return randomNumber;
};

export default generateRandomBetween;
