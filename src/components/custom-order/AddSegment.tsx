
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AddSegmentProps {
  onAddSegment: (segmentType: string) => void;
}

const segmentTypes = [
  { id: 'prepress', name: 'Prepress' },
  { id: 'print', name: 'Print' },
  { id: 'coating', name: 'Coating' },
  { id: 'lamination', name: 'Lamination' },
  { id: 'specialCoating', name: 'Special Coating' },
  { id: 'trimming', name: 'Trimming' },
  { id: 'dieCut', name: 'Die-cut' },
  { id: 'foldAndGlue', name: 'Fold and Glue' },
  { id: 'bindery', name: 'Bindery' },
  { id: 'shipAndPack', name: 'Ship and Pack' }
];

const AddSegment: React.FC<AddSegmentProps> = ({ onAddSegment }) => {
  const [open, setOpen] = useState(false);
  
  const handleAddSegment = (type: string) => {
    onAddSegment(type);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="zapier-add border-dashed border-border">
          <span className="zapier-add-text text-muted-foreground">
            <Plus className="h-5 w-5" />
            Add Segment
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Segment</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
          {segmentTypes.map((segment) => (
            <Button
              key={segment.id}
              variant="outline"
              className="justify-start h-auto py-3 px-4 flex flex-col items-start hover:bg-muted"
              onClick={() => handleAddSegment(segment.name)}
            >
              <span className="font-medium">{segment.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSegment;
