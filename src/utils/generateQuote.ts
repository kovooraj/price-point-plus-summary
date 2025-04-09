
import { OrderItem, ProductConfig } from "../components/PrintCalculator";
import { CustomerDetails } from "../components/QuotePopupDialog";

export interface QuoteData {
  productConfig: ProductConfig;
  orderItems: OrderItem[];
  customerDetails: CustomerDetails;
  notes?: string;
  date: string;
}

// Generate a random quote number if none is provided
export const generateQuoteNumber = (): string => {
  const prefix = "QT-";
  const randomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `${prefix}${datePart}-${randomNumbers}`;
};

export const generateQuotePDF = (data: QuoteData): void => {
  // In a real implementation, this would use a PDF library like jspdf or pdfmake
  // For now, we'll simulate by opening a new window with the content
  const quoteNumber = data.customerDetails.quoteNumber || generateQuoteNumber();
  
  // Store the quote in localStorage for history
  const quotes = JSON.parse(localStorage.getItem("printCalculatorQuotes") || "[]");
  quotes.push({
    ...data,
    quoteNumber,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("printCalculatorQuotes", JSON.stringify(quotes));
  
  // Create content for the quote
  let content = "QUOTE GENERATED\n\n";
  content += `Quote Number: ${quoteNumber}\n`;
  content += `Date: ${data.date}\n`;
  content += `Customer: ${data.customerDetails.customerName}\n`;
  if (data.customerDetails.companyName) {
    content += `Company: ${data.customerDetails.companyName}\n`;
  }
  
  content += "\nProduct Specifications\n";
  content += `Product Type: ${data.productConfig.productType}\n`;
  
  // Add all relevant product config fields depending on the product type
  Object.entries(data.productConfig).forEach(([key, value]) => {
    if (key !== "productType" && value && value !== "None" && value !== "0") {
      // Format the key for display (e.g., change camelCase to Title Case)
      const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
      content += `${formattedKey}: ${value.toString().replace(/_/g, " ")}\n`;
    }
  });
  
  content += "\nSelected Quantities\n";
  content += "Quantity,Total Price,Currency,Unit Price\n";
  
  data.orderItems.forEach(item => {
    const unitPrice = (item.totalPrice / item.quantity).toFixed(5);
    content += `${item.quantity},${item.totalPrice.toFixed(2)},${item.currency},${unitPrice}\n`;
  });
  
  if (data.notes && data.notes.trim() !== "") {
    content += "\nNotes / Quantity Breakdown\n";
    content += data.notes + "\n";
  }
  
  content += `\nTotal Items: ${data.orderItems.length}\n`;
  
  if (data.orderItems.length > 0) {
    const totalPrice = data.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    content += `Total Price: ${data.orderItems.length > 0 ? `${data.orderItems[0].currency} ${totalPrice.toFixed(2)}` : "CAD 0.00"}\n`;
  }
  
  // In a real implementation, this would create a proper PDF
  // For now, create a text file for download
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `quote_${quoteNumber}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
