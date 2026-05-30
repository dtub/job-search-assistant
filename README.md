# Job Search Assistant

An AI-powered job search tool that assesses role fit and generates tailored resume content. Built with Claude.

## What it does

1. Describe your background, goals, and constraints in plain text
2. Paste any job description
3. Get an honest fit assessment (APPLY / CONSIDER / SKIP) with a score and reasoning
4. If recommended, generate tailored resume content and cover letter angles in one click

## Setup (takes about 20 minutes)

### 1. Create or fork this GitHub repo

Make sure your repo contains these three files:
```
README.md
api/claude.js
public/index.html
```

### 2. Create a Vercel account

Go to [vercel.com](https://vercel.com) and sign up for free.

### 3. Connect your GitHub repo to Vercel

- In Vercel dashboard: **Add New Project → Import Git Repository**
- Connect GitHub and select this repo
- Leave all build settings as default
- Click **Deploy**

### 4. Add your Anthropic API key

- In Vercel dashboard: go to your project → **Settings → Environment Variables**
- Click **Add**
- Name: `ANTHROPIC_API_KEY`
- Value: your API key from [console.anthropic.com](https://console.anthropic.com)
- Click **Save**
- Go to **Deployments → Redeploy** to apply the new variable

### 5. Share your URL

Vercel gives you a URL like `https://your-project-name.vercel.app`. Share it with anyone — no setup needed on their end.

## Cost

- Vercel: Free tier (100GB bandwidth/month, generous function limits)
- Anthropic API: ~$0.01-0.03 per assessment (Claude Sonnet pricing)

## File structure

```
job-search-assistant/
├── public/
│   └── index.html      # The app
├── api/
│   └── claude.js       # Serverless proxy for Anthropic API
└── README.md
```

## Customization

To update the model or tweak prompts, edit `api/claude.js` and `public/index.html`.
