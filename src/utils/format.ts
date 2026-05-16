export function formatCompactNumber(number: number): string {
  if (number < 1000) return number.toFixed(0);
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "mil";
  }
  return number.toString();
}

export function formatCurrency(number: number, compact = false): string {
  if (compact) {
    return "$" + formatCompactNumber(number);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
