# Atakan-24.github.io

Öffentlich · Anwendung · 2026-11-02

Zweisprachiges Portfolio mit Projektgeschichten, interaktiven Erklärungen und Kontaktmöglichkeiten. Der Einstieg richtet sich auf individuelle Software und mögliche technische Partnerschaften.

## Zweck

Technische Arbeit anhand von Beispielen erklären und ein konkretes Projektgespräch ermöglichen.

![Aufbau](../diagrams/atakan-24-github-io.de.svg)

## Funktionen

- Deutsche und englische Seiten, heller und dunkler Modus.
- Scrollgesteuerte CRM-Darstellung, Bewertungs- und Paginierungsbeispiele.
- Lokale Kurzantworten und ein separater externer Freitext-Chat.
- aktualisierte CRM- und Voice-Fallstudien sowie neues Link-Vorschaubild.
- sechs Projektvorschauen mit Medien und verlinkte DE/EN-Dokumentation der 16 öffentlichen Repos.

## Aufbau

- Statische HTML-Seiten enthalten Inhalt, seitenbezogene CSS-Regeln und JavaScript.
- scrollcraft.css und scrollcraft.js steuern gemeinsame Gestaltung und Scroll-Interaktionen.
- Externe Supabase-Funktionen bedienen Freitext-Antworten und Besucherereignisse; ihr Backend wurde hier nicht geprüft.

## Stand und Grenzen

- Externe Chat-Antworten und deren Wissensbasis wurden nicht live geprüft.
- Ein Projektbericht ist keine aktuelle Betriebsanzeige aller beschriebenen Systeme.

## Einstieg

Im Repo-Verzeichnis als lokale statische Vorschau starten. Im aktuellen Entwurf sind lokale Analytics abgeschaltet.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

## Wichtige Dateien

- `index.html`: Englische Seite und lokale Interaktionen.
- `de/index.html`: Deutsche Ausgabe.
- `scrollcraft.js`: Scroll- und Bewegungssystem.
- `scrollcraft.css`: Gemeinsame Gestaltungsregeln.
- `og.jpg`: Vorschaubild für geteilte Links.
- `project-media.css / project-media.js`: Darstellung und kontrollierte Wiedergabe der Projektmedien.
- `projects/`: Dokumentation und Grafiken ausschließlich öffentlicher Repos.

## Belege

Öffentlichen Ausgangsstand und die veröffentlichte Überarbeitung geprüft. Desktop-/Mobilansichten, DE/EN-Links, Projektmedien und sichere Chat-Linkdarstellung wurden getestet.

- [Portfolio source](https://github.com/Atakan-24/Atakan-24.github.io)
- [Live portfolio](https://atakan-24.github.io/)

## Bilder und Demos

- [Aufnahme der überarbeiteten Portfolio-Startseite, 02.11.2026.](../assets/portfolio-draft.png)
- [Aktuell veröffentlichte Seite; kann vom Entwurf abweichen.](https://atakan-24.github.io/)
