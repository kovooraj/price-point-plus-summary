
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import type { JobDetails } from '../CustomOrderTab';

interface JobDetailsSegmentProps {
  jobDetails: JobDetails;
  onChange: (details: Partial<JobDetails>) => void;
}

const JobDetailsSegment: React.FC<JobDetailsSegmentProps> = ({ jobDetails, onChange }) => {
  const handleAddQuantity = () => {
    onChange({ quantities: [...jobDetails.quantities, 0] });
  };
  
  const handleUpdateQuantity = (index: number, value: number) => {
    const newQuantities = [...jobDetails.quantities];
    newQuantities[index] = value;
    onChange({ quantities: newQuantities });
  };
  
  const handleRemoveQuantity = (index: number) => {
    const newQuantities = jobDetails.quantities.filter((_, i) => i !== index);
    onChange({ quantities: newQuantities });
  };
  
  return (
    <div className="segment-content">
      <div className="segment-grid">
        {/* Product Template */}
        <div className="space-y-2">
          <Label htmlFor="productType">Product Template</Label>
          <Select
            value={jobDetails.productType}
            onValueChange={(value) => onChange({ productType: value })}
          >
            <SelectTrigger id="productType">
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="commercial">Commercial Print</SelectItem>
              <SelectItem value="largeFormat">Large Format</SelectItem>
              <SelectItem value="rollLabel">Roll Label</SelectItem>
              <SelectItem value="flexiblePackaging">Flexible Packaging</SelectItem>
              <SelectItem value="foldingCarton">Folding Carton</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Finished Size */}
        <div className="space-y-2">
          <Label htmlFor="finishedSize">Finished Size (H x W)</Label>
          <Input
            id="finishedSize"
            placeholder="e.g. 8.5 x 11"
            value={jobDetails.finishedSize}
            onChange={(e) => onChange({ finishedSize: e.target.value })}
          />
        </div>
        
        {/* Material / Stock */}
        <div className="space-y-2">
          <Label htmlFor="material">Material / Stock</Label>
          <Input
            id="material"
            placeholder="e.g. 100# Gloss Text"
            value={jobDetails.material}
            onChange={(e) => onChange({ material: e.target.value })}
          />
        </div>
      </div>
      
      {/* Quantities */}
      <div className="mt-4">
        <Label className="mb-2 block">Quantities</Label>
        <div className="space-y-2">
          {jobDetails.quantities.map((qty, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="number"
                value={qty}
                onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value) || 0)}
                min={1}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveQuantity(index)}
                disabled={jobDetails.quantities.length <= 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddQuantity}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Quantity
          </Button>
        </div>
      </div>
      
      {/* Notes */}
      <div className="mt-4">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any special instructions or notes here"
          value={jobDetails.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default JobDetailsSegment;
