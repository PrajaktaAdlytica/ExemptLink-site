# Connect ExemptLink to Vercel

This repository is a prebuilt static site. The deployable directory is `dist`.

1. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
2. Import `PrajaktaAdlytica/ExemptLink-site` from GitHub.
3. Keep the framework preset as **Other** (or **Static HTML** if shown).
4. Set **Output Directory** to `dist`.
5. Leave the build command empty for the fastest deploy. If Vercel requires one, use `npm run build`.
6. Deploy the project.
7. For a custom domain, open **Project Settings → Domains**, add the domain, and copy the DNS records Vercel provides into your registrar.

The repository already includes the generated HTML, CSS, JavaScript, fonts, logo, favicon, brand kit, and intro-film source/deliverables. No environment variables are required for the current front-end-only demo.

For future source edits, run:

```bash
npm ci
npm run build
npm run check
```

Then commit and push to `main`; Vercel will create a preview deployment and update production according to the project settings.
