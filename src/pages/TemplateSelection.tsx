"use client";

import React from "react";
import TemplateCard from "@/components/TemplateCard";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast"; // Import showSuccess instead of toast

// Dummy data for templates
const templates = [
  {
    id: "1",
    name: "Site Vitrine Moderne",
    description: "Un design épuré et moderne, idéal pour présenter votre entreprise ou vos services.",
    imageUrl: "https://via.placeholder.com/400x250/AEC6CF/FFFFFF?text=Template+1",
  },
  {
    id: "2",
    name: "Portfolio Créatif",
    description: "Mettez en valeur vos projets et votre travail avec ce modèle de portfolio élégant.",
    imageUrl: "https://via.placeholder.com/400x250/FFD700/FFFFFF?text=Template+2",
  },
  {
    id: "3",
    name: "Blog Minimaliste",
    description: "Un design simple et clair pour partager vos articles et vos idées.",
    imageUrl: "https://via.placeholder.com/400x250/98FB98/FFFFFF?text=Template+3",
  },
  {
    id: "4",
    name: "E-commerce Élégant",
    description: "Lancez votre boutique en ligne avec ce modèle sophistiqué et fonctionnel.",
    imageUrl: "https://via.placeholder.com/400x250/DDA0DD/FFFFFF?text=Template+4",
  },
  {
    id: "5",
    name: "Page d'atterrissage (Landing Page)",
    description: "Capturez l'attention de vos visiteurs avec une page d'atterrissage optimisée pour la conversion.",
    imageUrl: "https://via.placeholder.com/400x250/ADD8E6/FFFFFF?text=Template+5",
  },
  {
    id: "6",
    name: "Restaurant / Café",
    description: "Présentez votre menu, vos horaires et votre ambiance avec ce modèle dédié à la restauration.",
    imageUrl: "https://via.placeholder.com/400x250/F08080/FFFFFF?text=Template+6",
  },
];

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (id: string) => {
    showSuccess(`Modèle "${templates.find(t => t.id === id)?.name}" sélectionné !`); // Use showSuccess
    // Navigate to the editor page with the selected template ID
    navigate(`/editor/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl w-full text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Choisissez votre modèle de site
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Parcourez notre collection de designs professionnels et sélectionnez celui qui correspond le mieux à votre projet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            name={template.name}
            description={template.description}
            imageUrl={template.imageUrl}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default TemplateSelection;