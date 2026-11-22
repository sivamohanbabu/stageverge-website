# StageVerge

StageVerge is a Next.js full-stack website for the existing StageVerge brand. It includes a validated business-challenge form whose submissions are stored in MongoDB Atlas for the StageVerge team to follow up. The form does not promise a response time or create a booking.

## Run locally

1. Install Node.js 22 and npm.
2. Copy `.env.example` to `.env.local` and set `MONGODB_URI` to a MongoDB Atlas connection string. Use a database user with access only to the StageVerge database and a strong password.
3. In Atlas, create the database user and allow connections from your development environment. Do not commit `.env.local` or share its contents.
4. Install dependencies and start the app:

   ```sh
   npm ci
   npm run dev
   ```

5. Open `http://localhost:3000`. Run `npm test`, `npm run typecheck`, and `npm run build` to validate changes.

`MONGODB_DB` defaults to `stageverge` when unset. The public endpoint is `POST /api/challenges`; `GET /api/health` is a liveness check and does not expose database status.

## Deploy to Vercel

Import this GitHub repository as a Next.js project in Vercel. `vercel.json` selects the Next.js framework and uses `npm ci` for a lockfile-based install. In **Project Settings → Environment Variables**, set `MONGODB_URI` to the Atlas connection string and `MONGODB_DB` to `stageverge` for the production environment (and preview only if previews should write to a separate, non-production database). Keep credentials in Vercel's environment settings, not in GitHub or this repository.

Create an Atlas database user with access only to the StageVerge database. Configure Atlas Network Access for the Vercel deployment using the current Vercel/Atlas integration or fixed egress options available for your plan; avoid broad public allowlists where possible. Deploy and confirm the Vercel health check succeeds before changing production DNS.

After the production deployment is ready, add `stageverge.com` in Vercel's domain settings and follow the exact DNS records and verification instructions shown for the project. DNS requirements can differ by domain provider, so copy the current values from Vercel.

## Domain and GitHub Pages migration

The previous GitHub Pages workflow and root `CNAME` have been removed to prevent new pushes from publishing the old static page. GitHub Pages may still be enabled in repository settings, so keep its current DNS in place until the Vercel deployment is working. Then disable the Pages deployment in **GitHub repository Settings → Pages**, replace the GitHub Pages DNS records with the records Vercel specifies, and wait for DNS propagation and certificate provisioning. Verify HTTPS for the apex domain and any `www` hostname you add in Vercel. These account and DNS changes must be performed by an owner with access to GitHub, Vercel, MongoDB Atlas, and the domain registrar.

## Submission handling

Submissions contain organization/contact details and free-text challenge information. Validate that the selected database and account comply with your privacy requirements, define an appropriate retention period, and restrict Atlas access to authorized operators. This initial version intentionally has no admin dashboard, email integration, authentication, rate limiting, or automatic booking links; submissions are persisted but are not emailed or displayed in the public site.
