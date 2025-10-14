"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import ServicesSection from "@/components/ServicesSection"; // New import
import ContactFormSection from "@/components/ContactFormSection"; // New import
import { CheckCircle, Shield, DollarSign, FormInput, Brain, Rocket, Globe, HardDrive, Wrench, Layout, Smartphone, MessageCircleMore, Star, Users, MapPin, Share2, Camera, Zap, TrendingUp, Lightbulb } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartWizard = () => {
    navigate("/dashboard"); // Changed from /wizard to /dashboard
  };

  const faqItems = [
    {
      question: "Est-ce vraiment automatique ?",
      answer: "Oui, absolument ! Après avoir rempli un court formulaire, notre système basé sur l'IA génère et met en ligne votre site web professionnel en moins de 5 minutes, sans aucune intervention manuelle de votre part."
    },
    {
      question: "Puis-je avoir un nom de domaine personnalisé ?",
      answer: "Pour 1000 F CFA, vous obtenez un sous-domaine personnalisé (ex: monentreprise.ctcsite.com). Si vous souhaitez un nom de domaine entièrement personnalisé (ex: monentreprise.com), nous pouvons vous accompagner pour l'acquérir et le configurer moyennant des frais supplémentaires."
    },
    {
      question: "Puis-je modifier mon site après ?",
      answer: "Oui, bien sûr ! Une fois votre site en ligne, vous aurez accès à un éditeur simple et intuitif pour modifier les textes, les images et les couleurs à tout moment, sans avoir besoin de compétences techniques."
    },
    {
      question: "Comment payer les 1000 F ?",
      answer: "Le paiement de 1000 F CFA par mois se fait via des méthodes de paiement mobile locales (Orange Money, Moov Money, etc.) ou par carte bancaire. Les détails vous seront fournis lors de la finalisation de votre commande."
    },
    {
      question: "Que se passe-t-il si j’ai besoin d’aide ?",
      answer: "Notre support client est disponible et réactif via WhatsApp pour répondre à toutes vos questions et vous assister en cas de besoin. Nous sommes là pour vous accompagner à chaque étape."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 text-center bg-blue-600 dark:bg-blue-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Ton site web en <span className="text-yellow-300">5 minutes</span>. Ton business en ligne démarre aujourd’hui — pour seulement <span className="text-yellow-300">1000 F CFA</span> !
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Aucun code, aucune compétence technique. On s’occupe de tout : nom, hébergement, maintenance et design automatique.
          </p>
          <Button
            size="lg"
            onClick={handleStartWizard}
            className="px-10 py-6 text-xl font-semibold bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up delay-400"
          >
            Créer mon site maintenant
          </Button>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm md:text-base animate-fade-in-up delay-600">
            <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5" /> Sécurisé
            </span>
            <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" /> Garantie satisfaction
            </span>
            <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <MessageCircleMore className="h-5 w-5" /> Support 24h/7
            </span>
          </div>
        </div>
        {/* Placeholder for illustration */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-700 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500 to-transparent opacity-20"></div>
      </section>

      {/* How it works? (3 simple steps) */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          En 3 étapes simples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-100 mb-4">
              <FormInput className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-semibold mb-3">1. Tu remplis un court formulaire</CardTitle>
            <CardContent className="text-gray-700 dark:text-gray-300 p-0">
              Nom, activité, couleurs — et c’est tout !
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100 mb-4">
              <Brain className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-semibold mb-3">2. Notre IA crée ton site automatiquement</CardTitle>
            <CardContent className="text-gray-700 dark:text-gray-300 p-0">
              Design, structure, textes et images adaptés à ton activité.
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-100 mb-4">
              <Rocket className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-semibold mb-3">3. Ton site est en ligne en moins de 5 minutes</CardTitle>
            <CardContent className="text-gray-700 dark:text-gray-300 p-0">
              Avec ton propre sous-domaine (ex: tonnom.ctcsite.com)
            </CardContent>
          </Card>
        </div>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-8">
          Et si tu veux, tu peux le modifier toi-même quand tu veux — sans rien casser.
        </p>
      </section>

      {/* New Services Section */}
      <ServicesSection />

      {/* What you get for 1000 F CFA */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-inner mt-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Ce que tu obtiens pour <span className="text-blue-600 dark:text-blue-400">1000 F CFA</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={<Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />} title="Sous-domaine personnalisé" description="tonnom.ctcsite.com" />
          <FeatureCard icon={<HardDrive className="h-8 w-8 text-blue-600 dark:text-blue-400" />} title="Hébergement sécurisé" description="Serveurs rapides, 99% uptime" />
          <FeatureCard icon={<Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />} title="Maintenance incluse" description="Mises à jour, sécurité, support" />
          <FeatureCard icon={<Layout className="h-8 w-8 text-blue-600 dark:text-blue-400" />} title="Design automatique" description="Choisi selon ton secteur" />
          <FeatureCard icon={<Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />} title="Site responsive" description="Adapté à téléphone, tablette, PC" />
          <FeatureCard icon={<Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />} title="Contenu intelligent" description="Textes générés pour ton activité" />
        </div>
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={handleStartWizard}
            className="px-10 py-5 text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Je lance mon site pour 1000 F maintenant
          </Button>
        </div>
      </section>

      {/* Why trust us? */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Pourquoi nous faire confiance ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TrustPoint icon={<CheckCircle className="h-6 w-6 text-green-500" />} text="+300 sites déjà créés en Afrique de l’Ouest" />
          <TrustPoint icon={<Shield className="h-6 w-6 text-blue-500" />} text="Hébergement local rapide et sécurisé" />
          <TrustPoint icon={<DollarSign className="h-6 w-6 text-yellow-500" />} text="Aucun abonnement caché — 1000 F une seule fois" />
          <TrustPoint icon={<MessageCircleMore className="h-6 w-6 text-green-500" />} text="Support réactif sur WhatsApp" />
          <TrustPoint icon={<Brain className="h-6 w-6 text-purple-500" />} text="Système 100 % automatisé basé sur l’IA" />
          <TrustPoint icon={<Users className="h-6 w-6 text-orange-500" />} text="Créé par une équipe locale passionnée du numérique" />
        </div>
        {/* Placeholder for illustration */}
        <div className="mt-12 text-center">
          <img src="/placeholder.svg" alt="Équipe Tech Africaine" className="mx-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Examples of sites created automatically */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner mt-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Exemples de sites créés automatiquement
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SiteExample imageUrl="/placeholder.svg" title="Restaurant 'Le Gourmet'" />
          <SiteExample imageUrl="/placeholder.svg" title="Boutique 'Mode Chic'" />
          <SiteExample imageUrl="/placeholder.svg" title="Salon de Coiffure 'Beauté Divine'" />
          <SiteExample imageUrl="/placeholder.svg" title="Startup 'InnovTech'" />
          <SiteExample imageUrl="/placeholder.svg" title="Association 'Aide aux Enfants'" />
          <SiteExample imageUrl="/placeholder.svg" title="Artisan 'Créations Bois'" />
        </div>
        <div className="text-center mt-12">
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold">
            Voir la démo en direct →
          </a>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Ce que nos clients disent de nous
        </h2>
        <div className="flex justify-center items-center mb-8">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <span className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">4.9/5</span>
        </div>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">
          <span className="font-semibold text-blue-600 dark:text-blue-400">+1000 utilisateurs satisfaits</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            quote="Je n’y croyais pas, mais j’ai eu mon site en 4 minutes chrono !"
            author="Kossi, Lomé"
          />
          <TestimonialCard
            quote="Mon salon a maintenant un site web moderne sans que je touche au code."
            author="Aïcha, Cotonou"
          />
          <TestimonialCard
            quote="Une solution incroyable pour lancer son business rapidement et à moindre coût."
            author="Moussa, Abidjan"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-inner mt-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Questions fréquentes
        </h2>
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
      </section>

      {/* New Contact Form Section */}
      <ContactFormSection />

      {/* Final Call To Action */}
      <section className="w-full py-20 text-center bg-blue-600 dark:bg-blue-900 text-white mt-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8">
            Ne laisse pas ton idée dormir. Mets ton business en ligne aujourd’hui pour seulement <span className="text-yellow-300">1000 F</span> !
          </h2>
          <Button
            size="lg"
            onClick={handleStartWizard}
            className="px-12 py-6 text-xl font-semibold bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Je crée mon site maintenant
          </Button>
          {/* Placeholder for illustration */}
          <div className="mt-10">
            <img src="/placeholder.svg" alt="Smartphone affichant un site prêt" className="mx-auto rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 dark:bg-black text-gray-300 py-10 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold text-white mb-2">SiteExpress</div>
            <p className="text-sm">Création automatique de sites web pour tous.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors"><MessageCircleMore className="h-6 w-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Share2 className="h-6 w-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Camera className="h-6 w-6" /></a>
            </div>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

// Helper components for better readability
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <Card className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="mb-4">{icon}</div>
    <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
    <CardContent className="text-gray-700 dark:text-gray-300 p-0">
      {description}
    </CardContent>
  </Card>
);

const TrustPoint: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
    {icon}
    <p className="text-lg text-gray-800 dark:text-gray-200">{text}</p>
  </div>
);

const SiteExample: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => (
  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <CardContent className="p-4 text-center">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
    </CardContent>
  </Card>
);

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <Card className="p-6 bg-white dark:bg-gray-900 shadow-md">
    <CardContent className="p-0 mb-4 italic text-gray-700 dark:text-gray-300">
      "{quote}"
    </CardContent>
    <CardFooter className="p-0 font-semibold text-right text-gray-800 dark:text-gray-200">
      – {author}
    </CardFooter>
  </Card>
);

export default Index;