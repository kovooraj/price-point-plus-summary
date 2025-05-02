
import React, { useState, useEffect } from "react";
import { ProductConfig } from "./PrintCalculator";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  productConfig: ProductConfig;
  onConfigChange: (field: keyof ProductConfig, value: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productConfig, onConfigChange }) => {
  const [showMaterialCost, setShowMaterialCost] = useState(productConfig.material === "Other");
  const [materialUOM, setMaterialUOM] = useState("sheet");
  const [materialCost, setMaterialCost] = useState("");
  const [showCoatingFields, setShowCoatingFields] = useState(false);
  const [showLaminationFields, setShowLaminationFields] = useState(false);
  const [showFoldingFields, setShowFoldingFields] = useState(false);
  const [showShippedSize, setShowShippedSize] = useState(false);
  const [includeDieCost, setIncludeDieCost] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    // Update visibility based on selected coating
    const isAqOrUV = productConfig.coating === "Aqueous Coating" || productConfig.coating === "UV Coating";
    const isLamination = productConfig.coating === "Lamination";
    
    setShowCoatingFields(isAqOrUV);
    setShowLaminationFields(isLamination);
  }, [productConfig.coating]);

  useEffect(() => {
    setShowMaterialCost(productConfig.material === "Other");
  }, [productConfig.material]);

  useEffect(() => {
    // Show folding type field if Folding is selected as an option
    setShowFoldingFields(productConfig.option === "Folding");
    // Show shipped size if Folding is selected
    setShowShippedSize(productConfig.option === "Folding");
  }, [productConfig.option]);

  useEffect(() => {
    // Parse current item size into width and height
    if (productConfig.itemSize) {
      const [w, h] = productConfig.itemSize.split(" x ");
      setWidth(w || "");
      setHeight(h || "");
    }
  }, []);

  // Handle size change when width or height is updated
  const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
    if (dimension === 'width') {
      setWidth(value);
    } else {
      setHeight(value);
    }
    
    const newSize = `${width === '' ? '0' : width} x ${height === '' ? '0' : height}`;
    onConfigChange("itemSize", newSize);
  };

  const handleDieCostChange = (checked: boolean) => {
    setIncludeDieCost(checked);
    // Logic to add die cost to order summary would go in the parent component
  };

  const productTypes = ["Flyers", "Brochures", "Business Cards", "Posters"];
  const options = ["None", "Rounded Corners", "Die Cut", "Folding"];
  const materials = ["Other", "16pt Gloss Cover", "100lb Gloss Text", "14pt Matte Cover", "80lb Uncoated Text"];
  const sidesPrinted = [
    "0/0", "1/0", "2/0", "3/0", "4/0", "5/0", "6/0", "7/0", 
    "1/1", "2/2", "3/3", "4/4", "5/5", "6/6", "7/7"
  ];
  const coatings = ["No_Coating", "Aqueous Coating", "UV Coating", "Lamination"];
  const sidesOptions = ["0", "1", "2"];
  const laminations = ["Matte_Lamination", "Glossy Lamination", "None"];
  const foldingTypes = ["half fold", "3 panel fold", "z fold", "gate fold", "accordion fold", "4 page fold"];
  const materialUOMs = ["sheet", "M", "Roll"];
  
  return (
    <Card className="p-4 bg-white shadow-sm">
      <h2 className="section-title">Product Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="form-group">
          <Label htmlFor="productType">Product Type</Label>
          <Select value={productConfig.productType} onValueChange={(value) => onConfigChange("productType", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              {productTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="form-group">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            step="0.01"
            value={width}
            onChange={(e) => handleSizeChange('width', e.target.value)}
            className="w-full"
            placeholder="Enter width"
          />
        </div>

        <div className="form-group">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            step="0.01"
            value={height}
            onChange={(e) => handleSizeChange('height', e.target.value)}
            className="w-full"
            placeholder="Enter height"
          />
        </div>

        {showShippedSize && (
          <div className="form-group">
            <Label htmlFor="shippedSize">Shipped Size</Label>
            <Select value={productConfig.shippedSize} onValueChange={(value) => onConfigChange("shippedSize", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select shipped size" />
              </SelectTrigger>
              <SelectContent>
                {["8.5 x 3.5", "8.5 x 11", "11 x 17", "5 x 7"].map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="form-group">
          <Label htmlFor="material">Material</Label>
          <Select value={productConfig.material} onValueChange={(value) => onConfigChange("material", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map(material => (
                <SelectItem key={material} value={material}>{material}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showMaterialCost && (
          <div className="form-group">
            <Label htmlFor="materialCost">Material Cost</Label>
            <div className="flex items-center gap-2">
              <Input
                id="materialCost"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                placeholder="Enter material cost"
                type="number"
                min="0"
                className="flex-1"
              />
              <Select value={materialUOM} onValueChange={setMaterialUOM}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="UOM" />
                </SelectTrigger>
                <SelectContent>
                  {materialUOMs.map(uom => (
                    <SelectItem key={uom} value={uom}>{uom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="form-group">
          <Label htmlFor="sidesPrinted">Sides Printed</Label>
          <Select value={productConfig.sidesPrinted} onValueChange={(value) => onConfigChange("sidesPrinted", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sides printed" />
            </SelectTrigger>
            <SelectContent>
              {sidesPrinted.map(side => (
                <SelectItem key={side} value={side}>{side}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="form-group">
          <Label htmlFor="coating">Coating / Finish</Label>
          <Select value={productConfig.coating} onValueChange={(value) => onConfigChange("coating", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select coating/finish" />
            </SelectTrigger>
            <SelectContent>
              {coatings.map(coating => (
                <SelectItem key={coating} value={coating}>{coating.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showCoatingFields && (
          <div className="form-group">
            <Label htmlFor="sidesCoated">Sides Coated</Label>
            <Select value={productConfig.sidesCoated} onValueChange={(value) => onConfigChange("sidesCoated", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sides coated" />
              </SelectTrigger>
              <SelectContent>
                {sidesOptions.map(side => (
                  <SelectItem key={side} value={side}>{side}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showLaminationFields && (
          <>
            <div className="form-group">
              <Label htmlFor="lamination">Lamination</Label>
              <Select value={productConfig.lamination} onValueChange={(value) => onConfigChange("lamination", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select lamination" />
                </SelectTrigger>
                <SelectContent>
                  {laminations.map(lam => (
                    <SelectItem key={lam} value={lam}>{lam.replace('_', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label htmlFor="sidesLaminated">Sides Laminated</Label>
              <Select value={productConfig.sidesLaminated} onValueChange={(value) => onConfigChange("sidesLaminated", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sides laminated" />
                </SelectTrigger>
                <SelectContent>
                  {sidesOptions.map(side => (
                    <SelectItem key={side} value={side}>{side}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="form-group">
          <Label htmlFor="option">Option(s)</Label>
          <Select value={productConfig.option} onValueChange={(value) => onConfigChange("option", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showFoldingFields && (
          <div className="form-group">
            <Label htmlFor="foldingType">Folding Type</Label>
            <Select 
              value={productConfig.foldingType || "half fold"} 
              onValueChange={(value) => onConfigChange("foldingType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select folding type" />
              </SelectTrigger>
              <SelectContent>
                {foldingTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {productConfig.option === "Die Cut" && (
          <div className="form-group col-span-1 md:col-span-2 lg:col-span-3 flex items-center gap-2">
            <Checkbox 
              id="includeDieCost" 
              checked={includeDieCost}
              onCheckedChange={handleDieCostChange}
            />
            <Label htmlFor="includeDieCost" className="cursor-pointer">
              Include die cost ($500)
            </Label>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductForm;
