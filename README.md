# Job Search Assistant

An AI-powered job search tool that assesses role fit and generates tailored resume content. Built with Claude.

## What it does

1. You describe your background, goals, and constraints in plain text
2. Paste any job description
3. Get an honest fit assessment (APPLY / CONSIDER / SKIP) with a score and reasoning
4. If recommended, generate tailored resume content and cover letter angles in one click

## Setup (takes about 20 minutes)

### 1. Fork or clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/job-search-assistant
cd job-search-assistant
```

### 2. Create a Netlify account

Go to [netlify.com](https://netlify.com) and sign up for free.

### 3. Connect your GitHub repo to Netlify

- In Netlify dashboard: **Add new site → Import an existing project**
- Connect GitHub and select this repo
- Build settings will be auto-detected from `netlify.toml`
- Click **Deploy site**

### 4. Add your Anthropic API key

- In Netlify dashboard: **Site configuration → Environment variables**
- Click **Add a variable**
- Key: `ANTHROPIC_API_KEY`
- Value: your API key from [console.anthropic.com](https://console.anthropic.com)
- Click **Save**
- Go to **Deploys → Trigger deploy** to redeploy with the new variable

### 5. Share your URL

Netlify gives you a URL like `https://your-site-name.netlify.app`. Share it with anyone — no setup needed on their end.

## Cost

- Netlify: Free tier (125k function invocations/month)
- Anthropic API: ~$0.01-0.03 per assessment (Claude Sonnet pricing)

## File structure

```
job-search-assistant/
├── public/
│   └── index.html          # The app
├── netlify/
│   └── functions/
│       └── claude.js       # Serverless proxy for Anthropic API
├── netlify.toml            # Netlify config
└── README.md
```

## Customization

To update the model or tweak prompts, edit `netlify/functions/claude.js` and `public/index.html`.
