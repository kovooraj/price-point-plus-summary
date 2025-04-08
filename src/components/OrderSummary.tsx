
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2 } from "lucide-react";
import { OrderItem, ProductConfig } from "./PrintCalculator";
import { formatProductSpec } from "../utils/formatters";

interface OrderSummaryProps {
  productConfig: ProductConfig;
  orderItems: OrderItem[];
  onRemoveItem: (id: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ productConfig, orderItems, onRemoveItem }) => {
  // Calculate total price for all items
  const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleDownload = () => {
    // Create content for the price list
    const fileName = "price-list.csv";
    let content = "Product Specifications\n";
    content += `Product Type: ${productConfig.productType}\n`;
    content += `Size: ${productConfig.itemSize}\n`;
    content += `Material: ${productConfig.material}\n`;
    content += `Printing: ${productConfig.sidesPrinted} Sides\n`;
    if (productConfig.coating !== "No_Coating") {
      content += `Coating: ${productConfig.coating.replace("_", " ")}\n`;
    }
    if (productConfig.lamination !== "None") {
      content += `Lamination: ${productConfig.lamination.replace("_", " ")}\n`;
    }
    content += "\nSelected Quantities\n";
    content += "Quantity,Total Price,Currency\n";
    
    orderItems.forEach(item => {
      content += `${item.quantity},${item.totalPrice.toFixed(2)},${item.currency}\n`;
    });
    content += `\nTotal Items: ${orderItems.length}\n`;
    content += `Total Price: ${orderItems.length > 0 ? `${orderItems[0].currency} ${totalPrice.toFixed(2)}` : "CAD 0.00"}\n`;
    
    // Create a blob and download
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-4 bg-white shadow-sm sticky top-4">
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
                    </Badge>
                    <div className="mt-1.5 text-sm font-medium">
                      {item.currency} {item.totalPrice.toFixed(2)}
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
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Items:</span>
          <span>{orderItems.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Price:</span>
          <span className="text-xl font-bold text-print-primary">
            {orderItems.length > 0 ? 
              `${orderItems[0].currency} ${totalPrice.toFixed(2)}` : 
              "CAD 0.00"
            }
          </span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-print-accent hover:bg-print-accent/90 text-print-primary font-bold flex items-center justify-center gap-2"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4" /> Download Price List
      </Button>
    </Card>
  );
};

export default OrderSummary;
