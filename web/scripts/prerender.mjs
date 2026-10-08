import { chromium } from 'playwright';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';

const routes = [
    '/',
    '/guides',
    '/company',
    '/careers',
    '/support',
    '/documentation',
    '/licenses',
    '/release-notes',
    '/legal/terms',
    '/legal/privacy'
];

async function prerender() {
    console.log('Starting Vite preview server...');
    const server = await preview({ preview: { port: 4173 } });
    const url = server.resolvedUrls.local[0];
    
    console.log('Launching Playwright...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const outDir = path.resolve('dist');

    for (const route of routes) {
        console.log(`Prerendering ${route}...`);
        await page.goto(`${url}${route.substring(1)}`, { waitUntil: 'networkidle' });
        
        // Wait a tiny bit for any layout/effects to settle
        await page.waitForTimeout(500);

        let content = await page.content();
        
        // --- Inject Route-Specific JSON-LD ---
        let schema = null;
        const orgAndPerson = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": "https://yrecall.app/#organization",
                    "name": "LYFSpot",
                    "url": "https://sailyfspot.blogspot.com",
                    "founder": { "@id": "https://yrecall.app/#founder" }
                },
                {
                    "@type": "Person",
                    "@id": "https://yrecall.app/#founder",
                    "name": "Sravan Sai Vuppula",
                    "url": "https://buildwithsravan.dev",
                    "jobTitle": "Founder"
                }
            ]
        };

        if (route === '/') {
            schema = {
                "@context": "https://schema.org",
                "@graph": [
                    ...orgAndPerson["@graph"],
                    {
                        "@type": "WebSite",
                        "@id": "https://yrecall.app/#website",
                        "name": "YRecall",
                        "url": "https://yrecall.app/",
                        "publisher": { "@id": "https://yrecall.app/#organization" }
                    },
                    {
                        "@type": "SoftwareApplication",
                        "@id": "https://yrecall.app/#software",
                        "name": "YRecall",
                        "applicationCategory": "ProductivityApplication",
                        "operatingSystem": "Android",
                        "description": "An AI-powered personal memory system designed to help you capture, organize, search, and recall the information that matters in your life.",
                        "url": "https://yrecall.app/",
                        "downloadUrl": "https://github.com/sravansai-26/YRecall/releases/download/v1.0.0/YRecall-v1.0.0.apk",
                        "publisher": { "@id": "https://yrecall.app/#organization" },
                        "author": { "@id": "https://yrecall.app/#organization" }
                    }
                ]
            };
        } else if (route === '/company') {
            schema = {
                "@context": "https://schema.org",
                "@graph": [
                    ...orgAndPerson["@graph"],
                    {
                        "@type": "AboutPage",
                        "@id": "https://yrecall.app/company/#webpage",
                        "url": "https://yrecall.app/company",
                        "name": "About LYFSpot & YRecall",
                        "publisher": { "@id": "https://yrecall.app/#organization" }
                    }
                ]
            };
        } else if (route === '/support') {
            schema = {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "@id": "https://yrecall.app/support/#webpage",
                "url": "https://yrecall.app/support",
                "name": "Contact YRecall Support"
            };
        } else if (route.startsWith('/legal/')) {
            schema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Legal", "item": "https://yrecall.app/legal" },
                    { "@type": "ListItem", "position": 2, "name": route === '/legal/terms' ? "Terms of Service" : "Privacy Policy", "item": `https://yrecall.app${route}` }
                ]
            };
        }

        if (schema) {
            content = content.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n</head>`);
        }

        // --- Verify Assertions ---
        if (!content.includes('<body') || content.match(/<body[^>]*>\s*<\/body>/)) {
            console.error(`ERROR: Route ${route} has empty body.`);
            process.exit(1);
        }
        const h1Count = (content.match(/<h1[^>]*>/ig) || []).length;
        if (h1Count !== 1) {
            console.error(`ERROR: Route ${route} has ${h1Count} <h1> tags (must be exactly 1).`);
            process.exit(1);
        }
        if (!content.includes(`<link rel="canonical" href="https://yrecall.app${route}"`)) {
            console.error(`ERROR: Route ${route} is missing self-referencing canonical tag.`);
            process.exit(1);
        }
        const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
        if (!titleMatch) {
            console.error(`ERROR: Route ${route} is missing <title> tag.`);
            process.exit(1);
        }
        const descMatch = content.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
        if (!descMatch) {
            console.error(`ERROR: Route ${route} is missing meta description.`);
            process.exit(1);
        }
        
        console.log(`[${route}] Verified: title=${titleMatch[1].substring(0, 30)}... desc=${descMatch[1].substring(0,30)}...`);

        if (route === '/') {
            fs.writeFileSync(path.join(outDir, 'index.html'), content);
            console.log(`Saved /index.html`);
        } else {
            const filePath = path.join(outDir, `${route.substring(1)}.html`);
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, content);
            console.log(`Saved ${route}.html`);
        }
    }

    // Prerender 404
    console.log(`Prerendering 404...`);
    await page.goto(`${url}404-not-found-random`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const content404 = await page.content();
    fs.writeFileSync(path.join(outDir, '404.html'), content404);
    console.log(`Saved 404.html`);

    await browser.close();
    server.httpServer.close();
    console.log('Prerendering complete.');
}

prerender().catch(e => {
    console.error(e);
    process.exit(1);
});
