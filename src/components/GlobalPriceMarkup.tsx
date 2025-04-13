
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GlobalPriceMarkupProps {
  markup: {
    customQuantity: number;
    customCost: number;
    customPrice: number;
    currency: string;
    versions?: number;
  };
  onMarkupChange: (field: keyof GlobalPriceMarkupProps["markup"], value: number | string) => void;
  isSets?: boolean;
  onSetsChange?: (value: boolean) => void;
  onAddCustomQty: () => void;
}

const GlobalPriceMarkup: React.FC<GlobalPriceMarkupProps> = ({ 
  markup, 
  onMarkupChange, 
  isSets, 
  onSetsChange,
  onAddCustomQty
}) => {
  const { toast } = useToast();
  const [markupPercent, setMarkupPercent] = useState(40);
  
  // Effect to calculate price based on markup percentage
  useEffect(() => {
    if (markup.customCost) {
      const newPrice = markup.customCost * (1 + markupPercent / 100);
      onMarkupChange("customPrice", newPrice);
    }
  }, [markupPercent, markup.customCost]);

  const handleInputChange = (field: keyof typeof markup) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onMarkupChange(field, value);
  };

  const toggleCurrency = (value: string) => {
    onMarkupChange("currency", value);
  };
  
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        toast({
          title: "Price copied",
          description: "Price has been copied to clipboard"
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

  const unitPrice = markup.customQuantity > 0 ? 
    (markup.customPrice / markup.customQuantity).toFixed(2) : 
    "0.00";

  return (
    <Card className="border shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-print-primary">Markup & Pricing</h2>
          <RadioGroup 
            value={markup.currency} 
            onValueChange={toggleCurrency}
            className="flex items-center gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CAD" id="cad" />
              <Label htmlFor="cad">CAD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USD" id="usd" />
              <Label htmlFor="usd">US</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="border-t border-b py-6">
          <div className="flex items-center justify-between mb-6">
            <Label htmlFor="sets" className="text-base">Sets</Label>
            <div className="flex items-center gap-2">
              <span className={`${!isSets ? "font-medium" : "text-gray-500"}`}>No</span>
              <Switch 
                id="sets"
                checked={!!isSets}
                onCheckedChange={onSetsChange}
              />
              <span className={`${isSets ? "font-medium" : "text-gray-500"}`}>Yes</span>
            </div>
          </div>
          
          {isSets ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="versions" className="text-base">Number of Versions</Label>
                <Input 
                  id="versions"
                  type="number" 
                  value={markup.versions || 1} 
                  onChange={handleInputChange("versions")}
                  className="bg-background mt-2"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="customQuantity" className="text-base">Total Quantity</Label>
                <div className="relative mt-2 flex h-10">
                  <Input 
                    id="customQuantity"
                    type="number" 
                    value={markup.customQuantity} 
                    onChange={handleInputChange("customQuantity")} 
                    className="bg-background rounded-r-none flex-grow"
                  />
                  <Button 
                    onClick={onAddCustomQty}
                    className="rounded-l-none"
                    size="full"
                    variant="cta"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <Label htmlFor="customQuantity" className="text-base">Total Quantity</Label>
              <div className="relative mt-2 flex h-10">
                <Input 
                  id="customQuantity"
                  type="number" 
                  value={markup.customQuantity} 
                  onChange={handleInputChange("customQuantity")} 
                  className="bg-background rounded-r-none flex-grow"
                />
                <Button 
                  onClick={onAddCustomQty}
                  className="rounded-l-none"
                  size="full"
                  variant="cta"
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-6">
          <div className="mb-4">
            <Label htmlFor="markupPercent" className="text-base">Markup Percentage</Label>
            <div className="relative mt-2">
              <Input 
                id="markupPercent"
                type="number" 
                value={markupPercent} 
                onChange={(e) => setMarkupPercent(parseInt(e.target.value) || 0)} 
                className="bg-background pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <Label htmlFor="cost" className="text-base">Cost</Label>
              <Input 
                id="cost"
                type="number" 
                step="0.01" 
                value={markup.customCost} 
                onChange={handleInputChange("customCost")} 
                className="bg-background mt-2"
                readOnly
              />
            </div>
            
            <div>
              <Label htmlFor="price" className="text-base">Price</Label>
              <div className="relative mt-2">
                <Input 
                  id="price"
                  type="number" 
                  step="0.01" 
                  value={markup.customPrice} 
                  className="bg-background pr-10"
                  readOnly
                />
                <button 
                  onClick={() => copyToClipboard(markup.customPrice.toString())}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                  aria-label="Copy price to clipboard"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-500">
                <span>@{markupPercent}% markup</span>
                <span>Unit price: {unitPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GlobalPriceMarkup;
