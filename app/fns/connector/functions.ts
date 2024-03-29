/**
 * @readonly Exposes the function as an NDC function (the function should only query data without making modifications)
 */
export function hello(name?: string) {
  return `hello ${name ?? "world"}`;
}


interface Price {
  /** Price in given currency */
  amount: number;
  /** currency */
  currency: string;
}

/**
 * fetches the price in given currency
 *
 * @param amount amount friom
 * @param to_currency to which currency to convert
 * @readonly
 */
export async function getPriceInLocalCurrency(
  amount: number,
  to_currency: string = "USD"
): Promise<Price> {
  return {
    amount: amount * 1.1, // replace with actual conversion logic
    currency: to_currency,
  };
}