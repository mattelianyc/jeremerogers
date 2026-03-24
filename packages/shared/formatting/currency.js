export function formatCurrency(amount, currencyCode) {
  const numericAmount = Number(amount);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(numericAmount);
}
