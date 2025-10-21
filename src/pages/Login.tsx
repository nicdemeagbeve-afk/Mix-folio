"use client";

import React from 'react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Connexion
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          La fonctionnalité de connexion est actuellement désactivée car Supabase a été retiré du projet.
        </p>
        <Button onClick={() => navigate('/')} className="w-full">
          Retour à l'accueil
        </Button>
      </div>
      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Login;