
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Reviews from "@/pages/Reviews";
import LegalNotice from "@/pages/LegalNotice";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import { useState } from "react";

const App = () => {
  // Initialize QueryClient inside the component to avoid SSR issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/mentions-legales" element={<LegalNotice />} />
                  <Route path="/legal-notice" element={<LegalNotice />} />
                  <Route path="/conditions" element={<Terms />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
