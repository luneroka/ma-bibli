export const formatNumber = (number) => {
  if (number >= 1000) {
    return Intl.NumberFormat('fr-FR').format(number);
  }
  return number;
};

export function generateRandomId() {
  return Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

export function extractYear(dateString) {
  return new Date(dateString).getFullYear();
}
