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
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const navigate = useNavigate();
  const location = useLocation();

  // Define protected routes (remove '/' if home should be public)
  const protectedRoutes = ['/dashboard', '/wizard', '/editor']; // '/' retiré pour éviter redirection automatique depuis la home

  useEffect(() => {
    // Function to handle initial session and navigation
    const handleInitialSession = async () => {
      setIsLoading(true); // Ensure loading is true at the start of session check

      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false); // Set to false after initial session is determined

      // Handle initial navigation based on session
      const isProtectedRoute = protectedRoutes.some(route =>
        location.pathname === route || location.pathname.startsWith(route + '/')
      );

      if (!initialSession && isProtectedRoute && location.pathname !== '/login') {
        console.log('Initial check: No session on protected route, redirecting to /login');
        showError('Vous devez être connecté pour accéder à cette page.');
        navigate('/login', { replace: true });
      } else if (initialSession && location.pathname === '/login') {
        console.log('Initial check: User logged in and on /login, redirecting to /dashboard');
        navigate('/dashboard', { replace: true });
      }
    };

    handleInitialSession(); // Run initial session check

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state change event:', event);
        console.log('Current session:', currentSession);
        setSession(currentSession);
        setUser(currentSession?.user || null);

        const isProtectedRoute = protectedRoutes.some(route =>
          location.pathname === route || location.pathname.startsWith(route + '/')
        );

        if (event === 'SIGNED_IN') {
          showSuccess('Connexion réussie !');
          if (location.pathname === '/login' || isProtectedRoute) { // If on login or any protected route, redirect to dashboard
            console.log('SIGNED_IN: Redirecting to /dashboard');
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          showSuccess('Déconnexion réussie.');
          if (isProtectedRoute && location.pathname !== '/login') { // If on protected route and not already on login, redirect
            console.log('SIGNED_OUT: Redirecting to /login');
            navigate('/login');
          }
        } else if (event === 'PASSWORD_RECOVERY') {
          showSuccess('Vérifiez votre email pour réinitialiser votre mot de passe.');
        } else if (event === 'USER_UPDATED') {
          showSuccess('Votre profil a été mis à jour.');
        }
        // For other events like INITIAL_SESSION, we rely on the initial handleInitialSession() call
        // or the subsequent state updates to manage navigation.
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate, location.pathname]); // Depend on location.pathname to re-evaluate protection if URL changes

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