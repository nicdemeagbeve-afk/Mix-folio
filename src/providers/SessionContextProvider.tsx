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
        console.log('Auth state change event:', event);
        console.log('Current session:', currentSession);
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if (event === 'SIGNED_IN') {
          showSuccess('Connexion réussie !');
          if (location.pathname === '/login') {
            console.log('Redirecting from /login to / after SIGNED_IN');
            navigate('/');
          }
        } else if (event === 'SIGNED_OUT') {
          showSuccess('Déconnexion réussie.');
          if (location.pathname !== '/login') {
            console.log('Redirecting to /login after SIGNED_OUT');
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
      console.log('Initial session check:', initialSession);
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false);
      if (!initialSession && location.pathname !== '/login') {
        console.log('No initial session, redirecting to /login');
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Protect routes
  useEffect(() => {
    console.log('Route protection useEffect running. User:', user?.id, 'isLoading:', isLoading, 'Path:', location.pathname);
    if (!isLoading) {
      const protectedRoutes = ['/', '/wizard', '/editor'];
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname === route || (route.endsWith('/') && location.pathname.startsWith(route))
      );

      if (isProtectedRoute && !user) {
        console.log('Protected route and no user. Redirecting to /login.');
        showError('Vous devez être connecté pour accéder à cette page.');
        navigate('/login');
      } else if (user && location.pathname === '/login') {
        console.log('User logged in and on /login. Redirecting to /.');
        navigate('/');
      }
    }
  }, [user, isLoading, location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Chargement de la session...
      </div>
    );
  }

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