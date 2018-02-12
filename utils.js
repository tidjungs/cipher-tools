const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getInitialData = () => alphabet.split('');
const getInitialDataWithState = () => alphabet.split('')
  .map(char => (
    { before: char, after: char, active: false }
  ));
export const ascii = char => char.charCodeAt();
export const deAscii = number => alphabet[number - 65];

export const getDataWithMode = (mode) => {
  if (mode === 0) {
    return getInitialData();
  }
  return getInitialDataWithState();
};

