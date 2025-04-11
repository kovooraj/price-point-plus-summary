
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-print-primary py-[19px]">{title}</h1>
      <Card className="my-8 py-16">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <Clock className="h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-medium mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            We're working hard to bring you this feature. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;
