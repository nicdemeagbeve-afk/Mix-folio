"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EditableHeroSection from "@/components/EditableHeroSection";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/providers/SessionContextProvider";

interface SiteData {
  id: string;
  title: string;
  description: string;
  primary_color: string;
  subdomain: string;
  cover_image_url?: string;
  whatsapp_link?: string;
  facebook_link?: string;
  // Add other site-specific properties here as needed
}

const Editor: React.FC = () => {
  const { templateId: subdomainParam } = useParams<{ templateId: string }>(); // Renamed to subdomainParam
  const navigate = useNavigate();
  const { user } = useSession();

  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [title, setTitle] = useState("Chargement...");
  const [description, setDescription] = useState("Chargement du contenu...");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [coverImageUrl, setCoverImageUrl] = useState("/placeholder.svg");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      if (!user) {
        showError("Vous devez être connecté pour éditer un site.");
        navigate('/login');
        return;
      }
      if (!subdomainParam) {
        showError("Aucun site spécifié pour l'édition.");
        navigate('/dashboard');
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('subdomain', subdomainParam)
        .eq('user_id', user.id) // Ensure user owns the site
        .single();

      if (error) {
        console.error("Error fetching site data:", error);
        showError("Erreur lors du chargement des données du site.");
        navigate('/dashboard'); // Redirect to dashboard if site not found or error
        return;
      }

      if (data) {
        setSiteData(data);
        setTitle(data.title || "Bienvenue sur votre nouveau site !");
        setDescription(data.description || "Personnalisez ce contenu pour refléter votre marque et vos services.");
        setPrimaryColor(data.primary_color || "#3b82f6");
        setCoverImageUrl(data.cover_image_url || "/placeholder.svg");
        setWhatsappLink(data.whatsapp_link || "");
        setFacebookLink(data.facebook_link || "");
        showSuccess(`Site "${data.title}" chargé pour édition.`);
      } else {
        showError("Site non trouvé ou vous n'avez pas les permissions.");
        navigate('/dashboard');
      }
      setIsLoading(false);
    };

    fetchSiteData();
  }, [subdomainParam, user, navigate]);

  const handleSaveChanges = async () => {
    if (!siteData || !user) {
      showError("Impossible de sauvegarder : données du site manquantes ou non connecté.");
      return;
    }

    showSuccess("Sauvegarde des modifications...");

    const { error } = await supabase
      .from('sites')
      .update({
        title: title,
        description: description,
        primary_color: primaryColor,
        cover_image_url: coverImageUrl, // Assuming this is updated via a separate upload
        whatsapp_link: whatsappLink,
        facebook_link: facebookLink,
        last_updated_at: new Date().toISOString(),
      })
      .eq('id', siteData.id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Error saving site changes:", error);
      showError("Erreur lors de la sauvegarde des modifications : " + error.message);
      return;
    }
    showSuccess("Modifications sauvegardées avec succès !");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        Chargement de l'éditeur...
      </div>
    );
  }

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
                  {/* Add fields for cover image, WhatsApp, Facebook links */}
                  <div>
                    <Label htmlFor="coverImageUrl" className="mb-2 block">URL de l'image de couverture</Label>
                    <Input
                      id="coverImageUrl"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="URL de l'image"
                    />
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