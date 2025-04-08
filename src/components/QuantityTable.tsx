
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
  
  // Updated quantities as per requirements
  const tableData = [
    { qty: 100, totalCost: 25.40, totalPrice: 35.56, currency: currency },
    { qty: 200, totalCost: 30.75, totalPrice: 42.50, currency: currency },
    { qty: 300, totalCost: 36.10, totalPrice: 49.40, currency: currency },
    { qty: 400, totalCost: 41.45, totalPrice: 56.30, currency: currency },
    { qty: 500, totalCost: 46.80, totalPrice: 63.20, currency: currency },
    { qty: 1000, totalCost: 82.08, totalPrice: 106.70, currency: currency },
    { qty: 1500, totalCost: 117.27, totalPrice: 152.45, currency: currency },
    { qty: 2000, totalCost: 134.85, totalPrice: 175.30, currency: currency },
    { qty: 2500, totalCost: 152.46, totalPrice: 198.20, currency: currency },
    { qty: 3000, totalCost: 170.05, totalPrice: 221.06, currency: currency },
    { qty: 5000, totalCost: 285.56, totalPrice: 371.23, currency: currency },
    { qty: 10000, totalCost: 540.99, totalPrice: 703.28, currency: currency },
    { qty: 15000, totalCost: 796.42, totalPrice: 1035.34, currency: currency },
    { qty: 20000, totalCost: 1051.85, totalPrice: 1367.40, currency: currency },
    { qty: 25000, totalCost: 1307.28, totalPrice: 1699.46, currency: currency },
    { qty: 30000, totalCost: 1562.71, totalPrice: 2031.52, currency: currency },
    { qty: 50000, totalCost: 2584.75, totalPrice: 3360.17, currency: currency },
    { qty: 100000, totalCost: 5138.47, totalPrice: 6680.01, currency: currency },
  ];

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
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell className="font-medium border-r">{row.qty.toLocaleString()}</TableCell>
                <TableCell className="border-r hidden md:table-cell">1.30</TableCell>
                <TableCell className="border-r hidden lg:table-cell">4.16</TableCell>
                <TableCell className="border-r hidden lg:table-cell">16.70</TableCell>
                <TableCell className="border-r hidden lg:table-cell">{(row.qty * 0.02259).toFixed(2)}</TableCell>
                <TableCell className="border-r hidden lg:table-cell">{(row.qty * 0.0112).toFixed(2)}</TableCell>
                <TableCell className="border-r font-medium">{row.totalCost.toFixed(2)}</TableCell>
                <TableCell className="border-r font-semibold text-print-primary">{row.totalPrice.toFixed(2)} {currency}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuantityTable;
