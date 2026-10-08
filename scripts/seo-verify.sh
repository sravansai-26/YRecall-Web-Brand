#!/usr/bin/env bash
set -u
CANON=${CANON:-https://yrecall.app}
PATHS=("/" "/guides" "/company" "/careers" "/support" "/documentation" "/licenses" "/release-notes" "/legal/terms" "/legal/privacy")
FAIL=0
bad(){ echo "FAIL: $*"; FAIL=1; }
ok(){ echo "ok:   $*"; }

if [[ -z "${SKIP_REDIRECT_MATRIX:-}" ]]; then
  echo "## 1. Redirect matrix (every route, every non-canonical variant)"
  for p in "${PATHS[@]}"; do
    for v in http://yrecall.app http://www.yrecall.app https://www.yrecall.app; do
      first=$(curl.exe -sS -o /dev/null --max-redirs 0 -w '%{http_code}' "$v$p")
      read -r hops final code < <(curl.exe -sS -o /dev/null -L --max-redirs 6 -w '%{num_redirects} %{url_effective} %{http_code}' "$v$p")
      if [[ "$first" =~ ^(301|308)$ && "$hops" == "1" && "$final" == "https://yrecall.app$p" && "$code" == "200" ]]; then
        ok "$v$p -> $first -> $final (1 hop, 200)"
      else
        bad "$v$p first=$first hops=$hops final=$final code=$code (want 301/308, 1 hop, https://yrecall.app$p, 200)"
      fi
    done
    c=$(curl.exe -sS -o /dev/null -w '%{http_code}' "https://yrecall.app$p")
    [[ "$c" == "200" ]] && ok "https://yrecall.app$p 200" || bad "https://yrecall.app$p returned $c"
  done
else
  echo "## 1. Redirect matrix skipped (SKIP_REDIRECT_MATRIX=1)"
fi

echo "## 2. Unknown URL must 404, not redirect"
c=$(curl.exe -sS -o /dev/null --max-redirs 0 -w '%{http_code}' "$CANON/this-page-should-not-exist-$RANDOM")
[[ "$c" == "404" || "$c" == "410" ]] && ok "unknown URL -> $c" || bad "unknown URL -> $c (want 404/410)"

echo "## 3. robots.txt + sitemap served directly"
for f in /robots.txt /sitemap.xml; do
  c=$(curl.exe -sS -o /dev/null --max-redirs 0 -w '%{http_code}' "$CANON$f")
  [[ "$c" == "200" ]] && ok "$f 200" || bad "$f returned $c"
done
curl.exe -s "$CANON/robots.txt" | grep -qi "^Sitemap: $CANON/sitemap.xml" && ok "robots lists sitemap" || bad "robots.txt missing Sitemap line"

echo "## 4. Sitemap completeness: every PATHS entry must be in the sitemap"
SM=$(curl.exe -s "$CANON/sitemap.xml")
for p in "${PATHS[@]}"; do
  echo "$SM" | grep -q "<loc>$CANON$p</loc>" && ok "sitemap has $p" || bad "sitemap missing $p"
done

echo "## 5. Every sitemap <loc>: canonical host, 200, indexable, self-canonical, one h1, title, description"
for u in $(echo "$SM" | grep -oP '(?<=<loc>)[^<]+'); do
  [[ "$u" == "$CANON"* ]] || bad "sitemap has non-canonical host: $u"
  c=$(curl.exe -sS -o /dev/null --max-redirs 0 -w '%{http_code}' "$u")
  [[ "$c" == "200" ]] || bad "sitemap URL $u returned $c"
  body=$(curl.exe -s "$u")
  echo "$body" | grep -qi "<link[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']$u[\"']" || bad "$u canonical missing or not self-referencing"
  echo "$body" | grep -qi "noindex" && bad "$u contains noindex"
  [[ $(echo "$body" | grep -oi "<h1" | wc -l) -eq 1 ]] || bad "$u must have exactly one <h1>"
  echo "$body" | grep -qi "<title>[^<]\+</title>" || bad "$u missing <title>"
  echo "$body" | grep -qi 'name="description"' || bad "$u missing meta description"
  echo "$body" | grep -qi 'name="viewport"' || bad "$u missing viewport meta"
  echo "$body" | grep -qiE 'http://(www\.)?yrecall\.app|https://www\.yrecall\.app' && bad "$u references a non-canonical yrecall URL"
done

echo "## 6. Uniqueness of titles and descriptions across the sitemap"
for tag in title description; do
  dups=$(for u in $(echo "$SM" | grep -oP '(?<=<loc>)[^<]+'); do
    b=$(curl.exe -s "$u")
    if [[ $tag == title ]]; then echo "$b" | grep -oiP '(?<=<title>)[^<]+' | head -1
    else echo "$b" | grep -oiP '<meta[^>]*name="description"[^>]*content="\K[^"]+' | head -1; fi
  done | sort | uniq -d)
  [[ -z "$dups" ]] && ok "all $tag values unique" || bad "duplicate $tag: $dups"
done

echo; [[ $FAIL -eq 0 ]] && echo "ALL CHECKS PASSED" || { echo "CHECKS FAILED"; exit 1; }
