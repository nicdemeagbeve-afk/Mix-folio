import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button"; // Import Button component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Index = () => {
  const navigate = useNavigate();

  const handleStartCreation = () => {
    navigate("/select-template");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Bienvenue sur SiteExpress
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Créez votre site web professionnel en quelques minutes, sans aucune compétence technique.
        </p>
        <Button size="lg" onClick={handleStartCreation} className="px-8 py-4 text-lg">
          Commencer la création de site
        </Button>
      </div>
      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;