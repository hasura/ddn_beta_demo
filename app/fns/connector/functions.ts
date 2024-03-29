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

type PAYMENT_STATUS =
  | "PAID"
  | "IN_PROGRESS"
  | "FAILED"
  | "NOT_INITIATED"
  | "UNKNOWN";
interface PaymentStatusResponse {
  status: PAYMENT_STATUS;
}
/**
 * Returns the payment status for the provided order_id
 * @allowrelaxedtypes
 * @param order_id The order_id for which the status will be fetched.
 * @returns The payment status for the requested order_id.
 * @readonly This function should only query data without making modifications
 */
export async function get_payment_status(
  order_id: number
): Promise<string> {
  // fetch payment status from http://localhost:8101/payment-status?order_id=${order_id}

  try {
    const response = await fetch(
      `http://host.docker.internal:8101/payment-status?order_id=${order_id}`
    );
    if (!response.ok) {
      console.error(`Failed to fetch payment status: ${response.statusText}`);
      return "UNKNOWN";
    }
    const data = (await response.json()) as PaymentStatusResponse;
    return data.status;
  } catch (error) {
    return "UNKNOWN";
  }
}
