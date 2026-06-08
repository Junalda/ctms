# Git-workflow: staging → main

Twee langlevende branches, twee omgevingen op Vercel.

```
 feature werk
      │  commit
      ▼
 ┌──────────┐   push    ┌─────────────────────────┐
 │ staging  │ ────────▶ │ Vercel Preview (staging) │  ← testen/reviewen
 └──────────┘           └─────────────────────────┘
      │  Pull Request (staging → main)
      │  ▸ CI-build moet groen zijn
      │  ▸ review/approval
      ▼  merge
 ┌──────────┐  auto     ┌─────────────────────────┐
 │   main   │ ────────▶ │ Vercel Production (live) │
 └──────────┘           └─────────────────────────┘
```

- **`main`** = productie. Geen directe pushes; alleen via PR vanuit `staging`.
- **`staging`** = test/preview. Al het werk gaat hier eerst heen.

## Dagelijkse flow

```bash
# 1. Begin op staging, altijd up-to-date
git checkout staging
git pull origin staging

# 2. Werk + commit (eventueel op een feature-branch)
git checkout -b feature/iets        # optioneel
# ... wijzigingen ...
git add -A
git commit -m "Beschrijf de wijziging"

# 3. Naar staging
git checkout staging
git merge feature/iets              # sla over als je direct op staging werkt
git push origin staging
# → Vercel bouwt automatisch de staging-preview; CI draait de build

# 4. Testen op de staging-URL. Akkoord?
#    Open een Pull Request staging → main (GitHub UI of de gh CLI):
#    gh pr create --base main --head staging --title "Release" --body "..."

# 5. Na groene checks + approval: merge de PR in de GitHub UI.
#    → Vercel deployt main automatisch naar productie.
```

## Eenmalige opzet

```bash
# main aanmaken vanuit de huidige projectinhoud en als default instellen
git checkout -b main
git push -u origin main            # zet daarna in GitHub: Settings → default branch = main

# staging aftakken van main
git checkout -b staging
git push -u origin staging
```

## Branch protection op `main` (GitHub → Settings → Branches → Add rule)

Branch name pattern: `main`

- ✅ Require a pull request before merging  (→ geen directe pushes)
- ✅ Require status checks to pass before merging → selecteer **`build`**
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings
- (optioneel) Require approvals: 1

## Vercel — twee omgevingen

- **Production Branch** = `main` (Project → Settings → Git).
- Elke push naar `staging` levert automatisch een **Preview Deployment**.
  Stabiele staging-URL: Settings → Domains → koppel bv. `staging.capturethemoment.nl`
  aan de branch `staging`.
- **Environment Variables** (Project → Settings → Environment Variables):

  | Variabele         | Production              | Preview (staging)              |
  |-------------------|-------------------------|--------------------------------|
  | `PUBLIC_SITE_URL` | `https://www.…nl`       | `https://staging.…nl`          |

  `astro.config.mjs` leest `PUBLIC_SITE_URL` (met productiedomein als fallback),
  zodat canonical-URL's en de sitemap per omgeving kloppen.

> Tip: zet staging op `noindex` (X-Robots-Tag header of meta robots) zodat
> Google de testomgeving niet indexeert.
