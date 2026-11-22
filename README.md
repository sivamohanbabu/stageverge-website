# StageVerge Website

Responsive StageVerge homepage built with Next.js and TypeScript, with static
export for GitHub Pages.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Run
`npm run build` to generate the static site in `out/`.

## Customize before launch

- Replace the booking button target in `app/page.tsx` with the actual discovery-call scheduling URL.
- Add approved live-demo links when they are ready to share.
- Review the copy and social preview metadata before launch.

## Deployment

The workflow in `.github/workflows/static.yml` builds the Next.js static export
and deploys it to GitHub Pages on pushes to `master`.

In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. The workflow will publish the site at the repository's GitHub Pages URL.

The `public/CNAME` file and GitHub Pages settings use `stageverge.com`. The
domain's DNS records must also point to GitHub Pages. HTTPS can be enforced
after DNS verification and certificate provisioning.
