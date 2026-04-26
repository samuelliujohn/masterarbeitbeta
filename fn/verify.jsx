// Verification system — 8 puzzle types

const { useState } = React;
const { Input, Button, Alert } = window.FN.ATOMS;

// 1. Code entry (4-digit codes)
function VerifyCode({ puzzle, onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);

  const check = () => {
    if (input === puzzle.answer) {
      setSolved(true);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div>
      {error && <Alert type="error" title="Falsch" body="Code nicht korrekt. Versuche nochmal." />}
      {solved && (
        <Alert type="success" title="Richtig!" body={puzzle.success || "Gelöst!"} />
      )}
      {!solved && (
        <div>
          <Input
            placeholder={puzzle.placeholder || "Eingabe"}
            value={input}
            onChange={setInput}
            type="text"
          />
          <Button onClick={check} variant="primary" style={{ width: "100%" }}>
            Überprüfen
          </Button>
        </div>
      )}
    </div>
  );
}

// 2. Multiple choice
function VerifyMultiChoice({ puzzle, onSuccess }) {
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);

  const check = (idx) => {
    if (idx === puzzle.answerIndex) {
      setSolved(true);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div>
      {error && <Alert type="error" title="Falsch" body="Das ist nicht die richtige Antwort." />}
      {solved && (
        <Alert type="success" title="Richtig!" body={puzzle.success || "Gelöst!"} />
      )}
      {!solved && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {puzzle.options.map((opt, i) => (
            <Button
              key={i}
              onClick={() => check(i)}
              variant={selected === i ? "primary" : "secondary"}
              style={{ width: "100%", justifyContent: "flex-start" }}
            >
              {opt}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// 3. Pattern matching (identify matching sequences)
function VerifyPattern({ puzzle, onSuccess }) {
  const [selected, setSelected] = useState([]);
  const [solved, setSolved] = useState(false);

  const check = () => {
    const correct = selected.sort().join(",") === puzzle.answer.sort().join(",");
    if (correct) {
      setSolved(true);
      onSuccess();
    }
  };

  return (
    <div>
      {solved && (
        <Alert type="success" title="Richtig!" body={puzzle.success || "Muster erkannt!"} />
      )}
      {!solved && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
            {puzzle.items.map((item, i) => (
              <Button
                key={i}
                onClick={() => {
                  if (selected.includes(i)) {
                    setSelected(selected.filter((x) => x !== i));
                  } else {
                    setSelected([...selected, i]);
                  }
                }}
                variant={selected.includes(i) ? "primary" : "secondary"}
              >
                {item}
              </Button>
            ))}
          </div>
          <Button onClick={check} variant="primary" style={{ width: "100%" }}>
            Überprüfen ({selected.length}/{puzzle.answer.length})
          </Button>
        </div>
      )}
    </div>
  );
}

// 4. Sequence ordering (drag to reorder)
function VerifySequence({ puzzle, onSuccess }) {
  const [order, setOrder] = useState(puzzle.items.map((_, i) => i));
  const [solved, setSolved] = useState(false);

  const check = () => {
    const correct = order.every((i, idx) => i === puzzle.answer[idx]);
    if (correct) {
      setSolved(true);
      onSuccess();
    }
  };

  const move = (idx, direction) => {
    const newOrder = [...order];
    if (direction === "up" && idx > 0) {
      [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    } else if (direction === "down" && idx < newOrder.length - 1) {
      [newOrder[idx + 1], newOrder[idx]] = [newOrder[idx], newOrder[idx + 1]];
    }
    setOrder(newOrder);
  };

  return (
    <div>
      {solved && (
        <Alert type="success" title="Richtig!" body={puzzle.success || "Reihenfolge korrekt!"} />
      )}
      {!solved && (
        <div>
          <div style={{ marginBottom: "12px" }}>
            {order.map((itemIdx, pos) => (
              <div
                key={pos}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                  padding: "8px",
                  background: "rgba(233, 196, 106, 0.1)",
                  borderRadius: "4px",
                }}
              >
                <span style={{ fontSize: "20px", minWidth: "30px" }}>{pos + 1}.</span>
                <span style={{ flex: 1 }}>{puzzle.items[itemIdx]}</span>
                <Button
                  onClick={() => move(pos, "up")}
                  variant="tertiary"
                  size="sm"
                  disabled={pos === 0}
                >
                  ↑
                </Button>
                <Button
                  onClick={() => move(pos, "down")}
                  variant="tertiary"
                  size="sm"
                  disabled={pos === order.length - 1}
                >
                  ↓
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={check} variant="primary" style={{ width: "100%" }}>
            Überprüfen
          </Button>
        </div>
      )}
    </div>
  );
}

// 5. Caesar cipher (shift decoder)
function VerifyCaesar({ puzzle, onSuccess }) {
  const [shift, setShift] = useState(0);
  const [solved, setSolved] = useState(false);

  const decode = (text, s) => {
    return text
      .split("")
      .map((c) => {
        if (!/[a-z]/i.test(c)) return c;
        const code = c.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base - s + 26) % 26) + base);
      })
      .join("");
  };

  const decoded = decode(puzzle.encoded, shift);

  const check = () => {
    if (decoded.toLowerCase() === puzzle.answer.toLowerCase()) {
      setSolved(true);
      onSuccess();
    }
  };

  return (
    <div>
      {solved && (
        <Alert type="success" title="Richtig!" body={puzzle.success || "Entschlüsselt!"} />
      )}
      {!solved && (
        <div>
          <div style={{ fontSize: "13px", marginBottom: "12px", padding: "8px", background: "rgba(233, 196, 106, 0.1)", borderRadius: "4px" }}>
            Verschlüsselt: <strong>{puzzle.encoded}</strong>
          </div>
          <div style={{ fontSize: "13px", marginBottom: "12px", padding: "8px", background: "rgba(233, 196, 106, 0.05)", borderRadius: "4px" }}>
            Entschlüsselt: <strong>{decoded}</strong>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "12px", opacity: 0.7 }}>Verschiebung: {shift}</label>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </div>
          <Button onClick={check} variant="primary" style={{ width: "100%" }}>
            Überprüfen
          </Button>
        </div>
      )}
    </div>
  );
}

// Generic verifier router
function Verifier({ type = "code", puzzle, onSuccess }) {
  switch (type) {
    case "code":
      return <VerifyCode puzzle={puzzle} onSuccess={onSuccess} />;
    case "multichoice":
      return <VerifyMultiChoice puzzle={puzzle} onSuccess={onSuccess} />;
    case "pattern":
      return <VerifyPattern puzzle={puzzle} onSuccess={onSuccess} />;
    case "sequence":
      return <VerifySequence puzzle={puzzle} onSuccess={onSuccess} />;
    case "caesar":
      return <VerifyCaesar puzzle={puzzle} onSuccess={onSuccess} />;
    default:
      return <div>Unbekannter Verifizierungstyp: {type}</div>;
  }
}

// Export verifier
window.FN_VERIFY = {
  Verifier,
  VerifyCode,
  VerifyMultiChoice,
  VerifyPattern,
  VerifySequence,
  VerifyCaesar,
};
