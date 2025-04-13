
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import OrderSummary from "./OrderSummary";
import { OrderItem, ProductConfig } from "./PrintCalculator";
import GlobalPriceMarkup from "./GlobalPriceMarkup";

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
    markup: 40,
    cost: 300,
    price: 420,
    currency: "CAD",
    isSets: false
  });
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
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
  
  const handleAddCustomQty = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      quantity: state.quantity,
      totalCost: state.cost,
      totalPrice: state.price,
      currency: state.currency,
      versions: state.isSets ? state.versions : undefined
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
      currency: state.currency,
      versions: state.isSets ? state.versions : undefined
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
  
  const standardQuantities = [100, 200, 300, 400, 500, 1000, 1500, 2000, 2500, 3000, 10000, 15000, 20000, 25000, 30000, 100000];

  const filteredQuantities = useMemo(() => {
    if (!searchQuery) return standardQuantities;
    
    const query = searchQuery.toLowerCase();
    return standardQuantities.filter(qty => 
      qty.toString().includes(query)
    );
  }, [searchQuery]);
  
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
  
  const markup = {
    customQuantity: state.quantity,
    customCost: state.cost,
    customPrice: state.price,
    currency: state.currency,
    versions: state.versions
  };

  const handleMarkupChange = (field: keyof typeof markup, value: number | string) => {
    if (field === "customQuantity") {
      handleInputChange("quantity", Number(value));
    } else if (field === "currency") {
      handleInputChange("currency", value as string);
    } else if (field === "versions") {
      handleInputChange("versions", Number(value));
    } else if (field === "customPrice") {
      handleInputChange("price", Number(value));
    } else if (field === "customCost") {
      handleInputChange("cost", Number(value));
    }
  };
  
  return (
    <div className="print-calculator-layout">
      <div className="main-content space-y-6">
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
                className="bg-background"
              />
            </div>
            
            <div className="form-group">
              <Label>Flat Size - Height (in)</Label>
              <Input 
                type="number" 
                step="0.001"
                value={state.flatSize.height} 
                onChange={(e) => handleFlatSizeChange("height", parseFloat(e.target.value) || 0)}
                className="bg-background"
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
                className="bg-background"
              />
            </div>
          </div>
        </Card>

        <GlobalPriceMarkup 
          markup={markup}
          onMarkupChange={handleMarkupChange}
          isSets={state.isSets}
          onSetsChange={(checked) => handleInputChange("isSets", checked)}
          onAddCustomQty={handleAddCustomQty}
        />

        {!state.isSets && (
          <Card className="p-4">
            <h2 className="section-title">Quantity Variations</h2>
            
            <div className="mb-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search quantities..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-print-primary text-white">
                  <TableRow>
                    <TableHead className="border-r text-white">QTY</TableHead>
                    <TableHead className="border-r text-white">Cost ($)</TableHead>
                    <TableHead className="border-r text-white">Price ($)</TableHead>
                    <TableHead className="border-r text-white">Unit Price ($)</TableHead>
                    <TableHead className="text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuantities.map((qty, index) => {
                    const cost = (state.cost * qty / state.quantity).toFixed(2);
                    const price = (state.price * qty / state.quantity).toFixed(2);
                    const unitPrice = (parseFloat(price) / qty).toFixed(4);
                    
                    return (
                      <TableRow key={qty} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                        <TableCell className="font-medium border-r">{qty.toLocaleString()}</TableCell>
                        <TableCell className="border-r">{cost}</TableCell>
                        <TableCell className="border-r font-semibold text-print-primary">{price}</TableCell>
                        <TableCell className="border-r">{unitPrice}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center gap-1 hover:bg-print-success hover:text-white hover:border-print-success transition-colors"
                            onClick={() => handleAddFromTable(qty)}
                          >
                            <Plus className="h-4 w-4" /> Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
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
