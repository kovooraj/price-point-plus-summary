
import React, { useState, useEffect } from "react";
import { ProductConfig } from "./PrintCalculator";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [paperCostUOM, setPaperCostUOM] = useState("sheet");

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

  const productTypes = ["Flyers", "Brochures", "Business Cards", "Posters"];
  const options = ["None", "Rounded Corners", "Die Cut", "Folding"];
  const sizes = ["8.5 x 3.5", "8.5 x 11", "11 x 17", "5 x 7"];
  const materials = ["Other", "16pt Gloss Cover", "100lb Gloss Text", "14pt Matte Cover", "80lb Uncoated Text"];
  const sidesPrinted = [
    "0/0", "1/0", "2/0", "3/0", "4/0", "5/0", "6/0", "7/0", 
    "1/1", "2/2", "3/3", "4/4", "5/5", "6/6", "7/7"
  ];
  const coatings = ["No_Coating", "Aqueous Coating", "UV Coating", "Lamination"];
  const sidesOptions = ["0", "1", "2"];
  const laminations = ["Matte_Lamination", "Glossy Lamination", "None"];
  const yesNo = ["Yes", "No"];
  const paperCosts = ["Current Price", "Custom Price"];
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

        <div className="form-group">
          <Label htmlFor="itemSize">Item Size</Label>
          <Select value={productConfig.itemSize} onValueChange={(value) => onConfigChange("itemSize", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="form-group">
          <Label htmlFor="shippedSize">Shipped Size</Label>
          <Select value={productConfig.shippedSize} onValueChange={(value) => onConfigChange("shippedSize", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select shipped size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          <Label htmlFor="ganging">Ganging</Label>
          <Select value={productConfig.ganging} onValueChange={(value) => onConfigChange("ganging", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select ganging" />
            </SelectTrigger>
            <SelectContent>
              {yesNo.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!showMaterialCost && (
          <div className="form-group">
            <Label htmlFor="paperCost">Paper Cost</Label>
            <div className="flex items-center gap-2">
              <Select 
                value={productConfig.paperCost} 
                onValueChange={(value) => onConfigChange("paperCost", value)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select paper cost" />
                </SelectTrigger>
                <SelectContent>
                  {paperCosts.map(cost => (
                    <SelectItem key={cost} value={cost}>{cost}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={paperCostUOM} onValueChange={setPaperCostUOM}>
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
      </div>
    </Card>
  );
};

export default ProductForm;
