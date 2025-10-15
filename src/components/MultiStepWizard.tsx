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

    showSuccess("Création de l'entrée du site en base de données...");

    try {
      // Insert site data into the 'sites' table
      const { data, error } = await supabase
        .from('sites')
        .insert({
          user_id: user.id,
          subdomain: formData.subdomain,
          title: formData.companyName,
          description: formData.activityDescription,
          primary_color: formData.primaryColor,
          site_type: formData.siteType,
          plan: formData.plan,
          // The 'content' column will be populated by the Edge Function
          // The 'status' and 'cover_image_url' will also be updated by the Edge Function
          content: {
            selectedTemplateId: formData.selectedTemplateId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            // Add any other data that needs to be stored in JSONB 'content'
          }
        })
        .select()
        .single();

      if (error) {
        console.error("Error inserting site data:", error);
        showError("Erreur lors de la création de l'entrée du site : " + error.message);
        return;
      }

      showSuccess("Entrée du site créée. La génération du site est en cours...");

      // After successful insertion, the database trigger will invoke the Edge Function
      // We can navigate to the editor immediately, assuming the generation will complete in the background
      navigate(`/editor/${formData.subdomain}`);

    } catch (error) {
      console.error("Unexpected error during site data insertion:", error);
      showError("Une erreur inattendue est survenue lors de la création du site.");
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