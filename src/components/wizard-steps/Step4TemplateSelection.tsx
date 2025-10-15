"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WizardFormData } from "@/components/MultiStepWizard";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/providers/SessionContextProvider";

interface Step4TemplateSelectionProps {
  formData: WizardFormData;
  setFormData: React.Dispatch<React.SetStateAction<WizardFormData>>;
  nextStep: () => void; // Not used here, but kept for consistency
  prevStep: () => void;
  handleSubmitWizard: () => void; // This is the function to call for final submission
}

// Placeholder for templates - in a real app, this would come from a backend
const allTemplates = [
  { id: "vitrine-1", name: "Vitrine Moderne", type: "vitrine", imageUrl: "/placeholder.svg" },
  { id: "vitrine-2", name: "Vitrine Élégante", type: "vitrine", imageUrl: "/placeholder.svg" },
  { id: "portfolio-1", name: "Portfolio Créatif", type: "portfolio", imageUrl: "/placeholder.svg" },
  { id: "portfolio-2", name: "Portfolio Minimaliste", type: "portfolio", imageUrl: "/placeholder.svg" },
  { id: "ecommerce-1", name: "Boutique en Ligne", type: "ecommerce", imageUrl: "/placeholder.svg" },
  { id: "ecommerce-2", name: "E-commerce Dynamique", type: "ecommerce", imageUrl: "/placeholder.svg" },
  { id: "blog-1", name: "Blog Classique", type: "blog", imageUrl: "/placeholder.svg" },
  { id: "blog-2", name: "Blog Tech", type: "blog", imageUrl: "/placeholder.svg" },
  { id: "landing_page-1", name: "Landing Page Simple", type: "landing_page", imageUrl: "/placeholder.svg" },
  { id: "landing_page-2", name: "Landing Page Produit", type: "landing_page", imageUrl: "/placeholder.svg" },
  { id: "restaurant-1", name: "Restaurant Gastronomique", type: "restaurant", imageUrl: "/placeholder.svg" },
  { id: "restaurant-2", name: "Café Cosy", type: "restaurant", imageUrl: "/placeholder.svg" },
];

const Step4TemplateSelection: React.FC<Step4TemplateSelectionProps> = ({ formData, setFormData, prevStep, handleSubmitWizard }) => {
  const [filteredTemplates, setFilteredTemplates] = useState<typeof allTemplates>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(formData.selectedTemplateId);
  const { user } = useSession();

  useEffect(() => {
    if (formData.siteType) {
      const templates = allTemplates.filter(t => t.type === formData.siteType);
      setFilteredTemplates(templates);
      // If previously selected template is not in the new filtered list, clear selection
      if (selectedTemplate && !templates.some(t => t.id === selectedTemplate)) {
        setSelectedTemplate("");
        setFormData((prev) => ({ ...prev, selectedTemplateId: "" }));
      } else if (!selectedTemplate && templates.length > 0) {
        // Optionally auto-select the first template if none is selected
        setSelectedTemplate(templates[0].id);
        setFormData((prev) => ({ ...prev, selectedTemplateId: templates[0].id }));
      }
    } else {
      setFilteredTemplates([]);
      setSelectedTemplate("");
      setFormData((prev) => ({ ...prev, selectedTemplateId: "" }));
    }
  }, [formData.siteType, selectedTemplate, setFormData]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData((prev) => ({ ...prev, selectedTemplateId: templateId }));
  };

  const handleFinalSubmit = async () => {
    if (!selectedTemplate) {
      showError("Veuillez sélectionner un template avant de continuer.");
      return;
    }
    if (!user) {
      showError("Vous devez être connecté pour créer un site.");
      return;
    }

    // The actual site creation (DB insert + Edge Function call) is now handled by handleSubmitWizard from parent
    handleSubmitWizard();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
        Choisissez votre template
      </h2>

      {!formData.siteType && (
        <p className="text-center text-red-500">Veuillez d'abord sélectionner un type de site à l'étape 1.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-y-auto p-2">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={cn(
                "cursor-pointer border-2 transition-all duration-200 relative",
                selectedTemplate === template.id
                  ? "border-blue-600 dark:border-blue-400 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 hover:shadow-md"
              )}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <img src={template.imageUrl} alt={template.name} className="w-full h-32 object-cover rounded-t-lg" />
              <CardContent className="p-4 text-center">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{template.name}</CardTitle>
              </CardContent>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-600 dark:bg-blue-400 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </Card>
          ))
        ) : (
          formData.siteType && <p className="text-center text-gray-600 dark:text-gray-400 col-span-2">Aucun template disponible pour ce type de site pour le moment.</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button type="button" onClick={handleFinalSubmit} disabled={!selectedTemplate}>
          Valider et Générer mon site
        </Button>
      </div>
    </div>
  );
};

export default Step4TemplateSelection;