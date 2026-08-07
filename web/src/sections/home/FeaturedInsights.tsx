import { ArrowUpRight, BookOpen, Layers3, ShieldCheck } from "lucide-react";
import { Eyebrow, Reveal, SmartLink } from "../../components/SiteChrome";

const insights = [
    {
        title: "Begin with one trusted place",
        excerpt: "Use YRecall as the landing point for thoughts, tasks, references, and small pieces of context...",
        icon: BookOpen,
        link: "/documentation#getting-started",
        delay: "",
    },
    {
        title: "Capture quickly. Shape context later.",
        excerpt: "The product is intentionally designed around two speeds. Capture should take seconds...",
        icon: Layers3,
        link: "/documentation#workflow",
        delay: "reveal-delay-1",
    },
    {
        title: "Privacy and control",
        excerpt: "Your information should stay understandable. We aim to collect only what is needed...",
        icon: ShieldCheck,
        link: "/documentation#privacy",
        delay: "reveal-delay-2",
    },
];

export function FeaturedInsights() {
    return (
        <section className="section section--insights" aria-label="Featured Insights">
            <div className="shell insights-layout">
                <Reveal className="insights-header">
                    <Eyebrow tone="lime">Featured Insights</Eyebrow>
                    <h2>Clear guides for <br /><span>a calmer workflow.</span></h2>
                    <p>Explore our top documentation articles to help you get the most out of YRecall.</p>
                </Reveal>
                
                <div className="insights-grid">
                    {insights.map((insight, i) => (
                        <Reveal key={i} className={`insight-card ${insight.delay}`}>
                            <div className="insight-card__icon">
                                <insight.icon size={24} />
                            </div>
                            <h3>{insight.title}</h3>
                            <p>{insight.excerpt}</p>
                            <SmartLink to={insight.link} className="insight-card__link">
                                Read article <ArrowUpRight size={16} />
                            </SmartLink>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
