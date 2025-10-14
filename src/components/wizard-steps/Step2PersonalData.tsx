"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WizardFormData } from "@/components/MultiStepWizard";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/providers/SessionContextProvider";
import { showSuccess, showError } from "@/utils/toast";

interface Step2PersonalDataProps {
  formData: WizardFormData;
  setFormData: React.Dispatch<React.SetStateAction<WizardFormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  phoneNumber: z.string().regex(/^\+?\d{8,15}$/, { message: "Numéro de téléphone invalide." }),
});

type Step2FormData = z.infer<typeof formSchema>;

const Step2PersonalData: React.FC<Step2PersonalDataProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const { user } = useSession();
  const form = useForm<Step2FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    },
  });

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone_number')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
          console.error("Error fetching profile:", error);
          showError("Erreur lors du chargement de votre profil.");
        } else if (data) {
          form.reset({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            phoneNumber: data.phone_number || '',
          });
          setFormData((prev) => ({
            ...prev,
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            phoneNumber: data.phone_number || '',
          }));
        }
      }
    };
    fetchProfile();
  }, [user, form, setFormData]);

  const onSubmit = async (data: Step2FormData) => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phoneNumber,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating profile:", error);
        showError("Erreur lors de la mise à jour de votre profil.");
        return;
      }
      showSuccess("Profil mis à jour avec succès !");
    }

    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="firstName" className="mb-2 block">Prénom</Label>
        <Input
          id="firstName"
          {...form.register("firstName")}
          placeholder="Votre prénom"
        />
        {form.formState.errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="lastName" className="mb-2 block">Nom</Label>
        <Input
          id="lastName"
          {...form.register("lastName")}
          placeholder="Votre nom"
        />
        {form.formState.errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phoneNumber" className="mb-2 block">Numéro de téléphone</Label>
        <Input
          id="phoneNumber"
          {...form.register("phoneNumber")}
          placeholder="Ex: +22890123456"
        />
        {form.formState.errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button type="submit">
          Étape Suivante
        </Button>
      </div>
    </form>
  );
};

export default Step2PersonalData;