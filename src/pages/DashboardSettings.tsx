"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Globe, Wrench, MessageCircleMore, Link as LinkIcon } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const DashboardSettings: React.FC = () => {
  const [subdomain, setSubdomain] = useState("monentreprise");
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  const handleSubdomainChange = () => {
    // In a real app, send this to backend for update
    showSuccess(`Sous-domaine mis à jour en ${subdomain}.ctcsite.com !`);
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setIsMaintenanceMode(checked);
    showSuccess(`Mode maintenance ${checked ? 'activé' : 'désactivé'} !`);
  };

  const handleCustomDomainRequest = () => {
    showSuccess("Demande de nom de domaine personnalisé envoyée ! Nous vous contacterons bientôt.");
    // In a real app, trigger a backend process or open a contact form
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Paramètres du site
      </h1>

      {/* Sous-domaine */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Votre Sous-domaine</CardTitle>
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subdomain" className="mb-2 block">Modifier votre sous-domaine</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="monentreprise"
                className="flex-grow"
              />
              <span className="text-gray-700 dark:text-gray-300">.ctcsite.com</span>
            </div>
          </div>
          <Button onClick={handleSubdomainChange} className="w-full">
            Mettre à jour le sous-domaine
          </Button>
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Mode Maintenance</CardTitle>
          <Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="maintenance-mode" className="text-gray-700 dark:text-gray-300">
            Activer le mode maintenance (votre site sera temporairement inaccessible)
          </Label>
          <Switch
            id="maintenance-mode"
            checked={isMaintenanceMode}
            onCheckedChange={handleMaintenanceToggle}
          />
        </CardContent>
      </Card>

      {/* Nom de domaine personnalisé */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Nom de Domaine Personnalisé</CardTitle>
          <LinkIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Vous voulez un nom de domaine entièrement personnalisé (ex: <span className="font-semibold">monentreprise.com</span>) ?
            Cliquez ci-dessous pour en faire la demande.
          </p>
          <Button onClick={handleCustomDomainRequest} className="w-full">
            Réserver mon nom de domaine personnalisé
          </Button>
        </CardContent>
      </Card>

      {/* Support rapide */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Support Rapide</CardTitle>
          <MessageCircleMore className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Besoin d'aide immédiate ? Contactez notre support via WhatsApp.
          </p>
          <a href="https://wa.me/22890000000" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Contacter le support WhatsApp
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;