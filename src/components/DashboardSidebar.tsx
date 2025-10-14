"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Home, Settings, LayoutTemplate, Users, DollarSign, HelpCircle } from "lucide-react";

const DashboardSidebar: React.FC = () => {
  return (
    <div className="flex h-full flex-col p-4 bg-sidebar dark:bg-sidebar-background text-sidebar-foreground dark:text-sidebar-foreground border-r border-sidebar-border dark:border-sidebar-border">
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border dark:border-sidebar-border mb-6">
        <h2 className="text-2xl font-bold text-sidebar-primary dark:text-sidebar-primary-foreground">Mon Tableau de Bord</h2>
      </div>
      <nav className="flex-grow space-y-2">
        <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Home className="h-5 w-5" />
          <span>Accueil Dashboard</span>
        </Link>
        <Link to="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Settings className="h-5 w-5" />
          <span>Paramètres</span>
        </Link>
        <Link to="/dashboard/templates" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <LayoutTemplate className="h-5 w-5" />
          <span>Mes Sites</span>
        </Link>
        <Link to="/dashboard/billing" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <DollarSign className="h-5 w-5" />
          <span>Facturation</span>
        </Link>
        <Link to="/dashboard/support" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <HelpCircle className="h-5 w-5" />
          <span>Support</span>
        </Link>
      </nav>
    </div>
  );
};

export default DashboardSidebar;