export const formatNumber = (number) => {
  if (number >= 1000) {
    return Intl.NumberFormat('fr-FR').format(number);
  }
  return number;
};
