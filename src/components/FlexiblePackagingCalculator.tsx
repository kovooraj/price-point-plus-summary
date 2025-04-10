import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Package, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "../utils/formatters";
import { Badge } from "@/components/ui/badge";
import QuantityTable from "./QuantityTable";

interface FlexiblePackagingConfig {
  product: string;
  rollWidth?: string;
  repeatLength?: string;
  height?: string;
  width?: string;
  gusset?: string;
  lamination: string;
  mainStructure: string;
  barrier: string;
  ink: string;
  zipper?: string;
  tearNotch?: string;
  holePunch?: string;
  windDirection?: string;
  repeatsPerRoll?: string;
}

interface FlexiblePackagingMarkup {
  currency: string;
  isSet: boolean;
  totalQuantity: number;
  versions: number;
  markupPercent: number;
  baseCost: number;
  basePrice: number;
}

interface OrderItem {
  id: string;
  quantity: number;
  totalCost: number;
  totalPrice: number;
  currency: string;
}

const FlexiblePackagingCalculator: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<FlexiblePackagingConfig>({
    product: "Roll_Stock",
    rollWidth: "36",
    repeatLength: "12",
    lamination: "Gloss",
    mainStructure: "White_PE",
    barrier: "None",
    ink: "CMYK",
    windDirection: "Standard_Wind_Out",
    repeatsPerRoll: "1000",
  });

  const [markup, setMarkup] = useState<FlexiblePackagingMarkup>({
    currency: "USD",
    isSet: false,
    totalQuantity: 5000,
    versions: 1,
    markupPercent: 30,
    baseCost: 1541.77,
    basePrice: 2004.31,
  });

  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (config.product === "Roll_Stock") {
      setConfig(prev => ({
        ...prev,
        height: undefined,
        width: undefined,
        gusset: undefined,
        zipper: undefined,
        tearNotch: undefined,
        holePunch: undefined,
        rollWidth: prev.rollWidth || "36",
        repeatLength: prev.repeatLength || "12",
        windDirection: prev.windDirection || "Standard_Wind_Out",
        repeatsPerRoll: prev.repeatsPerRoll || "1000",
      }));
    } else if (config.product === "Flat_Lay_Pouches") {
      setConfig(prev => ({
        ...prev,
        rollWidth: undefined,
        repeatLength: undefined,
        windDirection: undefined,
        repeatsPerRoll: undefined,
        height: prev.height || "8",
        width: prev.width || "6",
        gusset: undefined,
        zipper: prev.zipper || "None",
        tearNotch: prev.tearNotch || "No",
        holePunch: prev.holePunch || "No",
      }));
    } else if (config.product === "Stand_Up_Pouches") {
      setConfig(prev => ({
        ...prev,
        rollWidth: undefined,
        repeatLength: undefined,
        windDirection: undefined,
        repeatsPerRoll: undefined,
        height: prev.height || "8",
        width: prev.width || "6",
        gusset: prev.gusset || "3",
        zipper: prev.zipper || "None",
        tearNotch: prev.tearNotch || "No",
        holePunch: prev.holePunch || "No",
      }));
    }
  }, [config.product]);

  const handleConfigChange = (field: keyof FlexiblePackagingConfig, value: string) => {
    setConfig({
      ...config,
      [field]: value,
    });
  };

  const handleMarkupChange = (field: keyof FlexiblePackagingMarkup, value: number | string | boolean) => {
    setMarkup({
      ...markup,
      [field]: value,
    });

    if (field === "markupPercent" && typeof value === "number") {
      const newPrice = markup.baseCost * (1 + value / 100);
      setMarkup(prev => ({ ...prev, basePrice: newPrice }));
    }
  };

  const handleAddToSummary = (item: OrderItem) => {
    setOrderSummary([...orderSummary, item]);
    toast({
      title: "Added to order summary",
      description: `Quantity: ${item.quantity} - Price: ${markup.currency} ${item.totalPrice.toFixed(2)}`,
    });
  };

  const handleRemoveFromSummary = (id: string) => {
    setOrderSummary(orderSummary.filter(item => item.id !== id));
    toast({
      title: "Removed from order summary",
      description: "Item removed successfully",
      variant: "destructive",
    });
  };

  const handleDownloadSpecSheet = () => {
    const fileName = "flexible-packaging-spec-sheet.csv";
    let content = "Flexible Packaging Specifications\n";
    content += `Product Type: ${config.product.replace(/_/g, " ")}\n`;
    
    if (config.product === "Roll_Stock") {
      content += `Roll Width: ${config.rollWidth}\n`;
      content += `Repeat Length: ${config.repeatLength}\n`;
      content += `Wind Direction: ${config.windDirection?.replace(/_/g, " ")}\n`;
      content += `Repeats Per Roll: ${config.repeatsPerRoll}\n`;
    } else if (config.product === "Flat_Lay_Pouches") {
      content += `Height: ${config.height}\n`;
      content += `Width: ${config.width}\n`;
    } else if (config.product === "Stand_Up_Pouches") {
      content += `Height: ${config.height}\n`;
      content += `Width: ${config.width}\n`;
      content += `Gusset: ${config.gusset}\n`;
    }
    
    content += `Lamination: ${config.lamination}\n`;
    content += `Main Structure: ${config.mainStructure.replace(/_/g, " ")}\n`;
    content += `Barrier: ${config.barrier}\n`;
    content += `Ink: ${config.ink}\n`;
    
    if (config.product !== "Roll_Stock") {
      content += `Zipper: ${config.zipper}\n`;
      content += `Tear Notch: ${config.tearNotch}\n`;
      content += `Hole Punch: ${config.holePunch}\n`;
    }
    
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
    <div className="print-calculator-layout">
      <div className="main-content space-y-6">
        <Card className="p-4">
          <h2 className="section-title">Product Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product" className="text-print-primary font-medium">Product</Label>
              <Select
                value={config.product}
                onValueChange={(value) => handleConfigChange("product", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Roll_Stock">Roll Stock</SelectItem>
                  <SelectItem value="Flat_Lay_Pouches">Flat Lay Pouches</SelectItem>
                  <SelectItem value="Stand_Up_Pouches">Stand Up Pouches</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config.product === "Roll_Stock" && (
              <>
                <div>
                  <Label htmlFor="rollWidth" className="text-print-primary font-medium">Roll Width (inches)</Label>
                  <Input
                    id="rollWidth"
                    type="text"
                    value={config.rollWidth || ""}
                    onChange={(e) => handleConfigChange("rollWidth", e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="repeatLength" className="text-print-primary font-medium">Repeat Length (inches)</Label>
                  <Input
                    id="repeatLength"
                    type="text"
                    value={config.repeatLength || ""}
                    onChange={(e) => handleConfigChange("repeatLength", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </>
            )}

            {config.product === "Flat_Lay_Pouches" && (
              <>
                <div>
                  <Label htmlFor="height" className="text-print-primary font-medium">Height (inches)</Label>
                  <Input
                    id="height"
                    type="text"
                    value={config.height || ""}
                    onChange={(e) => handleConfigChange("height", e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-print-primary font-medium">Width (inches)</Label>
                  <Input
                    id="width"
                    type="text"
                    value={config.width || ""}
                    onChange={(e) => handleConfigChange("width", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </>
            )}

            {config.product === "Stand_Up_Pouches" && (
              <>
                <div>
                  <Label htmlFor="height" className="text-print-primary font-medium">Height (inches)</Label>
                  <Input
                    id="height"
                    type="text"
                    value={config.height || ""}
                    onChange={(e) => handleConfigChange("height", e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-print-primary font-medium">Width (inches)</Label>
                  <Input
                    id="width"
                    type="text"
                    value={config.width || ""}
                    onChange={(e) => handleConfigChange("width", e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="gusset" className="text-print-primary font-medium">Gusset (inches)</Label>
                  <Input
                    id="gusset"
                    type="text"
                    value={config.gusset || ""}
                    onChange={(e) => handleConfigChange("gusset", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="lamination" className="text-print-primary font-medium">Lamination (Layer 1)</Label>
              <Select
                value={config.lamination}
                onValueChange={(value) => handleConfigChange("lamination", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lamination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gloss">Gloss</SelectItem>
                  <SelectItem value="Matte">Matte</SelectItem>
                  <SelectItem value="Soft_Touch">Soft Touch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mainStructure" className="text-print-primary font-medium">Main Structure</Label>
              <Select
                value={config.mainStructure}
                onValueChange={(value) => handleConfigChange("mainStructure", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select structure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White_PE">White PE</SelectItem>
                  <SelectItem value="Clear_PE">Clear PE</SelectItem>
                  <SelectItem value="METPET_CLEAR_PE">METPET + CLEAR PE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="barrier" className="text-print-primary font-medium">Barrier</Label>
              <Select
                value={config.barrier}
                onValueChange={(value) => handleConfigChange("barrier", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select barrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ink" className="text-print-primary font-medium">Ink</Label>
              <Select
                value={config.ink}
                onValueChange={(value) => handleConfigChange("ink", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ink" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CMYK">CMYK</SelectItem>
                  <SelectItem value="CMYK_OVG">CMYK OVG</SelectItem>
                  <SelectItem value="CMYK_WHITE">CMYK + WHITE</SelectItem>
                  <SelectItem value="CMYK_OVG_WHITE">CMYK OVG + WHITE</SelectItem>
                  <SelectItem value="WHITE_ONLY">WHITE ONLY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {config.product !== "Roll_Stock" && (
              <>
                <div>
                  <Label htmlFor="zipper" className="text-print-primary font-medium">Zipper</Label>
                  <Select
                    value={config.zipper}
                    onValueChange={(value) => handleConfigChange("zipper", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select zipper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="CR_Zipper">CR Zipper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tearNotch" className="text-print-primary font-medium">Tear Notch</Label>
                  <Select
                    value={config.tearNotch}
                    onValueChange={(value) => handleConfigChange("tearNotch", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="holePunch" className="text-print-primary font-medium">Hole Punch</Label>
                  <Select
                    value={config.holePunch}
                    onValueChange={(value) => handleConfigChange("holePunch", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {config.product === "Roll_Stock" && (
              <>
                <div>
                  <Label htmlFor="windDirection" className="text-print-primary font-medium">Wind Direction</Label>
                  <Select
                    value={config.windDirection}
                    onValueChange={(value) => handleConfigChange("windDirection", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard_Wind_Out">Standard Wind Out</SelectItem>
                      <SelectItem value="Reverse_Wind_In">Reverse Wind In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="repeatsPerRoll" className="text-print-primary font-medium">Repeats Per Roll</Label>
                  <Input
                    id="repeatsPerRoll"
                    type="text"
                    value={config.repeatsPerRoll || ""}
                    onChange={(e) => handleConfigChange("repeatsPerRoll", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="section-title">Markup & Pricing</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-print-primary font-medium">Currency</Label>
              <div className="flex items-center space-x-2">
                <div className={`flex items-center ${markup.currency === "USD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
                  <span>USD</span>
                </div>
                
                <Switch 
                  checked={markup.currency === "CAD"} 
                  onCheckedChange={(checked) => handleMarkupChange("currency", checked ? "CAD" : "USD")}
                />
                
                <div className={`flex items-center ${markup.currency === "CAD" ? "font-bold text-print-primary" : "text-gray-500"}`}>
                  <span>CAD</span>
                </div>
              </div>
            </div>
            
            {config.product !== "Roll_Stock" && (
              <div className="flex items-center justify-between">
                <Label className="text-print-primary font-medium">Sets</Label>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center ${!markup.isSet ? "font-bold text-print-primary" : "text-gray-500"}`}>
                    <span>No</span>
                  </div>
                  
                  <Switch 
                    checked={markup.isSet} 
                    onCheckedChange={(checked) => handleMarkupChange("isSet", checked)}
                  />
                  
                  <div className={`flex items-center ${markup.isSet ? "font-bold text-print-primary" : "text-gray-500"}`}>
                    <span>Yes</span>
                  </div>
                </div>
              </div>
            )}
            
            {!markup.isSet ? (
              <div className="mb-4">
                <Label htmlFor="totalQuantity" className="text-print-primary font-medium">QTY</Label>
                <div className="flex items-center mt-1">
                  <div className="w-24 text-sm font-medium mr-2">QTY:</div>
                  <Input 
                    id="totalQuantity"
                    type="number" 
                    value={markup.totalQuantity} 
                    onChange={(e) => handleMarkupChange("totalQuantity", parseInt(e.target.value) || 0)} 
                    placeholder="Enter quantity"
                    className="bg-white"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Label htmlFor="totalQuantity" className="text-print-primary font-medium">Total Quantity</Label>
                  <div className="flex items-center mt-1">
                    <div className="w-24 text-sm font-medium mr-2">Total QTY:</div>
                    <Input 
                      id="totalQuantity"
                      type="number" 
                      value={markup.totalQuantity} 
                      onChange={(e) => handleMarkupChange("totalQuantity", parseInt(e.target.value) || 0)} 
                      placeholder="Enter total quantity"
                      className="bg-white"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="versions" className="text-print-primary font-medium">Number of Versions</Label>
                  <div className="flex items-center mt-1">
                    <div className="w-24 text-sm font-medium mr-2">Versions:</div>
                    <Input 
                      id="versions"
                      type="number" 
                      value={markup.versions} 
                      onChange={(e) => handleMarkupChange("versions", parseInt(e.target.value) || 1)} 
                      placeholder="Enter number of versions"
                      className="bg-white"
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="mb-4">
              <Label htmlFor="markup" className="text-print-primary font-medium">Markup Percentage</Label>
              <div className="flex items-center mt-1">
                <div className="w-24 text-sm font-medium mr-2">Markup %:</div>
                <Input 
                  id="markup"
                  type="number" 
                  value={markup.markupPercent}
                  onChange={(e) => handleMarkupChange("markupPercent", parseFloat(e.target.value) || 0)}
                  placeholder="Enter markup percentage"
                  className="bg-white"
                  min="0"
                  max="100"
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
                  onChange={(e) => handleMarkupChange("baseCost", parseFloat(e.target.value) || 0)} 
                  className="bg-gray-100"
                />
              </div>
              
              <div className="flex items-center">
                <div className="w-24 text-sm font-medium mr-2">Price ($):</div>
                <Input 
                  type="number" 
                  step="0.01" 
                  value={markup.basePrice} 
                  onChange={(e) => handleMarkupChange("basePrice", parseFloat(e.target.value) || 0)} 
                  className="bg-blue-50"
                />
              </div>
              
              <div className="text-sm text-right mt-1">
                <span className="text-print-primary">
                  {markup.currency}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={() => handleAddToSummary({
                  id: Date.now().toString(),
                  quantity: markup.totalQuantity,
                  totalCost: markup.baseCost,
                  totalPrice: markup.basePrice,
                  currency: markup.currency
                })}
                className="flex items-center gap-1 bg-print-success hover:bg-print-success/90 text-white"
              >
                <Plus className="h-4 w-4" /> Add to Summary
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="section-title">Quantity Variations</h2>
          <QuantityTable 
            onAddToSummary={handleAddToSummary}
            currency={markup.currency}
          />
        </Card>
      </div>

      <div className="summary-content">
        <Card className="p-4 bg-white shadow-sm sticky top-4">
          <h2 className="text-xl font-bold text-print-primary border-b pb-3 mb-4">Order Summary</h2>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Product Specifications</h3>
            <ul className="text-sm space-y-1.5">
              <li className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{config.product.replace(/_/g, " ")}</span>
              </li>
              
              {config.product === "Roll_Stock" ? (
                <>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Roll Width:</span>
                    <span className="font-medium">{config.rollWidth} in</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Repeat Length:</span>
                    <span className="font-medium">{config.repeatLength} in</span>
                  </li>
                </>
              ) : config.product === "Flat_Lay_Pouches" ? (
                <>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{config.height} in</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Width:</span>
                    <span className="font-medium">{config.width} in</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{config.height} in</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Width:</span>
                    <span className="font-medium">{config.width} in</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Gusset:</span>
                    <span className="font-medium">{config.gusset} in</span>
                  </li>
                </>
              )}
              
              <li className="flex justify-between">
                <span className="text-gray-600">Lamination:</span>
                <span className="font-medium">{config.lamination}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Main Structure:</span>
                <span className="font-medium">{config.mainStructure.replace(/_/g, " ")}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Ink:</span>
                <span className="font-medium">{config.ink.replace(/_/g, " ")}</span>
              </li>
              
              {config.product !== "Roll_Stock" && (
                <>
                  {config.zipper !== "None" && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Zipper:</span>
                      <span className="font-medium">{config.zipper}</span>
                    </li>
                  )}
                  {config.tearNotch === "Yes" && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Tear Notch:</span>
                      <span className="font-medium">Yes</span>
                    </li>
                  )}
                  {config.holePunch === "Yes" && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Hole Punch:</span>
                      <span className="font-medium">Yes</span>
                    </li>
                  )}
                </>
              )}
              
              {config.product === "Roll_Stock" && (
                <>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Wind Direction:</span>
                    <span className="font-medium">{config.windDirection?.replace(/_/g, " ")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Repeats/Roll:</span>
                    <span className="font-medium">{config.repeatsPerRoll}</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          {orderSummary.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">Selected Quantities</h3>
              <ul className="space-y-3">
                {orderSummary.map((item) => (
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
                        onClick={() => handleRemoveFromSummary(item.id)}
                      >
                        <span className="sr-only">Remove</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
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
                Add quantities from the pricing section
              </p>
            </div>
          )}
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Items:</span>
              <span>{orderSummary.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Price:</span>
              <span className="text-xl font-bold text-print-primary">
                {orderSummary.length > 0 ? 
                  `${orderSummary[0].currency} ${orderSummary.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}` : 
                  `${markup.currency} 0.00`
                }
              </span>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <Button 
              className="w-full bg-print-accent hover:bg-print-accent/90 text-print-primary font-bold flex items-center justify-center gap-2"
              onClick={() => {
                const fileName = "price-list.csv";
                let content = "Quantity,Price\n";
                orderSummary.forEach(item => {
                  content += `${item.quantity},${item.totalPrice.toFixed(2)}\n`;
                });
                const blob = new Blob([content], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="h-4 w-4" /> Download Price List
            </Button>
            
            <Button 
              className="w-full bg-white border-print-primary border text-print-primary hover:bg-print-primary/10 font-bold flex items-center justify-center gap-2"
              onClick={handleDownloadSpecSheet}
            >
              <Package className="h-4 w-4" /> Download Spec Sheet
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FlexiblePackagingCalculator;
