"use client";

import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EditableHeroSection from "@/components/EditableHeroSection";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";

interface TemplateData {
  id: string;
  title: string;
  description: string;
  primaryColor: string;
  // Add other template-specific properties here as needed
}

const Editor: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("Bienvenue sur votre nouveau site !");
  const [description, setDescription] = useState("Personnalisez ce contenu pour refléter votre marque et vos services.");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // Default blue color

  useEffect(() => {
    const templateData = location.state?.templateData as TemplateData | undefined;

    if (templateData) {
      setTitle(templateData.title);
      setDescription(templateData.description);
      setPrimaryColor(templateData.primaryColor);
      showSuccess(`Modèle "${templateData.id}" chargé avec les données pré-remplies !`);
    } else if (templateId) {
      // If accessed directly via URL with templateId but no state,
      // in a real app, you would fetch template data from backend using templateId.
      // For now, we'll just log and use default values.
      console.warn(`Editor accessed with templateId ${templateId} but no pre-filled state. Using default content.`);
      showError("Impossible de charger les données pré-remplies. Contenu par défaut affiché.");
    } else {
      // If accessed directly without any ID or state
      console.warn("Editor accessed without templateId or pre-filled state. Using default content.");
      showError("Accès direct à l'éditeur sans modèle. Contenu par défaut affiché.");
    }
  }, [templateId, location.state]);

  const handleSaveChanges = () => {
    // In a real app, you would send these changes to the backend
    console.log("Saving changes:", { title, description, primaryColor });
    showSuccess("Modifications sauvegardées avec succès !");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-60px)]">
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
              <div className="w-full h-full border border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <EditableHeroSection title={title} description={description} primaryColor={primaryColor} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full flex-col justify-between p-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Éditeur de Contenu
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="mb-2 block">Titre Principal</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Entrez le titre de votre site"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="mb-2 block">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Entrez une description pour votre site"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryColor" className="mb-2 block">Couleur Principale</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button onClick={handleSaveChanges} className="w-full">
                  Sauvegarder les modifications
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Editor;