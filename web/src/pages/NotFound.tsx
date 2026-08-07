import { ArrowUpRight, Search } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ButtonLink, Eyebrow, PageFrame, SmartLink } from "../components/SiteChrome";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <PageFrame className="page-frame--not-found">
            <section className="not-found-page" aria-labelledby="not-found-title">
                <div className="not-found-orbit" aria-hidden="true" />
                <div className="not-found-card">
                    <Search size={25} aria-hidden="true" />
                    <Eyebrow>Signal not found</Eyebrow>
                    <h1 id="not-found-title">This page<br /><span>slipped away.</span></h1>
                    <p>That address is not part of the YRecall system yet. Let’s bring you back to the place where the important things stay within reach.</p>
                    <div className="not-found-actions"><ButtonLink to="/" variant="primary">Return home <ArrowUpRight size={16} /></ButtonLink><SmartLink className="inline-link" to="/support">Contact the desk <ArrowUpRight size={15} /></SmartLink></div>
                </div>
            </section>
        </PageFrame>
    );
};

export default NotFound;
