import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "./providers/SessionContextProvider"; // Import SessionContextProvider
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Wizard from "./pages/Wizard";
import Editor from "./pages/Editor";
import Login from "./pages/Login"; // Import the new Login page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider> {/* Wrap routes with SessionContextProvider */}
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Public login route */}
            <Route path="/" element={<Index />} />
            <Route path="/wizard" element={<Wizard />} />
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