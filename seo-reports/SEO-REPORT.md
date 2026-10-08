# SEO & GSC Redirect Resolution Report

## 1. Root cause per failing GSC URL

- **`http://www.yrecall.app/` & `https://www.yrecall.app/`**
  - **Root Cause**: Validation failed because requests to `http://www.yrecall.app/` are currently hitting a 2-hop redirect chain instead of a clean 1-hop redirect. Specifically, a request to `http://www.yrecall.app/` first receives a `301` to `https://www.yrecall.app/`, which then issues another `301` to `https://yrecall.app/`. Google Search Console strictly requires a single hop `301` to the canonical URL to resolve "Page with redirect" warnings. This is often caused by a registrar forwarding rule or Cloudflare's "Always Use HTTPS" edge feature executing before page rules.
  
- **`http://yrecall.app/`**
  - **Root Cause**: GSC flagged this as "Page with redirect" (which is technically correct and expected for non-canonical HTTP variants). The failure in validation is tied to the redirect chain on the `www` variant, as well as the site's previous SPA behavior (where all routes served the same `index.html` causing massive duplicate titles and missing canonical tags on subpages). 

## 2. Before/After Matrix & Verification

- **Before (`before-verify.txt`)**: 
  - Showed 2-hop redirects for `http://www.yrecall.app/` variants.
  - Showed unknown URLs returning `200` instead of `404` (soft 404s).
  - Highlighted critical SPA issues: Missing `<h1>` tags on specific pages, missing canonical tags on subpages, and duplicate `<title>` tags across the entire sitemap (because the server was just returning the empty SPA `index.html` shell for every route).
- **After**: I have implemented the fixes locally (prerendering and `_redirects` update). Since I cannot deploy to production without your permission, `seo-verify.sh` must be run by you post-deploy to generate `after-verify.txt` and confirm the Edge changes.

## 3. Route Inventory Table (Final State)

| Route | Source File | In Nav/Footer? | In Sitemap? | HTTP Status | Indexable? | Notes |
|---|---|---|---|---|---|---|
| `/` | `pages/Home.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/guides` | `pages/guides.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/company` | `pages/about.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/careers` | `pages/careers.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/support` | `pages/contact.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/documentation` | `pages/Documentation.tsx`| Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/licenses` | `pages/Licenses.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/release-notes` | `pages/ReleaseNotes.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/legal/terms` | `pages/terms.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |
| `/legal/privacy` | `pages/privacy.tsx` | Yes | Yes | 200 | Yes | Canonical. Prerendered HTML. |

## 4. Files Changed

- `scripts/seo-verify.sh`: Created the requested verification bash script to test all redirects and canonicals.
- `web/package.json`: Added `playwright` prerendering script to the `build` command so that HTML shells are generated for all 10 valid routes.
- `web/scripts/prerender.mjs`: Wrote the prerendering script to solve the "Empty Root Div" / SPA SEO issue. This generates actual HTML for crawlers and creates a real `404.html` so unknown routes correctly 404 instead of soft-404ing.
- `web/public/_redirects`: Corrected the Cloudflare Pages syntax (removed `!` which is Netlify-specific) and ensured `www` redirects are properly defined.
- `web/public/robots.txt`: Simplified to standard `Allow: /` and sitemap declaration, removing fake `/api/` and `/admin/` rules as requested.
- `web/index.html`: Removed unsupported `fetchpriority` attribute to satisfy compat-api warnings.

## 5. Manual Actions for Sravan (Requires Cloudflare/Registrar Dashboard)

1. **Fix the 2-Hop Redirects (Cloudflare/Registrar)**: 
   - Ensure that `www.yrecall.app` directly points to Cloudflare Pages (or use a Cloudflare Bulk Redirect Rule) so that it issues a single `301` to `https://yrecall.app/`. If you are using "Always Use HTTPS" in Cloudflare, it forces HTTP -> HTTPS *before* domain redirects. You may need to use a Page Rule for `http://*yrecall.app/*` to directly `301` redirect to `https://yrecall.app/$2`.
2. **Post-Deploy Verification**: Run `bash scripts/seo-verify.sh > seo-reports/after-verify.txt` from Git Bash *after* you deploy these changes to production to ensure the edge is behaving correctly.
3. **Google Search Console**: Once the above script passes, click **Validate Fix** in GSC for the "Page with redirect" issue.

## 6. Open TODO(Sravan) Facts
- No fake data was invented. Structured data inside `index.html` correctly identifies Sravan Sai Vuppula as Founder. Ensure social links inside the app match exactly what schema expects.

## 7. Risks and Deliberately Not Done
- I did not remove the `theme-color` meta tag, as the warning was just a minor browser compatibility hint (Firefox doesn't support it, but Chrome/Safari do, and it is perfectly valid HTML).
- I did not run the `after-verify.txt` because the checks strictly enforce testing against the production `https://yrecall.app` domain, and I am adhering to the rule: "Do not push to production... without telling me first."
