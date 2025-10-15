"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditableHeroSection from "@/components/EditableHeroSection";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/providers/SessionContextProvider";
import { useNavigate } from "react-router-dom";

interface SiteData {
  id: string;
  title: string;
  description: string;
  primary_color: string;
  cover_image_url?: string;
  whatsapp_link?: string;
  facebook_link?: string;
  subdomain: string;
}

const DashboardCustomize: React.FC = () => {
  const { user } = useSession();
  const navigate = useNavigate();

  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [siteTitle, setSiteTitle] = useState("Chargement...");
  const [siteDescription, setSiteDescription] = useState("Chargement du contenu...");
  const [sitePrimaryColor, setSitePrimaryColor] = useState("#3b82f6");
  const [siteCoverImage, setSiteCoverImage] = useState("/placeholder.svg");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      if (!user) {
        showError("Vous devez être connecté pour personnaliser un site.");
        navigate('/login');
        return;
      }

      setIsLoading(true);
      // Fetch the first site owned by the user for customization
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }) // Get the most recent site
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error("Error fetching site data for customization:", error);
        showError("Erreur lors du chargement des données du site.");
        setIsLoading(false);
        return;
      }

      if (data) {
        setSiteData(data);
        setSiteTitle(data.title || "Bienvenue sur votre nouveau site !");
        setSiteDescription(data.description || "Personnalisez ce contenu pour refléter votre marque et vos services.");
        setSitePrimaryColor(data.primary_color || "#3b82f6");
        setSiteCoverImage(data.cover_image_url || "/placeholder.svg");
        setWhatsappLink(data.whatsapp_link || "");
        setFacebookLink(data.facebook_link || "");
        showSuccess(`Site "${data.title}" chargé pour personnalisation.`);
      } else {
        showError("Aucun site trouvé pour personnalisation. Veuillez créer un site d'abord.");
        navigate('/dashboard'); // Redirect if no site exists
      }
      setIsLoading(false);
    };

    fetchSiteData();
  }, [user, navigate]);

  const handleSaveChanges = async () => {
    if (!siteData || !user) {
      showError("Impossible de sauvegarder : données du site manquantes ou non connecté.");
      return;
    }

    showSuccess("Sauvegarde des modifications...");

    const { error } = await supabase
      .from('sites')
      .update({
        title: siteTitle,
        description: siteDescription,
        primary_color: sitePrimaryColor,
        cover_image_url: siteCoverImage,
        whatsapp_link: whatsappLink,
        facebook_link: facebookLink,
        last_updated_at: new Date().toISOString(),
      })
      .eq('id', siteData.id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Error saving customization changes:", error);
      showError("Erreur lors de la sauvegarde des modifications : " + error.message);
      return;
    }
    showSuccess("Modifications sauvegardées avec succès !");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-700 dark:text-gray-300">
        Chargement des options de personnalisation...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      {/* Site Preview Area */}
      <div className="flex-grow lg:w-3/4 p-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="w-full h-full max-h-[80vh] border border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <EditableHeroSection title={siteTitle} description={siteDescription} primaryColor={sitePrimaryColor} />
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
            <div>
              <Label htmlFor="siteCoverImage" className="mb-2 block">URL de l'image de couverture</Label>
              <Input
                id="siteCoverImage"
                value={siteCoverImage}
                onChange={(e) => setSiteCoverImage(e.target.value)}
                placeholder="URL de l'image"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {siteCoverImage.startsWith('http') ? 'Image externe' : 'Fichier local (placeholder)'}
              </p>
            </div>
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