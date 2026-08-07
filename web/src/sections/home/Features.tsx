import { ArrowUpRight, ChevronRight, Clock3, DatabaseZap, Layers3, RefreshCw, Search, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading, SmartLink } from "../../components/SiteChrome";

interface FeatureItem {
    id: string;
    label: string;
    title: string;
    body: string;
    color: "teal" | "lime" | "navy" | "coral";
    icon: typeof Search;
}

const featureCatalog: FeatureItem[] = [
    { id: "capture", label: "Capture", title: "Get it out of your head, without losing the thread.", body: "Turn passing thoughts, quick tasks, and useful context into something you can trust yourself to find again.", color: "teal", icon: Search },
    { id: "organize", label: "Organize", title: "Give every idea a home that still feels effortless.", body: "Build a lightweight system around areas, projects, and moments—without becoming the project manager of your own life.", color: "lime", icon: Layers3 },
    { id: "recall", label: "Recall", title: "Return to the right thing at the right time.", body: "YRecall keeps the useful details close, so you spend less time searching and more time moving forward.", color: "navy", icon: RefreshCw },
    { id: "protect", label: "Protect", title: "A calmer system is also a more considered one.", body: "Thoughtful access, clear product boundaries, and a privacy-first foundation designed for the things you do not want to lose.", color: "coral", icon: ShieldCheck },
];

export function Features() {
    const [activeFeature, setActiveFeature] = useState<string>(featureCatalog[0].id);
    const selectedFeature: FeatureItem = featureCatalog.find((feature) => feature.id === activeFeature) ?? featureCatalog[0];
    const FeatureIcon = selectedFeature.icon;

    return (
        <section className="section section--features" id="features" aria-labelledby="features-title">
            <div className="shell">
                <Reveal><SectionHeading eyebrow="The YRecall catalog" title={<><span id="features-title">Simple on the surface.</span><br /><span className="text-teal">Deep where it counts.</span></>} body="A focused set of capabilities that work together, not a shelf of disconnected features." /></Reveal>
                <Reveal className="feature-explorer">
                    <div className="feature-tabs" role="tablist" aria-label="YRecall feature categories">
                        {featureCatalog.map((feature) => {
                            const Icon = feature.icon;
                            return <button key={feature.id} className={`feature-tab feature-tab--${feature.color} ${activeFeature === feature.id ? "is-active" : ""}`} type="button" role="tab" aria-selected={activeFeature === feature.id} onClick={() => setActiveFeature(feature.id)}><Icon size={17} /><span>{feature.label}</span><ChevronRight size={15} /></button>;
                        })}
                    </div>
                    <div className={`feature-panel feature-panel--${selectedFeature.color}`}>
                        <div className="feature-panel__visual"><div className="feature-panel__grid" /><div className="feature-icon-orb"><FeatureIcon size={44} strokeWidth={1.35} /></div><span className="orb-caption">{selectedFeature.label.toUpperCase()} / 04</span></div>
                        <div className="feature-panel__copy"><span className="panel-overline">YRECALL / {selectedFeature.label.toUpperCase()}</span><h3>{selectedFeature.title}</h3><p>{selectedFeature.body}</p><SmartLink to="/guides">Read the guide <ArrowUpRight size={15} /></SmartLink></div>
                    </div>
                </Reveal>
                <div className="feature-micro-grid">
                    <Reveal className="micro-card"><DatabaseZap size={18} /><strong>Everything has context</strong><p>Keep the link, source, note, and next step together.</p></Reveal>
                    <Reveal className="micro-card reveal-delay-1"><Clock3 size={18} /><strong>Built for real tempo</strong><p>Quick capture for now. Gentle structure for later.</p></Reveal>
                    <Reveal className="micro-card reveal-delay-2"><Smartphone size={18} /><strong>With you where you are</strong><p>Available on Android today, with iOS in progress.</p></Reveal>
                </div>
            </div>
        </section>
    );
}

export default Features;
