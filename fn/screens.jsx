// Field Notes system — Screen components

const { Button, Card, Timer, Progress, Input, Alert } = window.FN.ATOMS;
const { CardRenderer } = window.FN_CONTENT;
const { useState, useEffect } = React;

// Start screen — team name entry
function FNStart({ teamName, setTeamName, onStart }) {
  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>📁 Wo ist Maya?</div>
        <div style={{ fontSize: "13px", opacity: 0.7, marginBottom: "24px" }}>
          Ein hybrider Escape Room über Nachhaltigkeit in Speicher
        </div>
        <div style={{ fontSize: "12px", marginBottom: "8px" }}>Euer Teamname:</div>
        <Input
          placeholder="z.B. Sekundarschule 3a"
          value={teamName}
          onChange={setTeamName}
        />
      </div>
      <Button onClick={onStart} variant="primary" style={{ width: "100%" }}>
        → Akte öffnen
      </Button>
    </div>
  );
}

// Intro screen — story setup with messages
function FNIntro({ onDone }) {
  const STORY = window.FN_DATA.STORY || {};
  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", overflow: "auto" }}>
      <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>📱 Mayas Nachrichten</div>
      <Card>
        <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "8px" }}>Letzte Nachricht</div>
        <div style={{ fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-wrap", marginBottom: "12px" }}>
          {STORY.lastMessage?.text}
        </div>
        <div style={{ fontSize: "11px", opacity: 0.5 }}>{STORY.lastMessage?.time}</div>
      </Card>
      <div style={{ flex: 1 }} />
      <Button onClick={onDone} variant="primary" style={{ width: "100%" }}>
        → Weiter
      </Button>
    </div>
  );
}

// Tutorial screen — tool explanation
function FNTutorial({ onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "📖", title: "Geschichtenkarten", body: "Folge Mayas Weg durch das Dorf. Jede Karte verrät dir etwas über ihren Fall." },
    { icon: "ℹ️", title: "Infokarten", body: "Sammle Hinweise und Beweise. Diese Karten haben die Daten, die du brauchst." },
    { icon: "🔐", title: "Rätsel", body: "Löse Rätsel um Codes zu knacken. Du hast 60 Minuten – nutze Tipps weise!" },
  ];
  const current = steps[step];

  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: "28px", marginBottom: "12px" }}>{current.icon}</div>
        <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>{current.title}</div>
        <div style={{ fontSize: "13px", lineHeight: "1.6" }}>{current.body}</div>
      </div>
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                height: "6px",
                flex: 1,
                background: i === step ? "#e9c46a" : "rgba(233, 196, 106, 0.2)",
                borderRadius: "3px",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => setStep(Math.max(0, step - 1))}
            variant="secondary"
            disabled={step === 0}
            style={{ flex: 1 }}
          >
            ← Zurück
          </Button>
          <Button
            onClick={() => (step < steps.length - 1 ? setStep(step + 1) : onDone())}
            variant="primary"
            style={{ flex: 1 }}
          >
            {step < steps.length - 1 ? "Weiter →" : "Starten →"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hub screen — chapter selection (corkboard)
function FNHub({ timer, teamName, completed, tracks, onPick }) {
  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "14px", fontWeight: "600" }}>{teamName}</div>
        <Timer time={timer} />
      </div>
      <div style={{ fontSize: "13px", marginBottom: "12px" }}>Spuren:</div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {tracks.map((track, i) => {
          const isCompleted = completed.includes(track.id);
          const isLocked = i > completed.length && !isCompleted;
          return (
            <Card key={track.id}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ fontSize: "28px" }}>{track.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: "600" }}>
                    {track.glyph} · {track.title}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "6px" }}>
                    {track.theme}
                  </div>
                  <div style={{ fontSize: "11px", opacity: 0.6 }}>{track.teaser}</div>
                  {isCompleted && (
                    <div style={{ fontSize: "11px", color: "#2ecc71", marginTop: "6px" }}>✓ Gelöst</div>
                  )}
                </div>
              </div>
              <Button
                onClick={() => onPick(track.id)}
                variant="primary"
                size="sm"
                style={{ width: "100%", marginTop: "8px" }}
                disabled={isLocked}
              >
                {isCompleted ? "Nochmal spielen" : isLocked ? "🔒 Gesperrt" : "Öffnen →"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Chapter screen — card sequence
function FNChapter({ chapter, timer, hintsUnlocked, onBack, onComplete }) {
  const [cardIdx, setCardIdx] = useState(0);
  const currentCard = chapter.cards?.[cardIdx];
  const hints = chapter.hints || [];

  const nextCard = () => {
    if (cardIdx < chapter.cards.length - 1) {
      setCardIdx(cardIdx + 1);
    } else {
      onComplete(chapter.id);
    }
  };

  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <Button onClick={onBack} variant="tertiary" size="sm">
          ← Zurück
        </Button>
        <Timer time={timer} />
      </div>
      <Progress current={cardIdx + 1} total={chapter.cards?.length || 1} />
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "12px" }}>
        {currentCard && (
          <CardRenderer
            card={currentCard}
            hints={hints}
            hintsUnlocked={hintsUnlocked}
            onAction={nextCard}
            onChoice={nextCard}
            onComplete={nextCard}
          />
        )}
      </div>
      <Button onClick={nextCard} variant="primary" style={{ width: "100%" }}>
        {cardIdx < chapter.cards.length - 1 ? "Weiter →" : "Abschlieseen →"}
      </Button>
    </div>
  );
}

// Transition screen — chapter completion
function FNTransition({ chapter, onNext }) {
  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div className="fn-stamp-drop">
        <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "12px" }}>
          ✓
        </div>
        <div style={{ fontSize: "20px", fontWeight: "700", textAlign: "center", marginBottom: "8px" }}>
          {chapter.title}
        </div>
        <div style={{ fontSize: "13px", opacity: 0.7, textAlign: "center" }}>
          abgeschlossen
        </div>
      </div>
      <Button onClick={onNext} variant="primary" style={{ width: "100%" }}>
        → Nächste Spur
      </Button>
    </div>
  );
}

// Ending screen — case resolution
function FNEnding({ onReplay }) {
  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>🎯 Akte geschlossen</div>
        <Card>
          <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
            Du hast Maya gefunden. Aber der Fall ist nicht vorbei. Deine Beweise werden in der Gemeinderatssitzung am Freitag gebraucht – um das Gaskraftwerk-Projekt zu stoppen.
          </div>
        </Card>
      </div>
      <Button onClick={onReplay} variant="primary" style={{ width: "100%" }}>
        🔄 Nochmal spielen
      </Button>
    </div>
  );
}

// Gamemaster console
function FNGamemaster({ timer, teamName, completed, tracks, hintsUnlocked, onAdvance, onRevealHint, onReset }) {
  return (
    <div style={{ padding: "20px", background: "#1a1812", height: "100%", display: "flex", flexDirection: "column", fontSize: "12px" }}>
      <div style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid rgba(233, 196, 106, 0.2)" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "6px" }}>{teamName}</div>
        <div style={{ fontSize: "20px", fontFamily: "monospace", color: "#f4a261" }}>{timer}</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "12px" }}>
        <div style={{ fontSize: "11px", fontWeight: "600", opacity: 0.6, marginBottom: "8px" }}>STATUS: {completed.length}/{tracks.length}</div>
        {tracks.map((track) => {
          const done = completed.includes(track.id);
          return (
            <Card key={track.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "600" }}>{track.glyph} · {track.title}</div>
                  <div style={{ opacity: 0.6, fontSize: "11px" }}>{track.theme}</div>
                </div>
                {done ? (
                  <div style={{ color: "#2ecc71", fontSize: "14px" }}>✓</div>
                ) : (
                  <Button onClick={() => onAdvance(track.id)} variant="secondary" size="sm">
                    UNLOCK
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={onRevealHint} variant="secondary" style={{ flex: 1 }}>
          💡 Tipp ({hintsUnlocked}/3)
        </Button>
        <Button onClick={onReset} variant="secondary" style={{ flex: 1 }}>
          🔄 Reset
        </Button>
      </div>
    </div>
  );
}

// Export all screens
window.FN_SCREENS = {
  FNStart,
  FNIntro,
  FNTutorial,
  FNHub,
  FNChapter,
  FNTransition,
  FNEnding,
  FNGamemaster,
};

// Export complete data structure
window.FN_DATA = {
  STORY: window.STORY || {},
  TRACKS: window.TRACKS || [],
  CHAPTERS: {
    bahnhof: window.CHAPTER_BAHNHOF || {},
    // Add more chapters here
  },
};
