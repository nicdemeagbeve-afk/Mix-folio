"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Settings, Clock, Users, TrendingUp, CheckCircle, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar"; // Assuming this is the wizard progress bar, can be adapted

const DashboardOverview: React.FC = () => {
  // Placeholder data - in a real app, this would come from a backend
  const siteName = "monentreprise.ctcsite.com";
  const siteStatus = "En ligne"; // or "Mise à jour en cours"
  const lastUpdate = "2023-10-27 14:30";
  const visitorsThisMonth = 1250;
  const pointsRemaining = 500; // Example for gamification
  const siteCompletion = 80; // Example for progress bar

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
            <img src="/placeholder.svg" alt="Aperçu du site" className="w-full h-40 object-cover rounded-md border border-gray-200 dark:border-gray-700" />
          </div>
          <div className="col-span-2 space-y-4">
            <div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Nom du site : <span className="font-bold text-blue-600 dark:text-blue-400">{siteName}</span></p>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Statut : <span className="font-bold text-green-600 dark:text-green-400">✅ {siteStatus}</span></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> Voir mon site
              </Button>
              <Link to="/dashboard/customize">
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
            <div className="text-2xl font-bold">{lastUpdate}</div>
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
          {/* Using ProgressBar from wizard, can be simplified or replaced if needed */}
          <ProgressBar currentStep={siteCompletion / 20} totalSteps={5} /> {/* Example: 5 steps, each 20% */}
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
            <Button variant="outline" size="sm">Faire maintenant</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-gray-700 dark:text-gray-300">Rédige la description de ton activité</p>
            <Button variant="outline" size="sm">Faire maintenant</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-gray-700 dark:text-gray-300">Active ton bouton WhatsApp</p>
            <Button variant="outline" size="sm">Faire maintenant</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;