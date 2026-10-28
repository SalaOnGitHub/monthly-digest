# Monthly Digest

Vier klickbare Themen mit eigenem Monatsarchiv: **KI, Webtoons, Manga und Weltgeschehen**.

Für GitHub Pages unter https://salaongithub.github.io/monthly-digest/ vorbereitet.

## Inhalte

- **KI:** zehn englische Originalausgaben von Jänner bis Oktober 2026, jeweils zehn Folien.
- **Webtoons:** zehn recherchierte Meldungen für Oktober 2026, auf Deutsch.
- **Manga:** zehn recherchierte Meldungen für Oktober 2026, mit Kennzeichnung des deutschen bzw. englischsprachigen Markts.
- **Weltgeschehen:** zehn ausgewählte internationale Meldungen für Oktober 2026, auf Deutsch.

Die drei neuen Ausgaben haben den Recherche-Stand **28. Oktober 2026**. Der Monat ist noch nicht abgeschlossen. Es handelt sich um eine redaktionelle Auswahl, nicht um ein vollständiges oder objektiv geranktes Nachrichtenarchiv. Datum und Quellen stehen an jeder Meldung. Prognosen und angekündigte spätere Veröffentlichungen sind als solche bezeichnet.

Neue Monatsausgaben werden redaktionell ergänzt. Es ist keine automatische Nachrichtengenerierung oder zeitgesteuerte Aktualisierung eingerichtet.

## Bedienung

Oben das Thema auswählen, dann die aktuelle Ausgabe oder einen Monat im Archiv öffnen.

- Pfeiltasten und Buttons: vorherige/nächste Meldung.
- Home / End: erste/letzte Meldung.
- Wischen: Folienwechsel auf Touch-Geräten.
- „Alle 10 Meldungen“: Übersicht und direkter Sprung (neue Ausgaben).
- `#1` bis `#10`: einzelne Meldungen direkt verlinken.
- Themen-Direktlinks: `#ai`, `#webtoons`, `#manga`, `#weltgeschehen`.

## Herkunft und Rechte

Das KI-Archiv, dessen Gestaltung und Foliennavigation basieren auf [AI Monthly Digest von Niksa Visic](https://github.com/niksavis/ai-monthly-digest), MIT-Lizenz. Übernommener Stand: `481e6acc469d1a07d4a319b21760e5138f0cf2b8`, abgerufen am 28. Oktober 2026. Die Originallizenz liegt unter `LICENSE` bei. Die englischen Artikel, Quellenlinks und Bildnachweise wurden erhalten; die Navigation erhielt Verbesserungen für Tastaturbedienung und kleine Bildschirme.

Die neue Startseite, Themen-Navigation und deutschen Ausgaben wurden für SalaOnGitHub ergänzt. Die Texte der neuen Ausgaben sind eigenständige Zusammenfassungen der jeweils verlinkten Quellen. Ihre grafischen Motive sind typografische Illustrationen.

Die Bilder im KI-Archiv werden von externen Anbietern geladen. Ihre Rechte liegen bei den jeweiligen Rechteinhabern; die Softwarelizenz erteilt keine zusätzlichen Bildrechte.

## Projektstruktur

- `index.html`, `home.css`, `home.js`: Startseite und Themen-Tabs.
- `months/YYYY-MM/`, `styles.css`: übernommenes KI-Archiv.
- `topics/webtoons/2026-10/`, `topics/manga/2026-10/`, `topics/world/2026-10/`: neue Ausgaben.
- `reader.css`, `reader.js`: gemeinsame Folienansicht der neuen Themen.
- `data/`: redaktionelle Inhalte und Quellen als JSON.
- `news-data.js`: Katalog für die Vorschauen auf der Startseite.
- `scripts/build-digests.cjs`: erzeugt die drei neuen HTML-Ausgaben und den Katalog aus den JSON-Dateien.

Zum Neu-Erzeugen nach Inhaltsänderungen: `node scripts/build-digests.cjs`. Zum Lesen braucht die Seite keinen Build, keine Pakete und keinen API-Schlüssel. Alle projektinternen Links sind relativ.

## Hosting

GitHub Pages kann den Branch `main`, Ordner `/(root)`, direkt veröffentlichen. Die Datei `.nojekyll` schaltet Jekyll-Verarbeitung ab. Änderungen auf `main` werden nach dem Pages-Build sichtbar.

