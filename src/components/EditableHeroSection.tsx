"use client";

import React from "react";

interface EditableHeroSectionProps {
  title: string;
  description: string;
  primaryColor: string;
}

const EditableHeroSection: React.FC<EditableHeroSectionProps> = ({ title, description, primaryColor }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full" style={{ backgroundColor: primaryColor }}>
      <h2 className="text-5xl font-bold text-white mb-4">{title}</h2>
      <p className="text-xl text-white max-w-2xl">{description}</p>
    </div>
  );
};

export default EditableHeroSection;