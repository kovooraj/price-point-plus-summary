
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderItem } from "./PrintCalculator";

interface QuantityTableProps {
  onAddToSummary: (item: OrderItem) => void;
}

const QuantityTable: React.FC<QuantityTableProps> = ({ onAddToSummary }) => {
  // Sample data to simulate the table
  const tableData = [
    { 
      qty: 10000, 
      prepress: 1.30,
      plateCost: 4.16,
      plate: 11.46,
      printCost: 33.39,
      paper: 225.87,
      ink: 7.19,
      costCost: 0,
      cost: 0,
      laminateCost: 30.70,
      laminate: 111.98,
      spotUVCost: 0,
      spotUV: 0,
      foilCost: 0,
      foil: 0,
      magnetizeCost: 0,
      magnetize: 0,
      preCutCost: 0,
      preCut: 0,
      totalCost: 540.99,
      totalPrice: 703.28,
      currency: "CAD"
    },
    { 
      qty: 5000, 
      prepress: 1.30,
      plateCost: 4.16,
      plate: 11.46,
      printCost: 20.25,
      paper: 112.94,
      ink: 3.60,
      costCost: 0,
      cost: 0,
      laminateCost: 15.35,
      laminate: 55.99,
      spotUVCost: 0,
      spotUV: 0,
      foilCost: 0,
      foil: 0,
      magnetizeCost: 0,
      magnetize: 0,
      preCutCost: 0,
      preCut: 0,
      totalCost: 285.56,
      totalPrice: 371.23,
      currency: "CAD"
    },
    { 
      qty: 2500, 
      prepress: 1.30,
      plateCost: 4.16,
      plate: 11.46,
      printCost: 16.70,
      paper: 56.47,
      ink: 1.80,
      costCost: 0,
      cost: 0,
      laminateCost: 7.68,
      laminate: 28.00,
      spotUVCost: 0,
      spotUV: 0,
      foilCost: 0,
      foil: 0,
      magnetizeCost: 0,
      magnetize: 0,
      preCutCost: 0,
      preCut: 0,
      totalCost: 152.46,
      totalPrice: 198.20,
      currency: "CAD"
    },
    { 
      qty: 1000, 
      prepress: 1.30,
      plateCost: 4.16,
      plate: 11.46,
      printCost: 16.70,
      paper: 22.59,
      ink: 0.72,
      costCost: 0,
      cost: 0,
      laminateCost: 3.07,
      laminate: 11.20,
      spotUVCost: 0,
      spotUV: 0,
      foilCost: 0,
      foil: 0,
      magnetizeCost: 0,
      magnetize: 0,
      preCutCost: 0,
      preCut: 0,
      totalCost: 82.08,
      totalPrice: 106.70,
      currency: "CAD"
    }
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-print-primary text-white">
          <TableRow>
            <TableHead className="border-r text-white">QTY</TableHead>
            <TableHead className="border-r text-white hidden md:table-cell">Prepress ($)</TableHead>
            <TableHead className="border-r text-white hidden lg:table-cell">Plate Cost ($)</TableHead>
            <TableHead className="border-r text-white hidden lg:table-cell">Print Cost ($)</TableHead>
            <TableHead className="border-r text-white hidden lg:table-cell">Paper ($)</TableHead>
            <TableHead className="border-r text-white hidden lg:table-cell">Laminate ($)</TableHead>
            <TableHead className="border-r text-white">Total Cost ($)</TableHead>
            <TableHead className="border-r text-white">Total Price ($)</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
              <TableCell className="font-medium border-r">{row.qty.toLocaleString()}</TableCell>
              <TableCell className="border-r hidden md:table-cell">{row.prepress.toFixed(2)}</TableCell>
              <TableCell className="border-r hidden lg:table-cell">{row.plateCost.toFixed(2)}</TableCell>
              <TableCell className="border-r hidden lg:table-cell">{row.printCost.toFixed(2)}</TableCell>
              <TableCell className="border-r hidden lg:table-cell">{row.paper.toFixed(2)}</TableCell>
              <TableCell className="border-r hidden lg:table-cell">{row.laminate.toFixed(2)}</TableCell>
              <TableCell className="border-r font-medium">{row.totalCost.toFixed(2)}</TableCell>
              <TableCell className="border-r font-semibold text-print-primary">{row.totalPrice.toFixed(2)} {row.currency}</TableCell>
              <TableCell>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 hover:bg-print-success hover:text-white hover:border-print-success transition-colors"
                  onClick={() => onAddToSummary({
                    id: `${row.qty}-${Date.now()}`,
                    quantity: row.qty,
                    totalCost: row.totalCost,
                    totalPrice: row.totalPrice,
                    currency: row.currency
                  })}
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuantityTable;
