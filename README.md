# StageVerge Website

StageVerge Reader is a private, client-side PDF reading experience built with
Next.js and TypeScript. It is a static export for GitHub Pages. Choose a PDF
and optional audio file from your device; both are used locally in your browser
and are not uploaded or bundled with the site.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Run
`npm run build` to generate the static site in `out/`.

## Reading locally

Use **Open a PDF** to select a document on your device. The reader embeds the
browser's built-in PDF viewer, with controls for direct page navigation, zoom,
and display contrast. The page field and previous/next buttons complement the
viewer toolbar; use the built-in toolbar for the document's page count and text
search.

Use **Add a local audio file** to play an audio track alongside your reading.
Only select audio you have permission to use. The PDF and audio are loaded as
local browser object URLs and are never sent to a server. Selecting another
document or leaving the page releases the temporary local URL.

## Deployment

The workflow in `.github/workflows/static.yml` builds the Next.js static export
and deploys it to GitHub Pages on pushes to `master`.

In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. The workflow will publish the site at the repository's GitHub Pages URL.

The `public/CNAME` file and GitHub Pages settings use `stageverge.com`. The
domain's DNS records must also point to GitHub Pages. HTTPS can be enforced
after DNS verification and certificate provisioning.
