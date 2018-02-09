const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getInitialData = () => alphabet.split('');
export const ascii = char => char.charCodeAt();
export const deAscii = number => alphabet[number - 65];
