# Monthly Digest

**[Read the live site](https://salaongithub.github.io/monthly-digest/)**

Monthly highlights on **artificial intelligence**, **world news**, **finance** and **supply chain applications**, available in English and German.

## Language and navigation

English is the default. The EN / DE control in the header switches both interface text and story content, including all ten AI issues. The choice is remembered in the browser and passed to issue links. Use `?lang=en` or `?lang=de` to share a language explicitly.

Each topic has its own monthly archive. The AI archive contains January–October 2026. The other three archives start with October 2026.

Arrow keys, buttons and touch swipes navigate stories. Home / End selects the first or last story. World news, finance and supply chain issues also have an overview of all ten headlines. Share individual slides using `#1` through `#10`.

Topic links: `#ai`, `#world`, `#finance` and `#supply-chain`. Older `#weltgeschehen` links also select world news.

## Reading layout

The site uses one text family throughout. On laptop screens, compact slide layouts keep the story, image credits and navigation together. Narrow screens and high browser zoom use normal page scrolling; there are no nested scrolling panels inside slides. World-news previews use bounded landscape thumbnails.

## Content and sources

The world-news edition contains ten selected developments researched through **October 28, 2026**. October is still in progress. Forecasts and ongoing developments are identified in the text; each story links to its sources. The English edition translates the existing German issue without changing its research cutoff.

The first **finance** edition combines six October developments with four clearly labelled investor explainers, researched through **October 29, 2026**. It focuses on stocks, ETFs, company results, diversification, costs and fund documentation. The articles provide context and education; they do not recommend purchases or personalised portfolios.

The first **supply chain applications** edition contains seven October announcements, one industry analysis and two standards explainers, researched through **October 29, 2026**. It covers planning agents, digital twins, warehouse automation, supplier risk, visibility, freight fuels and GS1 standards. Planned availability, testing and deployment are distinguished. Provider claims are attributed to their primary sources.

Future monthly issues require editorial work; automated updates have not been configured.

## Attribution and rights

The AI archive, its original design and slide navigation come from [AI Monthly Digest by Niksa Visic](https://github.com/niksavis/ai-monthly-digest), under the MIT license. Source snapshot: `481e6acc469d1a07d4a319b21760e5138f0cf2b8`, retrieved October 28, 2026. The original license is included in `LICENSE`.

English AI story text and source links are retained. German translations, the language selector, navigation improvements and the three additional bilingual topics were added for SalaOnGitHub.

Images in the AI archive load from external providers and retain their original credits. Their respective owners retain image rights; the software license does not grant additional image rights. The topic covers and all stories in the other three topics include photographs with visible attribution and license links. Archival and illustrative images are identified in captions. The 21 local photographs are served from the repository, with full provenance in `data/images.json`; some illustrations are reused where relevant.

## Source layout

- `index.html`, `home.css`, `home.js`: topic selection and archive.
- `typography.css`: consistent typography across the homepage and readers.
- `language.js`, `language.css`: shared language preference, controls and interface translations.
- `months/YYYY-MM/`: original English AI issues, with `translations-de.js` for each month.
- `ai-language.js`: applies AI story translations and navigation labels.
- `data/world-2026-10.json`, `data/world-2026-10.en.json`: German and English world-news content.
- `data/finance-2026-10.json`, `data/finance-2026-10.en.json`: German and English finance content.
- `data/supply-chain-2026-10.json`, `data/supply-chain-2026-10.en.json`: German and English supply chain content.
- `scripts/build-digests.cjs`: generates all three additional issues and the homepage catalog.
- `reader.js`, `reader.css`, `world-language.js`: shared bilingual reader for the three additional topics.

After editing the JSON content, run `node scripts/build-digests.cjs`. The finished site requires no build step, packages, backend or API key to read.

## Hosting

GitHub Pages publishes `main`, directory `/(root)`. The `.nojekyll` file disables Jekyll processing. All internal paths are relative, supporting the GitHub Pages project subdirectory.


