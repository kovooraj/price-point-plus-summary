
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CAD, USD } from "lucide-react";

interface PriceMarkupProps {
  markup: {
    baseQuantity: number;
    baseCost: number;
    basePrice: number;
    customQuantity: number;
    customCost: number;
    customPrice: number;
    currency: string;
  };
  onMarkupChange: (field: keyof PriceMarkupProps["markup"], value: number | string) => void;
}

const PriceMarkup: React.FC<PriceMarkupProps> = ({ markup, onMarkupChange }) => {
  const handleInputChange = (field: keyof typeof markup) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onMarkupChange(field, value);
  };

  const toggleCurrency = () => {
    onMarkupChange("currency", markup.currency === "CAD" ? "USD" : "CAD");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-print-primary font-medium">Currency</Label>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center ${markup.currency === "CAD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
            <CAD className="h-4 w-4 mr-1" />
            <span>CAD</span>
          </div>
          
          <Switch 
            checked={markup.currency === "USD"} 
            onCheckedChange={toggleCurrency}
          />
          
          <div className={`flex items-center ${markup.currency === "USD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
            <USD className="h-4 w-4 mr-1" />
            <span>USD</span>
          </div>
        </div>
      </div>
      
      <div>
        <div className="mb-4">
          <Label htmlFor="customQuantity" className="text-print-primary font-medium">Quantity</Label>
          <div className="flex items-center mt-1">
            <div className="w-24 text-sm font-medium mr-2">QTY:</div>
            <Input 
              id="customQuantity"
              type="number" 
              value={markup.customQuantity} 
              onChange={handleInputChange("customQuantity")} 
              placeholder="Enter quantity"
              className="bg-white"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="markup" className="text-print-primary font-medium">Markup Percentage</Label>
          <div className="flex items-center mt-1">
            <div className="w-24 text-sm font-medium mr-2">Markup %:</div>
            <Input 
              id="markup"
              type="number" 
              placeholder="Enter markup percentage"
              className="bg-white"
              min="0"
              max="100"
              onChange={(e) => {
                const markupPercent = parseFloat(e.target.value) || 0;
                const newPrice = markup.customCost * (1 + markupPercent / 100);
                onMarkupChange("customPrice", newPrice);
              }}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-3">
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium mr-2">Cost ($):</div>
            <Input 
              type="number" 
              step="0.01" 
              value={markup.customCost} 
              onChange={handleInputChange("customCost")} 
              className="bg-gray-100"
              readOnly
            />
          </div>
          
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium mr-2">Price ($):</div>
            <Input 
              type="number" 
              step="0.01" 
              value={markup.customPrice} 
              onChange={handleInputChange("customPrice")} 
              className="bg-blue-50"
              readOnly
            />
          </div>
          
          <div className="text-sm text-right mt-1">
            <span className="text-print-primary">
              {markup.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceMarkup;
