# Monthly Digest

**[Read the live site](https://salaongithub.github.io/monthly-digest/)**

Monthly highlights on **artificial intelligence** and **world news**, available in English and German.

## Language and navigation

English is the default. The EN / DE control in the header switches both interface text and story content, including all ten AI issues. The choice is remembered in the browser and passed to issue links. Use `?lang=en` or `?lang=de` to share a language explicitly.

Each topic has its own monthly archive. The AI archive contains January–October 2026. The world-news archive starts with October 2026.

Arrow keys, buttons and touch swipes navigate stories. Home / End selects the first or last story. The world-news issue also has an overview of all ten headlines. Share individual slides using `#1` through `#10`.

Topic links: `#ai` and `#world`. Older `#weltgeschehen` links also select world news.

## Content and sources

The world-news edition contains ten selected developments researched through **October 28, 2026**. October is still in progress. Forecasts and ongoing developments are identified in the text; each story links to its sources. The English edition translates the existing German issue without changing its research cutoff.

Future monthly issues require editorial work; automated updates have not been configured.

## Attribution and rights

The AI archive, its original design and slide navigation come from [AI Monthly Digest by Niksa Visic](https://github.com/niksavis/ai-monthly-digest), under the MIT license. Source snapshot: `481e6acc469d1a07d4a319b21760e5138f0cf2b8`, retrieved October 28, 2026. The original license is included in `LICENSE`.

English AI story text and source links are retained. German translations, the language selector, navigation improvements and the bilingual world-news edition were added for SalaOnGitHub.

Images in the AI archive load from external providers and retain their original credits. Their respective owners retain image rights; the software license does not grant additional image rights. World-news artwork uses typographic illustrations.

## Source layout

- `index.html`, `home.css`, `home.js`: topic selection and archive.
- `language.js`, `language.css`: shared language preference, controls and interface translations.
- `months/YYYY-MM/`: original English AI issues, with `translations-de.js` for each month.
- `ai-language.js`: applies AI story translations and navigation labels.
- `data/world-2026-10.json`, `data/world-2026-10.en.json`: German and English world-news content.
- `scripts/build-digests.cjs`: generates the world-news issue and homepage catalog.
- `reader.js`, `reader.css`, `world-language.js`: bilingual world-news reader.

After editing world-news content, run `node scripts/build-digests.cjs`. The finished site requires no build step, packages, backend or API key to read.

## Hosting

GitHub Pages publishes `main`, directory `/(root)`. The `.nojekyll` file disables Jekyll processing. All internal paths are relative, supporting the GitHub Pages project subdirectory.

