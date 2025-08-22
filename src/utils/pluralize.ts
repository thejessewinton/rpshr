export const pluralize = (count: number, word: string) => {
  return `${word}${count !== 1 ? 's' : ''}`;
};
