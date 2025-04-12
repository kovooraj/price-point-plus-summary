
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, Trash2, Copy } from "lucide-react";
import { OrderItem, ProductConfig } from "./PrintCalculator";
import { formatProductSpec } from "../utils/formatters";
import QuotePopupDialog, { CustomerDetails } from "./QuotePopupDialog";
import { generateQuotePDF } from "../utils/generateQuote";
import OrderNotes from "./OrderNotes";
import { useToast } from "@/components/ui/use-toast";

interface OrderSummaryProps {
  productConfig: ProductConfig;
  orderItems: OrderItem[];
  onRemoveItem: (id: string) => void;
  isSets?: boolean;
  showSpecSheet?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  productConfig, 
  orderItems, 
  onRemoveItem,
  isSets = false,
  showSpecSheet = true
}) => {
  const { toast } = useToast();
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [specSheetDialogOpen, setSpecSheetDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleDownloadQuote = (customerDetails: CustomerDetails) => {
    generateQuotePDF({
      productConfig,
      orderItems,
      customerDetails,
      notes: isSets ? notes : undefined,
      date: new Date().toLocaleDateString()
    });
  };

  const handleDownloadSpecSheet = (customerDetails: CustomerDetails) => {
    generateQuotePDF({
      productConfig,
      orderItems,
      customerDetails,
      notes: isSets ? notes : undefined,
      date: new Date().toLocaleDateString(),
      isSpecSheet: true
    });
  };
  
  // Determine if we should show the total price based on conditions:
  // - Show if there's only 1 item
  // - Show if sets are enabled
  const shouldShowTotalPrice = orderItems.length === 1 || isSets;
  
  const copyOrderSummary = () => {
    // Generate a text representation of the order summary
    let summaryText = `ORDER SUMMARY\n\n`;
    summaryText += `Product: ${productConfig.productType}\n`;
    summaryText += `Size: ${productConfig.itemSize}\n`;
    summaryText += `Material: ${productConfig.material}\n`;
    summaryText += `Printing: ${productConfig.sidesPrinted} Sides\n`;
    
    if (productConfig.coating !== "No_Coating") {
      summaryText += `Coating: ${productConfig.coating.replace("_", " ")}\n`;
    }
    
    if (productConfig.lamination !== "None") {
      summaryText += `Lamination: ${productConfig.lamination.replace("_", " ")}\n`;
    }
    
    summaryText += `\nSELECTED QUANTITIES:\n`;
    
    if (orderItems.length > 0) {
      orderItems.forEach((item, index) => {
        summaryText += `${index + 1}. Quantity: ${item.quantity.toLocaleString()} units`;
        if (item.versions && item.versions > 1) {
          summaryText += `, ${item.versions} versions`;
        }
        summaryText += `\n   Price: ${item.currency} ${item.totalPrice.toFixed(2)}`;
        summaryText += `\n   Unit Price: ${item.currency} ${(item.totalPrice / item.quantity).toFixed(5)} each\n`;
      });
      
      summaryText += `\nTotal Items: ${orderItems.length}\n`;
      
      if (shouldShowTotalPrice) {
        summaryText += `Total Price: ${orderItems[0].currency} ${totalPrice.toFixed(2)}\n`;
        summaryText += `Unit Price: ${orderItems[0].currency} ${(totalPrice / totalQuantity).toFixed(5)} each\n`;
      }
    } else {
      summaryText += "No quantities added yet\n";
    }
    
    if (isSets && notes) {
      summaryText += `\nNOTES:\n${notes}\n`;
    }
    
    navigator.clipboard.writeText(summaryText).then(
      () => {
        toast({
          title: "Order Summary copied",
          description: "Order summary has been copied to clipboard"
        });
      },
      (err) => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Could not copy to clipboard"
        });
      }
    );
  };

  return (
    <Card className="p-4 bg-white shadow-sm sticky top-4 relative">
      <button 
        onClick={copyOrderSummary}
        className="order-summary-copy-btn"
        aria-label="Copy order summary to clipboard"
        title="Copy order summary to clipboard"
      >
        <Copy className="h-4 w-4" />
      </button>
      
      <h2 className="text-xl font-bold text-print-primary border-b pb-3 mb-4">Order Summary</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Product Specifications</h3>
        <ul className="text-sm space-y-1.5">
          <li className="flex justify-between">
            <span className="text-gray-600">Product:</span>
            <span className="font-medium">{productConfig.productType}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Size:</span>
            <span className="font-medium">{productConfig.itemSize}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Material:</span>
            <span className="font-medium">{productConfig.material}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Printing:</span>
            <span className="font-medium">{productConfig.sidesPrinted} Sides</span>
          </li>
          {productConfig.coating !== "No_Coating" && (
            <li className="flex justify-between">
              <span className="text-gray-600">Coating:</span>
              <span className="font-medium">{productConfig.coating.replace("_", " ")}</span>
            </li>
          )}
          {productConfig.lamination !== "None" && (
            <li className="flex justify-between">
              <span className="text-gray-600">Lamination:</span>
              <span className="font-medium">{productConfig.lamination.replace("_", " ")}</span>
            </li>
          )}
        </ul>
      </div>
      
      {orderItems.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3">Selected Quantities</h3>
          <ul className="space-y-3">
            {orderItems.map((item) => (
              <li key={item.id} className="bg-gray-50 p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge variant="outline" className="bg-print-primary text-white">
                      {item.quantity.toLocaleString()} units
                      {item.versions && item.versions > 1 && ` • ${item.versions} versions`}
                    </Badge>
                    <div className="mt-1.5 text-sm font-medium">
                      {item.currency} {item.totalPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.currency} {(item.totalPrice / item.quantity).toFixed(5)} each
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-500 hover:text-destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-6 text-center p-4 border border-dashed rounded-md">
          <p className="text-gray-500">No quantities added yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Add quantities from the table below
          </p>
        </div>
      )}
      
      <OrderNotes 
        notes={notes} 
        onNotesChange={setNotes} 
        showNotes={isSets} 
      />
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Items:</span>
          <span>{orderItems.length}</span>
        </div>
        
        {shouldShowTotalPrice && (
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Price:</span>
            <span className="text-xl font-bold text-print-primary">
              {orderItems.length > 0 ? 
                `${orderItems[0].currency} ${totalPrice.toFixed(2)}` : 
                "CAD 0.00"
              }
            </span>
          </div>
        )}
        
        {orderItems.length > 0 && shouldShowTotalPrice && (
          <div className="flex justify-between items-center">
            <span className="font-semibold">Unit Price:</span>
            <span className="text-sm text-gray-600">
              {orderItems.length > 0 && totalPrice > 0 && totalQuantity > 0 ? 
                `${orderItems[0].currency} ${(totalPrice / totalQuantity).toFixed(5)} each` : 
                "CAD 0.00"
              }
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-6 space-y-2">
        <Button 
          className="w-full bg-amber-400 hover:bg-amber-500 text-print-primary font-bold flex items-center justify-center gap-2"
          onClick={() => setQuoteDialogOpen(true)}
        >
          <Download className="h-4 w-4" /> Download Quote
        </Button>
        
        {showSpecSheet && (
          <Button 
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-print-primary font-bold flex items-center justify-center gap-2"
            onClick={() => setSpecSheetDialogOpen(true)}
          >
            <FileSpreadsheet className="h-4 w-4" /> Download Spec Sheet
          </Button>
        )}
      </div>

      <QuotePopupDialog 
        open={quoteDialogOpen} 
        onOpenChange={setQuoteDialogOpen}
        onSubmit={handleDownloadQuote}
      />

      <QuotePopupDialog 
        open={specSheetDialogOpen} 
        onOpenChange={setSpecSheetDialogOpen}
        onSubmit={handleDownloadSpecSheet}
      />
    </Card>
  );
};

export default OrderSummary;
