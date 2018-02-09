const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getInitialData = () => alphabet.split('').map(c => ({
  before: c, after: c,
}));

export const ascii = char => char.charCodeAt();
export const deAscii = number => alphabet[number - 65];
