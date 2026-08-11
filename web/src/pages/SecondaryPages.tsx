import {
    ArrowRight,
    ArrowUpRight,
    BriefcaseBusiness,
    Check,
    CheckCircle2,
    ChevronDown,
    CircleAlert,
    Clock3,
    FileCheck2,
    FileText,
    Globe2,
    HeartHandshake,
    LockKeyhole,
    Mail,
    MapPin,
    MessageCircle,
    Paperclip,
    Plus,
    Search,
    Send,
    ShieldCheck,
    Sparkles,
    Upload,
    UsersRound,
    WandSparkles,
    Compass,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import {
    ButtonLink,
    SmartLink,
    Eyebrow,
    LYFSPOT_MARK,
    PageFrame,
    Reveal,
    SectionHeading,
    BUILDWITHSRAVAN_MARK,
    SRAVAN_PHOTO,
    YRECALL_MARK,
} from "../components/SiteChrome";
import { useSEO } from "../hooks/useSEO";



export function GuidesPage() {
    useSEO({ title: "YRecall Guides — Learn YRecall", description: "Practical YRecall guides for capturing clearly, organizing lightly, and building a recall rhythm you can trust.", path: "/guides" });
    const location = useLocation();
    const [openGuide, setOpenGuide] = useState<string>("first-week");
    const guides: Array<{ id: string; category: string; title: string; intro: string; steps: string[] }> = [
        { id: "first-week", category: "START HERE", title: "Your first week with YRecall", intro: "A calm way to get set up without trying to organize your entire life in one sitting.", steps: ["Start with one capture place for everything that has nowhere else to go.", "Give only the next step a name. Context can come later.", "End the day by returning three useful things to view—not by clearing everything."] },
        { id: "capture", category: "WORKFLOW", title: "The 30-second capture habit", intro: "Capture is not documentation. It is a tiny promise to your future self.", steps: ["Write the thought in the language it arrived in.", "Add one cue: a person, a project, or a moment.", "Move on. The value is in getting back to the work, not perfecting the note."] },
        { id: "review", category: "RHYTHM", title: "A better weekly reset", intro: "Use a short reset to make your system feel current, not like a backlog you keep failing.", steps: ["Look for what still has energy, not what is most overdue.", "Close or defer anything that no longer belongs.", "Choose one small promise for the week ahead."] },
    ];
    const selectedGuide = guides.find((guide) => guide.id === openGuide) ?? guides[0];

    useEffect(() => {
        const requestedGuide = location.hash.replace(/^#/, "");
        if (guides.some((guide) => guide.id === requestedGuide)) setOpenGuide(requestedGuide);
    }, [location.hash]);

    return <PageFrame>
        <section className="page-hero page-hero--guides"><div className="page-hero-glow" /><div className="shell page-hero__inner"><Reveal><Eyebrow tone="lime">Guides & resources</Eyebrow><h1>Make the system<br /><span>feel like yours.</span></h1><p>Practical starting points for capturing clearly, organizing lightly, and building a recall rhythm you can trust.</p></Reveal><Reveal className="page-hero__stamp reveal-delay-1"><div className="stamp-ring"><Compass size={44} /><span>Y</span><span>R</span><span>E</span><span>C</span><span>A</span><span>L</span><span>L</span></div><small>FIELD NOTES / 001</small></Reveal></div></section>
        <section className="section section--guides"><div className="shell"><div className="guide-layout"><Reveal className="guide-index"><div className="card-index">THE LIBRARY</div><h2>Start with<br /><span>one good habit.</span></h2><p>YRecall is most useful when it quietly fits the way you already move.</p><div className="guide-index__list">{guides.map((guide, index) => <button id={guide.id} type="button" className={`guide-index-item ${openGuide === guide.id ? "is-active" : ""}`} key={guide.id} onClick={() => setOpenGuide(guide.id)}><span>0{index + 1}</span><strong>{guide.title}</strong><ArrowRight size={15} /></button>)}</div></Reveal><Reveal className="guide-reading reveal-delay-1"><div className="reading-meta"><span>{selectedGuide.category}</span><span><Clock3 size={14} /> 3 min read</span></div><h2>{selectedGuide.title}</h2><p className="reading-intro">{selectedGuide.intro}</p><div className="reading-steps">{selectedGuide.steps.map((step, index) => <div className="reading-step" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div><div className="reading-callout"><WandSparkles size={18} /><p>Keep it lighter than your ambition. A useful system should leave energy for the things it is helping you do.</p></div></Reveal></div></div></section>
        <section className="section section--resource-band"><div className="shell resource-band"><div><Eyebrow>Need a human answer?</Eyebrow><h2>We keep the desk open.</h2></div><ButtonLink to="/support" variant="primary">Visit the contact desk <ArrowUpRight size={16} /></ButtonLink></div></section>
    </PageFrame>;
}

export function CompanyPage() {
    useSEO({ title: "About LYFSpot — Building YRecall", description: "We build tools that ask less of you, not more. Learn about the philosophy behind YRecall and the team at LYFSpot.", path: "/company" });
    return <PageFrame>
        <section className="page-hero page-hero--company"><div className="shell page-hero__inner"><Reveal><Eyebrow>LYFSpot / The ecosystem</Eyebrow><h1>Build products<br /><span>people can keep.</span></h1><p>LYFSpot is the studio behind YRecall—an independent product company focused on high-quality, consumer-first software for real life.</p></Reveal><Reveal className="company-emblem reveal-delay-1"><img src={LYFSPOT_MARK} alt="LYFSpot logo" /><span>LYFSpot</span><small>Design excellence / Privacy / Seamless engineering</small></Reveal></div></section>
        <section className="section section--company-intro"><div className="shell company-intro-grid"><Reveal><Eyebrow>Our point of view</Eyebrow><h2>The best products<br /><span>earn their place.</span></h2></Reveal><Reveal className="company-intro-copy reveal-delay-1"><p>LYFSpot exists to create tools that respect people’s attention. We care about the small decisions: how quickly something opens, how clearly it explains itself, and whether it helps you feel more capable after using it.</p><p>YRecall is our flagship product and our first expression of that belief—a unified place to hold the threads that make up a day.</p><div style={{ marginTop: '24px' }}><a className="inline-link" href="https://sailyfspot.blogspot.com" target="_blank" rel="noreferrer">Visit LYFSpot ecosystem <ArrowUpRight size={15} /></a></div></Reveal></div></section>
        <section className="section section--values"><div className="shell"><Reveal><SectionHeading eyebrow="The LYFSpot standard" title={<>Quietly ambitious.<br /><span className="text-teal">Unmistakably human.</span></>} body="Every product starts with a simple question: does this make the person on the other side feel more in control?" /></Reveal><div className="value-grid"><Reveal className="value-card"><span className="value-number">01</span><Sparkles size={21} /><h3>Design excellence</h3><p>Not decoration. A clear path through complexity, shaped with care.</p></Reveal><Reveal className="value-card reveal-delay-1"><span className="value-number">02</span><ShieldCheck size={21} /><h3>Privacy by respect</h3><p>Trust is not a feature to add later. It is a boundary we design from the beginning.</p></Reveal><Reveal className="value-card reveal-delay-2"><span className="value-number">03</span><Globe2 size={21} /><h3>Built to last</h3><p>Thoughtful foundations, honest communication, and a bias toward dependable systems.</p></Reveal></div></div></section>
        <section className="section section--founder-story" id="founder"><div className="shell founder-story-grid"><Reveal className="founder-story-photo"><img src={SRAVAN_PHOTO} alt="Sravan Sai Vuppula in a green field" /><div className="founder-story-tag"><span>Founder’s note</span><strong>Why YRecall exists</strong></div></Reveal><Reveal className="founder-story-copy reveal-delay-1"><Eyebrow tone="lime">Sravan Sai Vuppula / Founder</Eyebrow><h2>“Simplicity is not a smaller ambition. It is a sharper one.”</h2><p>There is a particular kind of modern frustration: you remember that the answer exists, but not where you left it. It is a small problem that repeats until it shapes the whole texture of a day.</p><p>I started YRecall to make that feeling lighter. Not by adding another demanding dashboard, but by creating a dependable layer between the things we intend to do and the things we are able to return to.</p><p>LYFSpot is being built with a long view: products that are rigorous under the hood, approachable at the surface, and worthy of a lasting relationship with the people who use them.</p><a className="inline-link" href="https://buildwithsravan.dev" target="_blank" rel="noreferrer">Visit Sravan’s portfolio <img src={BUILDWITHSRAVAN_MARK} alt="" /> <ArrowUpRight size={15} /></a></Reveal></div></section>
        <section className="section section--ecosystem"><div className="shell ecosystem-card"><div className="ecosystem-card__top"><div><Eyebrow tone="lime">The ecosystem</Eyebrow><h2>One flagship.<br /><span>More to come.</span></h2><div style={{ marginTop: '20px' }}><a className="inline-link" href="https://sailyfspot.blogspot.com" target="_blank" rel="noreferrer">Explore LYFSpot <ArrowUpRight size={15} /></a></div></div><img src={LYFSPOT_MARK} alt="LYFSpot mark" /></div><div className="ecosystem-road"><div className="road-item road-item--live"><span>01</span><strong>YRecall</strong><small>Organize what matters</small><b>Live product</b></div><div className="road-line" /><div className="road-item"><span>02</span><strong>Next chapter</strong><small>Tools for a fuller life</small><b>In the making</b></div></div></div></section>
    </PageFrame>;
}

export function CareersPage() {
    useSEO({ title: "YRecall Careers", description: "Join LYFSpot. We are a tiny, deliberate team building YRecall. Share enough for us to understand your point of view.", path: "/careers" });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.append('type', 'careers');

        try {
            const response = await fetch('/api/submit', { method: 'POST', body: formData });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to submit introduction. Please try again.');
            }
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };
    return <PageFrame>
        <section className="page-hero page-hero--careers"><div className="shell page-hero__inner"><Reveal><Eyebrow tone="lime">Careers at LYFSpot</Eyebrow><h1>Bring your<br /><span>best thinking.</span></h1><p>We are building a small, high-agency team around products that respect people’s time. If you care about the details and the outcome, we want to hear from you.</p></Reveal><Reveal className="careers-aside reveal-delay-1"><div className="careers-aside__top"><UsersRound size={20} /><span>OPEN DOOR POLICY</span></div><strong>Tell us where<br />you could add signal.</strong><span>We review every thoughtful note.</span></Reveal></div></section>
        <section className="section section--careers"><div className="shell careers-layout"><Reveal className="careers-copy"><Eyebrow>Make an introduction</Eyebrow><h2>No performative<br /><span>hoops.</span></h2><p>Share enough for us to understand your point of view. A portfolio, a profile, or a clear note is often more useful than a perfect cover letter.</p><div className="careers-list"><span><Check size={15} /> Product & design</span><span><Check size={15} /> Engineering</span><span><Check size={15} /> Operations & growth</span></div><a className="email-link" href="mailto:careers@yrecall.app">Prefer email? careers@yrecall.app <ArrowUpRight size={15} /></a></Reveal><Reveal className="form-card reveal-delay-1">{submitted ? <div className="form-success"><CheckCircle2 size={30} /><h3>Thanks for reaching out.</h3><p>Your introduction is in the right place. We’ll take a considered look and get back to you.</p><ButtonLink to="/" variant="secondary">Back to YRecall <ArrowUpRight size={15} /></ButtonLink></div> : <form onSubmit={handleSubmit}><div className="form-card__header"><span>CAREER INTRODUCTION / 01</span><small>Fields marked * are required</small></div>{error && <div className="form-error"><CircleAlert size={14} /> {error}</div>}<div className="form-row"><label>Full name *<input name="name" required type="text" placeholder="Your name" disabled={submitting} /></label><label>Email address *<input name="email" required type="email" placeholder="you@email.com" disabled={submitting} /></label></div><label>Area of interest *<select name="category" required defaultValue="" disabled={submitting}><option value="" disabled>Choose an area</option><option>Product & design</option><option>Engineering</option><option>Operations & growth</option><option>Something else</option></select></label><label>What would you like to build with us? *<textarea name="message" required rows={4} placeholder="A short note about your work, your curiosity, or the problem space you care about." disabled={submitting} /></label><div className="form-row"><label>Portfolio URL<input name="portfolio" type="url" placeholder="https://" disabled={submitting} /></label><label>LinkedIn profile<input name="linkedin" type="url" placeholder="https://linkedin.com/in/" disabled={submitting} /></label></div><label className="file-field"><span>Resume or work sample</span><span className="file-drop"><Upload size={17} /> Choose a file <small>PDF, DOCX up to 10MB</small><input name="attachment" type="file" accept=".pdf,.doc,.docx" disabled={submitting} /></span></label><button className="button button--primary form-submit" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send introduction"} <Send size={16} /></button></form>}</Reveal></div></section>
    </PageFrame>;
}

function SupportForm({ bug = false }: { bug?: boolean }) {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.append('type', bug ? 'bug' : 'support');

        try {
            const response = await fetch('/api/submit', { method: 'POST', body: formData });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to send message. Please try again.');
            }
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };
    if (submitted) return <div className="form-success"><CheckCircle2 size={30} /><h3>{bug ? "Bug report received." : "Message received."}</h3><p>{bug ? "Thank you for helping us make YRecall more dependable. Our team will review the details." : "A member of the YRecall desk will be in touch soon."}</p><button className="button button--secondary" type="button" onClick={() => setSubmitted(false)}>Send another <ArrowRight size={15} /></button></div>;
    return <form onSubmit={handleSubmit}><div className="form-card__header"><span>{bug ? "BUG REPORT / 02" : "CONTACT DESK / 01"}</span><small>We usually reply within 2 business days</small></div>{error && <div className="form-error"><CircleAlert size={14} /> {error}</div>}<div className="form-row"><label>Your name *<input name="name" required type="text" placeholder="Your name" disabled={submitting} /></label><label>Email address *<input name="email" required type="email" placeholder="you@email.com" disabled={submitting} /></label></div>{bug ? <><label>What happened? *<select name="category" required defaultValue="" disabled={submitting}><option value="" disabled>Choose a category</option><option>Something is not saving</option><option>I cannot sign in</option><option>Something looks wrong</option><option>Other</option></select></label><label>Tell us what you saw *<textarea name="message" required rows={5} placeholder="What were you trying to do? What happened instead?" disabled={submitting} /></label><label className="file-field"><span>Attach a screenshot</span><span className="file-drop"><Paperclip size={17} /> Add an image <small>PNG, JPG up to 10MB</small><input name="attachment" type="file" accept="image/png,image/jpeg" disabled={submitting} /></span></label></> : <><label>How can we help? *<select name="category" required defaultValue="" disabled={submitting}><option value="" disabled>Choose a topic</option><option>Getting started</option><option>Account or access</option><option>Product feedback</option><option>Partnerships</option><option>Something else</option></select></label><label>Message *<textarea name="message" required rows={5} placeholder="Tell us a little about what you need." disabled={submitting} /></label></>}<button className="button button--primary form-submit" type="submit" disabled={submitting}>{submitting ? "Sending..." : (bug ? "Send bug report" : "Send message")} <Send size={16} /></button></form>;
}

export function SupportPage() {
    useSEO({ title: "Contact desk", description: "Contact the YRecall support desk for product questions, feedback, partnerships, or bug reports.", path: "/support" });
    const [activeForm, setActiveForm] = useState<"contact" | "bug">("contact");
    return <PageFrame>
        <section className="page-hero page-hero--support"><div className="shell page-hero__inner"><Reveal><Eyebrow tone="lime">The contact desk</Eyebrow><h1>Useful help,<br /><span>without the runaround.</span></h1><p>Questions, feedback, or a sharp edge you found in the product—send it our way. We read every message.</p></Reveal><Reveal className="support-orbit reveal-delay-1"><div className="support-orbit__center"><MessageCircle size={25} /></div><span className="support-orbit__label support-orbit__label--one">Questions</span><span className="support-orbit__label support-orbit__label--two">Feedback</span><span className="support-orbit__label support-orbit__label--three">Fixes</span></Reveal></div></section>
        <section className="section section--support"><div className="shell support-layout"><Reveal className="support-copy"><Eyebrow>Let’s talk</Eyebrow><h2>Human on<br /><span>the other side.</span></h2><p>YRecall is an early product, and your perspective helps shape what it becomes. Tell us what is working, what is missing, or what you expected to happen.</p><div className="support-contact-list"><a href="mailto:support@yrecall.app"><span><Mail size={17} /></span><div><small>Product support</small><strong>support@yrecall.app</strong></div><ArrowUpRight size={15} /></a><a href="mailto:contact@yrecall.app"><span><HeartHandshake size={17} /></span><div><small>General contact</small><strong>contact@yrecall.app</strong></div><ArrowUpRight size={15} /></a><a href="mailto:contact@buildwithsravan.dev"><span><BriefcaseBusiness size={17} /></span><div><small>Founder / portfolio</small><strong>contact@buildwithsravan.dev</strong></div><ArrowUpRight size={15} /></a></div></Reveal><Reveal className="form-card support-form-card reveal-delay-1"><div className="form-switch" role="tablist"><button className={activeForm === "contact" ? "is-active" : ""} type="button" onClick={() => setActiveForm("contact")}>Contact desk</button><button className={activeForm === "bug" ? "is-active" : ""} type="button" onClick={() => setActiveForm("bug")}>Report a bug <CircleAlert size={14} /></button></div><div id="bug">{activeForm === "bug" ? <SupportForm bug /> : <SupportForm />}</div></Reveal></div></section>
    </PageFrame>;
}

function LegalLayout({ type }: { type: "terms" | "privacy" }) {
    const isPrivacy = type === "privacy";
    useSEO({ title: isPrivacy ? "Privacy policy" : "Terms of service", description: isPrivacy ? "Read the YRecall privacy policy in plain language, including the information we collect and your choices." : "Read the YRecall terms of service in plain language for the website and product experience.", path: isPrivacy ? "/legal/privacy" : "/legal/terms" });
    const sections = isPrivacy ? [
        ["01", "The short version", "YRecall is designed to help you hold on to the information you choose to capture. We aim to collect only what is reasonably needed to provide, secure, maintain, and improve the service. We do not sell your personal information."],
        ["02", "Information you provide", "This may include your email address, account and profile details, notes, tasks, saved references, feedback, support messages, and files you voluntarily attach to a report. We use this information to deliver the feature or response you asked for."],
        ["03", "Information collected automatically", "When you use the website or app, we may receive limited technical information such as device type, browser or operating-system version, language, approximate region, error details, and basic usage events. This helps us understand reliability and diagnose failures without needing the contents of your private notes."],
        ["04", "How we use information", "We use information to create and secure accounts, provide core product functionality, process support requests, prevent abuse, troubleshoot incidents, understand performance, communicate service changes, and make measured product improvements. We use aggregated or de-identified information where practical for reporting and planning."],
        ["05", "Cookies and similar technologies", "The website may use essential storage technologies to remember preferences such as theme selection, keep navigation working, and maintain basic security. If analytics or optional technologies are introduced, we will update this policy and provide appropriate choices where required."],
        ["06", "When information is shared", "We may share limited information with service providers that help us host, secure, support, or operate YRecall, under reasonable confidentiality and data-protection obligations. We may also disclose information when required by law, to protect people or the service, or as part of a corporate transaction. We do not provide personal information to advertisers for sale."],
        ["07", "Retention and deletion", "We keep information for as long as it is needed to provide the service, meet legitimate operational or legal requirements, resolve disputes, and maintain security records. You may ask us to review, correct, export where available, or delete account information by contacting us. Some limited records may remain when retention is necessary for security or legal compliance."],
        ["08", "Security and your responsibility", "We use administrative, technical, and organizational safeguards appropriate to the nature of the information we handle. No online service can promise absolute security. Please use a unique password, keep access links private, and tell us promptly about suspected unauthorized access."],
        ["09", "Children and third-party services", "YRecall is not directed to children who are not legally able to use the service. We do not knowingly request unnecessary information from children. Links to third-party websites, app stores, or services are governed by their own terms and privacy practices."],
        ["10", "Your questions and choices", "Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain processing. Contact us first and include enough detail for us to understand the request. We may need to verify account ownership before making changes. Privacy questions can be sent to privacy@yrecall.app."],
        ["11", "Changes to this policy", "As YRecall grows, this policy may change to reflect new capabilities, legal requirements, or clearer explanations. We will update the date above and, where a change is material, take reasonable steps to draw attention to it."],
    ] : [
        ["01", "Agreement and eligibility", "These Terms of Service govern your use of the YRecall website, applications, and related services operated by LYFSpot. By using the service, you agree to these terms. If you do not agree, do not use YRecall. You must be legally able to enter into this agreement in your location."],
        ["02", "The YRecall service", "YRecall is a personal organization and recall product. Features, platforms, availability, and supported integrations may change as the product develops. We will make reasonable efforts to keep the service useful and to communicate material changes when practical."],
        ["03", "Your account and security", "You are responsible for providing accurate account information, protecting passwords and sign-in links, and activity that occurs through your account. Do not share credentials, impersonate another person, or use another person’s account without permission. Tell us promptly if you believe access has been compromised."],
        ["04", "Your content", "You retain rights to the notes, tasks, files, and other material you submit. You give LYFSpot the limited permission needed to host, process, display, back up, and transmit that content solely to operate, secure, and improve the service. You are responsible for having the right to upload or share it."],
        ["05", "Acceptable use", "You may not use YRecall to break the law, infringe another person’s rights, distribute malware, interfere with the service, attempt unauthorized access, scrape private areas, send abusive or deceptive communications, or create unreasonable risk for other users. We may investigate and take proportionate action when these boundaries are violated."],
        ["06", "Intellectual property", "The YRecall name, visual identity, software, designs, documentation, and other service materials belong to LYFSpot or its licensors. These terms give you a limited, revocable, non-transferable right to use the service for its intended purpose; they do not transfer ownership or grant permission to copy the product."],
        ["07", "Feedback and support", "If you send suggestions, bug reports, or other feedback, you allow LYFSpot to use it without restriction or payment to improve the product, provided we do not publicly identify you without permission. Support responses are guidance for the product experience and are not professional, legal, medical, or financial advice."],
        ["08", "Availability and third parties", "We work to keep YRecall dependable, but the service may be unavailable for maintenance, updates, outages, security responses, or circumstances outside our control. Third-party services, app stores, networks, and links have separate terms. LYFSpot is not responsible for third-party products it does not operate."],
        ["09", "Suspension and termination", "You may stop using YRecall at any time. We may suspend or terminate access when reasonably necessary to protect the service, comply with law, address abuse, or respond to a material breach. Provisions concerning ownership, content permissions, disclaimers, limitations, and disputes may continue after termination."],
        ["10", "Disclaimers", "To the extent permitted by law, YRecall is provided on an as-available basis. We do not promise that every feature will be uninterrupted, error-free, or suitable for every purpose. You should keep independent copies of information that is especially important to you and use appropriate judgment before relying on the service."],
        ["11", "Limitation of liability", "To the extent permitted by applicable law, LYFSpot will not be liable for indirect, incidental, special, consequential, or exemplary losses, or for loss of data, profits, goodwill, or business opportunity arising from use of the service. Nothing in these terms limits rights or liabilities that cannot legally be limited."],
        ["12", "Changes and contact", "We may update these terms as the service and law evolve. The updated version will show a new date and become effective as stated. If you have questions, contact support@yrecall.app or contact@yrecall.app. LYFSpot operates YRecall and is represented publicly through buildwithsravan.dev."],
    ];
    return <PageFrame><section className="page-hero page-hero--legal"><div className="shell page-hero__inner"><Reveal><Eyebrow>{isPrivacy ? "Trust, clearly stated" : "The fine print, made readable"}</Eyebrow><h1>{isPrivacy ? <>Privacy<br /><span>policy.</span></> : <>Terms of<br /><span>service.</span></>}</h1><p>Last updated August 06, 2026 · Written to be understood.</p></Reveal><Reveal className="legal-mark reveal-delay-1"><span><FileCheck2 size={28} /></span><small>LYFSPOT / YRECALL</small></Reveal></div></section><section className="section section--legal"><div className="shell legal-layout"><aside className="legal-aside"><div className="card-index">ON THIS PAGE</div>{sections.map(([number, heading]) => <SmartLink key={number} to={`#legal-${number}`}>{number} <span>{heading}</span></SmartLink>)}</aside><article className="legal-article"><div className="legal-lede"><ShieldCheck size={20} /><p>This page is a plain-language overview for the YRecall website and product experience. If you have a question about how a specific situation applies, <a href={isPrivacy ? "mailto:privacy@yrecall.app" : "mailto:contact@yrecall.app"}>ask us directly</a>.</p></div>{sections.map(([number, heading, body]) => <section id={`legal-${number}`} className="legal-section" key={number}><span>{number}</span><div><h2>{heading}</h2><p>{body}</p></div></section>)}</article></div></section></PageFrame>;
}

export function TermsPage() { return <LegalLayout type="terms" />; }
export function PrivacyPage() { return <LegalLayout type="privacy" />; }

export function ResetPasswordPage() {
    useSEO({ title: "Reset password", description: "Securely choose a new password for your YRecall account.", path: "/reset-password" });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
    return <PageFrame className="page-frame--handoff"><section className="handoff-page"><div className="handoff-grid" /><div className="handoff-card"><SmartLink to="/" className="handoff-brand"><span><img src={YRECALL_MARK} alt="" /></span><strong>YRecall</strong></SmartLink>{submitted ? <div className="handoff-success"><div className="handoff-success__icon"><CheckCircle2 size={29} /></div><Eyebrow tone="lime">Password updated</Eyebrow><h1>You’re back<br /><span>in control.</span></h1><p>You can now login to your YRecall app with your new password.</p><ButtonLink to="/" variant="primary">Return to YRecall <ArrowUpRight size={16} /></ButtonLink></div> : <div className="handoff-form"><Eyebrow>Secure account handoff</Eyebrow><h1>Choose a new<br /><span>password.</span></h1><p>Set a new password for your YRecall account. Keep it unique and easy for you to remember.</p><form onSubmit={handleSubmit}><label>New password<input required type="password" minLength={8} placeholder="At least 8 characters" /></label><label>Confirm password<input required type="password" minLength={8} placeholder="Repeat your new password" /></label><button type="submit" className="button button--primary">Update password <ArrowRight size={16} /></button></form><div className="handoff-foot"><LockKeyhole size={14} /> Your reset link is private to this account.</div></div>}<div className="handoff-footer"><span>YRecall by LYFSpot</span><SmartLink to="/legal/privacy">Privacy</SmartLink><SmartLink to="/support">Need help?</SmartLink></div></div></section></PageFrame>;
}

export function ConfirmEmailPage() {
    useSEO({ title: "Email confirmed", description: "Your YRecall email is confirmed. Continue building a calmer way to keep what matters close.", path: "/confirm-email" });
    return <PageFrame className="page-frame--handoff"><section className="handoff-page"><div className="handoff-grid" /><div className="handoff-card"><SmartLink to="/" className="handoff-brand"><span><img src={YRECALL_MARK} alt="" /></span><strong>YRecall</strong></SmartLink><div className="handoff-form handoff-form--confirmed"><div className="confirmed-orb"><Check size={35} /></div><Eyebrow tone="lime">Email confirmed</Eyebrow><h1>You’re all<br /><span>set.</span></h1><p>Your email is confirmed. Open the YRecall app to continue building a calmer way to keep what matters close.</p><a className="button button--primary" href="mailto:support@yrecall.app?subject=Open%20YRecall">Open the app <ArrowUpRight size={16} /></a><div className="handoff-note"><Sparkles size={14} /> Welcome to a better recall rhythm.</div></div><div className="handoff-footer"><span>YRecall by LYFSpot</span><SmartLink to="/legal/privacy">Privacy</SmartLink><SmartLink to="/support">Need help?</SmartLink></div></div></section></PageFrame>;
}
