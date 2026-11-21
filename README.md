# StageVerge Website

Static, responsive StageVerge homepage served with GitHub Pages.

## Customize before launch

- Replace the booking button target in `index.html` with the actual discovery-call scheduling URL.
- Add approved live-demo links when they are ready to share.
- Review the copy and social preview metadata before launch.

## Deployment

The workflow in `.github/workflows/static.yml` deploys the site to GitHub Pages on pushes to `master`.

In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. The workflow will publish the site at the repository's GitHub Pages URL.

The root `CNAME` file and GitHub Pages settings use `stageverge.com`. The domain's DNS records must also point to GitHub Pages. HTTPS can be enforced after DNS verification and certificate provisioning.
