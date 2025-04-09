
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import OrderSummary from "./OrderSummary";
import { OrderItem, ProductConfig } from "./PrintCalculator";

interface FoldingCartonsState {
  productType: string;
  flatSize: {
    length: number;
    height: number;
  };
  material: string;
  sidesPrinted: string;
  pmsColors: string;
  coating: string;
  sidesCoated: string;
  lamination: string;
  sidesLaminated: string;
  ganging: string;
  printMethod: string;
  passes: string;
  dieRequired: string;
  glueRequired: string;
  glueFlaps: number;
  quantity: number;
  versions: number;
  markup: number;
  cost: number;
  price: number;
  currency: string;
  isSets: boolean;
}

const FoldingCartonsCalculator: React.FC = () => {
  const { toast } = useToast();
  const [state, setState] = useState<FoldingCartonsState>({
    productType: "Standard Tuck End Box",
    flatSize: {
      length: 14.6,
      height: 13.125,
    },
    material: "20pt Gloss C1S Cover (Indirect Food Grade)",
    sidesPrinted: "4/0",
    pmsColors: "0",
    coating: "Gloss_AQ",
    sidesCoated: "1",
    lamination: "No_Coating",
    sidesLaminated: "0",
    ganging: "No",
    printMethod: "Offset",
    passes: "1",
    dieRequired: "No",
    glueRequired: "Yes",
    glueFlaps: 3,
    quantity: 1000,
    versions: 1,
    markup: 20,
    cost: 1914.00,
    price: 2297.00,
    currency: "USD",
    isSets: false
  });
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  const handleInputChange = (field: keyof FoldingCartonsState, value: any) => {
    setState({
      ...state,
      [field]: value
    });
  };

  const handleFlatSizeChange = (dimension: 'length' | 'height', value: number) => {
    setState({
      ...state,
      flatSize: {
        ...state.flatSize,
        [dimension]: value
      }
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
      id: Date.now().toString(),
      quantity: state.quantity,
      totalCost: state.cost,
      totalPrice: state.price,
      currency: state.currency
    };
    
    setOrderItems([...orderItems, newItem]);
    
    toast({
      title: "Item added",
      description: `Added ${state.quantity} folding cartons to order summary`,
    });
  };

  const handleAddFromTable = (quantity: number) => {
    const cost = state.cost * quantity / state.quantity;
    const price = state.price * quantity / state.quantity;
    
    const newItem: OrderItem = {
      id: Date.now().toString(),
      quantity: quantity,
      totalCost: cost,
      totalPrice: price,
      currency: state.currency
    };
    
    setOrderItems([...orderItems, newItem]);
    
    toast({
      title: "Item added",
      description: `Added ${quantity} folding cartons to order summary`,
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
  
  // Convert state to ProductConfig format for OrderSummary
  const productConfig: ProductConfig = {
    productType: state.productType,
    option: "",
    itemSize: `${state.flatSize.length}" × ${state.flatSize.height}"`,
    shippedSize: "",
    material: state.material,
    sidesPrinted: state.sidesPrinted,
    pmsColors: state.pmsColors,
    coating: state.coating,
    thickness: "",
    sidesCoated: state.sidesCoated,
    coverage: "",
    lamination: state.lamination,
    sidesLaminated: state.sidesLaminated,
    ganging: state.ganging,
    paperCost: "",
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
                  <SelectItem value="Standard Tuck End Box">Standard Tuck End Box</SelectItem>
                  <SelectItem value="Reverse Tuck End Box">Reverse Tuck End Box</SelectItem>
                  <SelectItem value="Auto Lock Bottom Box">Auto Lock Bottom Box</SelectItem>
                  <SelectItem value="Mailer Box">Mailer Box</SelectItem>
                  <SelectItem value="Sleeves">Sleeves</SelectItem>
                  <SelectItem value="Custom Box">Custom Box</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label>Flat Size - Length (in)</Label>
              <Input 
                type="number" 
                step="0.001"
                value={state.flatSize.length} 
                onChange={(e) => handleFlatSizeChange("length", parseFloat(e.target.value) || 0)}
                className="bg-amber-50"
              />
            </div>
            
            <div className="form-group">
              <Label>Flat Size - Height (in)</Label>
              <Input 
                type="number" 
                step="0.001"
                value={state.flatSize.height} 
                onChange={(e) => handleFlatSizeChange("height", parseFloat(e.target.value) || 0)}
                className="bg-amber-50"
              />
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
                  <SelectItem value="20pt Gloss C1S Cover (Indirect Food Grade)">20pt Gloss C1S Cover (Indirect Food Grade)</SelectItem>
                  <SelectItem value="24pt Gloss C1S Cover">24pt Gloss C1S Cover</SelectItem>
                  <SelectItem value="18pt Gloss C2S Cover">18pt Gloss C2S Cover</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="sidesPrinted">Sides Printed</Label>
              <Select 
                value={state.sidesPrinted} 
                onValueChange={(value) => handleInputChange("sidesPrinted", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sides Printed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4/0">4/0</SelectItem>
                  <SelectItem value="4/4">4/4</SelectItem>
                  <SelectItem value="1/0">1/0</SelectItem>
                  <SelectItem value="1/1">1/1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="pmsColors">PMS Colors</Label>
              <Select 
                value={state.pmsColors} 
                onValueChange={(value) => handleInputChange("pmsColors", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select PMS Colors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="coating">Coating & Finishing</Label>
              <Select 
                value={state.coating} 
                onValueChange={(value) => handleInputChange("coating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Coating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gloss_AQ">Gloss AQ</SelectItem>
                  <SelectItem value="Matte_AQ">Matte AQ</SelectItem>
                  <SelectItem value="Soft_Touch">Soft Touch</SelectItem>
                  <SelectItem value="No_Coating">No Coating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="sidesCoated">Sides Coated</Label>
              <Select 
                value={state.sidesCoated} 
                onValueChange={(value) => handleInputChange("sidesCoated", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sides Coated" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
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
                  <SelectItem value="No_Coating">No Lamination</SelectItem>
                  <SelectItem value="Gloss_Lamination">Gloss Lamination</SelectItem>
                  <SelectItem value="Matte_Lamination">Matte Lamination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="sidesLaminated">Sides Laminated</Label>
              <Select 
                value={state.sidesLaminated} 
                onValueChange={(value) => handleInputChange("sidesLaminated", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sides Laminated" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="ganging">Ganging</Label>
              <Select 
                value={state.ganging} 
                onValueChange={(value) => handleInputChange("ganging", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Ganging" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="printMethod">Print Method</Label>
              <Select 
                value={state.printMethod} 
                onValueChange={(value) => handleInputChange("printMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Print Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Offset">Offset</SelectItem>
                  <SelectItem value="Digital">Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="passes">Number of Passes</Label>
              <Select 
                value={state.passes} 
                onValueChange={(value) => handleInputChange("passes", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Passes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="dieRequired">Die Required?</Label>
              <Select 
                value={state.dieRequired} 
                onValueChange={(value) => handleInputChange("dieRequired", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Die Required" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="glueRequired">Glue Required?</Label>
              <Select 
                value={state.glueRequired} 
                onValueChange={(value) => handleInputChange("glueRequired", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Glue Required" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-group">
              <Label htmlFor="glueFlaps">Number of Glue Flaps</Label>
              <Input 
                type="number" 
                value={state.glueFlaps} 
                onChange={(e) => handleInputChange("glueFlaps", parseInt(e.target.value) || 0)}
              />
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
                <Label htmlFor="quantity">Quantity</Label>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex justify-between text-xs mt-1">
                <span>@ {state.markup}% markup</span>
                <span>Unit price: {(state.price / state.quantity).toFixed(5)}</span>
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
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[500, 1000, 2500, 5000, 10000].map(qty => {
                const cost = (state.cost * qty / state.quantity).toFixed(2);
                const price = (state.price * qty / state.quantity).toFixed(2);
                const unitPrice = (state.price * qty / state.quantity / qty).toFixed(5);
                
                return (
                  <TableRow key={qty}>
                    <TableCell>{qty.toLocaleString()}</TableCell>
                    <TableCell>{state.currency} {cost}</TableCell>
                    <TableCell>{state.currency} {price}</TableCell>
                    <TableCell>{state.currency} {unitPrice}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs"
                        onClick={() => handleAddFromTable(qty)}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="summary-content">
        <OrderSummary
          productConfig={productConfig}
          orderItems={orderItems}
          onRemoveItem={handleRemoveItem}
          isSets={state.isSets}
        />
      </div>
    </div>
  );
};

export default FoldingCartonsCalculator;
