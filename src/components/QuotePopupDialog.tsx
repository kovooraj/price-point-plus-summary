
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuotePopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (customerDetails: CustomerDetails) => void;
}

export interface CustomerDetails {
  customerName: string;
  companyName: string;
  quoteNumber: string;
  quoteFor: string;
}

const QuotePopupDialog: React.FC<QuotePopupDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit 
}) => {
  const { toast } = useToast();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    customerName: "",
    companyName: "",
    quoteNumber: "",
    quoteFor: "Willowpack"
  });

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails({
      ...customerDetails,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (!customerDetails.customerName) {
      toast({
        title: "Customer name required",
        description: "Please provide a customer name to continue",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(customerDetails);
    onOpenChange(false);
    
    // Reset form after submission
    setCustomerDetails({
      customerName: "",
      companyName: "",
      quoteNumber: "",
      quoteFor: "Willowpack"
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Download Quote</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide customer details for the quote.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">
              Customer Name*
            </Label>
            <Input
              id="customerName"
              value={customerDetails.customerName}
              onChange={(e) => handleChange("customerName", e.target.value)}
              className="col-span-3"
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <Input
              id="companyName"
              value={customerDetails.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="col-span-3"
              placeholder="Acme Inc."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quoteNumber" className="text-right">
              SF Quote Number
            </Label>
            <Input
              id="quoteNumber"
              value={customerDetails.quoteNumber}
              onChange={(e) => handleChange("quoteNumber", e.target.value)}
              className="col-span-3"
              placeholder="Leave empty for auto-generation"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quoteFor" className="text-right">
              Quote For
            </Label>
            <Select
              value={customerDetails.quoteFor}
              onValueChange={(value) => handleChange("quoteFor", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Willowpack">Willowpack</SelectItem>
                <SelectItem value="SinaLite">SinaLite</SelectItem>
                <SelectItem value="Eprint fast">Eprint fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Download</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuotePopupDialog;
