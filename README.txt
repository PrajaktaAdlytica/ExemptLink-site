EXEMPTLINK / JURISDICTION ATLAS WEBSITE
Complete concept website / 14 October 2026

CONTENTS
30 complete routes from the approved IA, plus a host 404 fallback.
The five independent proposed workflow pages, shared review process, use cases, pilot protocol, hypothetical pricing, isolated demo, invoice, sample report, separate Florida example, resource guides, source register, evaluation method, controls, company, contact, request flows, preview access and draft legal notices.
Approved Logo 2, local Instrument Sans/Newsreader fonts, favicon, palette and icon assets are implemented from the brand kit.
Each route has its own animated SVG hero scene. Mobile has purpose-specific diagrams and legible stacked treatments. Homepage uses an original animated jurisdiction atlas and invoice relationship.
Section treatments include source excerpts, link diagrams, request gates, checklists, packet stacks, control totals, process rows, persona pictograms, sample grids, editorial materials and permission boundaries.

RUN LOCALLY
No package install or build step is needed:
  python3 -m http.server 8770 --bind 127.0.0.1 --directory dist
Open http://127.0.0.1:8770/
Serve dist as the root; direct filesystem opening cannot resolve root-relative routes/assets.
All site HTML, CSS and JavaScript are editable in dist/.
source/build_site.py regenerates route HTML from the sibling ExemptLink-brand-kit folder. CSS/JS remain editable in dist/assets and are not overwritten by that generator.
source/check_site.py validates links, assets, headings, SVGs and fixture control totals.
The optional social-preview renderer requires Sharp (npm module), or SHARP_MODULE pointing to an installed module. The rendered image is already supplied.

SYNTHETIC DEMO
Ten NY records total USD 16,000: 3 held, 3 pending, 2 completed, 1 rejected, 1 approved. These are fixture states, not unsupported-exemption rates or operating performance.
TX-091: Oakline Wholesale -> Blue Mesa Supply LLC, New York, Apr 18, 2026, 12 units x USD 100 = USD 1,200, source tax USD 0.
Candidate CE-21 names Blue Mesa Supply West LLC / New Jersey; signed Jan 5 and received Apr 10.
Imported Mar 31 expiry is unverified. The fictional accountant rejects a universal NY expiry inference, preserving the entity/state hold.
The deterministic path requires a nonempty correction reason, distinguishes approval from delivery, preserves CE-21 after fictional CE-31 is supplied, and records a separate simulated review.
Completed simulation counts: 2 held, 3 pending, 3 completed, 1 rejected, 1 approved.
The packet includes original/replacement sources, correspondence, scripted approval/correction events and an unresolved appendix. Export is a local DEMO file, not an immutable-storage or legal-validity claim. Each changed scripted state receives its own illustrative version.
Editing a jurisdiction assumption opens a labeled sandbox branch and blocks the canonical approval path; Reset returns to canonical fixtures.
The Florida annual-resale example is separate from NY totals. CE-F25 expires Dec 31, 2025 before Apr 18, 2026 sale TX-F01 / USD 500. No signature rule is invented for this annual certificate.
Reconciliation: GL 16,000 / engine 15,100 / evidence 16,000; USD 900 difference is synthetic TX-096 absent from engine export. It is not savings or liability.

FORMS AND ACCESS
All form specimens have visible labels, required-field checks, errors, unchecked scoped consent and a local draft review/download.
They do not send messages, store CRM leads, book meetings or register subscriptions. Delivery is explicitly unconnected. No false delivery confirmation, pilot_request or consent_submit event is emitted.
No customer-record uploads, payment collection, real credentials, filings, determinations, customer sends or system writes are enabled.
Preview access enters the demo without collecting a password. Legal/operator/contact details need verified input before live collection.

ANALYTICS
Test-mode events remain in page memory and have no external transport.
landing_view, offer_14_selected, demo_open, evidence_view, override_view and price_view are implemented with bounded, non-sensitive properties.
buyer_qualified, pilot_request and consent_submit require a real qualification/delivery/consent process and are defined in analytics-event-map.json but deliberately not falsely fired here.
UTM source/campaign values are whitelisted and length-bounded. Email, free text, raw documents, transaction values and customer identifiers are excluded from clickstream events.

MOTION AND ACCESSIBILITY
Finite entrance/trace/bar sequences. Native scrolling, keyboard focus, mobile dialog navigation, native disclosures and keyboard-operated record tabs.
Pause motion is available in the footer. Offscreen and hidden-page animation pauses. prefers-reduced-motion produces immediate still states.
No continuous decorative animation or essential information hidden on hover. Shutter, flip, directional-icon exchange, source highlighting, small document peel and seam/row feedback are implemented.
The original 15 key palette contrast pairs are retained. Dark hero copy and buttons have separate accessible color treatments. This is not a claim of full WCAG certification.

PUBLICATION AND SCOPE
The Sites deployment is owner-private. It is a published concept website, not an operating tax SaaS or custom-domain launch.
Source identity and static-directory configuration are in .openai/hosting.json. No credentials are bundled.
Robots/metadata keep the concept out of public indexing. The real company profile URLs and custom domain have not been supplied.
Sources and guidance are informational and subject to tax-owner/counsel review; US sales-tax exemption evidence only, no VAT or income-tax substantiation.
Proceed commercially only on previously unidentified, remediable gaps, tax-owner sign-off and a signed/funded audit-prep pilot. Stop if the existing suite closes the same job at lower total review cost.

QA AND LICENSES
qa/ contains route checks, workflow verification notes and real browser captures at desktop/mobile sizes. The 30 routes were inspected for overflow, headings and hero coverage.
Original kit font/icon/US Atlas license and provenance files are retained in dist/assets. Social marks are specimens pending real company URLs, not partnership badges.
