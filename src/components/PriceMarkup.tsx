
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceMarkupProps {
  markup: {
    baseQuantity: number;
    baseCost: number;
    basePrice: number;
    customQuantity: number;
    customCost: number;
    customPrice: number;
  };
  onMarkupChange: (field: keyof PriceMarkupProps["markup"], value: number) => void;
}

const PriceMarkup: React.FC<PriceMarkupProps> = ({ markup, onMarkupChange }) => {
  const handleInputChange = (field: keyof typeof markup) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onMarkupChange(field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="mb-2">
          <Label htmlFor="baseQuantity" className="text-print-primary font-medium">Standard Quantity</Label>
          <div className="flex items-center mt-1">
            <div className="w-24 text-sm font-medium mr-2">QTY:</div>
            <Input 
              id="baseQuantity"
              type="number" 
              value={markup.baseQuantity} 
              onChange={handleInputChange("baseQuantity")}
              className="bg-yellow-50"
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-3">
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium mr-2">Cost ($):</div>
            <Input 
              type="number" 
              step="0.01" 
              value={markup.baseCost} 
              onChange={handleInputChange("baseCost")} 
            />
          </div>
          
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium mr-2">Price ($):</div>
            <Input 
              type="number" 
              step="0.01" 
              value={markup.basePrice} 
              onChange={handleInputChange("basePrice")} 
              className="bg-blue-50"
            />
          </div>
          
          <div className="text-sm text-right mt-1">
            <span className="text-print-primary">
              CAD
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2">
          <Label htmlFor="customQuantity" className="text-print-primary font-medium">Custom Quantity</Label>
          <div className="flex items-center mt-1">
            <div className="w-24 text-sm font-medium mr-2">QTY:</div>
            <Input 
              id="customQuantity"
              type="number" 
              value={markup.customQuantity} 
              onChange={handleInputChange("customQuantity")} 
              placeholder="Enter custom quantity"
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
            />
          </div>
          
          <div className="text-sm text-right mt-1">
            <span className="text-print-primary">
              USD (estimate)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceMarkup;
