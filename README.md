# StageVerge Website

Static, responsive StageVerge homepage served with GitHub Pages.

## Customize before launch

- Replace the booking button target in `index.html` with the actual discovery-call scheduling URL.
- Add approved live-demo links when they are ready to share.
- Review the copy and social preview metadata before launch.

## Deployment

The workflow in `.github/workflows/pages.yml` deploys the site to GitHub Pages on pushes to `master`.

In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. The workflow will publish the site at the repository's GitHub Pages URL.

To use `stageverge.com`, add the custom domain in GitHub Pages settings and configure the required DNS records at the domain provider. HTTPS will be available after DNS verification and certificate provisioning.
