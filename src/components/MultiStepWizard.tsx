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
  subdomain: string; // Added subdomain to form data
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
    subdomain: "", // Initialize subdomain
  });
  const navigate = useNavigate();

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
    // Simulate backend call for site generation
    showSuccess("Génération de votre site...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you'd send formData to your backend
    console.log("Final Wizard Data:", formData);

    // Simulate backend response with pre-filled template data
    const generatedTemplateData = {
      id: "generated-123", // A unique ID for the generated site
      title: `Bienvenue chez ${formData.companyName} !`,
      description: `Découvrez nos services et notre expertise. ${formData.activityDescription}`,
      primaryColor: formData.primaryColor,
      // More complex template data would go here
    };

    showSuccess("Votre site a été généré avec succès !");
    navigate(`/editor/${generatedTemplateData.id}`, { state: { templateData: generatedTemplateData } });
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