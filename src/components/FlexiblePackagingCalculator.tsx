import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Package, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import QuantityTable from "./QuantityTable";
import OrderSummary from "./OrderSummary";
import GlobalPriceMarkup from "./GlobalPriceMarkup";

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
  customQuantity: number;
  customCost: number;
  customPrice: number;
}

interface OrderItem {
  id: string;
  quantity: number;
  totalCost: number;
  totalPrice: number;
  currency: string;
  versions?: number;
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
    currency: "CAD",
    isSet: false,
    totalQuantity: 1000,
    versions: 1,
    markupPercent: 40,
    baseCost: 300,
    basePrice: 420,
    customQuantity: 1000,
    customCost: 300,
    customPrice: 420
  });

  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);
  const [isSets, setIsSets] = useState(false);
  const [notes, setNotes] = useState("");

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

  const handleMarkupChange = (field: keyof FlexiblePackagingMarkup | string, value: number | string | boolean) => {
    if (field === "currency") {
      setMarkup({
        ...markup,
        currency: value as string,
      });
    } else if (field === "customQuantity") {
      setMarkup({
        ...markup,
        customQuantity: value as number,
        totalQuantity: value as number,
      });
    } else if (field === "versions") {
      setMarkup({
        ...markup,
        versions: value as number,
      });
    } else if (field === "customPrice") {
      setMarkup({
        ...markup,
        customPrice: value as number,
        basePrice: value as number,
      });
    } else if (field === "customCost") {
      setMarkup({
        ...markup,
        customCost: value as number,
        baseCost: value as number,
      });
    }
  };

  const handleAddToSummary = (item: OrderItem) => {
    const newItem = {
      ...item,
      versions: isSets ? markup.versions : undefined
    };
    
    setOrderSummary([...orderSummary, newItem]);
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

  const handleAddCustomQty = () => {
    if (markup.customQuantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity greater than 0",
        variant: "destructive"
      });
      return;
    }
    
    handleAddToSummary({
      id: `custom-${Date.now()}`,
      quantity: markup.customQuantity,
      totalCost: markup.customCost,
      totalPrice: markup.customPrice,
      currency: markup.currency,
      versions: isSets ? markup.versions : undefined
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

  const getFormattedProductConfig = () => {
    return {
      productType: config.product.replace(/_/g, " "),
      option: "",
      itemSize: config.product === "Roll_Stock" 
        ? `${config.rollWidth}" x ${config.repeatLength}"`
        : `${config.height}" x ${config.width}"${config.gusset ? ` x ${config.gusset}"` : ""}`,
      shippedSize: "",
      material: config.mainStructure.replace(/_/g, " "),
      sidesPrinted: config.ink,
      pmsColors: "0",
      coating: config.lamination,
      thickness: "",
      sidesCoated: "",
      coverage: "",
      lamination: "",
      sidesLaminated: "",
      ganging: "",
      paperCost: ""
    };
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
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="repeatLength" className="text-print-primary font-medium">Repeat Length (inches)</Label>
                  <Input
                    id="repeatLength"
                    type="text"
                    value={config.repeatLength || ""}
                    onChange={(e) => handleConfigChange("repeatLength", e.target.value)}
                    className="bg-background"
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
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-print-primary font-medium">Width (inches)</Label>
                  <Input
                    id="width"
                    type="text"
                    value={config.width || ""}
                    onChange={(e) => handleConfigChange("width", e.target.value)}
                    className="bg-background"
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
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-print-primary font-medium">Width (inches)</Label>
                  <Input
                    id="width"
                    type="text"
                    value={config.width || ""}
                    onChange={(e) => handleConfigChange("width", e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="gusset" className="text-print-primary font-medium">Gusset (inches)</Label>
                  <Input
                    id="gusset"
                    type="text"
                    value={config.gusset || ""}
                    onChange={(e) => handleConfigChange("gusset", e.target.value)}
                    className="bg-background"
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
                    className="bg-background"
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        <GlobalPriceMarkup 
          markup={{
            customQuantity: markup.customQuantity,
            customCost: markup.customCost,
            customPrice: markup.customPrice,
            currency: markup.currency,
            versions: markup.versions
          }} 
          onMarkupChange={handleMarkupChange} 
          isSets={isSets} 
          onSetsChange={setIsSets}
          onAddCustomQty={handleAddCustomQty}
        />

        {!isSets && (
          <Card className="p-4">
            <h2 className="section-title">Quantity Variations</h2>
            <QuantityTable 
              onAddToSummary={handleAddToSummary}
              currency={markup.currency}
            />
          </Card>
        )}
      </div>

      <div className="summary-content">
        <OrderSummary
          productConfig={getFormattedProductConfig()}
          orderItems={orderSummary}
          onRemoveItem={handleRemoveFromSummary}
          isSets={isSets}
          showSpecSheet={true}
        />
      </div>
    </div>
  );
};

export default FlexiblePackagingCalculator;
