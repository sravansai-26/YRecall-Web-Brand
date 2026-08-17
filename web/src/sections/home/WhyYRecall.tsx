import { ArrowUpRight, Network } from "lucide-react";
import { Reveal, SectionHeading, SmartLink } from "../../components/SiteChrome";

const frictionPoints: Array<{ number: string; title: string; body: string }> = [
    { number: "01", title: "Too many places", body: "A note in one app. A task in another. A link you swear was in your messages." },
    { number: "02", title: "Too much context switching", body: "Your attention is spent remembering where something lives instead of using it." },
    { number: "03", title: "Too little trust", body: "Systems become another source of guilt when they ask more upkeep than they give back." },
];

export function WhyYRecall() {
    return (
        <section className="section section--why" id="why" aria-labelledby="why-title">
            <div className="shell">
                <Reveal>
                    <SectionHeading
                        eyebrow="The case for a better recall"
                        title={<><span id="why-title">Your life is not scattered.</span><br /><span className="text-teal">Your tools are.</span></>}
                        body="The modern day is full of valuable fragments. YRecall gives them a clear, dependable place to land."
                    />
                </Reveal>
                <div className="why-grid">
                    <Reveal className="friction-card">
                        <div className="card-index">THE FRICTION</div>
                        <h2>Small gaps become<br /><span>big drains.</span></h2>
                        <p>Every missing detail asks you to stop, retrace, and reconstruct. That hidden tax is where momentum goes.</p>
                        <div className="friction-list">
                            {frictionPoints.map((point) => (
                                <div className="friction-item" key={point.number}>
                                    <span>{point.number}</span>
                                    <div><strong>{point.title}</strong><p>{point.body}</p></div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal className="solution-card reveal-delay-1">
                        <div className="solution-map" aria-hidden="true">
                            <span className="map-path map-path--one" />
                            <span className="map-path map-path--two" />
                            <span className="map-path map-path--three" />
                        </div>
                        <div className="card-index">THE SHIFT</div>
                        <h2>One connective<br /><span>memory layer.</span></h2>
                        <p>YRecall brings thoughts, tasks, references, and moments into a single flow you can actually keep up with.</p>
                        <div className="solution-foot"><span className="solution-badge"><Network size={15} /> connected by intent</span><SmartLink to="/guides">Explore the system <ArrowUpRight size={15} /></SmartLink></div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default WhyYRecall;
