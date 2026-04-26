// Field Notes v2 — verification widgets
// Exports: window.FN_VERIFY = { CodeVerify, MultipleVerify, SequenceVerify, PasswordVerify, QRVerify, PhotoVerify, PatternVerify, CaesarVerify }

const { useState, useRef, useEffect } = React;
const T = () => window.FN.TOKENS;

// ─────────── shared wrapper ───────────
function VerifyShell({ title, subtitle, children, onSubmit, canSubmit, error, success, successMsg }) {
  const tk = T();
  return (
    <div style={{
      position: "relative", background: "#fdf8ec",
      padding: "20px 18px 22px",
      boxShadow: `4px 4px 0 ${tk.color.shadow}, inset 0 0 50px rgba(168, 66, 28, 0.04)`,
      border: `1px solid ${tk.color.paperDark}`
    }}>
      <div style={{
        position: "absolute", top: -12, left: 18,
        background: tk.color.stamp, color: "#fdf8ec",
        padding: "4px 12px",
        fontFamily: tk.font.type, fontSize: 10, letterSpacing: "0.2em"
      }}>VERIFIZIERUNG</div>

      <div style={{
        fontFamily: tk.font.serif, fontSize: 19, fontWeight: 600,
        color: tk.color.ink, marginTop: 8, marginBottom: 4
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontFamily: tk.font.type, fontSize: 10, letterSpacing: "0.15em",
          color: tk.color.inkFaded, marginBottom: 12, textTransform: "uppercase"
        }}>{subtitle}</div>
      )}

      {!success && (
        <div className={error ? "fn-shake" : ""}>
          {children}
        </div>
      )}

      {success && (
        <div style={{
          padding: "18px 10px", textAlign: "center",
          background: tk.color.thread, color: tk.color.paper, marginTop: 6
        }}>
          <div style={{ fontFamily: tk.font.type, fontSize: 10, letterSpacing: "0.3em" }}>SPUR FREIGESCHALTET</div>
          <div style={{ fontFamily: tk.font.hand2, fontSize: 32, margin: "6px 0" }}>✓</div>
          <div style={{ fontFamily: tk.font.serif, fontSize: 13, fontStyle: "italic" }}>{successMsg}</div>
        </div>
      )}

      {!success && (
        <button onClick={onSubmit} disabled={!canSubmit} style={{
          width: "100%", marginTop: 12,
          background: canSubmit ? tk.color.ink : tk.color.inkFaded,
          color: tk.color.paper, border: "none",
          padding: "13px", fontFamily: tk.font.serif, fontSize: 15,
          cursor: canSubmit ? "pointer" : "not-allowed",
          letterSpacing: "0.04em",
          boxShadow: canSubmit ? `3px 3px 0 ${tk.color.rust}` : "none"
        }}>Spur verifizieren →</button>
      )}

      {error && (
        <div style={{
          fontFamily: tk.font.type, fontSize: 10, color: tk.color.stamp,
          marginTop: 8, textAlign: "center", letterSpacing: "0.15em"
        }}>STIMMT NICHT · nochmal prüfen</div>
      )}
    </div>
  );
}

// ─────────── 1. CODE (4-digit) ───────────
function CodeVerify({ answer = "0725", successMsg, onOk, sound, title = "Welcher Code?", subtitle = "4-STELLIGER CODE" }) {
  const tk = T();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const submit = () => {
    if (code === answer) { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); }
    else { setError(true); sound?.("error"); setTimeout(() => setError(false), 400); }
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={submit} canSubmit={code.length === answer.length}
      error={error} success={success} successMsg={successMsg}>
      <div style={{
        display: "flex", gap: 8, justifyContent: "center", margin: "8px 0 12px"
      }}>
        {[...answer].map((_, i) => (
          <div key={i} style={{
            width: 44, height: 56, background: tk.color.paperDeep,
            border: `2px solid ${error ? tk.color.stamp : tk.color.ink}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: tk.font.type, fontSize: 28, color: tk.color.ink, fontWeight: 700
          }}>{code[i] || ""}</div>
        ))}
      </div>
      <input autoFocus inputMode="numeric" maxLength={answer.length}
        value={code} onChange={e => { setCode(e.target.value.replace(/\D/g, "")); sound?.("type"); }}
        placeholder="Code eingeben…"
        style={{
          width: "100%", padding: "10px 12px", background: "transparent",
          border: `1px dashed ${tk.color.inkFaded}`, textAlign: "center",
          fontFamily: tk.font.type, fontSize: 13, color: tk.color.ink,
          outline: "none", letterSpacing: "0.25em"
        }}/>
    </VerifyShell>
  );
}

// ─────────── 2. MULTIPLE CHOICE (receipt products) ───────────
function MultipleVerify({ items, answerIndex, successMsg, onOk, sound, title = "Welches Produkt passt nicht?", subtitle = "AUSWAHL" }) {
  const tk = T();
  const [picked, setPicked] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const submit = () => {
    if (picked === answerIndex) { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); }
    else { setError(true); sound?.("error"); setTimeout(() => setError(false), 400); }
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={submit} canSubmit={picked != null}
      error={error} success={success} successMsg={successMsg}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "6px 0" }}>
        {items.map((it, i) => {
          const sel = picked === i;
          return (
            <button key={i} onClick={() => { setPicked(i); sound?.("type"); }} style={{
              background: sel ? tk.color.ink : tk.color.paperDeep,
              color: sel ? tk.color.paper : tk.color.ink,
              border: `1px solid ${sel ? tk.color.ink : tk.color.inkFaded}`,
              textAlign: "left", padding: "10px 12px",
              fontFamily: tk.font.type, fontSize: 12,
              display: "flex", justifyContent: "space-between", cursor: "pointer"
            }}>
              <span>{i + 1}. {it.label}</span>
              <span>{it.price}</span>
            </button>
          );
        })}
      </div>
    </VerifyShell>
  );
}

// ─────────── 3. SEQUENCE (drag-order, simple tap-to-add) ───────────
function SequenceVerify({ items, answer, successMsg, onOk, sound, title = "In welcher Reihenfolge?", subtitle = "SEQUENZ" }) {
  const tk = T();
  const [seq, setSeq] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const remaining = items.filter((_, i) => !seq.includes(i));
  const submit = () => {
    const ok = JSON.stringify(seq) === JSON.stringify(answer);
    if (ok) { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); }
    else { setError(true); sound?.("error"); setTimeout(() => setError(false), 400); }
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={submit} canSubmit={seq.length === items.length}
      error={error} success={success} successMsg={successMsg}>
      <div style={{
        minHeight: 50, background: tk.color.paperDeep,
        border: `1px dashed ${tk.color.inkFaded}`,
        padding: 8, display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8
      }}>
        {seq.length === 0 && (
          <span style={{ fontFamily: tk.font.hand, fontSize: 15, color: tk.color.inkFaded, padding: 4 }}>
            Reihenfolge anklicken…
          </span>
        )}
        {seq.map((idx, pos) => (
          <button key={pos} onClick={() => setSeq(seq.filter((_, p) => p !== pos))} style={{
            background: tk.color.ink, color: tk.color.paper, border: "none",
            padding: "5px 10px", fontFamily: tk.font.type, fontSize: 11, cursor: "pointer"
          }}>{pos + 1}. {items[idx]} ✕</button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((it, i) => seq.includes(i) ? null : (
          <button key={i} onClick={() => { setSeq([...seq, i]); sound?.("type"); }} style={{
            background: "#fff", color: tk.color.ink,
            border: `1px solid ${tk.color.inkFaded}`, padding: "6px 10px",
            fontFamily: tk.font.serif, fontSize: 12, cursor: "pointer"
          }}>{it}</button>
        ))}
      </div>
    </VerifyShell>
  );
}

// ─────────── 4. PASSWORD (text) ───────────
function PasswordVerify({ answer, successMsg, onOk, sound, title = "Passwort?", subtitle = "WORT-EINGABE", placeholder = "…" }) {
  const tk = T();
  const [val, setVal] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const submit = () => {
    if (val.trim().toLowerCase() === answer.toLowerCase()) { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); }
    else { setError(true); sound?.("error"); setTimeout(() => setError(false), 400); }
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={submit} canSubmit={val.length > 0}
      error={error} success={success} successMsg={successMsg}>
      <input autoFocus value={val} onChange={e => { setVal(e.target.value); sound?.("type"); }}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 14px", background: tk.color.paperDeep,
          border: `2px solid ${error ? tk.color.stamp : tk.color.ink}`,
          fontFamily: tk.font.hand2, fontSize: 22, textAlign: "center",
          color: tk.color.ink, outline: "none", margin: "6px 0 2px"
        }}/>
    </VerifyShell>
  );
}

// ─────────── 5. QR CODE (simulated scan) ───────────
function QRVerify({ answer = "MAYA-WALD-07", successMsg, onOk, sound, title = "QR-Code scannen", subtitle = "SCAN" }) {
  const tk = T();
  const [scanned, setScanned] = useState(false);
  const [success, setSuccess] = useState(false);
  const startScan = () => {
    sound?.("flip");
    setTimeout(() => { setScanned(true); sound?.("success"); setTimeout(() => { setSuccess(true); setTimeout(() => onOk?.(), 1200); }, 600); }, 1200);
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={startScan} canSubmit={!scanned}
      success={success} successMsg={successMsg}>
      <div style={{
        background: "#111", height: 180, position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {/* fake camera feed */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(168,66,28,0.2), transparent 70%),
                       repeating-linear-gradient(45deg, #222 0 6px, #1a1a1a 6px 12px)`
        }}/>
        {/* fake QR */}
        <div style={{
          width: 110, height: 110, background: "#fff", padding: 8,
          display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 1
        }}>
          {Array.from({ length: 81 }).map((_, i) => (
            <div key={i} style={{ background: ((i * 7 + 3) ^ (i >> 2)) & 1 ? "#000" : "#fff" }}/>
          ))}
        </div>
        {/* scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: tk.color.rust, top: "50%",
          boxShadow: `0 0 10px ${tk.color.rust}`,
          animation: "scanline 1.5s linear infinite"
        }}/>
        <style>{`@keyframes scanline { 0% { top: 15%; } 50% { top: 85%; } 100% { top: 15%; } }`}</style>

        {/* corner brackets */}
        {[[10,10],[10,"auto",10],["auto",10,"auto",10],["auto",10,10]].map((pos, i) => null)}

        {scanned && (
          <div style={{
            position: "absolute", bottom: 10, left: 10, right: 10,
            background: tk.color.paper, color: tk.color.ink,
            fontFamily: tk.font.type, fontSize: 11, padding: "6px 10px",
            letterSpacing: "0.1em"
          }}>✓ {answer}</div>
        )}
      </div>
    </VerifyShell>
  );
}

// ─────────── 6. PHOTO UPLOAD (simulated) ───────────
function PhotoVerify({ prompt = "Foto von Mayas Notizbuch hochladen", successMsg, onOk, sound, title = "Beweisfoto", subtitle = "FOTO-UPLOAD" }) {
  const tk = T();
  const [state, setState] = useState("empty"); // empty | uploading | done
  const [success, setSuccess] = useState(false);
  const trigger = () => {
    sound?.("flip"); setState("uploading");
    setTimeout(() => { setState("done"); sound?.("stamp"); }, 1400);
  };
  const confirm = () => { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={state === "done" ? confirm : trigger}
      canSubmit={state !== "uploading"}
      success={success} successMsg={successMsg}>
      <div style={{
        background: tk.color.paperDeep, height: 150,
        border: `2px dashed ${tk.color.inkFaded}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 6, position: "relative", overflow: "hidden"
      }}>
        {state === "empty" && (
          <>
            <div style={{ fontSize: 36 }}>📷</div>
            <div style={{ fontFamily: tk.font.type, fontSize: 10, letterSpacing: "0.15em", color: tk.color.inkFaded }}>
              {prompt.toUpperCase()}
            </div>
          </>
        )}
        {state === "uploading" && (
          <>
            <div style={{ fontFamily: tk.font.type, fontSize: 10, letterSpacing: "0.2em", color: tk.color.ink }}>HOCHLADEN…</div>
            <div style={{ width: "60%", height: 3, background: tk.color.paper }}>
              <div style={{
                height: "100%", background: tk.color.rust, animation: "fn-upload 1.4s linear forwards"
              }}/>
            </div>
            <style>{`@keyframes fn-upload { from { width: 0 } to { width: 100% } }`}</style>
          </>
        )}
        {state === "done" && (
          <div style={{
            position: "absolute", inset: 8, background: `linear-gradient(160deg, #4a7a5c, #2C5542)`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              color: "rgba(255,255,255,0.85)", fontFamily: tk.font.hand2, fontSize: 14,
              textAlign: "center", padding: 16, lineHeight: 1.3
            }}>Notizbuch · Seite 14<br/>Vögelinsegg, 23.04.</div>
            <Stamp label="BEWEIS" color="stamp" rot={-10} size={68}
              style={{ position: "absolute", top: 10, right: 10 }}/>
          </div>
        )}
      </div>
    </VerifyShell>
  );
}

// ─────────── 7. PATTERN (symbol grid — pick correct set) ───────────
function PatternVerify({ symbols = ["◇","○","△","◇","□","○","△","□","◇"], answer = [0,3,6], successMsg, onOk, sound, title = "Welche Symbole markieren den Ort?", subtitle = "MUSTER" }) {
  const tk = T();
  const [sel, setSel] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const toggle = (i) => {
    sound?.("type");
    setSel(sel.includes(i) ? sel.filter(x => x !== i) : [...sel, i]);
  };
  const submit = () => {
    const ok = sel.length === answer.length && answer.every(a => sel.includes(a));
    if (ok) { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); }
    else { setError(true); sound?.("error"); setTimeout(() => setError(false), 400); }
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={submit} canSubmit={sel.length === answer.length}
      error={error} success={success} successMsg={successMsg}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
        margin: "4px 0"
      }}>
        {symbols.map((s, i) => {
          const on = sel.includes(i);
          return (
            <button key={i} onClick={() => toggle(i)} style={{
              aspectRatio: "1/1", background: on ? tk.color.ink : tk.color.paperDeep,
              color: on ? tk.color.paper : tk.color.ink,
              border: `2px solid ${on ? tk.color.rust : tk.color.inkFaded}`,
              fontFamily: tk.font.serif, fontSize: 32, cursor: "pointer"
            }}>{s}</button>
          );
        })}
      </div>
    </VerifyShell>
  );
}

// ─────────── 8. CAESAR CIPHER ───────────
function CaesarVerify({ cipher = "PDBD", answer = "MAYA", shift = 3, successMsg, onOk, sound, title = "Cäsar-Verschlüsselung", subtitle = "CHIFFRE" }) {
  const tk = T();
  const [val, setVal] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showShift, setShowShift] = useState(shift);
  const decoded = [...cipher].map(c => {
    if (!/[A-Z]/.test(c)) return c;
    return String.fromCharCode((c.charCodeAt(0) - 65 - showShift + 26) % 26 + 65);
  }).join("");
  const submit = () => {
    if (val.trim().toUpperCase() === answer.toUpperCase()) { setSuccess(true); sound?.("success"); setTimeout(() => onOk?.(), 1500); }
    else { setError(true); sound?.("error"); setTimeout(() => setError(false), 400); }
  };
  return (
    <VerifyShell title={title} subtitle={subtitle}
      onSubmit={submit} canSubmit={val.length > 0}
      error={error} success={success} successMsg={successMsg}>
      <div style={{
        background: tk.color.paperDeep, padding: "12px 14px", marginBottom: 10,
        fontFamily: tk.font.type, fontSize: 12, color: tk.color.ink
      }}>
        <div style={{ letterSpacing: "0.15em", color: tk.color.inkFaded, marginBottom: 4 }}>CHIFFRIERTEXT:</div>
        <div style={{ fontSize: 24, letterSpacing: "0.3em", textAlign: "center", margin: "4px 0 10px" }}>{cipher}</div>
        <div style={{ letterSpacing: "0.15em", color: tk.color.inkFaded, marginBottom: 4 }}>ENTSCHLÜSSELT (Verschiebung {showShift}):</div>
        <div style={{ fontSize: 24, letterSpacing: "0.3em", textAlign: "center", color: tk.color.rust }}>{decoded}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <span style={{ color: tk.color.inkFaded, fontSize: 10, letterSpacing: "0.1em" }}>VERSCHIEBUNG</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setShowShift(Math.max(0, showShift - 1))} style={smallBtn(tk)}>−</button>
            <span style={{ minWidth: 18, textAlign: "center" }}>{showShift}</span>
            <button onClick={() => setShowShift(Math.min(25, showShift + 1))} style={smallBtn(tk)}>+</button>
          </div>
        </div>
      </div>
      <input autoFocus value={val} onChange={e => { setVal(e.target.value); sound?.("type"); }}
        placeholder="Entschlüsseltes Wort…"
        style={{
          width: "100%", padding: "10px 12px", background: "transparent",
          border: `1px dashed ${tk.color.inkFaded}`, textAlign: "center",
          fontFamily: tk.font.type, fontSize: 14, color: tk.color.ink,
          letterSpacing: "0.2em", textTransform: "uppercase", outline: "none"
        }}/>
    </VerifyShell>
  );
}
const smallBtn = (tk) => ({
  background: tk.color.ink, color: tk.color.paper, border: "none",
  width: 22, height: 22, fontFamily: tk.font.type, cursor: "pointer"
});

window.FN_VERIFY = { CodeVerify, MultipleVerify, SequenceVerify, PasswordVerify, QRVerify, PhotoVerify, PatternVerify, CaesarVerify };
