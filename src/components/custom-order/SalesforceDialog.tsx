
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRightLeft } from 'lucide-react';

interface SalesforceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SalesforceDialog: React.FC<SalesforceDialogProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const [quoteNumber, setQuoteNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSync = () => {
    if (!quoteNumber) {
      toast({
        title: "Error",
        description: "Please enter a Salesforce quote number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Quote Synced",
        description: `Successfully synced with Salesforce quote #${quoteNumber}`
      });
      
      setIsLoading(false);
      setQuoteNumber('');
      onOpenChange(false);
    }, 1000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sync with Salesforce</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <Label htmlFor="quoteNumber">Salesforce Quote Number</Label>
            <Input
              id="quoteNumber"
              placeholder="Enter quote number"
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="dark:bg-[#0FA0CE] dark:hover:bg-[#0FA0CE]/90" 
            variant="cta" 
            onClick={handleSync} 
            disabled={isLoading}
          >
            {isLoading ? "Syncing..." : (
              <>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Sync Quote
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalesforceDialog;
