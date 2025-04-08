
import { ProductConfig } from "../components/PrintCalculator";

export function formatProductSpec(config: ProductConfig): string {
  return `${config.productType} - ${config.itemSize} - ${config.material} - ${config.sidesPrinted}`;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return `${currency} ${amount.toFixed(2)}`;
}
