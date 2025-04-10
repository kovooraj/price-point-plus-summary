
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { OrderItem } from "./PrintCalculator";

interface QuantityTableProps {
  onAddToSummary: (item: OrderItem) => void;
  currency: string;
}

const QuantityTable: React.FC<QuantityTableProps> = ({ onAddToSummary, currency }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Standardized quantities across all tabs
  const standardQuantities = [100, 200, 300, 400, 500, 1000, 1500, 2000, 2500, 3000, 10000, 15000, 20000, 25000, 30000, 100000];
  
  // Sample costs and prices for each quantity (in a real app, these would be calculated)
  const tableData = standardQuantities.map(qty => {
    // Sample calculation (this would be replaced with actual calculations)
    const costFactor = qty < 1000 ? 0.254 : qty < 10000 ? 0.0821 : 0.0541;
    const markupFactor = 1.3; // 30% markup

    const totalCost = qty * costFactor;
    const totalPrice = totalCost * markupFactor;
    
    return { qty, totalCost, totalPrice, currency };
  });

  // Filter table data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return tableData;
    
    const query = searchQuery.toLowerCase();
    return tableData.filter(row => 
      row.qty.toString().includes(query) || 
      row.totalPrice.toString().includes(query)
    );
  }, [searchQuery, tableData, currency]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search quantities..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
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
              <TableHead className="border-r text-white">Unit Price ($)</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => {
              const unitPrice = (row.totalPrice / row.qty).toFixed(4);
              
              return (
                <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                  <TableCell className="font-medium border-r">{row.qty.toLocaleString()}</TableCell>
                  <TableCell className="border-r hidden md:table-cell">1.30</TableCell>
                  <TableCell className="border-r hidden lg:table-cell">4.16</TableCell>
                  <TableCell className="border-r hidden lg:table-cell">16.70</TableCell>
                  <TableCell className="border-r hidden lg:table-cell">{(row.qty * 0.02259).toFixed(2)}</TableCell>
                  <TableCell className="border-r hidden lg:table-cell">{(row.qty * 0.0112).toFixed(2)}</TableCell>
                  <TableCell className="border-r font-medium">{row.totalCost.toFixed(2)}</TableCell>
                  <TableCell className="border-r font-semibold text-print-primary">{row.totalPrice.toFixed(2)} {currency}</TableCell>
                  <TableCell className="border-r">{unitPrice}</TableCell>
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
                        currency: currency
                      })}
                    >
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuantityTable;
