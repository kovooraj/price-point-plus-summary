
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OrderNotesProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  showNotes: boolean;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes, onNotesChange, showNotes }) => {
  if (!showNotes) return null;
  
  return (
    <div className="mt-4">
      <Label htmlFor="orderNotes" className="text-md font-semibold mb-2 block">Notes / Quantity Breakdown</Label>
      <Textarea
        id="orderNotes"
        placeholder="Enter notes or quantity breakdown here..."
        className="w-full min-h-[100px]"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </div>
  );
};

export default OrderNotes;
