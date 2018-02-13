const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getInitialData = () => alphabet.split('');
const getInitialDataWithState = () => alphabet.split('')
  .map(char => (
    { before: char, after: char }
  ));
export const ascii = char => char.charCodeAt();
export const deAscii = number => alphabet[number - 65];

export const getDataWithMode = (mode) => {
  if (mode === 0) {
    return getInitialData();
  }
  return getInitialDataWithState();
};

export const replaceString = (string, data) => (
  string.split('').map((c) => {
    const cn = ascii(c) - 65;
    if (cn >= 0 && cn <= 26) {
      return data[cn].after;
    }
    return c;
  }).join('')
);
