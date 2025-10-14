"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showLoading, dismissToast } from "@/utils/toast";

// Define the schema for the wizard form
const formSchema = z.object({
  companyName: z.string().min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères." }),
  activityDescription: z.string().min(10, { message: "Veuillez décrire votre activité en quelques mots (minimum 10 caractères)." }),
  siteType: z.enum(["vitrine", "portfolio", "ecommerce", "blog", "landing_page", "restaurant"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de site." }),
  }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: "Format de couleur invalide." }),
});

type WizardFormData = z.infer<typeof formSchema>;

const Wizard: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<WizardFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      activityDescription: "",
      siteType: undefined, // No default selected
      primaryColor: "#3b82f6", // Default blue
    },
  });

  const onSubmit = async (data: WizardFormData) => {
    const toastId = showLoading("Génération de votre site...");

    // Simulate backend call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate backend response with pre-filled template data
    const generatedTemplateData = {
      id: "generated-123", // A unique ID for the generated site
      title: `Bienvenue chez ${data.companyName} !`,
      description: `Découvrez nos services et notre expertise. ${data.activityDescription}`,
      primaryColor: data.primaryColor,
      // More complex template data would go here
    };

    dismissToast(toastId);
    showSuccess("Votre site a été généré avec succès !");

    // Navigate to the editor page, passing the generated template data
    navigate(`/editor/${generatedTemplateData.id}`, { state: { templateData: generatedTemplateData } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Configurez votre site
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="companyName" className="mb-2 block">Nom de votre entreprise / projet</Label>
            <Input
              id="companyName"
              {...form.register("companyName")}
              placeholder="Ex: Mon Entreprise SARL"
            />
            {form.formState.errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="activityDescription" className="mb-2 block">Décrivez votre activité / projet</Label>
            <Textarea
              id="activityDescription"
              {...form.register("activityDescription")}
              placeholder="Ex: Nous sommes une agence de marketing digital spécialisée dans les PME..."
              rows={4}
            />
            {form.formState.errors.activityDescription && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.activityDescription.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="siteType" className="mb-2 block">Type de site souhaité</Label>
            <Select onValueChange={(value) => form.setValue("siteType", value as WizardFormData["siteType"])} value={form.watch("siteType")}>
              <SelectTrigger id="siteType">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vitrine">Site Vitrine</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="landing_page">Page d'atterrissage</SelectItem>
                <SelectItem value="restaurant">Restaurant / Café</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.siteType && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.siteType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="primaryColor" className="mb-2 block">Couleur principale (pour votre marque)</Label>
            <Input
              id="primaryColor"
              type="color"
              {...form.register("primaryColor")}
              className="h-10 w-full"
            />
            {form.formState.errors.primaryColor && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.primaryColor.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Générer mon site
          </Button>
        </form>
      </div>
      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Wizard;