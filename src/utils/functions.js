export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
};

export function getNRandomElements(array, number) {
  let result = [];
  for (let i = 0; i < number; i++) {
    result.push(getRandomElement(array))
  }
  return result;
};
