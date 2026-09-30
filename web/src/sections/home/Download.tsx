import { ArrowUpRight, Check, Download as DownloadIcon, Play, Smartphone, Zap, ArrowRight, X } from "lucide-react";
import { Eyebrow, Reveal, YRECALL_MARK } from "../../components/SiteChrome";
import { useState, useEffect } from "react";

export function Download() {
    const [waitlistState, setWaitlistState] = useState<"idle" | "tools" | "email" | "success">("idle");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    const toolsList = ["Apple Notes", "Notion", "Todoist", "Evernote", "Things 3", "Other"];

    const toggleTool = (t: string) => {
        setSelectedTools(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
    };

    useEffect(() => {
        if (waitlistState === "success") {
            const timer = setTimeout(() => {
                setWaitlistState("idle");
                setSelectedTools([]);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [waitlistState]);

    return (
        <section className="section section--download" id="download" aria-labelledby="download-title">
            <div className="shell download-card">
                <div className="download-signal" aria-hidden="true"><span /><span /><span /><span /><span /></div>
                <Reveal className="download-copy">
                    <Eyebrow tone="lime">Your next clear step</Eyebrow>
                    <h2 id="download-title">Bring YRecall<br /><span>where your day goes.</span></h2>
                    <p>YRecall is a mobile-first product. Start on Android today, and keep an eye out for iOS as we take the same level of care there.</p>
                    
                    <div className="download-actions" style={{ flexWrap: 'wrap' }}>
                        <a className="store-badge" href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default', opacity: 0.8 }}>
                            <span className="store-badge__icon" style={{ background: 'transparent', padding: 0, border: 'none' }}><img src="/Google_Play_Store.svg" alt="Google Play" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></span>
                            <span><small>IN PROGRESS</small><strong>Google Play</strong></span>
                        </a>
                        
                        {waitlistState === "idle" && (
                            <button className="store-badge" type="button" onClick={() => setWaitlistState("tools")} style={{ opacity: 0.8 }}>
                                <span className="store-badge__icon" style={{ background: 'transparent', padding: 0, border: 'none' }}><img src="/app-store-logo.png" alt="App Store" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></span>
                                <span><small>COMING LATER</small><strong>App Store</strong></span>
                            </button>
                        )}

                        <a className="store-badge" href="https://github.com/sravansai-26/YRecall/releases/download/v1.0.0/YRecall-v1.0.0.apk">
                            <span className="store-badge__icon" style={{ background: 'transparent', padding: 0, border: 'none' }}><img src="/yrecall-mark.webp" alt="YRecall" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></span>
                            <span><small>OFFICIAL APK (v1.0.0)</small><strong>Direct Download</strong></span>
                        </a>
                    </div>
                    
                    {waitlistState === "idle" && (
                        <div style={{ marginTop: "16px", fontSize: "12px", color: "rgba(255, 255, 255, 0.65)", lineHeight: "1.6" }}>
                            <ul style={{ listStyleType: "none", padding: 0, margin: "0 0 8px 0" }}>
                                <li>✓ Pre-release Official APK directly from GitHub</li>
                                <li>✓ OTA updates supported via EAS Update</li>
                            </ul>
                            <a className="download-text-link" style={{ marginLeft: 0 }} href="https://github.com/sravansai-26/YRecall/releases/tag/v1.0.0" target="_blank" rel="noopener noreferrer">
                                View release details <ArrowUpRight size={12} style={{ marginLeft: "2px" }} />
                            </a>
                        </div>
                    )}

                    {waitlistState !== "idle" && (
                        <div className="ios-waitlist-form">
                            <button className="waitlist-close" onClick={() => { setWaitlistState("idle"); setSelectedTools([]); }} aria-label="Close waitlist"><X size={16} /></button>
                            
                            {waitlistState === "tools" && (
                                <div className="waitlist-step animate-in">
                                    <span className="waitlist-step-label">Step 1 of 2</span>
                                    <h3>What do you currently use?</h3>
                                    <p>Select your fragmented stack to help us personalize your onboarding.</p>
                                    <div className="waitlist-tools">
                                        {toolsList.map(t => (
                                            <button 
                                                key={t} 
                                                type="button" 
                                                className={`waitlist-tool-pill ${selectedTools.includes(t) ? "is-selected" : ""}`}
                                                onClick={() => toggleTool(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        className="waitlist-next-btn"
                                        onClick={() => setWaitlistState("email")}
                                        disabled={selectedTools.length === 0}
                                    >
                                        Continue <ArrowRight size={15} />
                                    </button>
                                </div>
                            )}

                            {waitlistState === "email" && (
                                <div className="waitlist-step animate-in">
                                    <span className="waitlist-step-label">Step 2 of 2</span>
                                    <h3>Where should we send your invite?</h3>
                                    <p>We'll notify you as soon as the iOS beta is ready for your device.</p>
                                    <form className="waitlist-email-form" onSubmit={(e) => { e.preventDefault(); setWaitlistState("success"); }}>
                                        <input type="email" placeholder="your@email.com" required />
                                        <button type="submit">Join Waitlist</button>
                                    </form>
                                </div>
                            )}

                            {waitlistState === "success" && (
                                <div className="waitlist-step waitlist-success animate-in">
                                    <div className="success-icon"><Check size={20} /></div>
                                    <h3>You're on the list!</h3>
                                    <p>Thanks for joining. We'll be in touch soon with your early access invite.</p>
                                </div>
                            )}
                        </div>
                    )}
                </Reveal>
                
                <Reveal className="download-visual reveal-delay-1">
                    <div className="download-phone">
                        <div className="phone-speaker" />
                        <div className="phone-screen">
                            <div className="phone-appbar"><span className="phone-mark"><img width="1920" height="1920" loading="lazy" decoding="async" src={YRECALL_MARK} alt="" /></span><span>Today</span><span className="phone-avatar">S</span></div>
                            <div className="phone-date">TUESDAY · 06 AUG</div>
                            <h3>Keep the signal.<br /><span>Let go of the noise.</span></h3>
                            <div className="phone-task"><span className="phone-check"><Check size={11} /></span><span>Review the launch notes</span><small>Now</small></div>
                            <div className="phone-task"><span className="phone-check" /><span>Remember the good idea</span><small>Later</small></div>
                            <div className="phone-recall"><span><Zap size={13} /></span><div><small>A useful recall</small><p>Make the next step smaller than the thought.</p></div></div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Download;
