import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import OrderSummary from "./OrderSummary";
import { OrderItem, ProductConfig } from "./PrintCalculator";
import QuantityTable from "./QuantityTable";

interface RollLabelsState {
  productType: string;
  material: string;
  shape: string;
  size: string;
  ink: string;
  coating: string;
  coverage: string;
  lamination: string;
  windDirection: string;
  labelsPerCoreOption: string;
  perforation: string;
  freeShipping: string;
  cutMethod: string;
  purchaseDie: string;
  quantity: number;
  cores: number;
  coreWidth: number;
  coreDiameter: number;
  coreChangeovers: number;
  across: number;
  labelsPerRoll: number;
  printTime: string;
  finishTime: string;
  feet: number;
  boxes: number;
  boxSize: string;
  cuttingMethod: string;
  cost: number;
  price: number;
  markup: number;
  currency: string;
  isSets: boolean;
  versions: number;
}

const RollLabelsCalculator: React.FC = () => {
  const { toast } = useToast();
  const [state, setState] = useState<RollLabelsState>({
    productType: "BOPP",
    material: "White Gloss BOPP Freezer",
    shape: "Circle",
    size: "3 x 3",
    ink: "CMYK",
    coating: "No_Coating",
    coverage: "",
    lamination: "Matte_Lamination",
    windDirection: "WD 2 = Bottom off First",
    labelsPerCoreOption: "Does Not Matter",
    perforation: "No",
    freeShipping: "No",
    cutMethod: "Does_Not_M",
    purchaseDie: "",
    quantity: 108000,
    cores: 48,
    coreWidth: 3.25,
    coreDiameter: 8.0,
    coreChangeovers: 16,
    across: 3,
    labelsPerRoll: 2250,
    printTime: "2:15:38",
    finishTime: "6:02:42",
    feet: 9725.00,
    boxes: 24,
    boxSize: "12 x 9 x 9.5",
    cuttingMethod: "Laser",
    cost: 3579.91,
    price: 4295.89,
    markup: 20,
    currency: "USD",
    isSets: false,
    versions: 1
  });
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  const handleInputChange = (field: keyof RollLabelsState, value: string | number | boolean) => {
    setState({
      ...state,
      [field]: value
    });
  };
  
  const toggleCurrency = () => {
    setState({
      ...state,
      currency: state.currency === "CAD" ? "USD" : "CAD"
    });
  };

  const handleAddCustomQty = () => {
    const newItem: OrderItem = {
      id: `custom-${Date.now()}`,
      quantity: state.quantity,
      totalCost: state.cost,
      totalPrice: state.price,
      currency: state.currency
    };
    
    setOrderItems([...orderItems, newItem]);
    
    toast({
      title: "Item added",
      description: `Added ${state.quantity} labels to order summary`,
    });
  };

  const handleAddToSummary = (item: OrderItem) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      currency: state.currency
    };
    
    setOrderItems([...orderItems, newItem]);
    
    toast({
      title: "Added to order summary",
      description: `Quantity: ${item.quantity} - Price: ${state.currency} ${item.totalPrice.toFixed(2)}`,
    });
  };
  
  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item removed from order summary",
      variant: "destructive"
    });
  };

  // Create a product config object for the OrderSummary component
  const productConfig: ProductConfig = {
    productType: "Roll Labels",
    option: state.shape,
    itemSize: state.size,
    shippedSize: state.size,
    material: state.material,
    sidesPrinted: "1/0",
    pmsColors: "0",
    coating: state.coating,
    thickness: "", 
    sidesCoated: "1",
    coverage: state.coverage || "100%",
    lamination: state.lamination,
    sidesLaminated: "1",
    ganging: "Yes",
    paperCost: "Current Price",
  };
  
  return (
    <div className="print-calculator-layout">
      <div className="main-content space-y-6">
        {/* Product Configuration Card */}
        <Card className="p-4">
          <h2 className="section-title">Product Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <Label htmlFor="productType">Product Type</Label>
              <Select 
                value={state.productType} 
                onValueChange={(value) => handleInputChange("productType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BOPP">BOPP</SelectItem>
                  <SelectItem value="Paper">Paper</SelectItem>
                  <SelectItem value="Vinyl">Vinyl</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="material">Material</Label>
              <Select 
                value={state.material} 
                onValueChange={(value) => handleInputChange("material", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White Gloss BOPP Freezer">White Gloss BOPP Freezer</SelectItem>
                  <SelectItem value="Clear BOPP">Clear BOPP</SelectItem>
                  <SelectItem value="Silver BOPP">Silver BOPP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="shape">Shape</Label>
              <Select 
                value={state.shape} 
                onValueChange={(value) => handleInputChange("shape", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Circle">Circle</SelectItem>
                  <SelectItem value="Square">Square</SelectItem>
                  <SelectItem value="Rectangle">Rectangle</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="size">Size</Label>
              <Select 
                value={state.size} 
                onValueChange={(value) => handleInputChange("size", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3 x 3">3 x 3</SelectItem>
                  <SelectItem value="4 x 4">4 x 4</SelectItem>
                  <SelectItem value="2 x 2">2 x 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="ink">Ink</Label>
              <Select 
                value={state.ink} 
                onValueChange={(value) => handleInputChange("ink", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Ink" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CMYK">CMYK</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Spot">Spot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="coating">Coating</Label>
              <Select 
                value={state.coating} 
                onValueChange={(value) => handleInputChange("coating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Coating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No_Coating">No Coating</SelectItem>
                  <SelectItem value="Gloss">Gloss</SelectItem>
                  <SelectItem value="Matte">Matte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="lamination">Lamination</Label>
              <Select 
                value={state.lamination} 
                onValueChange={(value) => handleInputChange("lamination", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Lamination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matte_Lamination">Matte Lamination</SelectItem>
                  <SelectItem value="Gloss_Lamination">Gloss Lamination</SelectItem>
                  <SelectItem value="No_Lamination">No Lamination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="windDirection">Wind Direction</Label>
              <Select 
                value={state.windDirection} 
                onValueChange={(value) => handleInputChange("windDirection", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Wind Direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WD 2 = Bottom off First">WD 2 = Bottom off First</SelectItem>
                  <SelectItem value="WD 1 = Top off First">WD 1 = Top off First</SelectItem>
                  <SelectItem value="WD 3 = Left off First">WD 3 = Left off First</SelectItem>
                  <SelectItem value="WD 4 = Right off First">WD 4 = Right off First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="labelsPerCoreOption">Labels Per Core</Label>
              <Select 
                value={state.labelsPerCoreOption} 
                onValueChange={(value) => handleInputChange("labelsPerCoreOption", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Labels Per Core" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Does Not Matter">Does Not Matter</SelectItem>
                  <SelectItem value="Specific">Specific</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="perforation">Perforation</Label>
              <Select 
                value={state.perforation} 
                onValueChange={(value) => handleInputChange("perforation", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Perforation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="freeShipping">Free Shipping</Label>
              <Select 
                value={state.freeShipping} 
                onValueChange={(value) => handleInputChange("freeShipping", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Free Shipping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Pricing Card */}
        <Card className="p-4">
          <h2 className="section-title">Markup & Pricing</h2>
          
          <div className="mb-4 flex items-center justify-between">
            <Label className="text-print-primary font-medium">Currency</Label>
            <div className="flex items-center space-x-2">
              <div className={`flex items-center ${state.currency === "CAD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
                <DollarSign className="h-4 w-4 mr-1" />
                <span>CAD</span>
              </div>
              
              <Switch 
                checked={state.currency === "USD"} 
                onCheckedChange={toggleCurrency}
              />
              
              <div className={`flex items-center ${state.currency === "USD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
                <DollarSign className="h-4 w-4 mr-1" />
                <span>USD</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-print-primary font-medium">Sets</Label>
              <div className="flex items-center space-x-2">
                <span className={`${!state.isSets ? "font-bold text-print-primary" : "text-gray-500"}`}>No</span>
                <Switch 
                  checked={state.isSets} 
                  onCheckedChange={(checked) => handleInputChange("isSets", checked)}
                />
                <span className={`${state.isSets ? "font-bold text-print-primary" : "text-gray-500"}`}>Yes</span>
              </div>
            </div>

            {state.isSets ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <Label htmlFor="quantity">Total Quantity</Label>
                  <Input 
                    id="quantity"
                    type="number" 
                    value={state.quantity} 
                    onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
                    className="bg-amber-50"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="versions">Number of Versions</Label>
                  <Input 
                    id="versions"
                    type="number" 
                    value={state.versions} 
                    onChange={(e) => handleInputChange("versions", parseInt(e.target.value) || 1)}
                    className="bg-amber-50"
                  />
                </div>
              </div>
            ) : (
              <div className="form-group">
                <Label htmlFor="quantity">{state.isSets ? "Total Quantity" : "Quantity"}</Label>
                <Input 
                  id="quantity"
                  type="number" 
                  value={state.quantity} 
                  onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
                  className="bg-amber-50"
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="markup">Markup (%)</Label>
              <Input 
                id="markup"
                type="number" 
                value={state.markup} 
                onChange={(e) => {
                  const newMarkup = parseInt(e.target.value) || 0;
                  const newPrice = state.cost * (1 + newMarkup / 100);
                  setState({
                    ...state,
                    markup: newMarkup,
                    price: newPrice
                  });
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <Label htmlFor="cost">Cost ({state.currency})</Label>
              <Input 
                id="cost"
                type="number" 
                step="0.01"
                value={state.cost} 
                className="bg-gray-100"
                readOnly
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="price">Price ({state.currency})</Label>
              <Input 
                id="price"
                type="number" 
                step="0.01"
                value={state.price} 
                className="bg-blue-50"
                readOnly
              />
              <div className="text-xs text-right mt-1">
                @ {state.markup}% markup
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleAddCustomQty}
              className="flex items-center gap-1 bg-print-success hover:bg-print-success/90 text-white"
            >
              <Plus className="h-4 w-4" /> Add to Order Summary
            </Button>
          </div>
        </Card>

        {/* Quantity Variations Card */}
        <Card className="p-4">
          <h2 className="section-title">Quantity Variations</h2>
          <QuantityTable onAddToSummary={handleAddToSummary} currency={state.currency} />
        </Card>
      </div>

      <div className="summary-content">
        <OrderSummary
          productConfig={productConfig}
          orderItems={orderItems}
          onRemoveItem={handleRemoveItem}
          isSets={state.isSets}
          showSpecSheet={true}
        />
      </div>
    </div>
  );
};

export default RollLabelsCalculator;
