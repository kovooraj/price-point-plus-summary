
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from "lucide-react";

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
  labelsPerCore: string;
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
  labelsPerCore: number;
  printTime: string;
  finishTime: string;
  feet: number;
  boxes: number;
  boxSize: string;
  cuttingMethod: string;
  cost: number;
  price: number;
  markup: number;
  hpAbgRolls: number;
  currency: string;
}

const RollLabelsCalculator: React.FC = () => {
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
    labelsPerCore: "Does Not Matter",
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
    labelsPerCore: 2250,
    printTime: "2:15:38",
    finishTime: "6:02:42",
    feet: 9725.00,
    boxes: 24,
    boxSize: "12 x 9 x 9.5",
    cuttingMethod: "Laser",
    cost: 3579.91,
    price: 4295.89,
    markup: 20,
    hpAbgRolls: 1.95,
    currency: "USD"
  });
  
  const handleInputChange = (field: keyof RollLabelsState, value: string | number) => {
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5">
        <Card className="p-4">
          <h2 className="text-xl font-bold text-print-primary mb-4">Product Configuration</h2>
          
          <div className="space-y-4">
            <div className="form-group">
              <Label htmlFor="productType">Product Type</Label>
              <Select 
                value={state.productType} 
                onValueChange={(value) => handleInputChange("productType", value)}
              >
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
              <Label htmlFor="perforation">Perforation</Label>
              <Select 
                value={state.perforation} 
                onValueChange={(value) => handleInputChange("perforation", value)}
              >
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
      </div>
      
      <div className="md:col-span-7">
        <Card className="p-4 mb-6">
          <h2 className="text-xl font-bold text-print-primary mb-4">Production Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity"
                type="number" 
                value={state.quantity} 
                onChange={(e) => handleInputChange("quantity", parseInt(e.target.value))}
                className="bg-amber-50"
              />
              <div className="text-xs text-gray-500 mt-1">labels</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="cores">Cores</Label>
              <Input 
                id="cores"
                type="number" 
                value={state.cores} 
                onChange={(e) => handleInputChange("cores", parseInt(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">cores</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="coreWidth">Core Width</Label>
              <Input 
                id="coreWidth"
                type="number" 
                step="0.01"
                value={state.coreWidth} 
                onChange={(e) => handleInputChange("coreWidth", parseFloat(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">inch</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="coreDiameter">Core Diameter</Label>
              <Input 
                id="coreDiameter"
                type="number" 
                step="0.01"
                value={state.coreDiameter} 
                onChange={(e) => handleInputChange("coreDiameter", parseFloat(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">inch</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="coreChangeovers">Core Changeovers</Label>
              <Input 
                id="coreChangeovers"
                type="number" 
                value={state.coreChangeovers} 
                onChange={(e) => handleInputChange("coreChangeovers", parseInt(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">changeovers</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="across">Across</Label>
              <Input 
                id="across"
                type="number" 
                value={state.across} 
                onChange={(e) => handleInputChange("across", parseInt(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">label(s) across</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="labelsPerCore">Labels Per Core</Label>
              <Input 
                id="labelsPerCore"
                type="number" 
                value={state.labelsPerCore} 
                onChange={(e) => handleInputChange("labelsPerCore", parseInt(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">est. labels/core</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="printTime">Print Time</Label>
              <Input 
                id="printTime"
                type="text" 
                value={state.printTime} 
                onChange={(e) => handleInputChange("printTime", e.target.value)}
              />
              <div className="text-xs text-gray-500 mt-1">hh:mm:ss</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="finishTime">Finish Time</Label>
              <Input 
                id="finishTime"
                type="text" 
                value={state.finishTime} 
                onChange={(e) => handleInputChange("finishTime", e.target.value)}
              />
              <div className="text-xs text-gray-500 mt-1">hh:mm:ss</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="feet">Feet</Label>
              <Input 
                id="feet"
                type="number" 
                step="0.01"
                value={state.feet} 
                onChange={(e) => handleInputChange("feet", parseFloat(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">feet length</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="boxes">Boxes</Label>
              <Input 
                id="boxes"
                type="number" 
                value={state.boxes} 
                onChange={(e) => handleInputChange("boxes", parseInt(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">boxes</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="boxSize">Box Size</Label>
              <Input 
                id="boxSize"
                type="text" 
                value={state.boxSize} 
                onChange={(e) => handleInputChange("boxSize", e.target.value)}
              />
              <div className="text-xs text-gray-500 mt-1">size</div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="cuttingMethod">Cutting Method</Label>
              <Input 
                id="cuttingMethod"
                type="text" 
                value={state.cuttingMethod} 
                onChange={(e) => handleInputChange("cuttingMethod", e.target.value)}
              />
              <div className="text-xs text-gray-500 mt-1">-ing</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-bold text-print-primary mb-4">Pricing</h2>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="markup">Markup (%)</Label>
              <Input 
                id="markup"
                type="number" 
                value={state.markup} 
                onChange={(e) => {
                  const newMarkup = parseInt(e.target.value);
                  const newPrice = state.cost * (1 + newMarkup / 100);
                  setState({
                    ...state,
                    markup: newMarkup,
                    price: newPrice
                  });
                }}
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="hpAbgRolls">HP/ABG Rolls</Label>
              <Input 
                id="hpAbgRolls"
                type="number" 
                step="0.01"
                value={state.hpAbgRolls} 
                onChange={(e) => handleInputChange("hpAbgRolls", parseFloat(e.target.value))}
              />
            </div>
            
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
          
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-100 p-4 rounded-md">
                <h3 className="font-medium mb-2">Label Details</h3>
                <p>Circle - 3.00 × 3.00 - 3up - 0.125</p>
                <p>Die #: #N/A</p>
                <p>Die Plate?: No</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Versions & Quantities</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-yellow-300 p-2 font-medium">8</div>
                  <div className="bg-yellow-300 p-2 font-medium">108,000</div>
                  <div className="bg-white p-2">Custom QTY ^</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-white border border-gray-200 p-2 text-center">
                <div className="font-medium">Cost</div>
                <div className="text-lg">${state.cost.toFixed(2)}</div>
              </div>
              <div className="bg-white border border-gray-200 p-2 text-center">
                <div className="font-medium">Price</div>
                <div className="text-lg">${state.price.toFixed(2)}</div>
              </div>
              <div className="bg-white border border-gray-200 p-2 text-center">
                <div className="font-medium">Cost / Label</div>
                <div className="text-lg">${(state.cost / state.quantity).toFixed(5)}</div>
              </div>
              <div className="bg-white border border-gray-200 p-2 text-center">
                <div className="font-medium">Price / Label</div>
                <div className="text-lg">${(state.price / state.quantity).toFixed(5)}</div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-print-success hover:bg-print-success/90 text-white">
                Download Price List
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RollLabelsCalculator;
