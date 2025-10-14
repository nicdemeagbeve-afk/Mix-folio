"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditableHeroSection from "@/components/EditableHeroSection"; // Reusing this for preview
import { showSuccess } from "@/utils/toast";

const DashboardCustomize: React.FC = () => {
  // Placeholder for site data - in a real app, this would be fetched/managed
  const [siteTitle, setSiteTitle] = useState("Bienvenue sur votre nouveau site !");
  const [siteDescription, setSiteDescription] = useState("Personnalisez ce contenu pour refléter votre marque et vos services.");
  const [sitePrimaryColor, setSitePrimaryColor] = useState("#3b82f6"); // Default blue
  const [siteCoverImage, setSiteCoverImage] = useState("/placeholder.svg"); // Placeholder for image
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/22890000000");
  const [facebookLink, setFacebookLink] = useState("https://facebook.com/monentreprise");

  const handleSaveChanges = () => {
    // In a real app, send these changes to the backend
    console.log("Saving customization changes:", { siteTitle, siteDescription, sitePrimaryColor, siteCoverImage, whatsappLink, facebookLink });
    showSuccess("Modifications sauvegardées avec succès !");
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      {/* Site Preview Area */}
      <div className="flex-grow lg:w-3/4 p-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="w-full h-full max-h-[80vh] border border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          {/* This is a simplified preview. A real "Wix-like" editor would use an iframe or more complex rendering. */}
          <EditableHeroSection title={siteTitle} description={siteDescription} primaryColor={sitePrimaryColor} />
          {/* You could add more sections here to simulate a full page preview */}
        </div>
      </div>

      {/* Customization Panel */}
      <div className="lg:w-1/4 p-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Personnaliser votre site
        </h2>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Texte</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            {/* <TabsTrigger value="images">Images</TabsTrigger> */}
            {/* <TabsTrigger value="links">Liens</TabsTrigger> */}
          </TabsList>
          <TabsContent value="text" className="space-y-6 mt-4">
            <div>
              <Label htmlFor="siteTitle" className="mb-2 block">Titre Principal</Label>
              <Input
                id="siteTitle"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="Entrez le titre de votre site"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription" className="mb-2 block">Description</Label>
              <Textarea
                id="siteDescription"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                placeholder="Entrez une description pour votre site"
                rows={4}
              />
            </div>
          </TabsContent>
          <TabsContent value="style" className="space-y-6 mt-4">
            <div>
              <Label htmlFor="sitePrimaryColor" className="mb-2 block">Couleur Principale</Label>
              <Input
                id="sitePrimaryColor"
                type="color"
                value={sitePrimaryColor}
                onChange={(e) => setSitePrimaryColor(e.target.value)}
                className="h-10 w-full"
              />
            </div>
            {/* Placeholder for image upload */}
            <div>
              <Label htmlFor="siteCoverImage" className="mb-2 block">Image de couverture</Label>
              <Input
                id="siteCoverImage"
                type="file"
                onChange={(e) => console.log("Image selected:", e.target.files?.[0]?.name)}
                className="h-10 w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">Fichier actuel: {siteCoverImage.split('/').pop()}</p>
            </div>
            {/* Buttons & Links */}
            <div>
              <Label htmlFor="whatsappLink" className="mb-2 block">Lien WhatsApp</Label>
              <Input
                id="whatsappLink"
                value={whatsappLink}
                onChange={(e) => setWhatsappLink(e.target.value)}
                placeholder="https://wa.me/..."
              />
            </div>
            <div>
              <Label htmlFor="facebookLink" className="mb-2 block">Lien Facebook</Label>
              <Input
                id="facebookLink"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button onClick={handleSaveChanges} className="w-full">
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomize;