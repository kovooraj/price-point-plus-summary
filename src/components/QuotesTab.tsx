
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { generateQuotePDF } from "../utils/generateQuote";

interface StoredQuote {
  productConfig: any;
  orderItems: any[];
  customerDetails: {
    customerName: string;
    companyName: string;
    quoteNumber: string;
  };
  notes?: string;
  date: string;
  timestamp: string;
  quoteNumber: string;
}

const QuotesTab: React.FC = () => {
  const [quotes, setQuotes] = useState<StoredQuote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load quotes from localStorage
    const storedQuotes = JSON.parse(localStorage.getItem("printCalculatorQuotes") || "[]");
    setQuotes(storedQuotes);
  }, []);

  const filteredQuotes = quotes.filter(quote => 
    quote.customerDetails.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.customerDetails.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadQuote = (quote: StoredQuote) => {
    generateQuotePDF({
      productConfig: quote.productConfig,
      orderItems: quote.orderItems,
      customerDetails: quote.customerDetails,
      notes: quote.notes,
      date: quote.date,
    });
  };

  const handleDeleteQuote = (quoteNumber: string) => {
    const updatedQuotes = quotes.filter(q => q.quoteNumber !== quoteNumber);
    setQuotes(updatedQuotes);
    localStorage.setItem("printCalculatorQuotes", JSON.stringify(updatedQuotes));
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="p-4">
        <h2 className="text-2xl font-bold text-print-primary mb-4">Quote History</h2>
        
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search quotes by customer, company or quote number..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredQuotes.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Quote #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => {
                const totalAmount = quote.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
                const currency = quote.orderItems.length > 0 ? quote.orderItems[0].currency : "CAD";
                
                return (
                  <TableRow key={quote.quoteNumber}>
                    <TableCell>{new Date(quote.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>{quote.quoteNumber}</TableCell>
                    <TableCell>{quote.customerDetails.customerName}</TableCell>
                    <TableCell>{quote.customerDetails.companyName || "-"}</TableCell>
                    <TableCell>{quote.productConfig.productType}</TableCell>
                    <TableCell>
                      {currency} {totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDownloadQuote(quote)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => handleDeleteQuote(quote.quoteNumber)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-gray-500">No quotes found</p>
            {searchTerm ? (
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search criteria
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                Generate quotes from the calculator tabs
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuotesTab;
