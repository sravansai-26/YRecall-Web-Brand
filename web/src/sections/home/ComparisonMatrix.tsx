import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal, SectionHeading } from "../../components/SiteChrome";

export function ComparisonMatrix() {
    return (
        <section className="section section--matrix" id="comparison" aria-label="YRecall vs Fragmented Stack">
            <div className="shell">
                <Reveal>
                    <SectionHeading 
                        eyebrow="The Cost of Context" 
                        title={<>A lighter way to<br /><span className="text-teal">keep things close.</span></>} 
                        body="Compare YRecall's unified mobile context layer against traditional fragmented workflows." 
                    />
                </Reveal>
                
                <Reveal className="matrix-table-wrapper reveal-delay-1">
                    <div className="matrix-table">
                        <div className="matrix-header">
                            <div className="matrix-col matrix-col--label"></div>
                            <div className="matrix-col matrix-col--stack">
                                <strong>Fragmented Stack</strong>
                                <small>Notes + Todoist + Links</small>
                            </div>
                            <div className="matrix-col matrix-col--yrecall">
                                <strong>YRecall</strong>
                                <small>Unified Context</small>
                            </div>
                        </div>
                        
                        <div className="matrix-row">
                            <div className="matrix-col matrix-col--label">
                                <strong>Context Switching</strong>
                            </div>
                            <div className="matrix-col matrix-col--stack">
                                <span className="matrix-icon matrix-icon--bad"><XCircle size={16} /></span>
                                <span>High friction between apps</span>
                            </div>
                            <div className="matrix-col matrix-col--yrecall">
                                <span className="matrix-icon matrix-icon--good"><CheckCircle2 size={16} /></span>
                                <span>Single, fluid timeline</span>
                            </div>
                        </div>
                        
                        <div className="matrix-row">
                            <div className="matrix-col matrix-col--label">
                                <strong>Setup Effort</strong>
                            </div>
                            <div className="matrix-col matrix-col--stack">
                                <span className="matrix-icon matrix-icon--bad"><XCircle size={16} /></span>
                                <span>Requires linking and tags</span>
                            </div>
                            <div className="matrix-col matrix-col--yrecall">
                                <span className="matrix-icon matrix-icon--good"><CheckCircle2 size={16} /></span>
                                <span>Zero setup, instant capture</span>
                            </div>
                        </div>
                        
                        <div className="matrix-row">
                            <div className="matrix-col matrix-col--label">
                                <strong>Search Speed</strong>
                            </div>
                            <div className="matrix-col matrix-col--stack">
                                <span className="matrix-icon matrix-icon--bad"><XCircle size={16} /></span>
                                <span>Scattered across silos</span>
                            </div>
                            <div className="matrix-col matrix-col--yrecall">
                                <span className="matrix-icon matrix-icon--good"><CheckCircle2 size={16} /></span>
                                <span>Unified and instantaneous</span>
                            </div>
                        </div>
                        
                        <div className="matrix-row">
                            <div className="matrix-col matrix-col--label">
                                <strong>Cognitive Load</strong>
                            </div>
                            <div className="matrix-col matrix-col--stack">
                                <span className="matrix-icon matrix-icon--bad"><XCircle size={16} /></span>
                                <span>Heavy, demands maintenance</span>
                            </div>
                            <div className="matrix-col matrix-col--yrecall">
                                <span className="matrix-icon matrix-icon--good"><CheckCircle2 size={16} /></span>
                                <span>Light, disappears until needed</span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default ComparisonMatrix;
