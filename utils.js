const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getInitialData = () => alphabet.split('');
export const getInitialDataWithState = () => alphabet.split('')
  .map(char => (
    { before: char, after: char, active: false }
  ));
export const ascii = char => char.charCodeAt();
export const deAscii = number => alphabet[number - 65];
