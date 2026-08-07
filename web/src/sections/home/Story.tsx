import { Eyebrow, Reveal } from "../../components/SiteChrome";

export function Story() {
    return (
        <section className="section section--promise" id="story" aria-labelledby="promise-title">
            <div className="shell promise-layout">
                <Reveal className="promise-intro"><Eyebrow tone="lime">Your Life. Just Recall.</Eyebrow><h2 id="promise-title">A product story<br /><span>with room to breathe.</span></h2><p>YRecall is not trying to turn your life into a performance dashboard. It is being shaped as a quiet, dependable layer that helps the important things stay close.</p></Reveal>
                <div className="promise-grid"><Reveal className="promise-card"><span>01 / Make space</span><strong>Capture without ceremony.</strong><p>Good ideas should not need a perfect format before they can be useful.</p></Reveal><Reveal className="promise-card reveal-delay-1"><span>02 / Keep context</span><strong>Organize without overbuilding.</strong><p>The system should explain itself when you return, even after a full week away.</p></Reveal><Reveal className="promise-card reveal-delay-2"><span>03 / Return gently</span><strong>Recall what helps now.</strong><p>The goal is not to remember everything. It is to make the next right thing easier to find.</p></Reveal></div>
            </div>
        </section>
    );
}

export default Story;
