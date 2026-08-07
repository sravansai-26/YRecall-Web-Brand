import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Eyebrow } from "../../components/SiteChrome";

export default function Newsletter() {
    const [email, setEmail] = useState<string>("");
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const handleSubscribe = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.trim().length > 3) setSubscribed(true); };
    return <section className="section section--newsletter" aria-labelledby="newsletter-title"><div className="shell newsletter-layout"><div><Eyebrow>Stay close to the build</Eyebrow><h2 id="newsletter-title">Useful notes.<br /><span>No noise.</span></h2></div>{subscribed ? <div className="subscribe-success"><CheckCircle2 size={22} /><div><strong>You’re on the list.</strong><p>We’ll keep the updates considered.</p></div></div> : <form className="subscribe-form" onSubmit={handleSubscribe}><label htmlFor="newsletter-email">Get occasional product notes from YRecall</label><div><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourcompany.com" required /><button type="submit" aria-label="Subscribe"><ArrowUpRight size={18} /></button></div><small>One or two thoughtful notes a month. Unsubscribe whenever you like.</small></form>}</div></section>;
}
