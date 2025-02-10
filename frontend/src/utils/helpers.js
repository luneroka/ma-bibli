export const formatNumber = (number) => {
  if (number >= 1000) {
    return Intl.NumberFormat('fr-FR').format(number);
  }
  return number;
};

export function extractYear(dateString) {
  return new Date(dateString).getFullYear();
}

export function extractMonthAndYear(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1 and pad with '0'
  const year = date.getFullYear();
  return `${month}/${year}`;
}

export function extractFullDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // getDate() returns 1-31, so pad with '0'
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1 and pad with '0'
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
