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

        const content = await page.content();
        
        const dir = path.join(outDir, route);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, 'index.html'), content);
        console.log(`Saved ${route}/index.html`);
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
