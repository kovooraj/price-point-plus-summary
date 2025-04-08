
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ProductForm from "./ProductForm";
import PriceMarkup from "./PriceMarkup";
import QuantityTable from "./QuantityTable";
import OrderSummary from "./OrderSummary";

export interface ProductOption {
  id: string;
  name: string;
  value: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  totalCost: number;
  totalPrice: number;
  currency: string;
}

export interface ProductConfig {
  productType: string;
  option: string;
  itemSize: string;
  shippedSize: string;
  material: string;
  sidesPrinted: string;
  pmsColors: string;
  coating: string;
  thickness: string;
  sidesCoated: string;
  coverage: string;
  lamination: string;
  sidesLaminated: string;
  ganging: string;
  paperCost: string;
}

const PrintCalculator: React.FC = () => {
  const { toast } = useToast();
  const [productConfig, setProductConfig] = useState<ProductConfig>({
    productType: "Flyers",
    option: "None",
    itemSize: "8.5 x 3.5",
    shippedSize: "8.5 x 3.5",
    material: "16pt Gloss Cover",
    sidesPrinted: "4/4",
    pmsColors: "0",
    coating: "No_Coating",
    thickness: "1mil", // Changed from empty string to a valid value
    sidesCoated: "0",
    coverage: "100%",
    lamination: "Matte_Lamination",
    sidesLaminated: "2",
    ganging: "Yes",
    paperCost: "Current Price",
  });

  const [markup, setMarkup] = useState({
    baseQuantity: 10000,
    baseCost: 540.99,
    basePrice: 703.28,
    customQuantity: 0,
    customCost: 400.73,
    customPrice: 562.63,
  });

  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);

  const handleAddToSummary = (item: OrderItem) => {
    setOrderSummary([...orderSummary, { ...item, id: Date.now().toString() }]);
    toast({
      title: "Added to order summary",
      description: `Quantity: ${item.quantity} - Price: ${item.currency} ${item.totalPrice.toFixed(2)}`,
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

  const handleConfigChange = (field: keyof ProductConfig, value: string) => {
    setProductConfig({
      ...productConfig,
      [field]: value,
    });
  };

  const handleMarkupChange = (field: keyof typeof markup, value: number) => {
    setMarkup({
      ...markup,
      [field]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-print-primary mb-6">Print Product Calculator</h1>
      
      <div className="print-calculator-layout">
        <div className="main-content space-y-6">
          <ProductForm 
            productConfig={productConfig} 
            onConfigChange={handleConfigChange}
          />

          <Card className="p-4">
            <h2 className="section-title">Markup & Pricing</h2>
            <PriceMarkup 
              markup={markup} 
              onMarkupChange={handleMarkupChange}
            />
          </Card>

          <Card className="p-4">
            <h2 className="section-title">Quantity Variations</h2>
            <QuantityTable onAddToSummary={handleAddToSummary} />
          </Card>
        </div>

        <div className="summary-content">
          <OrderSummary 
            productConfig={productConfig}
            orderItems={orderSummary}
            onRemoveItem={handleRemoveFromSummary}
          />
        </div>
      </div>
    </div>
  );
};

export default PrintCalculator;
