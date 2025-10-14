"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Sparkles, Crown } from "lucide-react";
import { WizardFormData } from "@/components/MultiStepWizard";
import { cn } from "@/lib/utils";

interface Step3PlanSelectionProps {
  formData: WizardFormData;
  setFormData: React.Dispatch<React.SetStateAction<WizardFormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3PlanSelection: React.FC<Step3PlanSelectionProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelectPlan = (plan: "pro" | "free") => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const isPlanSelected = (plan: "pro" | "free") => formData.plan === plan;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
        Choisissez votre plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan Card */}
        <Card
          className={cn(
            "flex flex-col border-2",
            isPlanSelected("free") ? "border-blue-600 dark:border-blue-400 shadow-lg" : "border-gray-200 dark:border-gray-700"
          )}
        >
          <CardHeader className="text-center">
            <Crown className="h-10 w-10 mx-auto text-gray-500 dark:text-gray-400 mb-2" />
            <CardTitle className="text-3xl font-bold">Plan Gratuit</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Idéal pour démarrer</p>
          </CardHeader>
          <CardContent className="flex-grow space-y-3 p-6">
            <p className="text-center text-4xl font-extrabold text-gray-900 dark:text-white">
              500 F CFA <span className="text-lg font-normal text-gray-500 dark:text-gray-400">à la création</span>
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Site web basique</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Sous-domaine personnalisé</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Éditeur de contenu simple</li>
              <li className="flex items-center gap-2"><XCircle className="h-5 w-5 text-red-500" /> Publicités sur le site</li>
              <li className="flex items-center gap-2"><XCircle className="h-5 w-5 text-red-500" /> Support limité</li>
            </ul>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full"
              variant={isPlanSelected("free") ? "default" : "outline"}
              onClick={() => handleSelectPlan("free")}
            >
              {isPlanSelected("free") ? "Plan Gratuit Sélectionné" : "Sélectionner le Plan Gratuit"}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan Card */}
        <Card
          className={cn(
            "flex flex-col border-2",
            isPlanSelected("pro") ? "border-blue-600 dark:border-blue-400 shadow-lg" : "border-gray-200 dark:border-gray-700"
          )}
        >
          <CardHeader className="text-center">
            <Sparkles className="h-10 w-10 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle className="text-3xl font-bold">Plan Pro</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pour les professionnels</p>
          </CardHeader>
          <CardContent className="flex-grow space-y-3 p-6">
            <p className="text-center text-4xl font-extrabold text-gray-900 dark:text-white">
              1000 F CFA <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/ mois</span>
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Toutes les fonctionnalités du plan gratuit</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Pas de publicités</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Support prioritaire 24/7</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Plus de templates premium</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Intégrations avancées (futur)</li>
            </ul>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full"
              variant={isPlanSelected("pro") ? "default" : "outline"}
              onClick={() => handleSelectPlan("pro")}
            >
              {isPlanSelected("pro") ? "Plan Pro Sélectionné" : "Sélectionner le Plan Pro"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Le paiement se fera via Mobile Money (Orange Money, Moov Money, etc.) ou carte bancaire à l'étape suivante.
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button type="button" onClick={nextStep} disabled={!formData.plan}>
          Étape Suivante
        </Button>
      </div>
    </div>
  );
};

export default Step3PlanSelection;