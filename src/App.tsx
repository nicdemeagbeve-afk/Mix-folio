import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "./providers/SessionContextProvider";
import Header from "./components/Header"; // Import the new Header component
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Wizard from "./pages/Wizard"; // Keep for now, will be deleted
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Import the new Dashboard page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider>
          <Header /> {/* Render the Header component here */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/wizard" element={<Wizard />} /> {/* This route will be removed soon */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* New Dashboard route */}
            <Route path="/editor/:templateId" element={<Editor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;