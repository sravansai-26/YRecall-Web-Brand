import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "../../components/SiteChrome";

export function Workflows() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const workflows = [
        {
            title: "Founder (Sravan)",
            label: "Founder",
            scenario: "Capturing a midnight product idea without losing the thread of tomorrow's pitch.",
            steps: [
                "Jots down raw idea in YRecall widget.",
                "Tags it as 'Product Idea'.",
                "Closes phone, back to sleep.",
                "Next morning: Idea is perfectly waiting in the timeline."
            ]
        },
        {
            title: "Product Leader",
            label: "Product",
            scenario: "Walking out of a meeting with 5 disconnected action items and no time to organize.",
            steps: [
                "Quickly drops voice notes into YRecall.",
                "Context engine groups them by 'Meeting'.",
                "Action items are auto-sorted.",
                "Seamlessly hands off clear specs to the team."
            ]
        },
        {
            title: "Engineer",
            label: "Engineering",
            scenario: "Realizing a bug fix while commuting on the train, away from the laptop.",
            steps: [
                "Captures a quick code snippet or logic thought.",
                "Tags it for the 'Sprint' project.",
                "Returns to reading a book.",
                "At desk: The fix is right there to copy-paste."
            ]
        }
    ];

    return (
        <section className="section section--workflows" id="workflows" aria-label="Workflows in Action">
            <div className="shell">
                <Reveal>
                    <SectionHeading 
                        eyebrow="Workflows in Action" 
                        title={<>How the pieces<br /><span className="text-teal">come together.</span></>} 
                        body="Concrete mobile capture scenarios from the people who need context the most." 
                    />
                </Reveal>

                <Reveal className="workflows-interactive reveal-delay-1">
                    <div className="workflows-tabs">
                        {workflows.map((wf, idx) => (
                            <button 
                                key={wf.title} 
                                className={`workflow-tab ${idx === activeTab ? "is-active" : ""}`}
                                onClick={() => setActiveTab(idx)}
                            >
                                {wf.label}
                            </button>
                        ))}
                    </div>

                    <div className="workflow-content">
                        <div className="workflow-scenario">
                            <span className="workflow-tag">Scenario</span>
                            <p>{workflows[activeTab].scenario}</p>
                        </div>

                        <div className="workflow-steps">
                            {workflows[activeTab].steps.map((step, stepIdx) => (
                                <div key={stepIdx} className="workflow-step animate-in" style={{ animationDelay: `${stepIdx * 0.1}s` }}>
                                    <div className="workflow-step-icon">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div className="workflow-step-text">
                                        {step}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Workflows;
