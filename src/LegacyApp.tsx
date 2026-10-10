// The internal dashboard, exactly as it was before the revamp.
// Loaded as its own chunk so none of it weighs on the public pages.
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const LegacyApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default LegacyApp;
