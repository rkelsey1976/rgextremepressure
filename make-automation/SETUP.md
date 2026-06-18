# RG Extreme Pressure — Weekly GBP Post Automation

## Architecture

```
Claude (scheduled weekly)
  → calculates week index
  → fetches live page from site
  → writes GBP post (no API key needed — it IS Claude)
  → POSTs to Make webhook
      → Make posts to Google Business Profile (2 modules)
```

No Anthropic API key needed. No AI module in Make needed. Make just handles the GBP OAuth.

---

## Part 1 — Claude scheduled task

Already created. Runs every Monday at 08:00.

The task is stored at:
`~/.claude/scheduled-tasks/rg-gbp-weekly-post/SKILL.md`

It rotates through **90 pages** (5 blog + 13 service + 24 area + 48 service+location) — nearly 2 years before repeating.

**To manage it:** Open Claude Code → Scheduled section in sidebar.

**One thing to add after Make setup:** Update the `MAKE_WEBHOOK_URL_PLACEHOLDER` in the task prompt with the real webhook URL (see Part 2, step 3).

---

## Part 2 — Make (2 modules only)

Use `gbp-webhook-poster.json` — not the full `gbp-weekly-post.json`.

### Step 1 — Import the blueprint

1. Make → **Scenarios → Create a new scenario**
2. Three-dot menu → **Import Blueprint**
3. Upload `gbp-webhook-poster.json`

### Step 2 — Connect Google My Business

1. Click module 2 (the HTTP POST)
2. Switch the Authorization header to use a **Google My Business OAuth connection**
3. Make → **Connections → Add → Google My Business** → sign in with the GBP account

### Step 3 — Replace placeholders in module 2

| Placeholder | Replace with |
|---|---|
| `YOUR_ACCOUNT_ID` | GBP account ID (numbers only — from Google My Business API or dashboard URL) |
| `YOUR_LOCATION_ID` | GBP location ID (numbers only) |
| `{{CONNECTION_TOKEN}}` | Switch to the Google My Business connection from step 2 |

### Step 4 — Copy the webhook URL

1. Click module 1 (the webhook)
2. Click **Copy address to clipboard**
3. Paste that URL into the Claude scheduled task — open `~/.claude/scheduled-tasks/rg-gbp-weekly-post/SKILL.md` and replace `MAKE_WEBHOOK_URL_PLACEHOLDER` with it

### Step 5 — Test

1. In Claude Code sidebar → Scheduled → rg-gbp-weekly-post → **Run now**
2. Watch the task output — it should show the generated post and "Posted successfully"
3. Check the GBP dashboard — the post should appear within 1–2 minutes

---

## Getting your GBP Account ID and Location ID

**Quickest method:**
1. Go to [Google My Business API Explorer](https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts/list)
2. Click "Try this method" → sign in → copy the account name (`accounts/123456789`)
3. Go to the locations endpoint, pass the account name → copy the location name
4. Use only the numeric parts in the Make URL

---

## Make scenario modules

| # | Module | What it does |
|---|---|---|
| 1 | Webhook | Receives `postText`, `ctaUrl`, `weekIndex` from Claude |
| 2 | HTTP POST → GBP API | Posts directly to Google Business Profile |

That's it. 2 modules. Make is purely the GBP OAuth bridge.

---

## Cost

- **Claude scheduled task:** Included in your Claude plan
- **Make:** 2 operations/week × 52 = 104 ops/year (free tier: 1,000/month)
- **GBP API:** Free
