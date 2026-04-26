// Variant 1 — "Field Notes" — warm, paper, analog detective look
// Uses Fraunces (serif) + Caveat (handwriting) + IBM Plex Mono

const fieldPalette = {
  paper: "#F2E9D8",
  paperDeep: "#E6D9BF",
  ink: "#1F1B14",
  inkSoft: "#4A4132",
  rust: "#A84727",
  stamp: "#7C1D1D",
  thread: "#2F5D4A",
  tape: "#E8C97A",
  shadow: "rgba(31, 27, 20, 0.15)"
};

const fieldFonts = {
  serif: "'Fraunces', 'Times New Roman', serif",
  hand: "'Caveat', cursive",
  mono: "'IBM Plex Mono', monospace"
};

// Paper texture as data URI (noise)
const paperBg = `
  radial-gradient(at 20% 30%, rgba(168, 71, 39, 0.06), transparent 50%),
  radial-gradient(at 80% 70%, rgba(47, 93, 74, 0.05), transparent 50%),
  repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(31, 27, 20, 0.015) 2px, rgba(31, 27, 20, 0.015) 3px),
  ${fieldPalette.paper}
`;

// ---------- START SCREEN ----------
const FieldStart = ({ onStart, teamName, setTeamName }) => (
  <div style={{
    width: "100%", height: "100%",
    background: paperBg,
    color: fieldPalette.ink,
    fontFamily: fieldFonts.serif,
    padding: "54px 28px 32px",
    display: "flex", flexDirection: "column",
    position: "relative", overflow: "hidden"
  }}>
    {/* Tape at top */}
    <div style={{
      position: "absolute", top: 32, left: "50%", transform: "translateX(-50%) rotate(-2deg)",
      width: 120, height: 22, background: fieldPalette.tape, opacity: 0.8,
      boxShadow: `0 2px 4px ${fieldPalette.shadow}`
    }} />

    <div style={{ marginTop: 36, textAlign: "center" }}>
      <div style={{
        fontFamily: fieldFonts.mono, fontSize: 10, letterSpacing: "0.3em",
        color: fieldPalette.inkSoft, textTransform: "uppercase", marginBottom: 8
      }}>Fall-Akte 2026 / Speicher AR</div>
      <div style={{
        fontFamily: fieldFonts.hand, fontSize: 64, lineHeight: 0.9,
        color: fieldPalette.ink, fontWeight: 600
      }}>Wo ist<br/>Maya?</div>
      <div style={{
        width: 60, height: 1, background: fieldPalette.ink, margin: "18px auto", opacity: 0.4
      }} />
      <div style={{
        fontSize: 13, fontStyle: "italic", color: fieldPalette.inkSoft,
        maxWidth: 260, margin: "0 auto", lineHeight: 1.5
      }}>Ein Ermittlungsspiel über das Gaskraftwerk, eine verschwundene Aktivistin – und 5 Spuren im Dorf.</div>
    </div>

    {/* Photo-card: Maya */}
    <div style={{
      margin: "28px auto 0", width: 180, background: "#fff",
      padding: "10px 10px 28px", boxShadow: `0 8px 20px ${fieldPalette.shadow}`,
      transform: "rotate(-3deg)"
    }}>
      <div style={{
        aspectRatio: "1/1", background: `
          repeating-linear-gradient(45deg, ${fieldPalette.paperDeep} 0 8px, ${fieldPalette.paper} 8px 16px)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: fieldFonts.mono, fontSize: 9, color: fieldPalette.inkSoft,
        letterSpacing: "0.2em"
      }}>FOTO · MAYA</div>
      <div style={{
        fontFamily: fieldFonts.hand, fontSize: 18, textAlign: "center",
        marginTop: 8, color: fieldPalette.ink
      }}>Maya, 17 — vermisst seit 8:00</div>
    </div>

    <div style={{ flex: 1 }} />

    {/* Team input */}
    <div style={{
      background: "rgba(255, 255, 255, 0.6)",
      border: `1px dashed ${fieldPalette.inkSoft}`,
      padding: "14px 16px", marginBottom: 14
    }}>
      <div style={{
        fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.25em",
        color: fieldPalette.inkSoft, textTransform: "uppercase", marginBottom: 6
      }}>Ermittler:innen-Team</div>
      <input
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
        placeholder="Teamname eintragen..."
        style={{
          width: "100%", background: "transparent", border: "none", outline: "none",
          fontFamily: fieldFonts.hand, fontSize: 26, color: fieldPalette.ink,
          padding: 0
        }}
      />
    </div>

    <button onClick={onStart} style={{
      background: fieldPalette.ink, color: fieldPalette.paper,
      border: "none", padding: "16px 20px", fontFamily: fieldFonts.serif,
      fontSize: 17, letterSpacing: "0.05em", cursor: "pointer",
      boxShadow: `4px 4px 0 ${fieldPalette.rust}`
    }}>
      Akte öffnen →
    </button>
    <div style={{
      fontFamily: fieldFonts.mono, fontSize: 9, textAlign: "center",
      color: fieldPalette.inkSoft, marginTop: 12, letterSpacing: "0.15em"
    }}>60:00 · 5 SPUREN · 1 TEAM</div>
  </div>
);

// ---------- HUB SCREEN ----------
const FieldHub = ({ onPick, timer, teamName, completed }) => (
  <div style={{
    width: "100%", height: "100%",
    background: paperBg,
    color: fieldPalette.ink,
    fontFamily: fieldFonts.serif,
    padding: "54px 22px 24px",
    display: "flex", flexDirection: "column", position: "relative"
  }}>
    {/* Top bar */}
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: fieldFonts.mono, fontSize: 10, letterSpacing: "0.2em",
      color: fieldPalette.inkSoft, textTransform: "uppercase", marginBottom: 4
    }}>
      <span>Team {teamName}</span>
      <span style={{ color: fieldPalette.rust, fontWeight: 600 }}>⏱ {timer}</span>
    </div>

    <div style={{
      fontFamily: fieldFonts.hand, fontSize: 38, lineHeight: 0.95,
      marginTop: 6, marginBottom: 4
    }}>Die 5 Spuren</div>
    <div style={{
      fontFamily: fieldFonts.mono, fontSize: 10, color: fieldPalette.inkSoft,
      letterSpacing: "0.15em", marginBottom: 18
    }}>KORKBRETT · SPEICHER AR</div>

    <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
      {TRACKS.map((t, i) => {
        const locked = t.status === "gesperrt" && !completed.includes(t.id);
        const done = completed.includes(t.id);
        return (
          <button
            key={t.id}
            onClick={() => !locked && onPick(t.id)}
            style={{
              textAlign: "left", cursor: locked ? "not-allowed" : "pointer",
              background: done ? fieldPalette.thread : "#fff",
              color: done ? fieldPalette.paper : fieldPalette.ink,
              border: "none", padding: "14px 14px 14px 56px",
              position: "relative",
              boxShadow: `3px 3px 0 ${fieldPalette.shadow}`,
              opacity: locked ? 0.45 : 1,
              transform: `rotate(${[-0.4, 0.6, -0.3, 0.4, -0.5][i]}deg)`,
              fontFamily: fieldFonts.serif
            }}>
            {/* Pin */}
            <div style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              width: 28, height: 28, borderRadius: "50%",
              background: done ? fieldPalette.tape : fieldPalette.rust,
              border: `2px solid ${fieldPalette.paper}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: fieldFonts.mono, fontSize: 11, fontWeight: 700,
              color: done ? fieldPalette.ink : fieldPalette.paper
            }}>{t.glyph}</div>

            <div style={{
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: done ? fieldPalette.paper : fieldPalette.inkSoft,
              opacity: 0.8
            }}>{t.theme}{locked && " · gesperrt"}</div>
            <div style={{ fontSize: 19, fontWeight: 500, marginTop: 2, marginBottom: 4 }}>
              {t.title}
            </div>
            <div style={{
              fontSize: 12, lineHeight: 1.4, fontStyle: "italic",
              color: done ? fieldPalette.paper : fieldPalette.inkSoft,
              opacity: done ? 0.9 : 1
            }}>{t.teaser}</div>
          </button>
        );
      })}
    </div>

    <div style={{
      marginTop: 14, padding: "10px 12px",
      background: "rgba(255,255,255,0.6)",
      borderLeft: `3px solid ${fieldPalette.rust}`,
      fontFamily: fieldFonts.hand, fontSize: 18, color: fieldPalette.ink
    }}>
      „Alle 5 Spuren führen zum selben Schluss."
      <div style={{
        fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em",
        color: fieldPalette.inkSoft, marginTop: 4, textTransform: "uppercase"
      }}>— Maya, letzte Nachricht</div>
    </div>
  </div>
);

// ---------- CHAPTER (Bahnhof) ----------
const FieldChapter = ({ onBack, onComplete, timer, hintsUnlocked }) => {
  const [cardIdx, setCardIdx] = React.useState(0);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showHints, setShowHints] = React.useState(false);
  const cards = CHAPTER_BAHNHOF.cards;
  const card = cards[cardIdx];

  const submitCode = () => {
    if (code === "0725") {
      setShowSuccess(true);
      setCodeError(false);
      setTimeout(() => onComplete("bahnhof"), 1800);
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 600);
    }
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      background: paperBg,
      color: fieldPalette.ink,
      fontFamily: fieldFonts.serif,
      padding: "54px 22px 24px",
      display: "flex", flexDirection: "column", position: "relative"
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: fieldFonts.mono, fontSize: 10, letterSpacing: "0.2em",
        color: fieldPalette.inkSoft, textTransform: "uppercase"
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", font: "inherit",
          color: fieldPalette.inkSoft, cursor: "pointer", padding: 0,
          letterSpacing: "0.2em"
        }}>← Korkbrett</button>
        <span style={{ color: fieldPalette.rust, fontWeight: 600 }}>⏱ {timer}</span>
      </div>

      <div style={{
        fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.3em",
        color: fieldPalette.rust, textTransform: "uppercase", marginTop: 16
      }}>Spur I · Mobilität</div>
      <div style={{
        fontFamily: fieldFonts.hand, fontSize: 38, lineHeight: 0.95, marginTop: 2
      }}>Am Bahnhof</div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, marginTop: 14, marginBottom: 14 }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3,
            background: i <= cardIdx ? fieldPalette.ink : fieldPalette.paperDeep
          }} />
        ))}
      </div>

      {/* Card */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {card.type === "story" && (
          <div style={{
            background: "#fff", padding: "18px 18px 20px",
            boxShadow: `4px 4px 0 ${fieldPalette.shadow}`,
            position: "relative"
          }}>
            <div style={{
              position: "absolute", top: -10, left: 20,
              background: fieldPalette.tape, padding: "3px 10px",
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em"
            }}>STORYKARTE · {card.time}</div>
            <div style={{
              fontFamily: fieldFonts.serif, fontSize: 20, fontWeight: 500,
              marginTop: 10, marginBottom: 10
            }}>{card.title}</div>
            <div style={{
              fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap",
              color: fieldPalette.inkSoft
            }}>{card.body}</div>
          </div>
        )}

        {card.type === "info" && (
          <div style={{
            background: "#fff", padding: "18px 18px 20px",
            boxShadow: `4px 4px 0 ${fieldPalette.shadow}`, position: "relative",
            transform: "rotate(-0.5deg)"
          }}>
            <div style={{
              position: "absolute", top: -10, right: 20,
              background: fieldPalette.thread, color: fieldPalette.paper,
              padding: "3px 10px",
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em"
            }}>INFOKARTE</div>
            <div style={{
              fontFamily: fieldFonts.hand, fontSize: 26, marginTop: 6, marginBottom: 4
            }}>{card.title}</div>
            <div style={{
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.15em",
              color: fieldPalette.inkSoft, textTransform: "uppercase", marginBottom: 14
            }}>{card.subtitle}</div>
            <div style={{
              fontFamily: fieldFonts.mono, fontSize: 12, lineHeight: 1.7,
              whiteSpace: "pre-wrap", color: fieldPalette.ink,
              borderTop: `1px dashed ${fieldPalette.inkSoft}`,
              borderBottom: `1px dashed ${fieldPalette.inkSoft}`,
              padding: "12px 0"
            }}>{card.body}</div>
            <div style={{
              fontFamily: fieldFonts.hand, fontSize: 15, marginTop: 10,
              color: fieldPalette.rust
            }}>↳ {card.meta}</div>
          </div>
        )}

        {card.type === "event" && (
          <div style={{
            background: fieldPalette.ink, color: fieldPalette.paper,
            padding: "18px 18px 20px", boxShadow: `4px 4px 0 ${fieldPalette.shadow}`,
            position: "relative", transform: "rotate(0.8deg)"
          }}>
            <div style={{
              position: "absolute", top: -10, left: 20,
              background: fieldPalette.rust,
              padding: "3px 10px", color: fieldPalette.paper,
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em"
            }}>EREIGNIS · {card.subtitle.split('·')[1]?.trim()}</div>
            <div style={{
              fontFamily: fieldFonts.serif, fontSize: 22, marginTop: 12, marginBottom: 12
            }}>{card.title}</div>
            <div style={{
              fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap",
              color: fieldPalette.paper, opacity: 0.9, marginBottom: 16
            }}>{card.body}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {card.choices.map((c, i) => (
                <button key={i} onClick={() => setCardIdx(cardIdx + 1)} style={{
                  background: "transparent", color: fieldPalette.paper,
                  border: `1px solid ${fieldPalette.paper}`,
                  padding: "10px 12px", fontFamily: fieldFonts.serif,
                  fontSize: 13, textAlign: "left", cursor: "pointer"
                }}>{String.fromCharCode(65+i)} · {c}</button>
              ))}
            </div>
          </div>
        )}

        {card.type === "puzzle" && !showSuccess && (
          <div style={{
            background: "#fff", padding: "18px 18px 20px",
            boxShadow: `4px 4px 0 ${fieldPalette.shadow}`, position: "relative"
          }}>
            <div style={{
              position: "absolute", top: -10, left: 20,
              background: fieldPalette.stamp, color: fieldPalette.paper,
              padding: "3px 10px",
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em"
            }}>VERIFIZIERUNG</div>
            <div style={{
              fontFamily: fieldFonts.serif, fontSize: 20, fontWeight: 500,
              marginTop: 10, marginBottom: 10
            }}>{card.title}</div>
            <div style={{
              fontSize: 13, lineHeight: 1.5, color: fieldPalette.inkSoft,
              marginBottom: 18
            }}>{card.body}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 48, height: 58,
                  border: `2px solid ${codeError ? fieldPalette.stamp : fieldPalette.ink}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: fieldFonts.mono, fontSize: 26, fontWeight: 700,
                  color: fieldPalette.ink,
                  animation: codeError ? "shake 0.4s" : "none"
                }}>{code[i] || ""}</div>
              ))}
            </div>
            <input
              autoFocus
              inputMode="numeric" maxLength={4}
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="Code eingeben"
              style={{
                width: "100%", padding: "10px 12px",
                background: "transparent",
                border: `1px dashed ${fieldPalette.inkSoft}`,
                fontFamily: fieldFonts.mono, fontSize: 14, textAlign: "center",
                color: fieldPalette.ink, outline: "none"
              }}
            />
            <button onClick={submitCode} disabled={code.length !== 4} style={{
              width: "100%", marginTop: 10,
              background: code.length === 4 ? fieldPalette.ink : fieldPalette.inkSoft,
              color: fieldPalette.paper, border: "none", padding: "12px",
              fontFamily: fieldFonts.serif, fontSize: 15,
              cursor: code.length === 4 ? "pointer" : "not-allowed"
            }}>Spur verifizieren →</button>
          </div>
        )}

        {card.type === "puzzle" && showSuccess && (
          <div style={{
            background: fieldPalette.thread, color: fieldPalette.paper,
            padding: "24px 18px", textAlign: "center",
            boxShadow: `4px 4px 0 ${fieldPalette.shadow}`
          }}>
            <div style={{
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.3em",
              opacity: 0.7, textTransform: "uppercase"
            }}>Spur freigeschaltet</div>
            <div style={{ fontFamily: fieldFonts.hand, fontSize: 44, margin: "6px 0" }}>
              0725 ✓
            </div>
            <div style={{ fontFamily: fieldFonts.serif, fontSize: 15, fontStyle: "italic" }}>
              {card.success}
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={() => setShowHints(true)} style={{
          background: "transparent", border: `1px solid ${fieldPalette.ink}`,
          padding: "10px 14px", fontFamily: fieldFonts.serif, fontSize: 13,
          cursor: "pointer", color: fieldPalette.ink
        }}>
          💡 Tipps ({hintsUnlocked}/3)
        </button>
        {card.type !== "puzzle" && (
          <button onClick={() => setCardIdx(Math.min(cards.length - 1, cardIdx + 1))} style={{
            flex: 1, background: fieldPalette.ink, color: fieldPalette.paper,
            border: "none", padding: "10px 14px",
            fontFamily: fieldFonts.serif, fontSize: 13, cursor: "pointer"
          }}>Weiter →</button>
        )}
      </div>

      {/* Hints overlay */}
      {showHints && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(31,27,20,0.75)",
          display: "flex", alignItems: "flex-end", zIndex: 10
        }} onClick={() => setShowHints(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: paperBg, width: "100%", padding: "20px 22px 26px",
            borderTop: `4px double ${fieldPalette.ink}`
          }}>
            <div style={{
              fontFamily: fieldFonts.hand, fontSize: 28, marginBottom: 4
            }}>Tippkarten</div>
            <div style={{
              fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em",
              color: fieldPalette.inkSoft, textTransform: "uppercase", marginBottom: 14
            }}>Freigeschaltet nach 3 / 6 / 9 Minuten</div>
            {CHAPTER_BAHNHOF.hints.map((h, i) => {
              const unlocked = i < hintsUnlocked;
              return (
                <div key={i} style={{
                  background: unlocked ? "#fff" : "rgba(255,255,255,0.3)",
                  padding: "12px 14px", marginBottom: 8,
                  borderLeft: `3px solid ${unlocked ? fieldPalette.rust : fieldPalette.inkSoft}`,
                  opacity: unlocked ? 1 : 0.5
                }}>
                  <div style={{
                    fontFamily: fieldFonts.mono, fontSize: 9, letterSpacing: "0.2em",
                    color: fieldPalette.inkSoft, textTransform: "uppercase", marginBottom: 4
                  }}>{h.title} · nach {h.afterMinutes} min {!unlocked && "· 🔒"}</div>
                  <div style={{
                    fontFamily: fieldFonts.serif, fontSize: 14,
                    color: unlocked ? fieldPalette.ink : fieldPalette.inkSoft
                  }}>{unlocked ? h.body : "–– noch gesperrt ––"}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { FieldStart, FieldHub, FieldChapter, fieldPalette, fieldFonts });
