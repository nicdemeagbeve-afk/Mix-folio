"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircleMore, BookOpen, Video } from "lucide-react";

const faqItems = [
  {
    question: "Comment modifier le texte de mon site ?",
    answer: "Allez dans la section 'Personnaliser' de votre tableau de bord. Cliquez sur l'onglet 'Texte' et modifiez les champs correspondants. Les changements sont sauvegardés automatiquement."
  },
  {
    question: "Puis-je changer les couleurs de mon site ?",
    answer: "Oui, dans la section 'Personnaliser', sous l'onglet 'Style', vous pouvez choisir les couleurs principales de votre site."
  },
  {
    question: "Comment ajouter une image ?",
    answer: "Dans la section 'Personnaliser', sous l'onglet 'Style', vous trouverez une option pour télécharger une image de couverture. D'autres options d'images seront disponibles prochainement."
  },
  {
    question: "Mon site est-il visible sur mobile ?",
    answer: "Absolument ! Tous les sites créés avec SiteExpress sont entièrement responsives et s'adaptent parfaitement à tous les écrans (mobile, tablette, ordinateur)."
  },
  {
    question: "Comment contacter le support ?",
    answer: "Vous pouvez nous contacter directement via WhatsApp en cliquant sur le bouton ci-dessous, ou en allant dans la section 'Paramètres' de votre tableau de bord."
  },
];

const DashboardHelp: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Aide & Support
      </h1>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <MessageCircleMore className="h-10 w-10 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
          <CardTitle className="text-2xl font-semibold">Besoin d'aide ? Nous sommes là 7j/7.</CardTitle>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Cliquez ci-dessous pour nous contacter directement ou explorez nos ressources.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <a href="https://wa.me/22890000000" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
              <MessageCircleMore className="h-5 w-5" /> Contacter le support WhatsApp
            </Button>
          </a>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <BookOpen className="h-5 w-5" /> Lire nos tutoriels (bientôt disponible)
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Video className="h-5 w-5" /> Voir les vidéos d'aide (bientôt disponible)
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Foire aux questions (FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHelp;