import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuotesTab from "@/components/QuotesTab";
const Quotes = () => {
  return <div className="container mx-auto p-4 px-[60px]">
      <h1 className="text-3xl font-bold text-print-primary py-[19px]">Quote History</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <QuotesTab />
        </CardContent>
      </Card>
    </div>;
};
export default Quotes;