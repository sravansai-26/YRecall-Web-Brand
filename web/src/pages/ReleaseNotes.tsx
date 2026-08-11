import { ArrowUpRight, CalendarDays, CheckCircle2, Compass, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Eyebrow, PageFrame, Reveal, SmartLink } from "../components/SiteChrome";
import { useSEO } from "../hooks/useSEO";

const releases = [
    { version: "1.0.0", date: "August 06, 2026", label: "Public website", icon: Sparkles, summary: "A clearer front door for YRecall and the LYFSpot product story.", changes: ["Introduced the mobile-first YRecall product narrative and download handoff.", "Added dedicated guides, company, careers, support, legal, documentation, licenses, and release-note pages.", "Improved route-aware navigation, responsive layouts, accessibility labels, and metadata for search and agentic browsing."] },
    { version: "0.9.0", date: "July 18, 2026", label: "Experience foundation", icon: Compass, summary: "The first complete product story took shape around capture, context, and recall.", changes: ["Established the YRecall visual language and LYFSpot ecosystem connection.", "Added the feature explorer, founder story, guides preview, and early voice placeholders.", "Created the first responsive component system for mobile, tablet, and desktop browsers."] },
    { version: "0.1.0", date: "June 02, 2026", label: "First signal", icon: CheckCircle2, summary: "YRecall began as a simple question: what if the important things were easier to return to?", changes: ["Defined the product promise: Your life. Just recall.", "Started the first mobile product experiments around lightweight capture and dependable recall."] },
];

export default function ReleaseNotesPage() {
    useSEO({ title: "YRecall Release Notes", description: "A record of updates, improvements, and fixes to YRecall. We build deliberately.", path: "/release-notes" });
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);
    return <PageFrame>
        <section className="page-hero page-hero--careers"><div className="shell page-hero__inner"><Reveal><Eyebrow tone="lime">The build, in public</Eyebrow><h1>Release<br /><span>notes.</span></h1><p>Small, meaningful changes to the product story, website, and systems around YRecall.</p></Reveal><Reveal className="careers-aside reveal-delay-1"><div className="careers-aside__top"><CalendarDays size={20} /><span>LAST UPDATED</span></div><strong>August 06,<br />2026</strong><span>Clarity over ceremony.</span></Reveal></div></section>
        <section className="section section--release-notes"><div className="shell release-layout"><Reveal className="release-intro"><Eyebrow>Changelog</Eyebrow><h2>Progress you<br /><span>can follow.</span></h2><p>We will use this page to document shipped changes, important fixes, and the decisions that shape the YRecall experience.</p><SmartLink className="inline-link" to="/documentation">Read the documentation <ArrowUpRight size={15} /></SmartLink></Reveal><div className="release-list">{releases.map((release, index) => { const Icon = release.icon; return <Reveal className="release-card" key={release.version}><div className="release-card__marker"><span>0{index + 1}</span><i /></div><div className="release-card__content"><div className="release-card__meta"><span>YRECALL / {release.label}</span><time>{release.date}</time></div><div className="release-card__heading"><span className="release-card__icon"><Icon size={18} /></span><div><h2>Version {release.version}</h2><p>{release.summary}</p></div></div><ul>{release.changes.map((change) => <li key={change}>{change}</li>)}</ul></div></Reveal>; })}</div></div></section>
    </PageFrame>;
}
