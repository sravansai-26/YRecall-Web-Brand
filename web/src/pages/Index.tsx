import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    BellRing,
    Brain,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Command,
    DatabaseZap,
    Download,
    FileText,
    FolderOpen,
    Layers3,
    LockKeyhole,
    Mail,
    MessageCircle,
    Network,
    Play,
    Plus,
    Quote,
    RefreshCw,
    Search,
    ShieldCheck,
    Sparkles,
    Smartphone,
    Workflow,
    X,
    Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
    ButtonLink,
    BUILDWITHSRAVAN_MARK,
    Eyebrow,
    LYFSPOT_MARK,
    PageFrame,
    Reveal,
    SRAVAN_PHOTO,
    YRECALL_MARK,
} from "../components/SiteChrome";
import { WhyYRecall } from "../sections/home/WhyYRecall";
import { Voice } from "../sections/home/Voice";
import { Features } from "../sections/home/Features";
import { Story } from "../sections/home/Story";
import { Download as DownloadSection, Experience, Founder, GuidePreview, Newsletter, ComparisonMatrix, Workflows } from "../sections/home";
import { FeaturedInsights } from "../sections/home/FeaturedInsights";

function ProductCanvas() {
    return (
        <div className="product-canvas" aria-label="YRecall product preview">
            <div className="canvas-orbit canvas-orbit--one" />
            <div className="canvas-orbit canvas-orbit--two" />
            <div className="product-window">
                <div className="window-topbar">
                    <span className="window-title">yrecall / today</span>
                    <span className="window-avatar">SS</span>
                </div>
                <div className="window-body">
                    <aside className="window-sidebar">
                        <div className="sidebar-mini-logo"><img src={YRECALL_MARK} alt="" /></div>
                        <div className="sidebar-line sidebar-line--active"><Command size={13} /> Overview</div>
                        <div className="sidebar-line"><FolderOpen size={13} /> Projects</div>
                        <div className="sidebar-line"><CalendarDays size={13} /> Moments</div>
                        <div className="sidebar-line"><Search size={13} /> Recall</div>
                        <div className="sidebar-spacer" />
                        <div className="sidebar-line"><LockKeyhole size={13} /> Private</div>
                    </aside>
                    <div className="window-content">
                        <div className="window-greeting"><span>Tuesday, 06 August</span><strong>Good morning, Sravan.</strong></div>
                        <div className="window-focus-card">
                            <div><span className="mini-label">Focus for now</span><strong>Bring the important into view.</strong></div>
                            <div className="focus-ring"><span>72%</span></div>
                        </div>
                        <div className="window-columns">
                            <div className="window-list-card">
                                <div className="mini-label">In motion <span>4 items</span></div>
                                <div className="task-row task-row--done"><i><Check size={10} /></i><span>Review product notes</span><b>Done</b></div>
                                <div className="task-row"><i /><span>Send the launch brief</span><b>Today</b></div>
                                <div className="task-row"><i /><span>Call family at 7:30</span><b>Later</b></div>
                            </div>
                            <div className="window-recall-card">
                                <div className="recall-card__top"><span className="mini-label">A useful recall</span><Zap size={14} /></div>
                                <p>“Make the next step smaller than the thought.”</p>
                                <span className="recall-source">Founder’s note · YRecall</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="floating-note floating-note--top"><span className="float-icon float-icon--teal"><BellRing size={15} /></span><span><b>One place.</b><small>Everything that matters.</small></span></div>
            <div className="floating-note floating-note--bottom"><span className="float-icon float-icon--lime"><CheckCircle2 size={15} /></span><span><b>Back in rhythm</b><small>3 things found today</small></span><ArrowUpRight size={14} /></div>
        </div>
    );
}

function Home() {
    const heroTitle = "Your life. Just recall.";
    const [typedTitle, setTypedTitle] = useState<string>("");

    useEffect(() => {
        const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isReducedMotion) {
            setTypedTitle(heroTitle);
            return;
        }
        let cursor = 0;
        const typingTimer = window.setInterval(() => {
            cursor += 1;
            setTypedTitle(heroTitle.slice(0, cursor));
            if (cursor >= heroTitle.length) window.clearInterval(typingTimer);
        }, 62);
        return () => window.clearInterval(typingTimer);
    }, []);

    return (
        <PageFrame>
            <section className="hero-section" aria-labelledby="hero-title">
                <div className="hero-grid" />
                <div className="shell hero-layout">
                    <Reveal className="hero-copy">
                        <div className="hero-kicker">YRecall by LYFSpot <span className="kicker-divider" /> A calmer digital system</div>
                        <h1 id="hero-title" aria-label={heroTitle}><span>{typedTitle.slice(0, 10)}</span><br /><em>{typedTitle.slice(10).trimStart()}</em><span className="typing-caret" aria-hidden="true" /></h1>
                        <p className="hero-lede">YRecall helps you capture the things that matter, organize the moving parts, and return to the right detail when it counts.</p>
                        <div className="hero-actions">
                            <ButtonLink to="/#download" variant="primary">Get the app <ArrowUpRight size={17} /></ButtonLink>
                            <ButtonLink to="/#why" variant="secondary">See how it works <ArrowDownRight size={17} /></ButtonLink>
                        </div>
                        <div className="hero-note"><ShieldCheck size={15} /> Built with thoughtful privacy and simple, human workflows.</div>
                    </Reveal>
                    <Reveal className="hero-visual reveal-delay-1"><ProductCanvas /></Reveal>
                </div>
                <Reveal className="shell hero-scroll-cue"><span>Scroll to explore</span><span className="scroll-line" /></Reveal>
            </section>

            <section className="signal-strip" aria-label="YRecall product principles">
                <div className="shell signal-strip__inner">
                    <span className="signal-intro">Designed for the space between intention and action.</span>
                    <span><Sparkles size={15} /> Less noise</span>
                    <span><Workflow size={15} /> More continuity</span>
                    <span><LockKeyhole size={15} /> Considered by design</span>
                </div>
            </section>

            <section className="brand-constellation" aria-label="YRecall ecosystem">
                <div className="shell brand-constellation__inner">
                    <span className="brand-constellation__label">A LYFSpot ecosystem / made with intent</span>
                    <div className="brand-constellation__marks">
                        <div className="ecosystem-mark ecosystem-mark--yrecall"><span><img src={YRECALL_MARK} alt="" /></span><div><strong>YRecall</strong><small>Flagship product</small></div></div>
                        <div className="ecosystem-connector" aria-hidden="true" />
                        <a className="ecosystem-mark ecosystem-mark--lyfspot" href="https://sailyfspot.blogspot.com" target="_blank" rel="noreferrer"><span><img src={LYFSPOT_MARK} alt="" /></span><div><strong>LYFSpot</strong><small>Product ecosystem</small></div><ArrowUpRight size={14} /></a>
                        <div className="ecosystem-connector" aria-hidden="true" />
                        <a className="ecosystem-mark ecosystem-mark--portfolio" href="https://buildwithsravan.dev" target="_blank" rel="noreferrer"><span><img src={BUILDWITHSRAVAN_MARK} alt="" /></span><div><strong>Build with Sravan</strong><small>Founder / portfolio</small></div><ArrowUpRight size={14} /></a>
                    </div>
                </div>
            </section>

            <WhyYRecall />

            <Workflows />

            <Experience />

            <Features />
            
            <ComparisonMatrix />

            <Voice />

            <Story />

            <GuidePreview />
            
            <FeaturedInsights />

            <Founder />

            <DownloadSection />

            <Newsletter />
        </PageFrame>
    );
}

export default Home;
