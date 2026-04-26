// Variant 2 — "Signal" — dark, encrypted messenger, activist cipher vibe
// JetBrains Mono + Inter · neon lime accent

const signalPalette = {
  bg: "#0A0D0B",
  bgElev: "#131815",
  bgCard: "#1A201C",
  border: "#2A342E",
  text: "#E8F0E4",
  textDim: "#7A8A7E",
  accent: "#B4F03D",
  accentDim: "#5C7A1F",
  warn: "#FF6B4A",
  maya: "#F7D948"
};

const signalFonts = {
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Inter', sans-serif"
};

// Scanlines overlay
const ScanLines = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
    background: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(180, 240, 61, 0.015) 2px, rgba(180, 240, 61, 0.015) 3px)"
  }} />
);

// ---------- START ----------
const SignalStart = ({ onStart, teamName, setTeamName }) => {
  const [typed, setTyped] = React.useState("");
  const full = STORY.lastMessage.text;
  React.useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: signalPalette.bg, color: signalPalette.text,
      fontFamily: signalFonts.sans, padding: "54px 20px 24px",
      display: "flex", flexDirection: "column", position: "relative", overflow: "hidden"
    }}>
      <ScanLines />

      {/* top pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: signalFonts.mono, fontSize: 10, color: signalPalette.accent,
        letterSpacing: "0.15em"
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: signalPalette.accent,
          boxShadow: `0 0 10px ${signalPalette.accent}`,
          animation: "pulse 2s infinite"
        }} />
        SIGNAL · END-TO-END · VERIFIED
      </div>

      <div style={{
        fontFamily: signalFonts.mono, fontSize: 11, color: signalPalette.textDim,
        marginTop: 28, letterSpacing: "0.1em"
      }}>$ ./start --case="maya" --date=24.04</div>

      <h1 style={{
        fontFamily: signalFonts.sans, fontSize: 48, lineHeight: 0.95,
        fontWeight: 800, letterSpacing: "-0.03em",
        margin: "8px 0 0 0", color: signalPalette.text
      }}>
        Wo ist<br/>
        <span style={{ color: signalPalette.accent }}>Maya_</span>
      </h1>

      <div style={{
        fontFamily: signalFonts.mono, fontSize: 11, color: signalPalette.textDim,
        marginTop: 10, lineHeight: 1.5
      }}>
        Operation SPEICHER · 5 nodes · 60:00
      </div>

      {/* Last message terminal */}
      <div style={{
        marginTop: 28, background: signalPalette.bgElev,
        border: `1px solid ${signalPalette.border}`,
        fontFamily: signalFonts.mono, fontSize: 11
      }}>
        <div style={{
          background: signalPalette.bgCard, padding: "6px 10px",
          borderBottom: `1px solid ${signalPalette.border}`,
          display: "flex", justifyContent: "space-between", color: signalPalette.textDim
        }}>
          <span>[ letzte signal-nachricht ]</span>
          <span>{STORY.lastMessage.time}</span>
        </div>
        <div style={{ padding: "12px 10px", minHeight: 120, lineHeight: 1.7 }}>
          <span style={{ color: signalPalette.maya }}>{STORY.lastMessage.from}:</span>{" "}
          <span style={{ color: signalPalette.text }}>{typed}</span>
          <span style={{
            display: "inline-block", width: 8, height: 14,
            background: signalPalette.accent, marginLeft: 2, verticalAlign: "middle",
            animation: "blink 1s infinite"
          }} />
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* team input */}
      <div style={{
        background: signalPalette.bgElev,
        border: `1px solid ${signalPalette.border}`,
        padding: "12px 14px", marginBottom: 12
      }}>
        <div style={{
          fontFamily: signalFonts.mono, fontSize: 9, letterSpacing: "0.25em",
          color: signalPalette.textDim, textTransform: "uppercase", marginBottom: 4
        }}>&gt; team_id</div>
        <input
          value={teamName} onChange={e => setTeamName(e.target.value)}
          placeholder="unit_name..."
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            fontFamily: signalFonts.mono, fontSize: 18, color: signalPalette.accent,
            padding: 0
          }}
        />
      </div>

      <button onClick={onStart} style={{
        background: signalPalette.accent, color: signalPalette.bg,
        border: "none", padding: "16px 20px",
        fontFamily: signalFonts.mono, fontSize: 13, fontWeight: 700,
        letterSpacing: "0.2em", cursor: "pointer", textTransform: "uppercase"
      }}>
        [ connect ] →
      </button>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
        @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
      `}</style>
    </div>
  );
};

// ---------- HUB ----------
const SignalHub = ({ onPick, timer, teamName, completed }) => (
  <div style={{
    width: "100%", height: "100%", background: signalPalette.bg,
    color: signalPalette.text, fontFamily: signalFonts.sans,
    padding: "54px 18px 22px",
    display: "flex", flexDirection: "column", position: "relative", overflow: "hidden"
  }}>
    <ScanLines />

    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.15em",
      color: signalPalette.textDim, textTransform: "uppercase"
    }}>
      <span>// {teamName}</span>
      <span>
        <span style={{ color: signalPalette.warn }}>◉</span> {timer}
      </span>
    </div>

    <div style={{
      fontFamily: signalFonts.mono, fontSize: 10, color: signalPalette.accent,
      marginTop: 18, letterSpacing: "0.1em"
    }}>&gt; MAP_NODES</div>
    <h2 style={{
      fontFamily: signalFonts.sans, fontSize: 28, fontWeight: 800,
      letterSpacing: "-0.02em", margin: "4px 0 4px"
    }}>5 Knoten<span style={{ color: signalPalette.accent }}>.</span></h2>
    <div style={{
      fontFamily: signalFonts.mono, fontSize: 11, color: signalPalette.textDim,
      marginBottom: 16
    }}>{completed.length}/5 verified · {5 - completed.length} pending</div>

    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
      {TRACKS.map((t, i) => {
        const done = completed.includes(t.id);
        const locked = t.status === "gesperrt" && !done;
        return (
          <button key={t.id} onClick={() => !locked && onPick(t.id)} style={{
            textAlign: "left", cursor: locked ? "not-allowed" : "pointer",
            background: done ? `${signalPalette.accentDim}22` : signalPalette.bgElev,
            border: `1px solid ${done ? signalPalette.accent : signalPalette.border}`,
            padding: "12px 14px 12px 14px",
            fontFamily: signalFonts.sans, color: signalPalette.text,
            opacity: locked ? 0.4 : 1, position: "relative"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.15em",
              color: done ? signalPalette.accent : signalPalette.textDim,
              textTransform: "uppercase", marginBottom: 6
            }}>
              <span>node_0{i+1} // {t.theme}</span>
              <span>{done ? "✓ OK" : locked ? "◌ locked" : "◉ open"}</span>
            </div>
            <div style={{
              fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em",
              color: done ? signalPalette.accent : signalPalette.text
            }}>{t.title}</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 11, lineHeight: 1.5,
              color: signalPalette.textDim, marginTop: 4
            }}>{t.teaser}</div>
          </button>
        );
      })}
    </div>

    <div style={{
      marginTop: 12, padding: "10px 12px",
      background: signalPalette.bgElev, border: `1px dashed ${signalPalette.accent}`,
      fontFamily: signalFonts.mono, fontSize: 11, color: signalPalette.text
    }}>
      <span style={{ color: signalPalette.maya }}>maya &gt;</span> alle 5 knoten führen zum selben schluss.
    </div>
  </div>
);

// ---------- CHAPTER ----------
const SignalChapter = ({ onBack, onComplete, timer, hintsUnlocked }) => {
  const [cardIdx, setCardIdx] = React.useState(0);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showHints, setShowHints] = React.useState(false);
  const cards = CHAPTER_BAHNHOF.cards;
  const card = cards[cardIdx];

  const submitCode = () => {
    if (code === "0725") {
      setShowSuccess(true); setCodeError(false);
      setTimeout(() => onComplete("bahnhof"), 1800);
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 500);
    }
  };

  return (
    <div style={{
      width: "100%", height: "100%", background: signalPalette.bg,
      color: signalPalette.text, fontFamily: signalFonts.sans,
      padding: "54px 18px 20px",
      display: "flex", flexDirection: "column", position: "relative", overflow: "hidden"
    }}>
      <ScanLines />

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.15em",
        color: signalPalette.textDim, textTransform: "uppercase"
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", font: "inherit",
          color: signalPalette.accent, cursor: "pointer", padding: 0
        }}>← /nodes</button>
        <span><span style={{ color: signalPalette.warn }}>◉</span> {timer}</span>
      </div>

      <div style={{
        fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.2em",
        color: signalPalette.accent, marginTop: 16
      }}>NODE_01 // MOBILITÄT</div>
      <h2 style={{
        fontFamily: signalFonts.sans, fontSize: 30, fontWeight: 800,
        letterSpacing: "-0.02em", margin: "2px 0 0"
      }}>Bahnhof<span style={{ color: signalPalette.accent }}>.</span></h2>

      {/* progress */}
      <div style={{ display: "flex", gap: 4, marginTop: 14, marginBottom: 14 }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 2,
            background: i <= cardIdx ? signalPalette.accent : signalPalette.border
          }} />
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {card.type === "story" && (
          <div style={{
            background: signalPalette.bgElev,
            border: `1px solid ${signalPalette.border}`,
            padding: "14px"
          }}>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.2em",
              color: signalPalette.textDim, textTransform: "uppercase", marginBottom: 10
            }}>[ story.log · t+{card.time} ]</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{card.title}</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 13, lineHeight: 1.7,
              whiteSpace: "pre-wrap", color: signalPalette.text
            }}>{card.body}</div>
          </div>
        )}

        {card.type === "info" && (
          <div style={{
            background: signalPalette.bgElev,
            border: `1px solid ${signalPalette.accent}`,
            padding: "14px"
          }}>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.2em",
              color: signalPalette.accent, textTransform: "uppercase", marginBottom: 6
            }}>▼ INFO.CARD · {card.subtitle}</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{card.title}</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 12, lineHeight: 1.7,
              whiteSpace: "pre-wrap", color: signalPalette.text,
              background: signalPalette.bg, padding: "10px 12px",
              border: `1px solid ${signalPalette.border}`
            }}>{card.body}</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 10, color: signalPalette.textDim,
              marginTop: 10, letterSpacing: "0.1em"
            }}>// {card.meta}</div>
          </div>
        )}

        {card.type === "event" && (
          <div style={{
            background: `linear-gradient(135deg, ${signalPalette.warn}22, transparent)`,
            border: `1px solid ${signalPalette.warn}`,
            padding: "14px", position: "relative"
          }}>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.2em",
              color: signalPalette.warn, textTransform: "uppercase", marginBottom: 6
            }}>⚠ EVENT · {card.subtitle.split('·')[1]?.trim()}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{card.title}</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 13, lineHeight: 1.6,
              whiteSpace: "pre-wrap", color: signalPalette.text, marginBottom: 14
            }}>{card.body}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {card.choices.map((c, i) => (
                <button key={i} onClick={() => setCardIdx(cardIdx + 1)} style={{
                  background: signalPalette.bg, color: signalPalette.text,
                  border: `1px solid ${signalPalette.border}`,
                  padding: "10px 12px",
                  fontFamily: signalFonts.mono, fontSize: 12, textAlign: "left",
                  cursor: "pointer"
                }}>
                  <span style={{ color: signalPalette.accent }}>[{String.fromCharCode(65+i)}]</span> {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {card.type === "puzzle" && !showSuccess && (
          <div style={{
            background: signalPalette.bgElev,
            border: `1px solid ${codeError ? signalPalette.warn : signalPalette.accent}`,
            padding: "14px"
          }}>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.2em",
              color: signalPalette.accent, textTransform: "uppercase", marginBottom: 6
            }}>&gt; verify.sh</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{card.title}</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 12, lineHeight: 1.6,
              color: signalPalette.textDim, marginBottom: 18
            }}>{card.body}</div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 48, height: 60,
                  background: signalPalette.bg,
                  border: `1px solid ${codeError ? signalPalette.warn : code[i] ? signalPalette.accent : signalPalette.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: signalFonts.mono, fontSize: 26, fontWeight: 700,
                  color: codeError ? signalPalette.warn : signalPalette.accent,
                  textShadow: code[i] ? `0 0 8px ${signalPalette.accent}` : "none"
                }}>{code[i] || "·"}</div>
              ))}
            </div>
            <input
              autoFocus inputMode="numeric" maxLength={4}
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="&gt; enter code"
              style={{
                width: "100%", padding: "10px 12px",
                background: signalPalette.bg,
                border: `1px solid ${signalPalette.border}`,
                fontFamily: signalFonts.mono, fontSize: 13, textAlign: "center",
                color: signalPalette.text, outline: "none", letterSpacing: "0.3em"
              }}
            />
            <button onClick={submitCode} disabled={code.length !== 4} style={{
              width: "100%", marginTop: 10,
              background: code.length === 4 ? signalPalette.accent : signalPalette.border,
              color: code.length === 4 ? signalPalette.bg : signalPalette.textDim,
              border: "none", padding: "12px",
              fontFamily: signalFonts.mono, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: code.length === 4 ? "pointer" : "not-allowed"
            }}>[ verify ] →</button>
            {codeError && (
              <div style={{
                fontFamily: signalFonts.mono, fontSize: 11,
                color: signalPalette.warn, marginTop: 8, textAlign: "center"
              }}>ERR · code denied</div>
            )}
          </div>
        )}

        {card.type === "puzzle" && showSuccess && (
          <div style={{
            background: `${signalPalette.accent}15`,
            border: `1px solid ${signalPalette.accent}`,
            padding: "20px 14px", textAlign: "center",
            boxShadow: `0 0 30px ${signalPalette.accent}44`
          }}>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.3em",
              color: signalPalette.accent, textTransform: "uppercase"
            }}>✓ node_01 verified</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 44, fontWeight: 700,
              color: signalPalette.accent, margin: "8px 0",
              textShadow: `0 0 16px ${signalPalette.accent}`
            }}>0725_</div>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 12, color: signalPalette.text
            }}>{card.success}</div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
        <button onClick={() => setShowHints(true)} style={{
          background: "transparent",
          border: `1px solid ${signalPalette.border}`,
          color: signalPalette.text,
          padding: "10px 14px", fontFamily: signalFonts.mono, fontSize: 11,
          cursor: "pointer", letterSpacing: "0.1em"
        }}>◆ HINTS ({hintsUnlocked}/3)</button>
        {card.type !== "puzzle" && (
          <button onClick={() => setCardIdx(Math.min(cards.length - 1, cardIdx + 1))} style={{
            flex: 1, background: signalPalette.accent, color: signalPalette.bg,
            border: "none", padding: "10px 14px",
            fontFamily: signalFonts.mono, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.15em", cursor: "pointer", textTransform: "uppercase"
          }}>next →</button>
        )}
      </div>

      {showHints && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)",
          display: "flex", alignItems: "flex-end", zIndex: 10
        }} onClick={() => setShowHints(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: signalPalette.bg, width: "100%", padding: "20px 18px 24px",
            borderTop: `1px solid ${signalPalette.accent}`
          }}>
            <div style={{
              fontFamily: signalFonts.mono, fontSize: 11, letterSpacing: "0.2em",
              color: signalPalette.accent, textTransform: "uppercase", marginBottom: 14
            }}>&gt; HINT_STACK</div>
            {CHAPTER_BAHNHOF.hints.map((h, i) => {
              const unlocked = i < hintsUnlocked;
              return (
                <div key={i} style={{
                  background: signalPalette.bgElev,
                  border: `1px solid ${unlocked ? signalPalette.border : signalPalette.border}`,
                  padding: "10px 12px", marginBottom: 6,
                  opacity: unlocked ? 1 : 0.35
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    fontFamily: signalFonts.mono, fontSize: 10, letterSpacing: "0.15em",
                    color: signalPalette.textDim, textTransform: "uppercase"
                  }}>
                    <span>{h.title}</span>
                    <span>t+{h.afterMinutes}m {!unlocked && "🔒"}</span>
                  </div>
                  <div style={{
                    fontFamily: signalFonts.mono, fontSize: 12,
                    color: unlocked ? signalPalette.text : signalPalette.textDim,
                    marginTop: 4, filter: unlocked ? "none" : "blur(4px)"
                  }}>{h.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { SignalStart, SignalHub, SignalChapter, signalPalette, signalFonts });
