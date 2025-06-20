
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CreditCard, ArrowRightLeft, ChevronDown, ChevronUp } from 'lucide-react';
import type { JobDetails, Segment } from '../CustomOrderTab';
import SalesforceDialog from './SalesforceDialog';

interface OrderSummaryProps {
  jobDetails: JobDetails;
  segments: Segment[];
  totalCost: number;
  showCostBreakdown: boolean;
  onToggleCostBreakdown: () => void;
  onDownloadQuote: () => void;
  onConvertToDocket: () => void;
  onSyncToSalesforce: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  jobDetails,
  segments,
  totalCost,
  showCostBreakdown,
  onToggleCostBreakdown,
  onDownloadQuote,
  onConvertToDocket
}) => {
  const [isSalesforceDialogOpen, setIsSalesforceDialogOpen] = useState(false);
  
  // Helper function to render a summary row
  const SummaryRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="summary-item">
      <span className="summary-label">{label}:</span>
      <span className="summary-value">{value}</span>
    </div>
  );
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <Card className="job-summary p-4">
      <h2 className="summary-title border-b pb-2">Job Summary</h2>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <SummaryRow label="Product" value={jobDetails.productType === 'commercial' ? 'Commercial Print' : jobDetails.productType} />
          <SummaryRow 
            label="Quantities" 
            value={jobDetails.quantities.map(q => q.toLocaleString()).join(', ')} 
          />
        </div>
        
        {segments.length > 0 && (
          <div className="space-y-1 pt-2 border-t">
            <h3 className="text-sm font-medium mb-1">Selected Quantities:</h3>
            {segments.map(segment => (
              <div key={segment.id} className="text-sm pl-2 py-1 bg-gray-50 rounded">
                <div className="font-medium">{segment.type}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {/* Add detailed specifications here based on segment data */}
                  {jobDetails.finishedSize && `Size: ${jobDetails.finishedSize}`}
                  {jobDetails.material && ` • Material: ${jobDetails.material}`}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Total Cost:</h3>
            <span className="text-base font-semibold">{formatCurrency(totalCost)}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground flex items-center mt-1 p-0 h-auto"
            onClick={onToggleCostBreakdown}
          >
            {showCostBreakdown ? (
              <>Hide cost breakdown <ChevronUp className="h-3 w-3 ml-1" /></>
            ) : (
              <>Show cost breakdown <ChevronDown className="h-3 w-3 ml-1" /></>
            )}
          </Button>
          
          {showCostBreakdown && (
            <div className="mt-2 space-y-1 text-xs">
              <SummaryRow label="Materials" value={formatCurrency(450.25)} />
              <SummaryRow label="Labor" value={formatCurrency(625.50)} />
              <SummaryRow label="Shipping" value={formatCurrency(75.00)} />
              <SummaryRow label="Markup" value={formatCurrency(100.00)} />
            </div>
          )}
        </div>
      </div>
      
      <div className="summary-buttons mt-4 pt-4 border-t">
        <Button className="w-full mb-2" onClick={onDownloadQuote}>
          <Download className="h-4 w-4 mr-2" /> Download Quote
        </Button>
        <Button className="w-full mb-2" variant="cta" onClick={() => setIsSalesforceDialogOpen(true)}>
          <ArrowRightLeft className="h-4 w-4 mr-2" /> Sync with Salesforce
        </Button>
        <Button className="w-full" variant="outline" onClick={onConvertToDocket}>
          <CreditCard className="h-4 w-4 mr-2" /> Convert to Docket
        </Button>
      </div>
      
      <SalesforceDialog 
        isOpen={isSalesforceDialogOpen} 
        onOpenChange={setIsSalesforceDialogOpen} 
      />
    </Card>
  );
};

export default OrderSummary;
