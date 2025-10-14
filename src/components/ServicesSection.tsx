"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Code, Cloud, Smartphone, Palette, Rocket } from "lucide-react";

const services = [
  {
    icon: <Layout className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Design Professionnel",
    description: "Des templates modernes et adaptés à chaque secteur d'activité, conçus par des experts."
  },
  {
    icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Aucun Code Requis",
    description: "Créez votre site sans écrire une seule ligne de code, grâce à notre interface intuitive."
  },
  {
    icon: <Cloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Hébergement & SSL Inclus",
    description: "Votre site est hébergé de manière sécurisée avec un certificat SSL gratuit."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Responsive Design",
    description: "Un site magnifique et fonctionnel sur tous les appareils : mobiles, tablettes et ordinateurs."
  },
  {
    icon: <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Personnalisation Facile",
    description: "Modifiez les textes, images et couleurs de votre site à tout moment via notre éditeur."
  },
  {
    icon: <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Mise en Ligne Rapide",
    description: "Votre site est prêt et en ligne en moins de 5 minutes, pour lancer votre activité sans attendre."
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Nos Services Clés
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0 mb-4">
              <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-100">
                {service.icon}
              </div>
            </CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</CardTitle>
            <CardContent className="text-gray-700 dark:text-gray-300 p-0">
              {service.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;