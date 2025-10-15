"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Settings, Clock, Users, TrendingUp, CheckCircle, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/providers/SessionContextProvider";
import { showError } from "@/utils/toast";

interface SiteData {
  id: string;
  subdomain: string;
  title: string;
  description: string;
  status: string;
  last_updated_at: string;
  cover_image_url?: string;
  // Add other relevant fields
}

const DashboardOverview: React.FC = () => {
  const { user } = useSession();
  const navigate = useNavigate();

  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      if (!user) {
        showError("Vous devez être connecté pour voir le tableau de bord.");
        navigate('/login');
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }) // Get the most recent site
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error("Error fetching site data for overview:", error);
        showError("Erreur lors du chargement des données de votre site.");
        setIsLoading(false);
        return;
      }

      if (data) {
        setSiteData(data);
      } else {
        showError("Aucun site trouvé. Veuillez créer un site d'abord.");
        // Optionally redirect to the wizard if no site exists
        // navigate('/wizard');
      }
      setIsLoading(false);
    };

    fetchSiteData();
  }, [user, navigate]);

  // Placeholder data for stats (can be fetched from backend later)
  const visitorsThisMonth = 1250;
  const pointsRemaining = 500;
  const siteCompletion = 80; // Example for progress bar

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-700 dark:text-gray-300">
        Chargement de la vue d'ensemble...
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Bienvenue ! Il semble que vous n'ayez pas encore de site.
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Commencez dès maintenant à créer votre site web professionnel en quelques minutes.
        </p>
        <Link to="/dashboard/customize"> {/* Link to customize which can lead to wizard */}
          <Button size="lg">Créer mon premier site</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Vue d'ensemble de votre site
      </h1>

      {/* Section 1 - Vue rapide du site */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-semibold">Votre Site Web</CardTitle>
          <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="col-span-1">
            <img src={siteData.cover_image_url || "/placeholder.svg"} alt="Aperçu du site" className="w-full h-40 object-cover rounded-md border border-gray-200 dark:border-gray-700" />
          </div>
          <div className="col-span-2 space-y-4">
            <div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Nom du site : <span className="font-bold text-blue-600 dark:text-blue-400">{siteData.subdomain}.ctcsite.com</span></p>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Statut : <span className="font-bold text-green-600 dark:text-green-400">✅ {siteData.status}</span></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`https://${siteData.subdomain}.ctcsite.com`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Voir mon site
                </Button>
              </a>
              <Link to={`/editor/${siteData.subdomain}`}>
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" /> Modifier
                </Button>
              </Link>
              <Link to="/dashboard/settings">
                <Button variant="secondary" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Gérer
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 - Infos principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dernière mise à jour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(siteData.last_updated_at).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visiteurs ce mois</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorsThisMonth}</div>
            <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédits restants</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pointsRemaining}</div>
            <p className="text-xs text-muted-foreground">Utilisés pour les fonctionnalités premium</p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de progression */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Progression de votre site</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Ton site est prêt à {siteCompletion}%. Ajoute ton logo pour le compléter.
          </p>
          <ProgressBar currentStep={siteCompletion / 20} totalSteps={5} />
        </CardContent>
      </Card>

      {/* Section 3 - Actions suggérées */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Actions Suggérées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-gray-700 dark:text-gray-300">Ajoute une photo de couverture</p>
            <Link to={`/editor/${siteData.subdomain}`}><Button variant="outline" size="sm">Faire maintenant</Button></Link>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-gray-700 dark:text-gray-300">Rédige la description de ton activité</p>
            <Link to={`/editor/${siteData.subdomain}`}><Button variant="outline" size="sm">Faire maintenant</Button></Link>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-gray-700 dark:text-gray-300">Active ton bouton WhatsApp</p>
            <Link to={`/editor/${siteData.subdomain}`}><Button variant="outline" size="sm">Faire maintenant</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;