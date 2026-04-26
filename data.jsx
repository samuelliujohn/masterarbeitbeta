// Shared story content for "Wo ist Maya?" — Escape Room Plattform

const STORY = {
  title: "Wo ist Maya?",
  subtitle: "Ein hybrider Escape Room über Nachhaltigkeit in Speicher",
  intro: `Heute wäre der grosse Tag. Du und Maya habt wochenlang für den Protest gegen das geplante Gaskraftwerk gekämpft. 8:00 Uhr – sie sollte vor deiner Haustür stehen. Aber da ist niemand. Nur eine kryptische Nachricht kam letzte Nacht: „Ich hab etwas herausgefunden. Schau im Dorf nach. Fang beim Bahnhof an."

Du schnappst dir dein Handy und machst dich auf die Suche.`,
  lastMessage: {
    time: "23:47",
    from: "Maya",
    text: "Ich hab etwas herausgefunden. Schau im Dorf nach. Fang beim Bahnhof an. Vertrau niemandem aus der Gemeinderats-Sitzung. M."
  }
};

const TRACKS = [
  {
    id: "bahnhof",
    icon: "🚆",
    glyph: "I",
    title: "Bahnhof",
    theme: "Mobilität",
    status: "offen",
    teaser: "Maya ist nicht mit dem Auto gekommen. Welche Route hat sie genommen – und warum genau diese?",
    location: "Bahnhof Speicher",
    codeHint: "4-stelliger Code · Abfahrtszeit"
  },
  {
    id: "supermarkt",
    icon: "🛒",
    glyph: "II",
    title: "Supermarkt",
    theme: "Konsum",
    status: "gesperrt",
    teaser: "Ein Kassenbon in einem Briefkasten. 5 Produkte – eines passt nicht. War Maya wirklich hier?",
    location: "Volg Speicher",
    codeHint: "Welches Produkt?"
  },
  {
    id: "wald",
    icon: "🌿",
    glyph: "III",
    title: "Wald",
    theme: "Biodiversität",
    status: "gesperrt",
    teaser: "Mayas Notizbuch am Waldrand. Skizzen, Beobachtungen – und eine beunruhigende Notiz.",
    location: "Vögelinsegg",
    codeHint: "3 Arten · alphabetisch"
  },
  {
    id: "wohngebiet",
    icon: "🏠",
    glyph: "IV",
    title: "Wohngebiet",
    theme: "Wohnen",
    status: "gesperrt",
    teaser: "Eine Adresse. Eine ältere Person. Eine Heizrechnung, die explodiert ist. Was wollte Maya dort?",
    location: "Trogenerstrasse 14",
    codeHint: "Hausnummer + Jahr"
  },
  {
    id: "holzkraftwerk",
    icon: "⚡",
    glyph: "V",
    title: "Holzkraftwerk",
    theme: "Energie",
    status: "gesperrt",
    teaser: "Mayas letzter bekannter Aufenthaltsort. Ihre Recherche liegt hier versteckt.",
    location: "Holzkraftwerk Speicher",
    codeHint: "MWh-Zahl · gerundet"
  }
];

// Chapter 1 — Bahnhof — full content
const CHAPTER_BAHNHOF = {
  id: "bahnhof",
  title: "Spur I — Bahnhof",
  theme: "Mobilität",
  cards: [
    {
      type: "story",
      title: "Am Bahnhof",
      time: "08:14",
      body: `Der Bahnhof ist fast leer. Auf Gleis 1 hält gerade der Zug nach St. Gallen. Du suchst das Schwarze Brett ab, die Bänke, den Fahrkartenautomaten.

Dann – zwischen zwei Aushängen der Appenzeller Bahnen – ein gefalteter Fahrplan. Handschrift. Mayas Handschrift.`,
      action: "Fahrplan öffnen"
    },
    {
      type: "info",
      title: "Mayas Fahrplan",
      subtitle: "Informationskarte · Mobilität",
      body: `Maya hat drei Routen nach Speicher verglichen – von ihrem Zuhause in Teufen aus:

ROUTE A · Auto (privat)
  19 km · 24 min · ca. 2.9 kg CO₂

ROUTE B · Postauto + Bahn
  über Bühler → Speicher
  42 min · ca. 0.4 kg CO₂

ROUTE C · E-Bike
  über Wiesen-Route
  55 min · 0.0 kg CO₂ · 340 kcal

Notiz am Rand: „Ich nehm was zählt – nicht was schnell ist."`,
      meta: "Fundort: Schwarzes Brett, Bahnhof Speicher"
    },
    {
      type: "event",
      title: "Durchsage",
      subtitle: "Ereigniskarte · 08:21",
      body: `„Achtung auf Gleis 1 – der nächste Zug fährt um 08:37 Richtung Trogen."

Einem Mann in einem grauen Mantel fällt ein Umschlag aus der Tasche. Er bemerkt es nicht. Auf dem Umschlag steht: „Gemeindeversammlung – vertraulich".

Willst du ihn ansprechen – oder den Umschlag nehmen?`,
      choices: ["Ansprechen (+2 min)", "Umschlag nehmen (Risiko)"]
    },
    {
      type: "puzzle",
      title: "Welche Route hat Maya genommen?",
      subtitle: "Rätsel · Verifizierung",
      body: `Maya hat die nachhaltigste Route gewählt. Gib die Abfahrtszeit dieser Route ein – 4 Ziffern, ohne Doppelpunkt.`,
      verifyType: "code",
      answer: "0725",
      placeholder: "• • • •",
      success: "Richtig. Maya ist um 07:25 mit dem E-Bike los."
    }
  ],
  hints: [
    {
      afterMinutes: 3,
      level: 1,
      title: "Tipp 1",
      body: "Vergleicht die drei Routen nach CO₂-Ausstoss. Welche ist am saubersten?"
    },
    {
      afterMinutes: 6,
      level: 2,
      title: "Tipp 2",
      body: "Es ist die Route, die 0.0 kg CO₂ ausstösst. Schaut nach der Startzeit dieser Verbindung."
    },
    {
      afterMinutes: 9,
      level: 3,
      title: "Lösung",
      body: "Route C · E-Bike · Abfahrt 07:25. Code: 0725"
    }
  ]
};

// Export data
window.FN_DATA = {
  STORY,
  TRACKS,
  CHAPTERS: {
    bahnhof: CHAPTER_BAHNHOF,
    supermarkt: {},
    wald: {},
    wohngebiet: {},
    holzkraftwerk: {}
  }
};
