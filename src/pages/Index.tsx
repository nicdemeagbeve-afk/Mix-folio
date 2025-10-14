import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, DollarSign } from "lucide-react"; // Icons for features

const Index = () => {
  const navigate = useNavigate();

  const handleStartWizard = () => {
    navigate("/wizard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 text-gray-900 dark:text-white">
      <div className="text-center max-w-4xl mx-auto py-12">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Créez votre site professionnel en <span className="text-blue-600 dark:text-blue-400">quelques minutes</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10">
          SiteExpress vous permet de lancer votre présence en ligne sans effort, sans compétences techniques et sans les tracas habituels.
        </p>

        <Button size="lg" onClick={handleStartWizard} className="px-10 py-5 text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          Commencer mon site maintenant
        </Button>
      </div>

      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Pourquoi choisir SiteExpress ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <DollarSign className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Prix Imbattable : 1000F/mois</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Oubliez les coûts cachés ! Pour seulement 1000F par mois, votre site inclut l'hébergement, le nom de domaine et la maintenance.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Simplicité et Rapidité</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Créez votre site en 5 à 15 minutes grâce à notre assistant guidé. Pas besoin de compétences techniques, pas de code à écrire.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Sécurité et Fiabilité</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Votre site est hébergé sur une infrastructure robuste et sécurisée, garantissant une disponibilité et une protection optimales.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          SiteExpress vs. IA / WordPress
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Alors que l'IA et WordPress peuvent sembler attrayants, ils viennent souvent avec des coûts cachés et des complexités :
        </p>
        <ul className="list-disc list-inside text-left text-lg text-gray-700 dark:text-gray-300 space-y-3">
          <li>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Coûts de maintenance :</span> Les sites IA/WordPress nécessitent des mises à jour régulières, des plugins payants et des correctifs de sécurité, souvent gérés par des professionnels coûteux. Avec SiteExpress, tout est inclus.
          </li>
          <li>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Nom de domaine et hébergement :</span> Ces services sont généralement facturés séparément et peuvent s'accumuler. Chez nous, ils sont intégrés dans votre abonnement unique.
          </li>
          <li>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Complexité technique :</span> WordPress demande une courbe d'apprentissage et des connaissances techniques. Les outils IA peuvent générer du contenu, mais la gestion et la personnalisation restent complexes. SiteExpress est conçu pour la simplicité absolue.
          </li>
        </ul>
        <p className="text-xl text-gray-700 dark:text-gray-300 mt-8 font-semibold">
          Avec SiteExpress, vous obtenez une solution clé en main, performante et économique, sans compromis sur la qualité.
        </p>
      </section>

      <div className="mt-12">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;