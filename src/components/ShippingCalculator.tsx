
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface ShippingCalculatorProps {
  onAddShippingCharge: (charge: {
    id: string;
    quantity: number;
    totalCost: number;
    totalPrice: number;
    currency: string;
    specifications: string;
  }) => void;
  currency: string;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onAddShippingCharge, currency }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    fromZip: '',
    toZip: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    }
  });
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [showOptions, setShowOptions] = useState(false);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Ground',
      description: 'Most economical option',
      price: 15.99,
      estimatedDays: '5-7 business days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Faster delivery',
      price: 29.99,
      estimatedDays: '2-3 business days'
    },
    {
      id: 'overnight',
      name: 'Overnight Express',
      description: 'Next business day delivery',
      price: 49.99,
      estimatedDays: '1 business day'
    }
  ];

  const handleFormChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setShippingForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setShippingForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCalculateShipping = () => {
    if (!shippingForm.fromZip || !shippingForm.toZip || !shippingForm.weight) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields",
        variant: "destructive"
      });
      return;
    }
    setShowOptions(true);
  };

  const handleAddShipping = () => {
    const selectedOption = shippingOptions.find(opt => opt.id === selectedShipping);
    if (!selectedOption) return;

    const shippingCharge = {
      id: `shipping-${Date.now()}`,
      quantity: 1,
      totalCost: selectedOption.price * 0.8, // Assuming 80% cost
      totalPrice: selectedOption.price,
      currency: currency,
      specifications: `Shipping: ${selectedOption.name} - ${selectedOption.estimatedDays} (${shippingForm.fromZip} to ${shippingForm.toZip})`
    };

    onAddShippingCharge(shippingCharge);
    
    toast({
      title: "Shipping Added",
      description: `${selectedOption.name} added to order summary`
    });

    // Reset form
    setShippingForm({
      fromZip: '',
      toZip: '',
      weight: '',
      dimensions: { length: '', width: '', height: '' }
    });
    setSelectedShipping('');
    setShowOptions(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2">
          <Truck className="h-4 w-4" /> Shipping Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Shipping Calculator</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromZip">From ZIP Code *</Label>
              <Input
                id="fromZip"
                value={shippingForm.fromZip}
                onChange={(e) => handleFormChange('fromZip', e.target.value)}
                placeholder="12345"
              />
            </div>
            <div>
              <Label htmlFor="toZip">To ZIP Code *</Label>
              <Input
                id="toZip"
                value={shippingForm.toZip}
                onChange={(e) => handleFormChange('toZip', e.target.value)}
                placeholder="67890"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="weight">Weight (lbs) *</Label>
            <Input
              id="weight"
              type="number"
              value={shippingForm.weight}
              onChange={(e) => handleFormChange('weight', e.target.value)}
              placeholder="10"
            />
          </div>

          <div>
            <Label>Dimensions (inches)</Label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <Input
                value={shippingForm.dimensions.length}
                onChange={(e) => handleFormChange('dimensions.length', e.target.value)}
                placeholder="L"
              />
              <Input
                value={shippingForm.dimensions.width}
                onChange={(e) => handleFormChange('dimensions.width', e.target.value)}
                placeholder="W"
              />
              <Input
                value={shippingForm.dimensions.height}
                onChange={(e) => handleFormChange('dimensions.height', e.target.value)}
                placeholder="H"
              />
            </div>
          </div>

          {!showOptions && (
            <Button 
              onClick={handleCalculateShipping}
              className="w-full"
            >
              Calculate Shipping Options
            </Button>
          )}

          {showOptions && (
            <div className="space-y-3">
              <h3 className="font-medium">Select Shipping Method:</h3>
              {shippingOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-3 cursor-pointer border-2 transition-colors ${
                    selectedShipping === option.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedShipping(option.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                      <div className="text-sm text-gray-500">{option.estimatedDays}</div>
                    </div>
                    <div className="font-bold text-lg">${option.price.toFixed(2)}</div>
                  </div>
                </Card>
              ))}

              {selectedShipping && (
                <Button 
                  onClick={handleAddShipping}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Add to Order Summary
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingCalculator;
