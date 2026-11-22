# StageVerge Website

StageVerge Learn is an enterprise-style learning management dashboard built
with Next.js and TypeScript. It is a frontend prototype with a static export
for GitHub Pages. The project library currently contains six illustrative
project demos; learner accounts, course records, and progress are sample data,
not connected to a live project database.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Run
`npm run build` to generate the static site in `out/`.

## Local Ollama learning support

The AI tutor streams responses directly from Ollama in the learner's browser.
Chat messages are not sent through the StageVerge site. Install Ollama, then
download a model such as `llama3.2`:

```bash
ollama pull llama3.2
```

Allow the site origin in Ollama's `OLLAMA_ORIGINS` environment variable, then
restart Ollama. For local development, allow `http://localhost:3000`; for the
deployed site, also allow `https://stageverge.com`. The tutor checks
`http://localhost:11434/api/tags` for installed models and lets the learner
select one.

If Ollama is not running or the origin is not allowed, the dashboard remains
usable and the tutor shows a connection status and retry action.

## Project library

The Project demos section provides category filters, search, project overviews,
learning outcomes, tools, milestones, and an in-session “My learning” list.
Connect a project API or content management system to replace the sample demo
catalog before using it as a production course library.

The Dataset sources section links to [Kaggle Datasets](https://www.kaggle.com/datasets),
[Hugging Face Datasets](https://huggingface.co/datasets), the [UCI Machine Learning Repository](https://archive.ics.uci.edu/datasets),
[Google Dataset Search](https://datasetsearch.research.google.com/),
[OpenML](https://www.openml.org/search?type=data), and [Data.gov](https://data.gov/).
Check each dataset's license, attribution, and privacy requirements before use.

## Deployment

The workflow in `.github/workflows/static.yml` builds the Next.js static export
and deploys it to GitHub Pages on pushes to `master`.

In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. The workflow will publish the site at the repository's GitHub Pages URL.

The `public/CNAME` file and GitHub Pages settings use `stageverge.com`. The
domain's DNS records must also point to GitHub Pages. HTTPS can be enforced
after DNS verification and certificate provisioning.
