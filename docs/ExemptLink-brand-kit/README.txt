EXEMPTLINK — BRAND KIT 1.0
14 October 2026
Selected website direction: Jurisdiction Atlas.
Selected logo: Option 2, Jurisdiction Seam.

OPEN THE BRAND BOOK
Open index.html in a browser. For consistent font loading and clipboard behavior, serve this folder locally:
  python3 -m http.server 8769 --bind 127.0.0.1
Then open http://127.0.0.1:8769/
No account, build step, remote font service or npm install is required.
The full-kit ZIP link in the book expects ExemptLink-brand-kit.zip beside the folder; individual asset links work independently.

WHAT IS INCLUDED
- Editable vector symbol, outlined wordmark and horizontal lockups in primary, slate, teal, black and white.
- Transparent PNG exports, favicon SVG/ICO/PNG sizes 16–512, 180px touch icon and web manifest.
- Two locally supplied type families: Instrument Sans and Newsreader, regular and italic variable TTF/WOFF2 with OFL licenses.
- Brand primitives and semantic colors; 15 calculated key contrast pairs; JSON/CSS tokens.
- Display/H1–H6, body, lead, caption, label, button, eyebrow and data text styles.
- Spacing, margins, alignment, 12/8/4-column grids, component radii, border, shadow and focus guidance.
- Working specimens of 12 hover/focus treatments, primary/secondary/text CTAs, disabled/loading states, inputs and disclosures.
- Five original SVG background patterns and three original generated material images, supplied as PNG/WebP.
- Thirty page-specific animated SVG hero scenes with a route, story, background and mobile plan for each.
- 56 licensed Lucide UI icons, 14 original evidence-workflow icons and 2 social marks. Individual SVGs plus sprite.
- Brand voice, positioning, buyer qualifier, workflow descriptions and CTA copy.
- Research links, asset provenance, source hashes, licenses, image-generation prompts and browser preview screenshots.

DESIGN FOUNDATION
Porcelain #F7F8F4 and white #FFFFFF are the main canvases.
Ink #263B36 is primary text. Mineral teal #32776B is brand; dark teal #245B50 is action.
Copper #B97A50 is a locational accent, never small text; use copper ink #8A5534 for text.
Paper, mist, sand, quiet violet and deep mineral separate editorial, evidence, scope, comparison and control chapters.
Status colors always accompany words and icons; a green state is never a tax determination.
Use Instrument Sans for UI, headings, data and controls; Newsreader for selected editorial phrases.
The logo clear space is at least one quarter of symbol width. Do not stretch or change the three fields and stepped seams.

IMPLEMENTATION
Use tokens/tokens.css for variables and tokens/components.css for button/input interaction styles.
Components rely on the supplied tokens and font declarations; copy the @font-face declarations from brandbook.css.
The brand book includes the sprite inline. In another page, inline icons/sprite.svg once and reference its symbol IDs with SVG use.
Standalone animated hero SVG files are editable. For production typography, inline them into a page with local @font-face rules; SVGs embedded as img may fall back to Arial for text.
Supply semantic headings, descriptions and accessible names in the surrounding page. Decorative icons should be aria-hidden.
Each production page should use its own scene from page-hero-plan.json and the section identities described in chapter 7.
The mobile gallery shows simplified readable treatments. It is not a complete mobile page design; build the route-specific mobile composition described in the manifest.

INTERACTION AND MOTION
Treatments: shutter fill, label flip, icon exchange, arrow slot, seam underline, border trace, source highlight, document peel, row trace, gentle magnetic label, relational focus and disclosure rotation.
One main treatment per control. Most transitions are 160–360ms with cubic-bezier(.22,1,.36,1).
Buttons maintain stable hit areas and accessible names. Hover never hides essential evidence, changes a decision or implies approval.
Keyboard focus: 3px outline with 3px offset. Default button/input height 44px; large buttons 48px. Mobile pause control is 44px.
Hero sequences enter once and settle. Replay, Pause and Still state are available in the gallery.
The brand book honors prefers-reduced-motion, pauses the active scene offscreen, and pauses animations while the document is hidden.
No video files are included; the kit supplies actual SVG animation and a later video style specification.

PRODUCT AND CLAIM BOUNDARIES
ExemptLink remains a research-stage US sales-tax exemption evidence concept.
The five offers remain independent: linkage; remediation requests; jurisdiction completeness; immutable audit sample packets; monthly engine/GL/exemption reconciliation. Immutability is a proposed product requirement, not a capability established by these SVGs.
The first proposed pilot uses 100 permissioned historical exempt sales and certificates for one US state, selecting one workflow.
The tax owner reviews ground truth and incremental gaps beyond the incumbent suite. Suggested, approved and completed states stay separate.
$2,000 for a bounded pilot and $600–$2,000/month are test hypotheses, not live offers or accepted pricing.
No customer testimonials, production integrations, certifications, savings, compliance guarantees or real transaction records are implied.
No sending, payments, filings, tax determinations, ERP writes or sensitive-record intake occurs in this brand kit.
The delivered pages are brand-book chapters and motion specimens, not implemented website routes or an operating SaaS.

SYNTHETIC EXAMPLES AND JURISDICTION CORRECTION
TX-091: Oakline Wholesale seller, Blue Mesa Supply LLC buyer, New York sale Apr 18, 2026, USD 1,200.
CE-21: candidate evidence for Blue Mesa Supply West LLC / New Jersey; received Apr 10. Entity/jurisdiction mismatch remains held for tax-owner review.
Do not impose universal expiry on a New York blanket certificate. The prior concept's expired-NY-certificate assumption is explicitly corrected in the timeline and IA.
CE-F25 is a separate Florida annual resale example: 2025 certificate, Dec 31, 2025 expiry, Apr 18, 2026 sale. It is separate from the NY sample and totals.
Monthly reconciliation: illustrative GL USD 16,000, engine USD 15,100, exemption sample USD 16,000, population difference USD 900. This difference is not a liability or recovered amount.
Map geometry is simplified Census 2017 cartography through us-atlas, not current tax-law coverage. NY highlighting represents a fictional sample.

LICENSES AND SOCIAL MARKS
Retain the font OFL, Lucide ISC/Feather MIT, Font Awesome CC BY 4.0, Simple Icons CC0 and US Atlas ISC notices supplied in the folders.
LinkedIn [in] is from Font Awesome; Crunchbase is from Simple Icons. These are library-provided asset specimens, not owner-issued approval or affiliation badges.
Respect each owner's usage guidance and trademarks. Enable footer social links only after real company profile URLs are supplied.
Original category icons and pattern/scene artwork are created for this kit. The selected logo geometry was traced from the approved concept; provenance is recorded in brand/trace-provenance.json.
Original material bitmap imagery was created with image generation; prompts and edit notes are in research/image-prompts.json. It contains no real private records.
Brand/trademark clearance is separate from this design work.

RESEARCH
Research used the configured Perplexity high preset, primary documentation and the previously captured visual references.
Modern Treasury and Ramp informed restrained hero storytelling; Vanta informed clear card composition and interaction craft. Their screens/logos are not reproduced.
Hover mechanics and timings in this kit are original proposals, not claims about the exact implementation of those reference sites.
The original brief and prior ExemptLink IA control offer scope. Research suggestions did not replace the five offers.
See research/research-notes.txt for the cited principles and URLs, and research/asset-sources.json for downloaded-asset hashes.

QA
See QA.json for completed checks and their limits. The browser preview was checked at 1440x900, 834x1112 and 390x844.
All 30 desktop hero variants were selected and checked for text extending outside SVG bounds.
The tested mobile caption overlap was corrected; mobile and tablet have no page-level horizontal overflow.
This is not a claim of full WCAG conformance or completed production-site QA.
