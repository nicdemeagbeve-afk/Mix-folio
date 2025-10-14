"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  onSelect: (id: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ id, name, description, imageUrl, onSelect }) => {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl font-semibold mb-2">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onSelect(id)} className="w-full">
          Sélectionner
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;