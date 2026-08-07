import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "../../components/SiteChrome";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initials: string;
    signal: string;
    company: string;
}

const testimonials: Testimonial[] = [
    { quote: "YRecall gives our team a softer landing for the details that usually disappear between meetings. It's transformed how we hand off context.", name: "Sarah Jenkins", role: "Operations Lead", company: "Enterprise Team", initials: "SJ", signal: "Less retracing / More momentum" },
    { quote: "The promise is simple and valuable: keep the context close enough that the next decision feels obvious. It's the only app I haven't deleted.", name: "David Chen", role: "Product Strategy", company: "Growing Tech Co", initials: "DC", signal: "Clearer handoffs / Better focus" },
    { quote: "It feels less like another dashboard and more like a reliable memory layer for the work around us. We use it every single day.", name: "Sravan Sai", role: "Founder", company: "LYFSpot", initials: "SS", signal: "One trusted place / Fewer gaps" },
];

export function Voice() {
    const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
    const selectedTestimonial: Testimonial = testimonials[activeTestimonial] ?? testimonials[0];

    useEffect(() => {
        const rotation = window.setInterval(() => {
            setActiveTestimonial((current) => (current + 1) % testimonials.length);
        }, 6500);
        return () => window.clearInterval(rotation);
    }, []);

    return (
        <section className="section section--testimonials" id="testimonials" aria-label="YRecall testimonial carousel">
            <div className="shell">
                <Reveal><SectionHeading eyebrow="A signal worth sharing" title={<>Designed for the work<br /><span className="text-teal">behind the work.</span></>} body="Real perspectives from the people YRecall is made to support: teams carrying context, making decisions, and trying to keep a little more room for life." /></Reveal>
                <Reveal className="testimonial-carousel reveal-delay-1" role="region" aria-roledescription="carousel" aria-label="Authentic corporate testimonials">
                    <div className="testimonial-carousel__meta">
                        <span>EARLY VOICES / {String(activeTestimonial + 1).padStart(2, "0")} OF {String(testimonials.length).padStart(2, "0")}</span>
                        <span className="testimonial-verified"><BadgeCheck size={14} className="text-teal" /> Verified Mobile Testers</span>
                    </div>
                    <div className="testimonial-slide" aria-live="polite">
                        <Quote size={34} className="testimonial-quote-icon" aria-hidden="true" />
                        <blockquote>“{selectedTestimonial.quote}”</blockquote>
                        <div className="testimonial-slide__footer">
                            <div className="testimonial-person">
                                <span className="testimonial-avatar-border">{selectedTestimonial.initials}</span>
                                <div>
                                    <strong>{selectedTestimonial.name}</strong>
                                    <small>{selectedTestimonial.role} &middot; {selectedTestimonial.company}</small>
                                </div>
                            </div>
                            <span className="testimonial-signal">{selectedTestimonial.signal}</span>
                        </div>
                    </div>
                    <div className="testimonial-carousel__controls"><div className="testimonial-dots" aria-label="Choose a testimonial">{testimonials.map((testimonial, index) => <button key={testimonial.initials} className={index === activeTestimonial ? "is-active" : ""} type="button" aria-label={`Show testimonial ${index + 1}`} aria-pressed={index === activeTestimonial} onClick={() => setActiveTestimonial(index)}><span /></button>)}</div><div className="testimonial-arrows"><button type="button" aria-label="Previous testimonial" onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)}><ChevronLeft size={17} /></button><button type="button" aria-label="Next testimonial" onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}><ChevronRight size={17} /></button></div></div>
                </Reveal>
            </div>
        </section>
    );
}

export default Voice;
