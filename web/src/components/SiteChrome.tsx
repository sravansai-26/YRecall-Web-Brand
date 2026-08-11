import { Link, useLocation, useNavigate, type LinkProps } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X, Twitter, Facebook, Linkedin, Github } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ComponentProps, type HTMLAttributes, type ReactNode } from "react";

export const YRECALL_MARK = "/yrecall-mark.png";
export const LYFSPOT_MARK = "/lyfspot-mark-transparent.png";
export const SRAVAN_PHOTO = "/sravan-sai-vuppula.png";
export const BUILDWITHSRAVAN_MARK = "/buildwithsravan-mark.png";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
    try {
        const savedTheme = window.localStorage.getItem("yrecall-theme");
        if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
        return "light";
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#07111c" : "#fff8f1");
        try {
            window.localStorage.setItem("yrecall-theme", theme);
        } catch {
            // Storage may be unavailable in private browsing.
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === "light" ? "dark" : "light") }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside ThemeProvider");
    return context;
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

type SmartLinkProps = ComponentProps<typeof Link>;

export function SmartLink({ onClick, to, ...props }: SmartLinkProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick: LinkProps["onClick"] = (event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const targetPath = typeof to === "string" ? to.split("#")[0] || location.pathname : to.pathname ?? location.pathname;
        const targetHash = typeof to === "string" ? (to.includes("#") ? `#${to.split("#")[1]}` : "") : to.hash ?? "";
        if (!targetHash) return;

        event.preventDefault();
        navigate(to, { preventScrollReset: true });
        if (targetPath === location.pathname) {
            window.requestAnimationFrame(() => scrollToHash(targetHash));
        }
    };
    return <Link {...props} to={to} onClick={handleClick} />;
}

export function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    return <button className={`theme-toggle${mobile ? " theme-toggle--mobile" : ""}`} type="button" onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} title={`Switch to ${isDark ? "light" : "dark"} mode`}><span className="theme-toggle__icon">{isDark ? <Sun size={15} /> : <Moon size={15} />}</span><span>{isDark ? "Light" : "Dark"}</span></button>;
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
    return (
        <SmartLink className={`brand-lockup${compact ? " brand-lockup--compact" : ""}`} to="/" aria-label="YRecall home">
            <span className="brand-lockup__mark" aria-hidden="true">
                <img src={YRECALL_MARK} alt="" />
            </span>
            <span className="brand-lockup__wordmark">
                <strong>YRecall</strong>
                {!compact ? <small>by LYFSpot</small> : null}
            </span>
        </SmartLink>
    );
}

export function Reveal({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} {...props} className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}>
            {children}
        </div>
    );
}

type NavItem = {
    label: string;
    href: string;
    path?: string;
    sectionId?: string;
};

const navItems: NavItem[] = [
    { label: "Why YRecall", href: "/#why", sectionId: "why" },
    { label: "Features", href: "/#features", sectionId: "features" },
    { label: "Voices", href: "/#testimonials", sectionId: "testimonials" },
    { label: "Our story", href: "/#story", sectionId: "story" },
    { label: "Guides", href: "/guides", path: "/guides" },
    { label: "Company", href: "/company", path: "/company" },
];

export function SiteHeader() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        if (location.pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sectionIds: string[] = navItems.flatMap((item) => item.sectionId ? [item.sectionId] : []);
        let frameId: number | null = null;

        const syncActiveSection = () => {
            frameId = window.requestAnimationFrame(() => {
                const marker = window.scrollY + window.innerHeight * 0.4;
                const visibleSections = sectionIds
                    .map((id) => document.getElementById(id))
                    .filter((section): section is HTMLElement => section !== null);
                const eligibleSections = visibleSections.filter((section) => section.offsetTop <= marker);
                const currentSection = eligibleSections.length > 0 ? eligibleSections[eligibleSections.length - 1]?.id ?? "" : "";
                setActiveSection(currentSection);
                frameId = null;
            });
        };

        syncActiveSection();
        window.addEventListener("scroll", syncActiveSection, { passive: true });
        window.addEventListener("resize", syncActiveSection);
        return () => {
            window.removeEventListener("scroll", syncActiveSection);
            window.removeEventListener("resize", syncActiveSection);
            if (frameId !== null) window.cancelAnimationFrame(frameId);
        };
    }, [location.pathname]);

    const isActive = (item: NavItem): boolean => {
        if (item.sectionId) return location.pathname === "/" && activeSection === item.sectionId;
        return location.pathname === item.path;
    };

    return (
        <header className={`site-header ${isOpen ? "site-header--open" : ""}`}>
            <div className="shell site-header__inner">
                <BrandLockup />
                <nav className="desktop-nav" aria-label="Primary navigation">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        const isExternal = !item.sectionId;
                        return <SmartLink key={item.label} to={item.href} className={`nav-link${active ? " is-active" : ""}${isExternal ? " nav-link--external" : ""}`} aria-current={active ? "page" : undefined}>
                            {item.label}
                        </SmartLink>;
                    })}
                    <ThemeToggle />
                    <SmartLink className="nav-cta" to="/#download" aria-label="Download the YRecall app">
                        Download <ArrowUpRight size={15} strokeWidth={2.2} />
                    </SmartLink>
                </nav>
                <SmartLink className="mobile-header-cta" to="/#download" aria-label="Download the YRecall app">
                    Download
                </SmartLink>
                <button
                    className="menu-toggle"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    onClick={() => setIsOpen((current) => !current)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>
            <nav id="mobile-navigation" className="mobile-nav shell" aria-label="Mobile navigation">
                {navItems.map((item) => {
                    const active = isActive(item);
                    return <SmartLink key={item.label} to={item.href} className={`mobile-nav__link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setIsOpen(false)}>
                        {item.label} <ArrowUpRight size={16} />
                    </SmartLink>;
                })}
                <SmartLink className="mobile-nav__link" to="/support" onClick={() => setIsOpen(false)}>
                    Contact desk <ArrowUpRight size={16} />
                </SmartLink>
                <ThemeToggle mobile />
                <SmartLink className="button button--primary mobile-nav__cta" to="/#download" onClick={() => setIsOpen(false)}>
                    Download the app <ArrowUpRight size={16} />
                </SmartLink>
            </nav>
        </header>
    );
}

const footerLinkGroups: Array<{ label: string; links: Array<{ label: string; to: string }> }> = [
    {
        label: "Product",
        links: [
            { label: "Why YRecall", to: "/#why" },
            { label: "Features", to: "/#features" },
            { label: "Customer voices", to: "/#testimonials" },
            { label: "Our story", to: "/#story" },
            { label: "Download the app", to: "/#download" },
        ],
    },
    {
        label: "Company",
        links: [
            { label: "LYFSpot", to: "/company" },
            { label: "Founder’s note", to: "/company#founder" },
            { label: "Careers", to: "/careers" },
            { label: "Contact desk", to: "/support" },
        ],
    },
    {
        label: "Resources",
        links: [
            { label: "Guides & resources", to: "/guides" },
            { label: "Documentation", to: "/documentation" },
            { label: "Release notes", to: "/release-notes" },
            { label: "Licenses", to: "/licenses" },
            { label: "Report a bug", to: "/support#bug" },
        ],
    },
    {
        label: "Legal & account",
        links: [
            { label: "Terms of Service", to: "/legal/terms" },
            { label: "Privacy Policy", to: "/legal/privacy" },
        ],
    },
];

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="shell">
                <div className="footer-main">
                    <div className="footer-intro">
                        <BrandLockup />
                        <p>Make the important easy to find. A calmer way to organize the work and life around you.</p>
                        <a className="footer-email" href="mailto:support@yrecall.app">support@yrecall.app <ArrowUpRight size={15} /></a>
                    </div>
                    <nav className="footer-links" aria-label="Footer navigation">
                        {footerLinkGroups.map((group) => <div key={group.label}>
                            <p className="footer-label">{group.label}</p>
                            {group.links.map((link) => <SmartLink key={link.label} to={link.to}>{link.label}</SmartLink>)}
                        </div>)}
                        <div className="footer-social-section">
                            <p className="footer-label">Share</p>
                            <div className="footer-socials">
                                <a href="https://twitter.com/vuppula_sai" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
                                <a href="https://www.linkedin.com/company/lyfspot" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
                                <a href="https://www.facebook.com/VuppulaSravanSai" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} LYFSpot. YRecall is a LYFSpot product.</span>
                    <div>
                        <SmartLink to="/legal/terms">Terms of Service</SmartLink>
                        <SmartLink to="/legal/privacy">Privacy Policy</SmartLink>
                        <a href="mailto:hello@yrecall.app">hello@yrecall.app</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export function PageFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`site-shell ${className}`}>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
        </div>
    );
}

export function Eyebrow({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "navy" | "lime" }) {
    return <p className={`eyebrow eyebrow--${tone}`}>{children}</p>;
}

export function ButtonLink({ children, to, variant = "primary", className = "" }: { children: ReactNode; to: string; variant?: "primary" | "secondary" | "quiet"; className?: string }) {
    return (
        <SmartLink className={`button button--${variant} ${className}`} to={to}>
            {children}
        </SmartLink>
    );
}

export function SectionHeading({ eyebrow, title, body, align = "left" }: { eyebrow?: string; title: ReactNode; body?: ReactNode; align?: "left" | "center" }) {
    return (
        <div className={`section-heading section-heading--${align}`}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2>{title}</h2>
            {body ? <p>{body}</p> : null}
        </div>
    );
}
