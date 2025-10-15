"use client";

import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import Step1SiteData from "./wizard-steps/Step1SiteData";
import Step2PersonalData from "./wizard-steps/Step2PersonalData";
import Step3PlanSelection from "./wizard-steps/Step3PlanSelection";
import Step4TemplateSelection from "./wizard-steps/Step4TemplateSelection";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client"; // Import supabase client
import { useSession } from "@/providers/SessionContextProvider"; // Import useSession

export interface WizardFormData {
  companyName: string;
  activityDescription: string;
  siteType: "vitrine" | "portfolio" | "ecommerce" | "blog" | "landing_page" | "restaurant" | undefined;
  primaryColor: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  plan: "pro" | "free" | undefined;
  selectedTemplateId: string;
  subdomain: string;
}

const TOTAL_STEPS = 4;

const MultiStepWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({
    companyName: "",
    activityDescription: "",
    siteType: undefined,
    primaryColor: "#3b82f6",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    plan: undefined,
    selectedTemplateId: "",
    subdomain: "",
  });
  const navigate = useNavigate();
  const { user } = useSession(); // Get the current user from session

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitWizard = async () => {
    if (!user) {
      showError("Vous devez être connecté pour créer un site.");
      navigate('/login');
      return;
    }

    showSuccess("Génération de votre site en cours...");

    try {
      // Call the Supabase Edge Function to generate the site
      const { data, error } = await supabase.functions.invoke('generate-site', {
        body: JSON.stringify({
          ...formData,
          userId: user.id, // Pass user ID to the Edge Function
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await supabase.auth.getSession().then(s => s.data.session?.access_token)}`
        }
      });

      if (error) {
        console.error("Error invoking generate-site function:", error);
        showError("Erreur lors de la génération de votre site : " + error.message);
        return;
      }

      // Assuming the Edge Function returns the new site's ID or URL
      const responseData = data as { message: string; url?: string; siteId?: string };
      showSuccess(responseData.message || "Votre site a été généré avec succès !");

      // After successful generation, navigate to the editor with the new site's ID
      // For now, we'll use the subdomain as a unique identifier for the editor route
      // In a real app, you'd get the actual site ID from the Edge Function response
      navigate(`/editor/${formData.subdomain}`);

    } catch (error) {
      console.error("Unexpected error during site generation:", error);
      showError("Une erreur inattendue est survenue lors de la génération du site.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1SiteData formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Step2PersonalData formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3PlanSelection formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4TemplateSelection formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} handleSubmitWizard={handleSubmitWizard} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl w-full">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Création de votre site
      </h1>
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      {renderStep()}
    </div>
  );
};

export default MultiStepWizard;