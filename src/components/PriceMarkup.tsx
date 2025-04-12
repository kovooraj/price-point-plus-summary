
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DollarSign, Copy, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PriceMarkupProps {
  markup: {
    baseQuantity: number;
    baseCost: number;
    basePrice: number;
    customQuantity: number;
    customCost: number;
    customPrice: number;
    currency: string;
    versions?: number;
  };
  onMarkupChange: (field: keyof PriceMarkupProps["markup"], value: number | string) => void;
  isSets?: boolean;
  onSetsChange?: (value: boolean) => void;
  onAddCustomQty?: () => void; 
}

const PriceMarkup: React.FC<PriceMarkupProps> = ({ 
  markup, 
  onMarkupChange, 
  isSets, 
  onSetsChange,
  onAddCustomQty
}) => {
  const { toast } = useToast();
  
  const handleInputChange = (field: keyof typeof markup) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onMarkupChange(field, value);
  };

  const toggleCurrency = () => {
    onMarkupChange("currency", markup.currency === "CAD" ? "USD" : "CAD");
  };
  
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        toast({
          title: `${label} copied`,
          description: `${label} has been copied to clipboard`
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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-print-primary font-medium">Currency</Label>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center ${markup.currency === "CAD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
            <DollarSign className="h-4 w-4 mr-1" />
            <span>CAD</span>
          </div>
          
          <Switch 
            checked={markup.currency === "USD"} 
            onCheckedChange={toggleCurrency}
          />
          
          <div className={`flex items-center ${markup.currency === "USD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
            <DollarSign className="h-4 w-4 mr-1" />
            <span>USD</span>
          </div>
        </div>
      </div>
      
      {/* Add Sets option if onSetsChange is provided */}
      {onSetsChange && (
        <div className="flex items-center justify-between mb-4">
          <Label className="text-print-primary font-medium">Sets</Label>
          <div className="flex items-center space-x-2">
            <span className={`${!isSets ? "font-bold text-print-primary" : "text-gray-500"}`}>No</span>
            <Switch 
              checked={!!isSets}
              onCheckedChange={onSetsChange}
            />
            <span className={`${isSets ? "font-bold text-print-primary" : "text-gray-500"}`}>Yes</span>
          </div>
        </div>
      )}
      
      {/* Always use grid for consistency across all tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customQuantity" className="text-print-primary font-medium">
            {isSets ? "Total Quantity" : "Quantity"}
          </Label>
          <div className="flex items-center mt-1">
            <div className="w-24 text-sm font-medium mr-2">QTY:</div>
            <Input 
              id="customQuantity"
              type="number" 
              value={markup.customQuantity} 
              onChange={handleInputChange("customQuantity")} 
              placeholder="Enter quantity"
              className="bg-background"
            />
          </div>
          
          {onAddCustomQty && (
            <div className="mt-2">
              <Button 
                onClick={onAddCustomQty}
                className={`flex items-center gap-1 ${isSets ? "bg-primary hover:bg-primary/90" : "bg-print-success hover:bg-print-success/90"} text-white w-full`}
                size="sm"
              >
                <Plus className="h-4 w-4" /> {isSets ? "Add QTY to Quote" : "Add to Summary"}
              </Button>
            </div>
          )}
        </div>
        
        {isSets && (
          <div>
            <Label htmlFor="versions" className="text-print-primary font-medium">
              Number of Versions
            </Label>
            <div className="flex items-center mt-1">
              <div className="w-24 text-sm font-medium mr-2">Versions:</div>
              <Input 
                id="versions"
                type="number" 
                value={markup.versions || 1} 
                onChange={handleInputChange("versions")} 
                placeholder="Enter number of versions"
                className="bg-background"
                min="1"
              />
            </div>
          </div>
        )}
      </div>
        
      <div className="mb-4">
        <Label htmlFor="markup" className="text-print-primary font-medium">Markup Percentage</Label>
        <div className="flex items-center mt-1">
          <div className="w-24 text-sm font-medium mr-2">Markup %:</div>
          <Input 
            id="markup"
            type="number" 
            placeholder="Enter markup percentage"
            className="bg-background"
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cost" className="text-print-primary font-medium">Cost ({markup.currency})</Label>
          <Input 
            id="cost"
            type="number" 
            step="0.01" 
            value={markup.customCost} 
            onChange={handleInputChange("customCost")} 
            className="bg-gray-100"
            readOnly
          />
        </div>
        
        <div>
          <Label htmlFor="price" className="text-print-primary font-medium">Price ({markup.currency})</Label>
          <div className="price-field-container">
            <Input 
              id="price"
              type="number" 
              step="0.01" 
              value={markup.customPrice} 
              onChange={handleInputChange("customPrice")} 
              className="bg-background"
              readOnly
            />
            <button 
              className="copy-button" 
              onClick={() => copyToClipboard(markup.customPrice.toString(), "Price")}
              aria-label="Copy price to clipboard"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <div className="text-sm text-right mt-1">
            <span className="text-print-primary">
              @ {((markup.customPrice / markup.customCost - 1) * 100).toFixed(0)}% markup
            </span>
            <span className="float-right text-print-primary">
              Unit price: {(markup.customPrice / markup.customQuantity).toFixed(5)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceMarkup;
