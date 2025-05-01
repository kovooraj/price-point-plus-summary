
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductForm from "./ProductForm";
import GlobalPriceMarkup from "./GlobalPriceMarkup";
import QuantityTable from "./QuantityTable";
import OrderSummary from "./OrderSummary";
import RollLabelsCalculator from "./RollLabelsCalculator";
import FoldingCartonsCalculator from "./FoldingCartonsCalculator";
import FlexiblePackagingCalculator from "./FlexiblePackagingCalculator";
import QuotesTab from "./QuotesTab";
import UserProfileButton from "./UserProfileButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomOrderTab from "./CustomOrderTab";
import SalesforceDialog from "./custom-order/SalesforceDialog";

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
  versions?: number;
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
  const [activeTab, setActiveTab] = useState("commercial");
  const [productConfig, setProductConfig] = useState<ProductConfig>({
    productType: "Flyers",
    option: "None",
    itemSize: "8.5 x 3.5",
    shippedSize: "8.5 x 3.5",
    material: "16pt Gloss Cover",
    sidesPrinted: "4/4",
    pmsColors: "0",
    coating: "No_Coating",
    thickness: "1mil",
    sidesCoated: "0",
    coverage: "100%",
    lamination: "Matte_Lamination",
    sidesLaminated: "2",
    ganging: "Yes",
    paperCost: "Current Price"
  });
  
  const [markup, setMarkup] = useState({
    baseQuantity: 10000,
    baseCost: 540.99,
    basePrice: 703.28,
    customQuantity: 1000,
    customCost: 400.73,
    customPrice: 562.63,
    currency: "CAD",
    versions: 1
  });
  
  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);
  const [isQuotesDialogOpen, setIsQuotesDialogOpen] = useState(false);
  const [isSalesforceDialogOpen, setIsSalesforceDialogOpen] = useState(false);
  const [isSets, setIsSets] = useState(false);
  
  const handleAddToSummary = (item: OrderItem) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      currency: markup.currency,
      versions: isSets ? markup.versions : undefined
    };
    
    setOrderSummary([...orderSummary, newItem]);
    
    toast({
      title: "Added to order summary",
      description: `Quantity: ${item.quantity} - Price: ${markup.currency} ${item.totalPrice.toFixed(2)}`
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
  
  const handleRemoveFromSummary = (id: string) => {
    setOrderSummary(orderSummary.filter(item => item.id !== id));
    
    toast({
      title: "Removed from order summary",
      description: "Item removed successfully",
      variant: "destructive"
    });
  };
  
  const handleConfigChange = (field: keyof ProductConfig, value: string) => {
    setProductConfig({
      ...productConfig,
      [field]: value
    });
  };
  
  const handleMarkupChange = (field: keyof typeof markup, value: number | string) => {
    setMarkup({
      ...markup,
      [field]: value
    });
  };
  
  // Render the "Sync with Salesforce" button for all tabs
  const renderSalesforceButton = () => {
    return (
      <Button 
        variant="cta" 
        className="w-full mt-2"
        onClick={() => setIsSalesforceDialogOpen(true)}
      >
        <ArrowRightLeft className="h-5 w-5 mr-2" />
        Sync with Salesforce
      </Button>
    );
  };
  
  return <div className="container mx-auto p-4 px-[60px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-print-primary py-[19px]">Estimating Calculator</h1>
        <div className="flex gap-3 items-center">
          <Dialog open={isQuotesDialogOpen} onOpenChange={setIsQuotesDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Quote History
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-[90vw] max-h-[85vh] overflow-y-auto">
              <QuotesTab />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full border-b justify-start overflow-x-auto px-[2px] py-0">
          <TabsTrigger value="commercial" className="px-6 py-2">Commercial Printing</TabsTrigger>
          <TabsTrigger value="rolllabels" className="px-6 py-2">Roll Labels</TabsTrigger>
          <TabsTrigger value="foldingcartons" className="px-6 py-2">Folding Cartons</TabsTrigger>
          <TabsTrigger value="flexiblepackaging" className="px-6 py-2">Flexible Packaging</TabsTrigger>
          <TabsTrigger value="custom" className="px-6 py-2">Custom Order</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commercial" className="mt-4">
          <div className="print-calculator-layout">
            <div className="main-content space-y-6">
              <ProductForm productConfig={productConfig} onConfigChange={handleConfigChange} />

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

              {!isSets && <Card className="p-4">
                  <h2 className="section-title">Quantity Variations</h2>
                  <QuantityTable onAddToSummary={handleAddToSummary} currency={markup.currency} />
                </Card>}
            </div>

            <div className="summary-content">
              <OrderSummary 
                productConfig={productConfig} 
                orderItems={orderSummary} 
                onRemoveItem={handleRemoveFromSummary} 
                isSets={isSets} 
              />
              {renderSalesforceButton()}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rolllabels" className="mt-4">
          <RollLabelsCalculator />
          <div className="flex justify-end mt-4">
            {renderSalesforceButton()}
          </div>
        </TabsContent>
        
        <TabsContent value="foldingcartons" className="mt-4">
          <FoldingCartonsCalculator />
          <div className="flex justify-end mt-4">
            {renderSalesforceButton()}
          </div>
        </TabsContent>
        
        <TabsContent value="flexiblepackaging" className="mt-4">
          <FlexiblePackagingCalculator />
          <div className="flex justify-end mt-4">
            {renderSalesforceButton()}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4">
          <CustomOrderTab />
        </TabsContent>
      </Tabs>

      {/* Salesforce Dialog */}
      <SalesforceDialog 
        isOpen={isSalesforceDialogOpen} 
        onOpenChange={setIsSalesforceDialogOpen} 
      />
    </div>;
};

export default PrintCalculator;
