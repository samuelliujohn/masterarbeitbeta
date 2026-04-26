# Wo ist Maya? v2

Kleiner Webapp-Prototyp für eine Lernapp (Masterarbeit).

## Starten

Da es eine statische App ist, reicht ein einfacher Webserver:

```bash
python3 -m http.server 8000
```

Dann im Browser öffnen: `http://localhost:8000`

## Funktionen

- Story-basierter Lernablauf mit 3 Aufgaben
- Sofort-Feedback bei Antworten
- Hinweise-System (Clues)
- Fortschrittsanzeige
- Spielstand in `localStorage`
- Neustart-Button

## Dateien

- `index.html` – Struktur der Oberfläche
- `styles.css` – Layout/Design
- `app.js` – Spiel- und Lernlogik
