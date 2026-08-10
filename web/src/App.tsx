import { ReactLenis } from 'lenis/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { scrollToHash, ThemeProvider } from "./components/SiteChrome";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/about";
import CareersPage from "./pages/careers";
import DocumentationPage from "./pages/Documentation";
import LicensesPage from "./pages/Licenses";
import ContactPage from "./pages/contact";
import GuidesPage from "./pages/guides";
import PrivacyPage from "./pages/privacy";
import ReleaseNotesPage from "./pages/ReleaseNotes";
import TermsPage from "./pages/terms";

const queryClient = new QueryClient();

function RouteScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const timer = window.setTimeout(() => {
            if (hash) scrollToHash(hash, "smooth");
            else window.scrollTo({ top: 0, behavior: "auto" });
        }, 40);
        return () => window.clearTimeout(timer);
    }, [hash, pathname]);

    return null;
}

const App = () => (
    <ReactLenis root>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <ThemeProvider>
                        <RouteScrollManager />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/guides" element={<GuidesPage />} />
                            <Route path="/company" element={<AboutPage />} />
                            <Route path="/careers" element={<CareersPage />} />
                            <Route path="/support" element={<ContactPage />} />
                            <Route path="/documentation" element={<DocumentationPage />} />
                            <Route path="/licenses" element={<LicensesPage />} />
                            <Route path="/release-notes" element={<ReleaseNotesPage />} />
                            <Route path="/legal/terms" element={<TermsPage />} />
                            <Route path="/legal/privacy" element={<PrivacyPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </ReactLenis>
);

export default App;
