"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, LayoutTemplate, Users, DollarSign, HelpCircle, Palette, BarChart2, MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardSidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard/overview", icon: Home, title: "Tableau de bord" },
    { to: "/dashboard/customize", icon: Palette, title: "Personnaliser" },
    { to: "/dashboard/stats", icon: BarChart2, title: "Statistiques" },
    { to: "/dashboard/settings", icon: Settings, title: "Paramètres" },
    { to: "/dashboard/help", icon: MessageCircleMore, title: "Aide & Support" },
  ];

  return (
    <div className="flex h-full flex-col p-4 bg-sidebar dark:bg-sidebar-background text-sidebar-foreground dark:text-sidebar-foreground border-r border-sidebar-border dark:border-sidebar-border">
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border dark:border-sidebar-border mb-6">
        <h2 className="text-2xl font-bold text-sidebar-primary dark:text-sidebar-primary-foreground">Mon Espace Site</h2>
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
              location.pathname.startsWith(item.to)
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;