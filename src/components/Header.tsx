"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSession } from '@/providers/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { user, isLoading } = useSession();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError('Erreur lors de la déconnexion : ' + error.message);
    } else {
      showSuccess('Vous avez été déconnecté.');
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          SiteExpress
        </Link>

        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        ) : (
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Accueil
            </Link>
            <Link to="/wizard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Créer un site
            </Link>
            {user ? (
              <>
                <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900">
                  Déconnexion
                </Button>
              </>
            ) : (
              !isLoading && (
                <Link to="/login">
                  <Button>Connexion</Button>
                </Link>
              )
            )}
          </nav>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6 lg:hidden">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              Accueil
            </Link>
            <Link to="/wizard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleMenu}>
              Créer un site
            </Link>
            {user ? (
              <Button onClick={() => { handleLogout(); toggleMenu(); }} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900">
                Déconnexion
              </Button>
            ) : (
              !isLoading && (
                <Link to="/login" onClick={toggleMenu}>
                  <Button className="w-full">Connexion</Button>
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;