"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if (event === 'SIGNED_IN') {
          showSuccess('Connexion réussie !');
          // Redirect authenticated users away from login page
          if (location.pathname === '/login') {
            navigate('/');
          }
        } else if (event === 'SIGNED_OUT') {
          showSuccess('Déconnexion réussie.');
          // Redirect unauthenticated users to login page if they are on a protected route
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        } else if (event === 'INITIAL_SESSION') {
          // Handle initial session, no toast needed
        } else if (event === 'PASSWORD_RECOVERY') {
          showSuccess('Vérifiez votre email pour réinitialiser votre mot de passe.');
        } else if (event === 'USER_UPDATED') {
          showSuccess('Votre profil a été mis à jour.');
        }
      }
    );

    // Initial check for session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false);
      if (!initialSession && location.pathname !== '/login') {
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      const protectedRoutes = ['/', '/wizard', '/editor'];
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname === route || (route.endsWith('/') && location.pathname.startsWith(route))
      );

      if (isProtectedRoute && !user) {
        showError('Vous devez être connecté pour accéder à cette page.');
        navigate('/login');
      } else if (user && location.pathname === '/login') {
        navigate('/'); // Redirect logged-in users away from the login page
      }
    }
  }, [user, isLoading, location.pathname, navigate]);


  return (
    <SessionContext.Provider value={{ session, user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};