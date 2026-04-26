// Content rendering — Story, Info, Event, Puzzle cards

const { Button, Card, Alert, Hint } = window.FN.ATOMS;
const { Verifier } = window.FN_VERIFY;
const { useState } = React;

// Story card — narrative content
function StoryCard({ card, onAction }) {
  return (
    <Card>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "4px" }}>📖 GESCHICHTE</div>
        <div style={{ fontSize: "16px", fontWeight: "700" }}>{card.title}</div>
        {card.time && (
          <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "4px" }}>⏰ {card.time}</div>
        )}
      </div>
      <div style={{ fontSize: "13px", lineHeight: "1.6", margin: "12px 0", whiteSpace: "pre-wrap" }}>
        {card.body}
      </div>
      {card.action && (
        <Button
          onClick={onAction}
          variant="primary"
          style={{ width: "100%", marginTop: "12px" }}
        >
          → {card.action}
        </Button>
      )}
    </Card>
  );
}

// Info card — contextual information
function InfoCard({ card }) {
  return (
    <Card>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "4px" }}>ℹ️ INFO</div>
        <div style={{ fontSize: "16px", fontWeight: "700" }}>{card.title}</div>
        {card.subtitle && (
          <div style={{ fontSize: "11px", color: "#e9c46a", marginTop: "4px" }}>
            {card.subtitle}
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: "13px",
          lineHeight: "1.6",
          margin: "12px 0",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          background: "#1a1812",
          padding: "8px",
          borderRadius: "4px",
          overflow: "auto",
        }}
      >
        {card.body}
      </div>
      {card.meta && (
        <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "8px" }}>
          📌 {card.meta}
        </div>
      )}
    </Card>
  );
}

// Event card — narrative choice point
function EventCard({ card, onChoice }) {
  return (
    <Card>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "4px" }}>🔔 EREIGNIS</div>
        <div style={{ fontSize: "16px", fontWeight: "700" }}>{card.title}</div>
        {card.subtitle && (
          <div style={{ fontSize: "11px", color: "#e9c46a", marginTop: "4px" }}>
            {card.subtitle}
          </div>
        )}
      </div>
      <div style={{ fontSize: "13px", lineHeight: "1.6", margin: "12px 0", whiteSpace: "pre-wrap" }}>
        {card.body}
      </div>
      {card.choices && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
          {card.choices.map((choice, i) => (
            <Button
              key={i}
              onClick={() => onChoice(i)}
              variant="secondary"
              style={{ width: "100%" }}
            >
              {choice}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}

// Puzzle card — verification challenge
function PuzzleCard({ card, hints, hintsUnlocked, onComplete }) {
  const [solved, setSolved] = useState(false);

  return (
    <Card>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "4px" }}>🔐 RÄTSEL</div>
        <div style={{ fontSize: "16px", fontWeight: "700" }}>{card.title}</div>
        {card.subtitle && (
          <div style={{ fontSize: "11px", color: "#e9c46a", marginTop: "4px" }}>
            {card.subtitle}
          </div>
        )}
      </div>
      <div style={{ fontSize: "13px", lineHeight: "1.6", margin: "12px 0", whiteSpace: "pre-wrap" }}>
        {card.body}
      </div>
      <Verifier
        type={card.verifyType || "code"}
        puzzle={card}
        onSuccess={() => {
          setSolved(true);
          onComplete?.();
        }}
      />
      {!solved && hints && hintsUnlocked > 0 && (
        <div style={{ marginTop: "12px" }}>
          {hints.slice(0, hintsUnlocked).map((hint, i) => (
            <Hint key={i} title={hint.title} body={hint.body} />
          ))}
        </div>
      )}
    </Card>
  );
}

// Generic card renderer
function CardRenderer({ card, hints, hintsUnlocked, onAction, onChoice, onComplete }) {
  switch (card.type) {
    case "story":
      return <StoryCard card={card} onAction={onAction} />;
    case "info":
      return <InfoCard card={card} />;
    case "event":
      return <EventCard card={card} onChoice={onChoice} />;
    case "puzzle":
      return (
        <PuzzleCard
          card={card}
          hints={hints}
          hintsUnlocked={hintsUnlocked}
          onComplete={onComplete}
        />
      );
    default:
      return <Card>Unbekannter Kartentyp: {card.type}</Card>;
  }
}

// Export content renderers
window.FN_CONTENT = {
  StoryCard,
  InfoCard,
  EventCard,
  PuzzleCard,
  CardRenderer,
};
