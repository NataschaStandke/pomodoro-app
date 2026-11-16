# Pomodoro App

Ein kleiner Pomodoro-Timer mit React, TypeScript und Electron. Die Oberfläche verwendet einen rosa Pixel-Art-Hintergrund und bietet Fokus- sowie Pausenintervalle.

## Voraussetzungen

- Node.js und npm

## Installation

Im Projektordner ausführen:

```bash
npm install
```

## Anwendung starten

```bash
npm start
```

Die Web-App läuft standardmäßig unter [http://localhost:3000](http://localhost:3000).

Für die Electron-Version zuerst die Web-App starten und anschließend in einem zweiten Terminal ausführen:

```bash
npm run electron
```

## Timer

- **Focus** startet ein 25-Minuten-Intervall.
- **Break** startet ein 5-Minuten-Intervall.
- **Start** beginnt den gewählten Timer; **Reset** setzt ihn zurück.
- Nach Ablauf spielt ein Signalton und der Timer wird für den nächsten Intervall zurückgesetzt.

## Build

```bash
npm run build
```

Das Produktions-Build liegt anschließend im Ordner `build`.

## Assets

Der Hintergrund und der Signalton liegen unter `src/assets`. Der Signalton stammt von [ALEXIS_GAMING_CAM auf Pixabay](https://pixabay.com/users/alexis_gaming_cam-50011695/).
