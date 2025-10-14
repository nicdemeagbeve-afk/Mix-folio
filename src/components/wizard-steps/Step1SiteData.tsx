"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WizardFormData } from "@/components/MultiStepWizard";

interface Step1SiteDataProps {
  formData: WizardFormData;
  setFormData: React.Dispatch<React.SetStateAction<WizardFormData>>;
  nextStep: () => void;
}

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères." }),
  activityDescription: z.string().min(10, { message: "Veuillez décrire votre activité en quelques mots (minimum 10 caractères)." }),
  siteType: z.enum(["vitrine", "portfolio", "ecommerce", "blog", "landing_page", "restaurant"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de site." }),
  }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: "Format de couleur invalide." }),
});

type Step1FormData = z.infer<typeof formSchema>;

const Step1SiteData: React.FC<Step1SiteDataProps> = ({ formData, setFormData, nextStep }) => {
  const form = useForm<Step1FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: formData.companyName,
      activityDescription: formData.activityDescription,
      siteType: formData.siteType,
      primaryColor: formData.primaryColor,
    },
  });

  const onSubmit = (data: Step1FormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
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
        Étape Suivante
      </Button>
    </form>
  );
};

export default Step1SiteData;