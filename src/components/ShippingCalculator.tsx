
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
    name: '',
    streetAddress: '',
    company: '',
    country: '',
    stateProvince: '',
    city: '',
    zipcode: '',
    phoneNumber: ''
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

  const handleFormChange = (field: keyof typeof shippingForm, value: string) => {
    setShippingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculateShipping = () => {
    if (!shippingForm.name || !shippingForm.streetAddress || !shippingForm.city || !shippingForm.zipcode) {
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
      specifications: `Shipping: ${selectedOption.name} - ${selectedOption.estimatedDays} (${shippingForm.city}, ${shippingForm.stateProvince})`
    };

    onAddShippingCharge(shippingCharge);
    
    toast({
      title: "Shipping Added",
      description: `${selectedOption.name} added to order summary`
    });

    // Reset form
    setShippingForm({
      name: '',
      streetAddress: '',
      company: '',
      country: '',
      stateProvince: '',
      city: '',
      zipcode: '',
      phoneNumber: ''
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shipping Calculator</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={shippingForm.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              placeholder="Full Name"
            />
          </div>

          <div>
            <Label htmlFor="streetAddress">Street Address *</Label>
            <Input
              id="streetAddress"
              value={shippingForm.streetAddress}
              onChange={(e) => handleFormChange('streetAddress', e.target.value)}
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={shippingForm.company}
              onChange={(e) => handleFormChange('company', e.target.value)}
              placeholder="Company Name (Optional)"
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={shippingForm.country}
              onChange={(e) => handleFormChange('country', e.target.value)}
              placeholder="Country"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stateProvince">State/Province</Label>
              <Input
                id="stateProvince"
                value={shippingForm.stateProvince}
                onChange={(e) => handleFormChange('stateProvince', e.target.value)}
                placeholder="State/Province"
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={shippingForm.city}
                onChange={(e) => handleFormChange('city', e.target.value)}
                placeholder="City"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipcode">Zipcode/Postal Code *</Label>
              <Input
                id="zipcode"
                value={shippingForm.zipcode}
                onChange={(e) => handleFormChange('zipcode', e.target.value)}
                placeholder="12345"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={shippingForm.phoneNumber}
                onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                placeholder="(123) 456-7890"
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
