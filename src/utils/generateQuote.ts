
import { OrderItem, ProductConfig } from "../components/PrintCalculator";
import jsPDF from 'jspdf';

export interface CustomerDetails {
  customerName: string;
  companyName: string;
  quoteNumber: string;
  quoteFor: string; // Added quoteFor property
}

export interface QuoteData {
  productConfig: ProductConfig;
  orderItems: OrderItem[];
  customerDetails: CustomerDetails;
  notes?: string;
  date: string;
  isSpecSheet?: boolean; // Added isSpecSheet property as optional
}

// Generate a random quote number if none is provided
export const generateQuoteNumber = (): string => {
  const prefix = "QT-";
  const randomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `${prefix}${datePart}-${randomNumbers}`;
};

const getProductSpecifications = (config: ProductConfig) => {
  const specs = [];
  if (config.itemSize) specs.push(`Size: ${config.itemSize}`);
  if (config.material && config.material !== "Other") specs.push(`Material: ${config.material}`);
  if (config.sidesPrinted) specs.push(`Printing: ${config.sidesPrinted} Sides`);
  if (config.coating && config.coating !== "No_Coating") specs.push(`Coating: ${config.coating.replace("_", " ")}`);
  if (config.sidesCoated && config.sidesCoated !== "0") specs.push(`Sides Coated: ${config.sidesCoated}`);
  if (config.sidesLaminated && config.sidesLaminated !== "0") specs.push(`Sides Laminated: ${config.sidesLaminated}`);
  if (config.option && config.option !== "None") specs.push(`Option: ${config.option}`);
  if (config.foldingType) specs.push(`Folding: ${config.foldingType}`);
  return specs;
};

export const generateQuotePDF = (data: QuoteData): void => {
  const quoteNumber = data.customerDetails.quoteNumber || generateQuoteNumber();
  
  // Store the quote in localStorage for history
  const quotes = JSON.parse(localStorage.getItem("printCalculatorQuotes") || "[]");
  quotes.push({
    ...data,
    quoteNumber,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("printCalculatorQuotes", JSON.stringify(quotes));
  
  // Create PDF
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  
  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(data.isSpecSheet ? "SPECIFICATION SHEET" : "QUOTE", margin, yPosition);
  
  yPosition += 15;
  
  // Quote details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Quote Number: ${quoteNumber}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Date: ${data.date}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Customer: ${data.customerDetails.customerName}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Quote For: ${data.customerDetails.quoteFor || "Willowpack"}`, margin, yPosition);
  yPosition += 8;
  
  if (data.customerDetails.companyName) {
    doc.text(`Company: ${data.customerDetails.companyName}`, margin, yPosition);
    yPosition += 8;
  }
  
  yPosition += 10;
  
  // Product specifications
  doc.setFont("helvetica", "bold");
  doc.text("Product Specifications", margin, yPosition);
  yPosition += 10;
  
  doc.setFont("helvetica", "normal");
  doc.text(`Product Type: ${data.productConfig.productType}`, margin, yPosition);
  yPosition += 8;
  
  yPosition += 5;
  
  // Selected quantities with detailed specs
  doc.setFont("helvetica", "bold");
  doc.text("Selected Quantities", margin, yPosition);
  yPosition += 10;
  
  doc.setFont("helvetica", "normal");
  data.orderItems.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. Quantity: ${item.quantity.toLocaleString()} units${item.versions && item.versions > 1 ? ` • ${item.versions} versions` : ''}`, margin, yPosition);
    yPosition += 8;
    
    // Add detailed specifications
    doc.setFont("helvetica", "normal");
    const specs = getProductSpecifications(data.productConfig);
    specs.forEach(spec => {
      doc.text(`   ${spec}`, margin + 10, yPosition);
      yPosition += 6;
    });
    
    doc.text(`   Price: ${item.currency} ${item.totalPrice.toFixed(2)}`, margin + 10, yPosition);
    yPosition += 6;
    const unitPrice = (item.totalPrice / item.quantity).toFixed(5);
    doc.text(`   Unit Price: ${item.currency} ${unitPrice} each`, margin + 10, yPosition);
    yPosition += 10;
  });
  
  if (data.notes && data.notes.trim() !== "") {
    yPosition += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Notes / Quantity Breakdown", margin, yPosition);
    yPosition += 8;
    
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(data.notes, pageWidth - 2 * margin);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 6;
  }
  
  yPosition += 10;
  
  // Total summary
  doc.setFont("helvetica", "bold");
  doc.text(`Total Items: ${data.orderItems.length}`, margin, yPosition);
  yPosition += 8;
  
  if (data.orderItems.length > 0) {
    const totalPrice = data.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    doc.text(`Total Price: ${data.orderItems[0].currency} ${totalPrice.toFixed(2)}`, margin, yPosition);
  }
  
  // Download the PDF
  const fileName = `quote_${quoteNumber}.pdf`;
  doc.save(fileName);
};
