// Field Notes v2 — full content for chapters Mobilität + Konsum
// Plus tutorial, ending, and story-framing cards.

const FN_CASE = {
  caseNo: "SP-2026-04-24",
  teamDefault: "Sekundarschule 3a",
  location: "Speicher AR",
  date: "24. April 2026",
};

// ─────────────────────────────────────────
// TUTORIAL — 3 onboarding cards
// ─────────────────────────────────────────
const FN_TUTORIAL = [
  {
    kind: "polaroid",
    title: "Das ist Maya",
    caption: "Maya L., 17",
    subtitle: "04/2026 · vor der letzten Demo",
    body: "Deine beste Freundin. Organisiert seit Monaten den Protest gegen das geplante Gaskraftwerk in Speicher. Heute Morgen ist sie verschwunden.",
    stampLabel: "VERMISST"
  },
  {
    kind: "note",
    title: "Wie du ermittelst",
    body: "Du bekommst **Storykarten** (was passiert), **Infokarten** (was du findest), **Ereigniskarten** (Zufälle) und **Tippkarten** (wenn du nicht weiterweisst).\n\nAm Ende jeder Spur musst du etwas **verifizieren** — einen Code, ein Produkt, eine Reihenfolge, ein Muster."
  },
  {
    kind: "stamps",
    title: "Deine Werkzeuge",
    items: [
      { label: "CODE", sub: "4 Ziffern", color: "rust" },
      { label: "AUSWAHL", sub: "Multiple-Choice", color: "thread" },
      { label: "SEQUENZ", sub: "Reihenfolge", color: "stamp" },
      { label: "SCAN", sub: "QR-Code", color: "inkSoft" },
      { label: "FOTO", sub: "Beweis", color: "rustDeep" },
      { label: "MUSTER", sub: "Symbole", color: "threadLeaf" }
    ]
  }
];

// ─────────────────────────────────────────
// INTRO — story frame before chapters begin
// ─────────────────────────────────────────
const FN_INTRO = {
  messages: [
    { from: "Maya", time: "23:47", text: "Ich hab etwas herausgefunden." },
    { from: "Maya", time: "23:48", text: "Schau im Dorf nach. Fang beim Bahnhof an." },
    { from: "Maya", time: "23:48", text: "Vertrau niemandem aus der Gemeinderats-Sitzung. M." },
    { from: "Du", time: "07:52", text: "Maya?? Wo bist du??", unread: true },
    { from: "Du", time: "08:04", text: "Melde dich bitte.", unread: true }
  ],
  note: "Um 8:00 sollte sie vor deiner Haustür stehen. Sie kommt nicht. Du schnappst dir dein Handy und fährst los."
};

// ─────────────────────────────────────────
// CHAPTER 1 — MOBILITÄT (Bahnhof)
// ─────────────────────────────────────────
const FN_CH_MOBILITY = {
  id: "bahnhof",
  glyph: "I",
  icon: "🚆",
  track: "MOBILITÄT",
  title: "Am Bahnhof",
  location: "Bahnhof Speicher · 08:14",
  verification: { kind: "code", answer: "0725", length: 4 },
  cards: [
    {
      type: "story",
      time: "08:14",
      title: "Spur I — Bahnhof",
      body: "Der Bahnhof ist fast leer. Auf Gleis 1 hält der Zug nach St. Gallen. Du suchst das Schwarze Brett ab, die Bänke, den Fahrkartenautomaten.\n\nDann — zwischen zwei Aushängen der Appenzeller Bahnen — ein gefalteter Fahrplan. Handschrift. Mayas Handschrift.",
      polaroid: { caption: "Bahnhof Speicher, 08:14", scene: "station", rot: -2 }
    },
    {
      type: "info",
      title: "Mayas Fahrplan",
      subtitle: "INFOKARTE · MOBILITÄT",
      body: "Maya hat drei Routen nach Speicher verglichen — von Teufen aus:\n\nROUTE A · Auto\n  19 km · 24 min · 2.9 kg CO₂\n\nROUTE B · Postauto + Bahn\n  via Bühler → Speicher\n  Abfahrt 07:42 · 42 min · 0.4 kg CO₂\n\nROUTE C · E-Bike\n  via Wiesen-Route\n  Abfahrt 07:25 · 55 min · 0.0 kg CO₂",
      marginalia: "„Ich nehm was zählt — nicht was schnell ist.\"",
      source: "Schwarzes Brett, Bahnhof Speicher"
    },
    {
      type: "newspaper",
      headline: "Gaskraftwerk: Gemeinderat entscheidet Freitag",
      dek: "Mobilität und Heizbedarf im Fokus. Aktivist:innen fordern Aufschub.",
      body: "Der Gemeinderat von Speicher wird am kommenden Freitag über den Bau des umstrittenen Gaskraftwerks abstimmen. Gegner:innen verweisen auf das bestehende Holzkraftwerk; Befürworter:innen sehen Versorgungssicherheit gefährdet.",
      source: "Appenzeller Zeitung",
      date: "23.04.2026"
    },
    {
      type: "event",
      time: "08:21",
      title: "Der Mann im grauen Mantel",
      body: "Eine Durchsage: „Auf Gleis 1 — Zug nach Trogen, 08:37.\" Einem Mann in einem grauen Mantel fällt ein Umschlag aus der Tasche. Er bemerkt es nicht. Auf dem Umschlag steht: „Gemeindeversammlung — vertraulich\".",
      choices: [
        { label: "Ansprechen (+2 Min.)", cost: "Zeit", result: "Er wirkt nervös, nickt — und nimmt den Umschlag wieder an sich." },
        { label: "Umschlag nehmen", cost: "Risiko", result: "Du steckst ihn ein. Kein Name, aber eine Skizze der 5 Orte im Dorf." }
      ]
    },
    {
      type: "puzzle",
      title: "Welche Route hat Maya genommen?",
      subtitle: "VERIFIZIERUNG · 4-STELLIGER CODE",
      body: "Maya hat die nachhaltigste Route gewählt. Gib die Abfahrtszeit dieser Route ein — 4 Ziffern, ohne Doppelpunkt.",
      success: "Richtig. Maya ist um 07:25 mit dem E-Bike los.",
    }
  ],
  hints: [
    { afterMinutes: 3, title: "Tipp 1", body: "Vergleicht die drei Routen nach CO₂-Ausstoss." },
    { afterMinutes: 6, title: "Tipp 2", body: "Es ist die Route mit 0.0 kg CO₂. Schaut auf die Abfahrtszeit." },
    { afterMinutes: 9, title: "Lösung", body: "Route C · E-Bike · Abfahrt 07:25 · Code: 0725" }
  ],
  transition: {
    time: "08:46",
    body: "Der Radweg führt dich an der Mühle vorbei Richtung Dorfkern. Neben dem Volg hängt ein Briefkasten — alt, halb schief. Jemand hat dort etwas hineingeschoben, das nicht ganz reinpasst.",
    polaroid: { caption: "Briefkasten beim Volg", scene: "supermarket", rot: 2 }
  }
};

// ─────────────────────────────────────────
// CHAPTER 2 — KONSUM (Supermarkt)
// ─────────────────────────────────────────
const FN_CH_KONSUM = {
  id: "supermarkt",
  glyph: "II",
  icon: "🛒",
  track: "KONSUM",
  title: "Der Kassenbon",
  location: "Volg Speicher · 08:48",
  verification: { kind: "multiple", answer: 3 },
  receipt: {
    store: "VOLG SPEICHER",
    address: "Hauptstrasse 22",
    date: "23.04.2026 · 18:47",
    cashier: "K. 03",
    items: [
      { label: "Bio Äpfel, CH · 1kg", price: "4.20", regional: true },
      { label: "Hafermilch Bio · 1L", price: "2.95", regional: true },
      { label: "Linsen, Demeter · 500g", price: "3.80", regional: true },
      { label: "Erdbeeren, ES · 250g ⚠", price: "5.90", regional: false, flagged: true },
      { label: "Vollkornbrot, lokal · 500g", price: "4.50", regional: true }
    ],
    total: "21.35",
    payment: "TWINT",
    note: "Danke — bis bald!"
  },
  cards: [
    {
      type: "story",
      time: "08:48",
      title: "Im Briefkasten",
      body: "Du klappst den Briefkasten auf. Zwischen Flyern und einer Gratiszeitung — ein Kassenbon. Zusammengeknüllt, aber deutlich lesbar. Datum: gestern Abend. Unterschrift unten: „Für dich. M.\"",
      polaroid: { caption: "Fundort: Briefkasten Volg", scene: "supermarket", rot: -3 }
    },
    {
      type: "info",
      title: "Fünf Produkte — eines passt nicht",
      subtitle: "INFOKARTE · KONSUM",
      body: "Maya hat gestern bei Volg eingekauft. Fünf Produkte. Vier davon passen zu ihrer Linie — regional, saisonal, biologisch. Eines ist verdächtig.",
      marginalia: "„Wer mich kennt, weiss: das würd ich nie kaufen.\""
    },
    {
      type: "newspaper",
      headline: "Aktivistin diskreditiert? Volg weist Vorwürfe zurück",
      dek: "Anonymer Leserbrief: „Sie predigt regional — kauft aber Flugware.\"",
      body: "Ein anonymer Leserbrief wirft der bekannten Klima-Aktivistin Maya L. Heuchelei vor. Als Beleg diene ein Kassenbon mit importierten Erdbeeren. Die Volg-Filiale bestätigt den Verkaufszeitpunkt — nicht aber die Käuferin.",
      source: "Tagblatt Ost",
      date: "24.04.2026"
    },
    {
      type: "event",
      time: "08:54",
      title: "Die Verkäuferin",
      body: "Die Kassiererin erkennt dich von der Demo. Sie flüstert: „Der Bon — den hat jemand anderes hier reingetan. Maya war gestern hier, aber kurz. Sie hat nur vier Sachen gekauft.\"",
      choices: [
        { label: "Nachfragen, wer es war", cost: "Zeit", result: "Sie schaut weg. „Grauer Mantel. Wollte nicht, dass ich ihn sehe.\"" },
        { label: "Nur den Bon mitnehmen", cost: "—", result: "Du bedankst dich und gehst. Der Bon passt in die Akte." }
      ]
    },
    {
      type: "puzzle",
      title: "Welches Produkt wurde hinzugefälscht?",
      subtitle: "VERIFIZIERUNG · AUSWAHL",
      body: "Tippe auf das Produkt, das nicht zu Maya passt — das Maya also nicht gekauft hat.",
      success: "Richtig. Erdbeeren aus Spanien, im April — Flugware. Der Bon wurde manipuliert."
    }
  ],
  hints: [
    { afterMinutes: 3, title: "Tipp 1", body: "April in Speicher: Welche Frucht wächst hier gerade nicht?" },
    { afterMinutes: 6, title: "Tipp 2", body: "Schaut auf die Herkunftsangabe in Klammern. Eine ist weit weg." },
    { afterMinutes: 9, title: "Lösung", body: "Erdbeeren · ES (Spanien) · Produkt 4 auf der Liste." }
  ],
  transition: {
    time: "09:06",
    body: "Du steckst den Bon in die Akte. Wer auch immer Maya diskreditieren will — er kennt ihre Einkäufe genau. Das heisst: er beobachtet sie. Auf dem Rückweg siehst du am Waldrand etwas Rotes im Gras liegen.",
    polaroid: { caption: "Waldrand Vögelinsegg", scene: "forest", rot: -1 }
  }
};

// ─────────────────────────────────────────
// CHAPTER 3 — BIODIVERSITÄT (Wald)
// ─────────────────────────────────────────
const FN_CH_NATURE = {
  id: "wald",
  glyph: "III",
  icon: "🌲",
  track: "BIODIVERSITÄT",
  title: "Vögelinsegg",
  location: "Waldrand Speicher · 09:18",
  verification: { kind: "pattern",
    symbols: ["◇","○","△","◇","□","○","△","□","◇"],
    answer: [1, 4, 7]
  },
  cards: [
    {
      type: "story",
      time: "09:18",
      title: "Spur III — Waldrand",
      body: "Das Rote war ein Band, wie Naturforscher:innen es an Bäume knoten. Daneben liegt Mayas Notizbuch — Seite 14 aufgeschlagen. Drei Symbole sind eingekreist. Kohle auf den Fingern.",
      polaroid: { caption: "Vögelinsegg · Notizbuch", scene: "forest", rot: -3 }
    },
    {
      type: "info",
      title: "Mayas Kartierung",
      subtitle: "INFOKARTE · BIODIVERSITÄT",
      body: "Seite 14, 23.04.:\n\n◇ Feldlerche — 3 Sichtungen\n○ Orchidee (Knabenkraut) — 12 Pflanzen\n△ Gelbbauchunke — Tümpel Nord\n□ Fichte, jung — überall\n\nDrei der Arten stehen auf der Roten Liste der Schweiz. Genau auf dem geplanten Baugrund.",
      marginalia: "„Was verschwindet, kommt nicht wieder.\"",
      source: "Mayas Notizbuch, S. 14"
    },
    {
      type: "event",
      time: "09:25",
      title: "Jemand war hier",
      body: "Ein Ast knackt. Du duckst dich. Zwanzig Meter weiter — der graue Mantel. Er fotografiert. Nicht die Bäume. Den Boden, wo das Band hängt.",
      choices: [
        { label: "Nähern (+2 Min.)", cost: "Risiko", result: "Er sieht dich, klappt das Handy zu, geht schnell weg. Am Boden: ein Zigarettenstummel, Marke LD. Gleiche wie am Bahnhof." },
        { label: "Fotografieren und verstecken", cost: "—", result: "Du bekommst sein Auto auf's Bild. AR-Kennzeichen, 4-stellig. Später wichtig." }
      ]
    },
    {
      type: "puzzle",
      title: "Welche 3 Arten sind gefährdet?",
      subtitle: "VERIFIZIERUNG · MUSTER",
      body: "Tippe die drei Symbole an, die Maya in ihrem Notizbuch eingekreist hat.",
      success: "Richtig. Orchidee, Fichte... und das dritte? Maya hat etwas gesehen, das auf dem Baugrund niemand sehen soll."
    }
  ],
  hints: [
    { afterMinutes: 3, title: "Tipp 1", body: "Achte auf die Reihenfolge, in der Maya sie im Text erwähnt — aber eines davon ist KEIN Symbol auf der Rote Liste." },
    { afterMinutes: 6, title: "Tipp 2", body: "Fichte (□) steht nicht auf der Roten Liste. Die drei gefährdeten Arten sind Lerche, Orchidee und Unke." },
    { afterMinutes: 9, title: "Lösung", body: "Im Raster: Position 2 (○ Orchidee), 5 (□ → aber wir brauchen die eingekreisten...). Tipp: Symbole 2, 5, 8 im Raster." }
  ],
  transition: {
    time: "09:48",
    body: "Drei Schichten: Lerche am Himmel, Orchidee am Boden, Unke im Tümpel. Genau dort soll das Kraftwerk hin. Dein Telefon vibriert — eine Nachricht von einer unbekannten Nummer mit einer Hausadresse.",
    polaroid: { caption: "Hausnummer 14", scene: "house", rot: 1 }
  }
};

// ─────────────────────────────────────────
// CHAPTER 4 — ENERGIE (Wohngebiet)
// ─────────────────────────────────────────
const FN_CH_ENERGY = {
  id: "wohngebiet",
  glyph: "IV",
  icon: "🏠",
  track: "ENERGIE",
  title: "Die Heizrechnung",
  location: "Wohngebiet · Haus 14 · 10:02",
  verification: { kind: "sequence",
    items: ["Dämmung", "Wärmepumpe", "Solar", "Gaskraftwerk"],
    answer: [0, 1, 2, 3]
  },
  cards: [
    {
      type: "story",
      time: "10:02",
      title: "Spur IV — Haus 14",
      body: "Das Haus ist das von Mayas Grossmutter. Die Tür ist angelehnt. Auf dem Küchentisch: vier Kärtchen, fein säuberlich nebeneinander gelegt. Dahinter eine Heizrechnung und ein Pfeil. Maya war hier.",
      polaroid: { caption: "Küchentisch · Haus 14", scene: "house", rot: -2 }
    },
    {
      type: "info",
      title: "Vier Hebel, vier Einsparungen",
      subtitle: "INFOKARTE · ENERGIE",
      body: "Bevor Speicher ein neues Kraftwerk braucht, könnte es das bestehende entlasten:\n\n✦ Dämmung alter Häuser\n  Einsparung: 35 % · Kosten: mittel\n\n✦ Wärmepumpen statt Öl/Gas\n  Einsparung: 25 % · Kosten: hoch\n\n✦ Solar auf Süddächern\n  Einsparung: 12 % · Kosten: mittel\n\n✦ Neues Gaskraftwerk\n  Einsparung: 0 % · Kosten: enorm",
      marginalia: "„Bauen ist einfach. Sparen ist klüger.\"",
      source: "Maya · Flyer für die Sitzung"
    },
    {
      type: "event",
      time: "10:12",
      title: "Die Grossmutter",
      body: "Eine alte Frau kommt durch die Hintertür. „Bist du eine von Mayas Freundinnen? Sie war gestern Abend hier. Hat Kopien für Freitag gemacht. Sie hat gesagt: 'Wenn ich bis morgen nicht zurück bin — die Reihenfolge ist wichtig.'\"",
      choices: [
        { label: "Fragen, ob sie ein Auto gehört hat", cost: "Zeit", result: "„Ja. Um 23:30. Ein dunkler Wagen. Aber kein Nachbar hier hat so einen.\"" },
        { label: "Kärtchen einsammeln", cost: "—", result: "Du nimmst die vier Karten. Maya wollte sie jemandem präsentieren — in dieser Reihenfolge." }
      ]
    },
    {
      type: "puzzle",
      title: "In welcher Reihenfolge präsentieren?",
      subtitle: "VERIFIZIERUNG · SEQUENZ",
      body: "Ordne die vier Hebel nach Wirkung — von der grössten Einsparung zur kleinsten. Das letzte ist nicht nötig.",
      success: "Richtig. 35 % + 25 % + 12 % = 72 %. Mehr als ein Gaskraftwerk je liefern würde. Nur noch eine Frage: wo ist Maya?"
    }
  ],
  hints: [
    { afterMinutes: 3, title: "Tipp 1", body: "Sortiere nach Prozent der Einsparung — nicht nach Kosten." },
    { afterMinutes: 6, title: "Tipp 2", body: "35 % > 25 % > 12 % > 0 %." },
    { afterMinutes: 9, title: "Lösung", body: "Dämmung → Wärmepumpe → Solar → Gaskraftwerk (letzteres als Kontrast)." }
  ],
  transition: {
    time: "10:41",
    body: "Vier Spuren, alle deuten in dieselbe Richtung: das alte Holzkraftwerk oberhalb des Dorfes. Früher war es geöffnet. Heute steht ein Schild: „Betreten verboten.\"",
    polaroid: { caption: "Holzkraftwerk, Waldweg", scene: "power", rot: -2 }
  }
};

// ─────────────────────────────────────────
// CHAPTER 5 — KLIMAGERECHTIGKEIT (Holzkraftwerk)
// ─────────────────────────────────────────
const FN_CH_JUSTICE = {
  id: "holzkraftwerk",
  glyph: "V",
  icon: "🔥",
  track: "KLIMAGERECHTIGKEIT",
  title: "Das Holzkraftwerk",
  location: "Altes Holzkraftwerk · 11:14",
  verification: { kind: "caesar",
    cipher: "PDBD", answer: "MAYA", shift: 3
  },
  cards: [
    {
      type: "story",
      time: "11:14",
      title: "Spur V — Holzkraftwerk",
      body: "Die Tür ist neu verschlossen. Am Schlosskasten: ein Zettel, hastig abgerissen. Vier Buchstaben. Daneben — Mayas Hand, mit Kohle: „+3\"",
      polaroid: { caption: "Türschloss · Holzkraftwerk", scene: "power", rot: -3 }
    },
    {
      type: "info",
      title: "Was Maya wusste",
      subtitle: "INFOKARTE · KLIMAGERECHTIGKEIT",
      body: "Das bestehende Holzkraftwerk deckt 54 % des Heizbedarfs von Speicher. Mit Sanierung + den drei Hebeln aus Spur IV würde ein neues Gaskraftwerk 0 % zusätzlich nötig machen.\n\nAber: Zwei Gemeinderäte sitzen im Verwaltungsrat der Firma, die das Gaskraftwerk bauen würde. Maya hatte die Liste.",
      marginalia: "„Sie wissen, dass ich es weiss.\"",
      source: "Handelsregister AR"
    },
    {
      type: "event",
      time: "11:28",
      title: "Klopfen von innen",
      body: "Du hörst es. Leise, aber regelmässig. Drei mal kurz, drei mal lang, drei mal kurz. SOS. Hinter der Tür — eine Stimme. Es ist Maya.",
      choices: [
        { label: "Tür aufbrechen", cost: "Lärm", result: "Geht nicht — neues Schloss. Zuerst den Code knacken." },
        { label: "Den Zettel entschlüsseln", cost: "—", result: "„+3\" bedeutet: jeden Buchstaben 3 zurück im Alphabet. P→M, D→A, B→Y, A→X... fast." }
      ]
    },
    {
      type: "puzzle",
      title: "Was ist das Passwort?",
      subtitle: "VERIFIZIERUNG · CÄSAR-CHIFFRE",
      body: "Die vier Buchstaben auf dem Zettel: PDBD. Mayas Notiz: „+3\". Entschlüssle — und tippe das Wort ein.",
      success: "MAYA. Du drehst das Zahlenschloss: M=13, A=1, Y=25, A=1. Klick. Die Tür öffnet sich."
    }
  ],
  hints: [
    { afterMinutes: 3, title: "Tipp 1", body: "Das ist eine Cäsar-Chiffre. Jeder Buchstabe ist um 3 Stellen verschoben. Dreh ihn zurück." },
    { afterMinutes: 6, title: "Tipp 2", body: "P − 3 = M. D − 3 = A. B − 3 = Y. A − 3 = ? Denk an das Alphabet als Kreis." },
    { afterMinutes: 9, title: "Lösung", body: "PDBD mit Verschiebung 3 zurück = MAYA." }
  ],
  transition: {
    time: "11:47",
    body: "Die Tür geht auf. Maya sitzt auf einer Holzkiste, Notizblock in der Hand. „Ihr habt es geschafft\", sagt sie. „Jetzt müssen wir nur noch den Gemeinderat überzeugen. Freitag, 19:00.\"",
    polaroid: { caption: "Maya — Holzkraftwerk, 11:47", scene: "maya", rot: 0 }
  }
};

// ─────────────────────────────────────────
// TRACKS list
// ─────────────────────────────────────────
const FN_TRACKS = [
  { id: "bahnhof",       glyph: "I",   theme: "MOBILITÄT",         title: "Am Bahnhof",       teaser: "Ein Fahrplan am Schwarzen Brett. Welche Route hat Maya genommen?", codeHint: "Code: 4 Ziffern (Abfahrt)" },
  { id: "supermarkt",    glyph: "II",  theme: "KONSUM",            title: "Der Kassenbon",    teaser: "Fünf Produkte. Eines gehört nicht dazu.", codeHint: "Multiple-Choice · 1 von 5" },
  { id: "wald",          glyph: "III", theme: "BIODIVERSITÄT",      title: "Vögelinsegg",      teaser: "Mayas Notizbuch. Drei Symbole sind eingekreist.", codeHint: "Muster · 3 Symbole" },
  { id: "wohngebiet",    glyph: "IV",  theme: "ENERGIE",           title: "Die Heizrechnung", teaser: "Vier Hebel, vier Einsparungen. Welche Reihenfolge?", codeHint: "Sequenz · 4 Karten" },
  { id: "holzkraftwerk", glyph: "V",   theme: "KLIMAGERECHTIGKEIT", title: "Das Holzkraftwerk", teaser: "Eine verschlossene Tür. Vier Buchstaben.", codeHint: "Cäsar-Chiffre · +3" }
];

// ─────────────────────────────────────────
// ENDING — cliffhanger zum Gemeinderat
// ─────────────────────────────────────────
const FN_ENDING = {
  when: "Nach 5 Spuren · 18:00 Uhr · Gemeinderatssitzung Freitag",
  found: {
    title: "Maya gefunden.",
    body: "Im Holzkraftwerk. Eingeschlossen im Lagerraum — mit ihrer Recherche auf dem Schoss und Tesafilm über der Tür. Sie ist in Ordnung. Wütend, aber in Ordnung.",
    polaroid: { caption: "Maya — Holzkraftwerk, 11:47", scene: "maya" }
  },
  evidence: [
    "Fahrplan — Route C: 0 kg CO₂ bewiesen",
    "Gefälschter Kassenbon — Beweis für Diskreditierungs-Kampagne",
    "Notizbuch — Biodiversität am Baugrund",
    "Heizrechnung — Sanierung statt Gaskraftwerk",
    "Recherche — Holzkraftwerk + 18 % Einsparung = genug"
  ],
  cliffhanger: {
    headline: "Freitag, 19:00 — Gemeinderatssitzung",
    body: "Alle fünf Spuren führen zum selben Schluss: Das Gaskraftwerk ist unnötig. Aber wer hat Maya eingesperrt? Und wer hat den Kassenbon gefälscht? Der Mann im grauen Mantel war heute Morgen am Bahnhof — und auf der Besucherliste der Sitzung steht sein Name.",
    cta: "Was sagt ihr dem Gemeinderat?"
  }
};

window.FN_DATA = {
  CASE: FN_CASE,
  TUTORIAL: FN_TUTORIAL,
  INTRO: FN_INTRO,
  TRACKS: FN_TRACKS,
  CH_MOBILITY: FN_CH_MOBILITY,
  CH_KONSUM: FN_CH_KONSUM,
  CH_NATURE: FN_CH_NATURE,
  CH_ENERGY: FN_CH_ENERGY,
  CH_JUSTICE: FN_CH_JUSTICE,
  CHAPTERS: {
    bahnhof: FN_CH_MOBILITY,
    supermarkt: FN_CH_KONSUM,
    wald: FN_CH_NATURE,
    wohngebiet: FN_CH_ENERGY,
    holzkraftwerk: FN_CH_JUSTICE,
  },
  ENDING: FN_ENDING,
};
