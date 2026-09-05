# SEO Checklist — daliamcmillan.uk

On-page and technical SEO are done and verified (PageSpeed: SEO 100, Accessibility 100,
Best Practices 100, Performance 97–99; structured data on every page). What remains is
**off-site** work that only the business owner can do, plus a couple of optional on-site
polish items.

Reference values are collected at the bottom so every step is copy-paste ready.

---

## 1. Google Business Profile (GBP) — highest impact

The single biggest lever for local ranking (the Maps "map pack") and for the review
stars that on-page schema alone can't produce.

- [ ] **Rename the profile** to the real trading name: **`Dalia McMillan Solution Focused Hypnotherapy`**
      — drop the trailing "· Talking Therapy" (an added descriptor Google can flag as
      keyword-stuffing). This now matches the website schema.
- [ ] **Verify the profile** (if not already fully verified). Google chooses the method —
      usually **video verification** for a home/service-area business, with postcard / phone
      as fallbacks. Have your CPHT certificate and insurance to hand for the video.
- [ ] **Set it up as a Service-Area Business** (keeps your home address private):
      when asked "add a location customers can visit?" → **No**, then set service areas
      (see NAP below).
- [ ] **Primary category:** `Hypnotherapy service`.
      **Additional categories:** `Mental health service`, `Psychotherapist`.
- [ ] **Confirm NAP** matches the website exactly (see reference below).
- [ ] **Add services** mirroring the site: anxiety/stress/trauma; habits & addiction;
      confidence & performance; sleep, mood & pain; children & teens.
- [ ] **Add photos** — a headshot (the same one used on the site), plus any workspace shots.
- [ ] **Set hours** or mark "by appointment".
- [ ] **Add the website link:** `https://daliamcmillan.uk/`.
- [ ] **Start collecting reviews** — share the direct write-a-review link (below) with clients.
      Reviews on the profile are what surface as stars in search.

## 2. Google Search Console + Bing Webmaster Tools

Free, and closes the "can't see real rankings" gap. Doing Search Console *first* can also
unlock faster GBP verification (same Google account).

- [ ] **Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
      add and verify the `daliamcmillan.uk` domain (DNS TXT record is the robust method).
- [ ] Submit the sitemap: `https://daliamcmillan.uk/sitemap-index.xml`.
- [ ] **Bing Webmaster Tools** ([bing.com/webmasters](https://www.bing.com/webmasters)):
      add the site (can import from Search Console) and submit the same sitemap.
- [ ] After a week or two, check Search Console → Performance for the queries you're
      appearing for, and Coverage for any indexing issues.

## 3. Citations / directories (consistent NAP)

Each is a citation signal + a referral path. Use the **exact** NAP below on every one.

- [ ] **AfSFH therapist directory** (you're already a member — make sure your listing is live).
- [ ] **Psychology Today** therapist directory.
- [ ] **hypnotherapy-directory.org.uk**.
- [ ] **Bing Places** (mirrors GBP for Bing/Maps).
- [ ] Local Sussex / Hassocks / Brighton listings and any professional-body register.
- [ ] Keep Name, phone, website, and area **identical** across all of them.

## 4. Ongoing / monitoring

- [ ] **Core Web Vitals field data** — currently "unavailable" in PageSpeed because CrUX
      needs real traffic. It populates on its own; re-check PageSpeed in a few weeks once
      visitors accrue.
- [ ] Re-run the `pagespeed-audit` and `seo-audit` skills after any significant content change.
- [ ] Ask satisfied clients for a Google review periodically (steady trickle > one burst).

## 5. Optional on-site polish (low priority)

Performance is already 97–99, so these are only worth doing for a perfect score:

- [ ] **Image delivery** (~45 KiB mobile / ~107 KiB desktop) — tighten `sizes`/`widths` on
      the hero/portrait images in `src/pages/index.astro`.
- [ ] **Render-blocking** (~280 ms mobile) — inherent to the web-font setup; minor.

---

## Reference — use these exact values

**NAP (Name / Address / Phone):**

| Field | Value |
|---|---|
| Business name | `Dalia McMillan Solution Focused Hypnotherapy` |
| Practitioner | Dalia McMillan |
| Phone | `07826 323155` |
| Email | `daliamcmillantherapy@gmail.com` |
| Website | `https://daliamcmillan.uk/` |
| Service areas | Hassocks, Burgess Hill, Haywards Heath, Lewes, Brighton, Crawley (+ online) |

**Google Business Profile identifiers** (verified against the live listing):

| Thing | Value |
|---|---|
| Place ID | `ChIJo4FGACGNdUgR3O49Zb6-x7E` |
| CID | `12810417390030286556` |
| Profile URL (Maps) | `https://maps.google.com/?cid=12810417390030286556` |
| **Write a review** (share with clients) | `https://search.google.com/local/writereview?placeid=ChIJo4FGACGNdUgR3O49Zb6-x7E` |
| Read reviews | `https://search.google.com/local/reviews?placeid=ChIJo4FGACGNdUgR3O49Zb6-x7E` |

The write-a-review and read-reviews links, plus the Maps URL (`sameAs`/`hasMap` in schema),
are already wired into the site via `src/config.ts`.
