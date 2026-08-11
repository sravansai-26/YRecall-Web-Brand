import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    path: string;
}

export function useSEO({ title, description, path }: SEOProps) {
    useEffect(() => {
        // Update title
        document.title = title;
        
        const updateMeta = (selector: string, attribute: string, value: string, nameAttr = 'name') => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(nameAttr, selector.match(/"([^"]+)"/)?.[1] || '');
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        const updateLink = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
        };

        const fullUrl = `https://yrecall.app${path}`;

        updateMeta('meta[name="description"]', 'content', description);
        updateLink('canonical', fullUrl);
        
        // Open Graph
        updateMeta('meta[property="og:url"]', 'content', fullUrl, 'property');
        updateMeta('meta[property="og:title"]', 'content', title, 'property');
        updateMeta('meta[property="og:description"]', 'content', description, 'property');
        
        // Twitter
        updateMeta('meta[name="twitter:title"]', 'content', title);
        updateMeta('meta[name="twitter:description"]', 'content', description);

    }, [title, description, path]);
}
