import { ReactLenis } from 'lenis/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { scrollToHash, ThemeProvider } from "./components/SiteChrome";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutPage = lazy(() => import("./pages/about"));
const CareersPage = lazy(() => import("./pages/careers"));
const DocumentationPage = lazy(() => import("./pages/Documentation"));
const LicensesPage = lazy(() => import("./pages/Licenses"));
const ContactPage = lazy(() => import("./pages/contact"));
const GuidesPage = lazy(() => import("./pages/guides"));
const PrivacyPage = lazy(() => import("./pages/privacy"));
const ReleaseNotesPage = lazy(() => import("./pages/ReleaseNotes"));
const TermsPage = lazy(() => import("./pages/terms"));

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

const FallbackLoader = () => (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-bg)", color: "var(--color-text-muted)" }}>
        Loading...
    </div>
);

const App = () => (
    <ReactLenis root>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <ThemeProvider>
                        <RouteScrollManager />
                        <Suspense fallback={<FallbackLoader />}>
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
                        </Suspense>
                    </ThemeProvider>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </ReactLenis>
);

export default App;
