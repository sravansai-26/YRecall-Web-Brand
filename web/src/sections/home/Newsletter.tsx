import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Eyebrow } from "../../components/SiteChrome";

export default function Newsletter() {
    const [email, setEmail] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
        if (email.trim().length > 3) {
            setSubmitting(true);
            setError(null);
            // Future-ready adapter for newsletter provider
            try {
                // Simulate network request
                await new Promise(r => setTimeout(r, 800));
                // Throw error since we do not actually have persistence yet, per instructions
                throw new Error("Newsletter signups will open shortly. Please try again soon.");
            } catch (err: any) {
                setError(err.message);
            } finally {
                setSubmitting(false);
            }
        }
    };
    return <section className="section section--newsletter" aria-labelledby="newsletter-title"><div className="shell newsletter-layout"><div><Eyebrow>Stay close to the build</Eyebrow><h2 id="newsletter-title">Useful notes.<br /><span>No noise.</span></h2></div><form className="subscribe-form" onSubmit={handleSubscribe}><label htmlFor="newsletter-email">Get occasional product notes from YRecall</label>{error && <div style={{ color: "var(--red-9)", fontSize: "14px", marginBottom: "12px", background: "var(--red-3)", padding: "10px 14px", borderRadius: "6px" }}>{error}</div>}<div><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourcompany.com" required disabled={submitting} /><button type="submit" aria-label="Subscribe" disabled={submitting}>{submitting ? "..." : <ArrowUpRight size={18} />}</button></div><small>One or two thoughtful notes a month. Unsubscribe whenever you like.</small></form></div></section>;
}
