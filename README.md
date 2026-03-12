# ASEAN AI Project Oracle

A static Akinator-style guessing game for showcasing ASEAN AI case studies on GitHub Pages.

## Stack

- React
- Vite
- TypeScript
- Vitest + Testing Library
- GitHub Actions for Pages deploy

## Local development

1. Install Node.js 20+ or 22+.
2. Run `npm install`.
3. Start the app with `npm run dev`.
4. Run tests with `npm run test:run`.

## Content updates

- Decision tree content lives in `src/data/gameTree.ts`.
- Replace the placeholder case-study links before production launch.
- Swap the local SVGs in `src/assets/` if you want production illustrations.

## Deployment

Set `Settings -> Pages -> Build and deployment -> Source` to `GitHub Actions`, then push to `master` or `main` to trigger `.github/workflows/deploy.yml`.
