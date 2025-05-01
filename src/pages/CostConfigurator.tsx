
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface MaterialCost {
  uom: string;
  cost: number;
}

interface MachineCost {
  hourlyCost: number;
}

interface OverheadCost {
  plant: string;
  productionSupport: number;
  generalMOH: number;
  transactionalSales: number;
  generalAdmin: number;
  creditCardExpense: number;
}

const CostConfigurator = () => {
  const { toast } = useToast();
  
  const [materialCost, setMaterialCost] = useState<MaterialCost>({
    uom: "sheet",
    cost: 0
  });

  const [machineCost, setMachineCost] = useState<MachineCost>({
    hourlyCost: 0
  });

  const [overheadCost, setOverheadCost] = useState<OverheadCost>({
    plant: "Mxphearson",
    productionSupport: 0,
    generalMOH: 0,
    transactionalSales: 0,
    generalAdmin: 0,
    creditCardExpense: 0
  });

  // Fix the escaping by using single quotes for the outer string
  const [selectedMaterial, setSelectedMaterial] = useState('16mil Yupo (Durable) Cover - 29.5" x 20.8"');
  
  const handleSave = (tab: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${tab} settings have been saved successfully.`
    });
  };
  
  const handleAddNewMaterial = () => {
    toast({
      title: "Material Added",
      description: "New material has been added to your inventory."
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cost Configurator</h1>
      
      <Tabs defaultValue="material" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="material">Material Cost</TabsTrigger>
          <TabsTrigger value="machine">Machine Cost</TabsTrigger>
          <TabsTrigger value="overhead">Overhead Cost</TabsTrigger>
        </TabsList>
        
        <TabsContent value="material">
          <Card className="p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="w-3/4">
                <Label htmlFor="materialSelect" className="mb-2 block">Choose a Material</Label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Fix the string escaping by using single quotes for the outer strings */}
                    <SelectItem value='16mil Yupo (Durable) Cover - 29.5" x 20.8"'>16mil Yupo (Durable) Cover - 29.5" x 20.8"</SelectItem>
                    <SelectItem value="100# Gloss Text">100# Gloss Text</SelectItem>
                    <SelectItem value="80lb Uncoated Text">80lb Uncoated Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="cta" onClick={handleAddNewMaterial} className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2" />
                Add New Material
              </Button>
            </div>
            
            <div className="border p-6 rounded-md mb-6">
              <h2 className="text-xl font-semibold mb-4">{selectedMaterial}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="uom">UOM (Unit of Measure)</Label>
                  <Select 
                    value={materialCost.uom} 
                    onValueChange={(value) => setMaterialCost({...materialCost, uom: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select UOM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sheet">Sheet</SelectItem>
                      <SelectItem value="M">M (1000)</SelectItem>
                      <SelectItem value="Roll">Roll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="materialCost">Cost of Material (per {materialCost.uom})</Label>
                  <Input
                    id="materialCost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={materialCost.cost.toString()}
                    onChange={(e) => setMaterialCost({...materialCost, cost: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <Label className="text-sm text-muted-foreground">Size (inch)</Label>
                  <p>29.5 x 20.8</p>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Thickness per 1000 sheets (in)</Label>
                  <p>16.00</p>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Coating</Label>
                  <p>C1S</p>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Category</Label>
                  <p>Digital Stock</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleSave("material")}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="machine">
          <Card className="p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Machine Hourly Cost Configuration</h2>
            
            <div className="max-w-md mb-6">
              <div className="space-y-2">
                <Label htmlFor="hourlyCost">Hourly Cost</Label>
                <Input
                  id="hourlyCost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={machineCost.hourlyCost.toString()}
                  onChange={(e) => setMachineCost({...machineCost, hourlyCost: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleSave("machine")}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="overhead">
          <Card className="p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Overhead Cost Configuration</h2>
            
            <div className="mb-6">
              <Label htmlFor="plant" className="mb-2 block">Plant</Label>
              <Select 
                value={overheadCost.plant} 
                onValueChange={(value) => setOverheadCost({...overheadCost, plant: value})}
              >
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Select plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mxphearson">Mxphearson</SelectItem>
                  <SelectItem value="Seelcase">Seelcase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="productionSupport">Production Support (%)</Label>
                <Input
                  id="productionSupport"
                  type="number"
                  min="0"
                  step="0.01"
                  value={overheadCost.productionSupport.toString()}
                  onChange={(e) => setOverheadCost({...overheadCost, productionSupport: parseFloat(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="generalMOH">General MOH (%)</Label>
                <Input
                  id="generalMOH"
                  type="number"
                  min="0"
                  step="0.01"
                  value={overheadCost.generalMOH.toString()}
                  onChange={(e) => setOverheadCost({...overheadCost, generalMOH: parseFloat(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transactionalSales">Transactional Sales (%)</Label>
                <Input
                  id="transactionalSales"
                  type="number"
                  min="0"
                  step="0.01"
                  value={overheadCost.transactionalSales.toString()}
                  onChange={(e) => setOverheadCost({...overheadCost, transactionalSales: parseFloat(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="generalAdmin">General Admin (%)</Label>
                <Input
                  id="generalAdmin"
                  type="number"
                  min="0"
                  step="0.01"
                  value={overheadCost.generalAdmin.toString()}
                  onChange={(e) => setOverheadCost({...overheadCost, generalAdmin: parseFloat(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="creditCardExpense">Credit Card Expense (%)</Label>
                <Input
                  id="creditCardExpense"
                  type="number"
                  min="0"
                  step="0.01"
                  value={overheadCost.creditCardExpense.toString()}
                  onChange={(e) => setOverheadCost({...overheadCost, creditCardExpense: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleSave("overhead")}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostConfigurator;
