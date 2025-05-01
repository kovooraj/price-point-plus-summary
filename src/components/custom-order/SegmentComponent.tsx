
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface SegmentComponentProps {
  type: string;
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

const SegmentComponent: React.FC<SegmentComponentProps> = ({ type, data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };
  
  // Helper to render common field types
  const renderField = (id: string, label: string, fieldType: 'input' | 'textarea', placeholder: string = '') => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {fieldType === 'input' ? (
        <Input
          id={id}
          value={data[id] || ''}
          onChange={(e) => handleChange(id, e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <Textarea
          id={id}
          value={data[id] || ''}
          onChange={(e) => handleChange(id, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
  
  // Helper to render select fields
  const renderSelect = (id: string, label: string, options: {value: string, label: string}[], placeholder: string = '') => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={data[id] || ''}
        onValueChange={(value) => handleChange(id, value)}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  
  switch (type) {
    case 'Prepress':
      return (
        <div className="segment-grid">
          {renderField('ups', 'Ups', 'input', 'Number of ups')}
          {renderSelect('impositionType', 'Type of Imposition', [
            { value: 'workAndTurn', label: 'Work and Turn' },
            { value: 'workAndTumble', label: 'Work and Tumble' },
            { value: 'sheetwise', label: 'Sheetwise' },
            { value: 'perfecting', label: 'Perfecting' }
          ], 'Select imposition type')}
          {renderField('notes', 'Notes', 'textarea', 'Additional information')}
        </div>
      );
      
    case 'Print':
      return (
        <div className="space-y-4">
          <div className="segment-grid">
            {renderSelect('printType', 'Type of Print', [
              { value: 'offset', label: 'Offset' },
              { value: 'digital', label: 'Digital' },
              { value: 'largeFormat', label: 'Large Format' }
            ], 'Select print type')}
            
            {data.printType === 'offset' && renderSelect('machine', 'Machine', [
              { value: 'heidelbergXL', label: 'Heidelberg XL' },
              { value: 'komori', label: 'Komori' },
              { value: 'manroland', label: 'Manroland' }
            ])}
            
            {data.printType === 'digital' && renderSelect('machine', 'Machine', [
              { value: 'hp1200K', label: 'HP 1200K' },
              { value: 'xerox', label: 'Xerox' },
              { value: 'canon', label: 'Canon' }
            ])}
            
            {data.printType === 'largeFormat' && renderSelect('machine', 'Machine', [
              { value: 'agfaTitan', label: 'AGFA Titan' },
              { value: 'epson', label: 'Epson' },
              { value: 'roland', label: 'Roland' }
            ])}
            
            {renderField('totalSheets', 'Total Sheets', 'input', 'Auto-calculated based on ups/qty')}
            {renderField('makeReady', 'Make Ready', 'input')}
            {renderField('ink', 'Ink', 'input')}
          </div>
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Coating':
      return (
        <div className="segment-grid">
          {renderSelect('coatingType', 'Coating Type', [
            { value: 'aqueous', label: 'Aqueous' },
            { value: 'uv', label: 'UV' },
            { value: 'varnish', label: 'Varnish' },
            { value: 'soft-touch', label: 'Soft Touch' }
          ])}
          {renderSelect('coatingSides', 'Coating Sides', [
            { value: '1', label: '1 Side' },
            { value: '2', label: '2 Sides' }
          ])}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Lamination':
      return (
        <div className="segment-grid">
          {renderSelect('laminationType', 'Lamination Type', [
            { value: 'gloss', label: 'Gloss' },
            { value: 'matte', label: 'Matte' },
            { value: 'soft-touch', label: 'Soft Touch' }
          ])}
          {renderSelect('laminationSides', 'Lamination Sides', [
            { value: '1', label: '1 Side' },
            { value: '2', label: '2 Sides' }
          ])}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Special Coating':
      return (
        <div className="segment-grid">
          {renderSelect('specialCoatingType', 'Special Coating Type', [
            { value: 'spotUV', label: 'Spot UV' },
            { value: 'foil', label: 'Foil Stamping' },
            { value: 'emboss', label: 'Embossing' },
            { value: 'scodex', label: 'Scodex' }
          ])}
          {renderSelect('specialCoatingSides', 'Coating Sides', [
            { value: '1', label: '1 Side' },
            { value: '2', label: '2 Sides' }
          ])}
          {renderField('machine', 'Machine', 'input', 'e.g., Scodex')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Trimming':
      return (
        <div className="segment-grid">
          {renderSelect('machine', 'Machine', [
            { value: 'polar3', label: 'Polar 3' },
            { value: 'zund', label: 'Zund' },
            { value: 'congsberg', label: 'Congsberg' }
          ])}
          {renderField('finalTrimSize', 'Final Trim Size', 'input')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Die-cut':
      return (
        <div className="segment-grid">
          {renderField('dieCost', 'Die Cost', 'input')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Fold and Glue':
      return (
        <div className="segment-grid">
          {renderField('foldingSides', 'Folding Sides', 'input')}
          {renderField('gluingSides', 'Gluing Sides', 'input')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Bindery':
      return (
        <div className="segment-grid">
          {renderSelect('binderyType', 'Type of Bindery', [
            { value: 'fold', label: 'Fold' },
            { value: 'score', label: 'Score' },
            { value: 'roundCorners', label: 'Round Corners' },
            { value: 'bundle', label: 'Bundle' },
            { value: 'holePunch', label: 'Hole Punch' },
            { value: 'grommet', label: 'Grommet' }
          ])}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    case 'Ship and Pack':
      return (
        <div className="space-y-4">
          <div className="segment-grid">
            {renderField('boxType', 'Type of Box', 'input')}
            {renderField('boxSize', 'Box/Skid Size', 'input')}
            {renderSelect('shipType', 'Ship Type', [
              { value: 'pickup', label: 'Pickup' },
              { value: 'ship', label: 'Ship' }
            ])}
          </div>
          
          {data.shipType === 'ship' && (
            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Textarea
                id="shippingAddress"
                value={data.shippingAddress || ''}
                onChange={(e) => handleChange('shippingAddress', e.target.value)}
                placeholder="Enter complete shipping address"
                rows={4}
              />
            </div>
          )}
          
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
      
    default:
      return <div>Configuration for {type} not available</div>;
  }
};

export default SegmentComponent;
