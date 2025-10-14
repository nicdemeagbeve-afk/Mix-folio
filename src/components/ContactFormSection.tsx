"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactFormSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future backend integration
    alert("Message envoyé ! (Fonctionnalité d'envoi réelle à implémenter avec le backend)");
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-lg mt-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Contactez-nous
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Vous avez des questions, des suggestions ou besoin d'assistance ? N'hésitez pas à nous contacter. Notre équipe est là pour vous aider.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <a href="mailto:contact@ctcsite.com" className="hover:underline">contact@ctcsite.com</a>
            </div>
            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
              <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <a href="tel:+22890000000" className="hover:underline">+228 90 00 00 00</a>
            </div>
            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Lomé, Togo</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <div>
            <Label htmlFor="name" className="mb-2 block">Votre Nom</Label>
            <Input id="name" placeholder="Votre nom complet" required />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">Votre Email</Label>
            <Input id="email" type="email" placeholder="votre.email@exemple.com" required />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2 block">Votre Message</Label>
            <Textarea id="message" placeholder="Écrivez votre message ici..." rows={5} required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Envoyer le Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;