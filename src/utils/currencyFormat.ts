/**
 * Formats a number to any currency
 * @example 45000 -> COP 45,000
 */
export const currencyFormat = (
  value: number,
  currency?: string,
  convertToPositive?: boolean
): string => {
  if (convertToPositive && value < 0) {
    value = Math.abs(value)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 0,
    // maximumFractionDigits: 0,
    currency: currency || 'COP'
  }).format(value)
}
