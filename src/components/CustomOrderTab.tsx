
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X, ArrowRight, Download, CreditCard, ArrowRightLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import JobDetailsSegment from './custom-order/JobDetailsSegment';
import AddSegment from './custom-order/AddSegment';
import SegmentComponent from './custom-order/SegmentComponent';
import OrderSummary from './custom-order/OrderSummary';
import SalesforceDialog from './custom-order/SalesforceDialog';

export type Segment = {
  id: string;
  type: string;
  isOpen: boolean;
  data: Record<string, any>;
};

export type JobDetails = {
  productType: string;
  finishedSize: string;
  material: string;
  quantities: number[];
  notes: string;
};

const CustomOrderTab: React.FC = () => {
  const { toast } = useToast();
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    productType: 'commercial',
    finishedSize: '',
    material: '',
    quantities: [1000],
    notes: ''
  });
  
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isSalesforceSyncOpen, setSalesforceSyncOpen] = useState(false);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  
  const handleAddSegment = (segmentType: string) => {
    const newSegment: Segment = {
      id: `segment-${Date.now()}`,
      type: segmentType,
      isOpen: true,
      data: {}
    };
    setSegments([...segments, newSegment]);
  };
  
  const handleRemoveSegment = (id: string) => {
    setSegments(segments.filter(segment => segment.id !== id));
  };
  
  const handleUpdateSegment = (id: string, data: Record<string, any>) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, data } : segment
    ));
  };
  
  const toggleSegment = (id: string) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, isOpen: !segment.isOpen } : segment
    ));
  };
  
  const handleUpdateJobDetails = (details: Partial<JobDetails>) => {
    setJobDetails({ ...jobDetails, ...details });
  };
  
  const handleDownloadQuote = () => {
    toast({
      title: "Quote Downloaded",
      description: "The quote has been prepared for download."
    });
  };
  
  const handleConvertToDocket = () => {
    toast({
      title: "Converting to Docket",
      description: "Your quote is being converted to a docket."
    });
  };

  // Calculate total cost (simplified for demo)
  const totalCost = 1250.75;
  
  return (
    <div className="print-calculator-layout">
      <div className="main-content space-y-6">
        {/* Job Details Section */}
        <Card className="p-4">
          <h2 className="section-title border-b pb-2 mb-4">Job Details</h2>
          <JobDetailsSegment jobDetails={jobDetails} onChange={handleUpdateJobDetails} />
        </Card>
        
        {/* Segments Section */}
        <div className="space-y-4">
          {segments.map(segment => (
            <Card key={segment.id} className="segment-card">
              <div className="segment-header">
                <h3 className="segment-title flex items-center">
                  {segment.type}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => toggleSegment(segment.id)}
                  >
                    {segment.isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveSegment(segment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {segment.isOpen && (
                <SegmentComponent 
                  type={segment.type} 
                  data={segment.data} 
                  onChange={(data) => handleUpdateSegment(segment.id, data)}
                />
              )}
            </Card>
          ))}
          
          {/* Add Segment Button */}
          <AddSegment onAddSegment={handleAddSegment} />
        </div>
      </div>
      
      <div className="summary-content">
        <OrderSummary 
          jobDetails={jobDetails}
          segments={segments}
          totalCost={totalCost}
          showCostBreakdown={showCostBreakdown}
          onToggleCostBreakdown={() => setShowCostBreakdown(!showCostBreakdown)}
          onDownloadQuote={handleDownloadQuote}
          onConvertToDocket={handleConvertToDocket}
          onSyncToSalesforce={() => setSalesforceSyncOpen(true)}
        />
        
        <SalesforceDialog 
          isOpen={isSalesforceSyncOpen} 
          onOpenChange={setSalesforceSyncOpen} 
        />
      </div>
    </div>
  );
};

export default CustomOrderTab;
