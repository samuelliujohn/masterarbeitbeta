// Field Notes v2 — main screens: Start, Intro (messages), Tutorial, Hub (cork map), Chapter, Transition, Ending, Gamemaster
// Uses window.FN (atoms), window.FN_DATA (content), window.FN_VERIFY (verifiers)

const { useState: uS, useEffect: uE, useRef: uR } = React;

// ─── Start screen ───────────────────────────────────────
function FNStart({ onStart, teamName, setTeamName }) {
  const T = window.FN.TOKENS;
  const { Polaroid, Stamp, Tape, CaseHeader, GrainOverlay } = window.FN;
  const sound = window.FN.useFieldSounds(true);
  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      color: T.color.ink, fontFamily: T.font.serif,
      padding: "54px 22px 28px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden"
    }}>
      <GrainOverlay/>
      <div style={{ position: "absolute", top: 38, left: "50%", transform: "translateX(-50%)" }}>
        <Tape color="tape" w={120} h={20} rot={-2}/>
      </div>

      <div style={{ textAlign: "center", marginTop: 28, position: "relative" }}>
        <div style={{
          fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.3em",
          color: T.color.inkFaded, textTransform: "uppercase"
        }}>FALL-AKTE · SP-2026-04-24</div>
        <div style={{
          fontFamily: T.font.hand2, fontSize: 58, lineHeight: 0.9,
          fontWeight: 700, marginTop: 6
        }}>Wo ist<br/>Maya?</div>
        <div style={{ width: 50, height: 1, background: T.color.ink, margin: "14px auto", opacity: 0.4 }}/>
        <div style={{
          fontFamily: T.font.serif, fontSize: 12, fontStyle: "italic",
          color: T.color.inkSoft, maxWidth: 240, margin: "0 auto"
        }}>Ein Ermittlungsspiel über ein Dorf, ein Gaskraftwerk — und 5 Spuren.</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 26, position: "relative" }}>
        <Polaroid scene="maya" caption="Maya L., 17" subtitle="04/2026" rot={-4} w={170}
          stamp={{ label: "VERMISST", sub: "SEIT 08:00", color: "stamp", rot: 14, size: 74 }}/>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{
        background: "rgba(255,253,240,0.7)",
        border: `1px dashed ${T.color.inkFaded}`,
        padding: "12px 14px", marginBottom: 12, position: "relative"
      }}>
        <div style={{
          fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.25em",
          color: T.color.inkFaded, textTransform: "uppercase", marginBottom: 4
        }}>Ermittler:innen-Team</div>
        <input value={teamName} onChange={e => { setTeamName(e.target.value); sound("type"); }}
          placeholder="Teamname…"
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            fontFamily: T.font.hand2, fontSize: 22, color: T.color.ink, padding: 0
          }}/>
      </div>

      <button onClick={() => { sound("stamp"); onStart(); }} style={{
        background: T.color.ink, color: T.color.paper, border: "none",
        padding: "15px 20px", fontFamily: T.font.serif, fontSize: 16,
        letterSpacing: "0.05em", cursor: "pointer",
        boxShadow: `4px 4px 0 ${T.color.rust}`
      }}>Akte öffnen →</button>
      <div style={{
        fontFamily: T.font.type, fontSize: 9, textAlign: "center",
        color: T.color.inkFaded, marginTop: 10, letterSpacing: "0.2em"
      }}>60:00 · 5 SPUREN · 1 TEAM</div>
    </div>
  );
}

// ─── Intro (messenger messages from Maya) ───────────────
function FNIntro({ onDone }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, CaseHeader } = window.FN;
  const { INTRO } = window.FN_DATA;
  const [shown, setShown] = uS(0);
  const sound = window.FN.useFieldSounds(true);
  uE(() => {
    if (shown >= INTRO.messages.length) return;
    const t = setTimeout(() => { setShown(shown + 1); sound("type"); }, 900);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      padding: "54px 20px 22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden", color: T.color.ink, fontFamily: T.font.serif
    }}>
      <GrainOverlay/>
      <CaseHeader track="INTRO" step="Letzte Nachrichten"/>
      <div style={{
        fontFamily: T.font.hand2, fontSize: 28, lineHeight: 1, marginBottom: 4
      }}>Ihr Chat.</div>
      <div style={{ fontFamily: T.font.type, fontSize: 10, letterSpacing: "0.15em", color: T.color.inkFaded, marginBottom: 14 }}>
        23:47 BIS 08:04
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4 }}>
        {INTRO.messages.slice(0, shown).map((m, i) => (
          <div key={i} className="fn-flip-in" style={{
            alignSelf: m.from === "Du" ? "flex-end" : "flex-start",
            maxWidth: "82%",
            background: m.from === "Maya" ? "#fdf8ec" : T.color.ink,
            color: m.from === "Maya" ? T.color.ink : T.color.paper,
            padding: "8px 12px",
            fontFamily: m.from === "Maya" ? T.font.hand2 : T.font.type,
            fontSize: m.from === "Maya" ? 17 : 12,
            boxShadow: `2px 2px 0 ${T.color.shadowSoft}`,
            position: "relative"
          }}>
            <div style={{
              fontFamily: T.font.type, fontSize: 8, letterSpacing: "0.2em",
              color: m.from === "Maya" ? T.color.inkFaded : "rgba(255,255,255,0.6)",
              marginBottom: 2
            }}>{m.from.toUpperCase()} · {m.time}</div>
            {m.text}
          </div>
        ))}
        {shown >= INTRO.messages.length && (
          <div className="fn-flip-in" style={{
            marginTop: 10, padding: "12px 14px", background: "#fdf8ec",
            borderLeft: `3px solid ${T.color.rust}`,
            fontFamily: T.font.serif, fontSize: 13, fontStyle: "italic",
            color: T.color.inkSoft
          }}>{INTRO.note}</div>
        )}
      </div>

      <button onClick={onDone} style={{
        marginTop: 12, background: T.color.ink, color: T.color.paper, border: "none",
        padding: "13px", fontFamily: T.font.serif, fontSize: 14, cursor: "pointer",
        boxShadow: `3px 3px 0 ${T.color.rust}`
      }}>Wie du ermittelst →</button>
    </div>
  );
}

// ─── Tutorial (3 cards) ─────────────────────────────────
function FNTutorial({ onDone }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, CaseHeader, Polaroid, PaperNote, Stamp, Tape } = window.FN;
  const { TUTORIAL } = window.FN_DATA;
  const [idx, setIdx] = uS(0);
  const sound = window.FN.useFieldSounds(true);
  const c = TUTORIAL[idx];
  const next = () => {
    sound("flip");
    if (idx < TUTORIAL.length - 1) setIdx(idx + 1);
    else onDone();
  };
  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      padding: "54px 20px 22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden", color: T.color.ink, fontFamily: T.font.serif
    }}>
      <GrainOverlay/>
      <CaseHeader track="TUTORIAL" step={`${idx + 1} / ${TUTORIAL.length}`}/>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 10 }}>
        <div key={idx} className="fn-flip-in" style={{ width: "100%" }}>
          {c.kind === "polaroid" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Polaroid scene="maya" caption={c.caption} subtitle={c.subtitle} rot={-3} w={200}
                stamp={{ label: c.stampLabel, color: "stamp", rot: 14, size: 72 }}/>
              <div style={{
                fontFamily: T.font.serif, fontSize: 21, fontWeight: 600, textAlign: "center"
              }}>{c.title}</div>
              <div style={{
                fontFamily: T.font.serif, fontSize: 13, lineHeight: 1.5, textAlign: "center",
                color: T.color.inkSoft, maxWidth: 280
              }}>{c.body}</div>
            </div>
          )}
          {c.kind === "note" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{
                fontFamily: T.font.serif, fontSize: 21, fontWeight: 600, textAlign: "center"
              }}>{c.title}</div>
              <PaperNote w={260} rot={-1} pinColor="rust">
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {c.body.split("**").map((s, i) => i % 2
                    ? <b key={i} style={{ color: T.color.rust }}>{s}</b>
                    : <span key={i}>{s}</span>)}
                </div>
              </PaperNote>
            </div>
          )}
          {c.kind === "stamps" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{
                fontFamily: T.font.serif, fontSize: 21, fontWeight: 600, textAlign: "center"
              }}>{c.title}</div>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
                padding: "16px 12px",
                background: "rgba(255,253,240,0.6)", border: `1px dashed ${T.color.inkFaded}`
              }}>
                {c.items.map((it, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "center", padding: 6 }}>
                    <Stamp label={it.label} sub={it.sub} color={it.color} rot={(i % 2 ? 1 : -1) * (4 + i)} size={74}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
        {TUTORIAL.map((_, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: i === idx ? T.color.rust : T.color.inkFaded, opacity: i === idx ? 1 : 0.4
          }}/>
        ))}
      </div>
      <button onClick={next} style={{
        background: T.color.ink, color: T.color.paper, border: "none",
        padding: "13px", fontFamily: T.font.serif, fontSize: 14, cursor: "pointer",
        boxShadow: `3px 3px 0 ${T.color.rust}`
      }}>{idx < TUTORIAL.length - 1 ? "Weiter →" : "Ermittlung starten →"}</button>
    </div>
  );
}

// ─── HUB (Korkbrett + Karte von Speicher) ───────────────
function FNHub({ onPick, timer, teamName, completed, tracks }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, CaseHeader, Polaroid, Stamp, Tape } = window.FN;
  const sound = window.FN.useFieldSounds(true);

  // 5 pin positions on procedural map
  const pins = [
    { x: 20, y: 70, id: "bahnhof" },
    { x: 50, y: 50, id: "supermarkt" },
    { x: 78, y: 28, id: "wald" },
    { x: 72, y: 72, id: "wohngebiet" },
    { x: 30, y: 30, id: "holzkraftwerk" },
  ];

  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      padding: "54px 18px 22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden", color: T.color.ink, fontFamily: T.font.serif
    }}>
      <GrainOverlay/>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em",
        color: T.color.inkFaded, textTransform: "uppercase"
      }}>
        <span>TEAM {teamName}</span>
        <span style={{ color: T.color.rust, fontWeight: 600 }}>⏱ {timer}</span>
      </div>
      <div style={{ fontFamily: T.font.hand2, fontSize: 34, lineHeight: 0.95, marginTop: 6 }}>Die 5 Spuren</div>

      {/* Map of Speicher */}
      <div style={{
        marginTop: 14, background: "#EDE2C8",
        border: `1px solid ${T.color.inkFaded}`,
        padding: 10, position: "relative",
        aspectRatio: "16/9",
        filter: `drop-shadow(2px 3px 3px ${T.color.shadow})`
      }}>
        <div style={{
          fontFamily: T.font.type, fontSize: 8, letterSpacing: "0.2em",
          color: T.color.inkFaded, marginBottom: 4
        }}>KARTE · SPEICHER AR · 1:8000</div>
        <svg viewBox="0 0 100 60" style={{ position: "absolute", inset: 10, right: 10, bottom: 10, width: "calc(100% - 20px)", height: "calc(100% - 20px)" }}>
          {/* roads */}
          <path d="M5,50 Q30,40 55,45 T95,35" stroke={T.color.inkFaded} strokeWidth="0.5" fill="none" strokeDasharray="1 1"/>
          <path d="M15,10 Q25,30 50,35 T85,50" stroke={T.color.inkFaded} strokeWidth="0.4" fill="none"/>
          <path d="M5,25 Q40,20 70,30 T95,20" stroke={T.color.inkFaded} strokeWidth="0.3" fill="none"/>
          {/* forest */}
          <circle cx="78" cy="15" r="10" fill={T.color.thread} opacity="0.25"/>
          <circle cx="85" cy="20" r="7" fill={T.color.thread} opacity="0.3"/>
          {/* river */}
          <path d="M0,32 Q30,36 50,30 T100,30" stroke={T.color.tapeBlue} strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
        {/* pins */}
        {pins.map(p => {
          const t = tracks.find(x => x.id === p.id);
          const done = completed.includes(p.id);
          return (
            <div key={p.id} onClick={() => { sound("stamp"); onPick(p.id); }} style={{
              position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -100%)",
              cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: done ? T.color.thread : T.color.rust,
                border: `2px solid ${T.color.paper}`,
                boxShadow: `0 2px 3px ${T.color.shadow}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.color.paper, fontFamily: T.font.type, fontSize: 9, fontWeight: 700
              }}>{done ? "✓" : t.glyph}</div>
              <div style={{
                fontFamily: T.font.hand2, fontSize: 11, color: T.color.ink,
                background: "rgba(253,248,236,0.8)", padding: "0 3px", marginTop: 1,
                whiteSpace: "nowrap"
              }}>{t.title}</div>
            </div>
          );
        })}
      </div>

      {/* Pinned cards list */}
      <div style={{ flex: 1, overflowY: "auto", marginTop: 14, paddingRight: 4 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tracks.map((t, i) => {
            const done = completed.includes(t.id);
            const rots = [-0.4, 0.6, -0.3, 0.4, -0.5];
            return (
              <button key={t.id} onClick={() => { sound("flip"); onPick(t.id); }} className="fn-flutter" style={{
                "--rot": `${rots[i]}deg`,
                textAlign: "left", cursor: "pointer",
                background: done ? T.color.thread : "#fdf8ec",
                color: done ? T.color.paper : T.color.ink,
                border: "none", padding: "12px 14px 12px 52px",
                position: "relative", fontFamily: T.font.serif,
                boxShadow: `3px 3px 0 ${T.color.shadow}`,
                transform: `rotate(${rots[i]}deg)`
              }}>
                <div style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  width: 26, height: 26, borderRadius: "50%",
                  background: done ? T.color.tape : T.color.rust,
                  color: done ? T.color.ink : T.color.paper,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: T.font.type, fontSize: 10, fontWeight: 700,
                  border: `2px solid ${T.color.paper}`
                }}>{done ? "✓" : t.glyph}</div>
                <div style={{
                  fontFamily: T.font.type, fontSize: 8, letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: done ? T.color.paper : T.color.inkFaded
                }}>{t.theme}</div>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{t.title}</div>
                <div style={{
                  fontSize: 11, fontStyle: "italic", lineHeight: 1.35, marginTop: 2,
                  color: done ? T.color.paper : T.color.inkSoft
                }}>{t.teaser}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Chapter player (works with any chapter from FN_DATA) ───
function FNChapter({ chapter, onBack, onComplete, timer, hintsUnlocked }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, CaseHeader, Polaroid, Stamp, Tape, Newspaper } = window.FN;
  const V = window.FN_VERIFY;
  const sound = window.FN.useFieldSounds(true);
  const [idx, setIdx] = uS(0);
  const [showHints, setShowHints] = uS(false);
  const [eventResult, setEventResult] = uS(null);
  const card = chapter.cards[idx];

  const next = () => { sound("flip"); setIdx(Math.min(chapter.cards.length - 1, idx + 1)); setEventResult(null); };

  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      padding: "54px 18px 18px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden", color: T.color.ink, fontFamily: T.font.serif
    }}>
      <GrainOverlay/>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em",
        color: T.color.inkFaded, textTransform: "uppercase"
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", font: "inherit", color: T.color.inkSoft,
          cursor: "pointer", padding: 0, letterSpacing: "0.2em"
        }}>← KORKBRETT</button>
        <span style={{ color: T.color.rust }}>⏱ {timer}</span>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{
          fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.3em",
          color: T.color.rust, textTransform: "uppercase"
        }}>Spur {chapter.glyph} · {chapter.track}</div>
        <div style={{ fontFamily: T.font.hand2, fontSize: 34, lineHeight: 0.95, marginTop: 2 }}>
          {chapter.title}
        </div>
        <div style={{ fontFamily: T.font.type, fontSize: 10, color: T.color.inkFaded, marginTop: 2 }}>
          {chapter.location}
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginTop: 12, marginBottom: 12 }}>
        {chapter.cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3,
            background: i <= idx ? T.color.ink : T.color.paperDark
          }}/>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
        <div key={idx} className="fn-flip-in">
          {card.type === "story" && (
            <div>
              {card.polaroid && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                  <Polaroid {...card.polaroid}/>
                </div>
              )}
              <div style={{
                background: "#fdf8ec", padding: "16px 16px 18px",
                boxShadow: `4px 4px 0 ${T.color.shadow}`, position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: -10, left: 16,
                  background: T.color.tape, padding: "3px 10px",
                  fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em"
                }}>STORYKARTE · {card.time}</div>
                <div style={{ fontFamily: T.font.serif, fontSize: 18, fontWeight: 500, marginTop: 10, marginBottom: 8 }}>
                  {card.title}
                </div>
                <div style={{
                  fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-wrap",
                  color: T.color.inkSoft
                }}>{card.body}</div>
              </div>
            </div>
          )}

          {card.type === "info" && (
            <div style={{
              background: "#fdf8ec", padding: "16px 16px 18px",
              boxShadow: `4px 4px 0 ${T.color.shadow}`,
              position: "relative", transform: "rotate(-0.4deg)"
            }}>
              <div style={{
                position: "absolute", top: -10, right: 16,
                background: T.color.thread, color: T.color.paper,
                padding: "3px 10px",
                fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em"
              }}>INFOKARTE</div>
              <div style={{ fontFamily: T.font.hand2, fontSize: 24, marginTop: 4 }}>{card.title}</div>
              <div style={{
                fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.15em",
                color: T.color.inkFaded, textTransform: "uppercase", marginBottom: 10
              }}>{card.subtitle}</div>
              <div style={{
                fontFamily: T.font.type, fontSize: 11.5, lineHeight: 1.7,
                whiteSpace: "pre-wrap", color: T.color.ink,
                borderTop: `1px dashed ${T.color.inkFaded}`,
                borderBottom: `1px dashed ${T.color.inkFaded}`,
                padding: "10px 0"
              }}>{card.body}</div>
              {card.marginalia && (
                <div style={{ fontFamily: T.font.hand2, fontSize: 15, marginTop: 8, color: T.color.rust }}>
                  {card.marginalia}
                </div>
              )}
              {card.source && (
                <div style={{ fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.1em", color: T.color.inkFaded, marginTop: 6 }}>
                  ↳ {card.source}
                </div>
              )}

              {/* Receipt special */}
              {chapter.id === "supermarkt" && idx === 1 && (
                <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
                  <Receipt r={chapter.receipt}/>
                </div>
              )}
            </div>
          )}

          {card.type === "newspaper" && (
            <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
              <Newspaper {...card} rot={-1.5} w={300}/>
            </div>
          )}

          {card.type === "event" && (
            <div style={{
              background: T.color.ink, color: T.color.paper,
              padding: "16px 16px 18px", position: "relative",
              boxShadow: `4px 4px 0 ${T.color.shadow}`, transform: "rotate(0.6deg)"
            }}>
              <div style={{
                position: "absolute", top: -10, left: 16,
                background: T.color.rust, color: T.color.paper,
                padding: "3px 10px",
                fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em"
              }}>EREIGNIS · {card.time}</div>
              <div style={{ fontFamily: T.font.serif, fontSize: 19, marginTop: 10, marginBottom: 8 }}>
                {card.title}
              </div>
              <div style={{
                fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap",
                color: T.color.paper, opacity: 0.9, marginBottom: 12
              }}>{card.body}</div>
              {!eventResult ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {card.choices.map((c, i) => (
                    <button key={i} onClick={() => { sound("flip"); setEventResult(c.result); }} style={{
                      background: "transparent", color: T.color.paper,
                      border: `1px solid ${T.color.paper}`,
                      padding: "9px 12px", fontFamily: T.font.serif, fontSize: 12.5,
                      textAlign: "left", cursor: "pointer"
                    }}>
                      {String.fromCharCode(65 + i)} · {c.label}
                      <span style={{ float: "right", opacity: 0.6, fontFamily: T.font.type, fontSize: 9 }}>{c.cost}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="fn-flip-in" style={{
                  padding: "10px 12px", background: "rgba(253,248,236,0.1)",
                  borderLeft: `2px solid ${T.color.tape}`,
                  fontFamily: T.font.hand2, fontSize: 15, color: T.color.paper
                }}>{eventResult}</div>
              )}
            </div>
          )}

          {card.type === "puzzle" && (
            <>
              {chapter.verification.kind === "code" && (
                <V.CodeVerify answer={chapter.verification.answer} successMsg={card.success}
                  onOk={() => onComplete(chapter.id)} sound={sound}
                  title={card.title} subtitle={card.subtitle}/>
              )}
              {chapter.verification.kind === "multiple" && (
                <V.MultipleVerify items={chapter.receipt.items} answerIndex={chapter.verification.answer}
                  successMsg={card.success} onOk={() => onComplete(chapter.id)} sound={sound}
                  title={card.title} subtitle={card.subtitle}/>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => { sound("flip"); setShowHints(true); }} style={{
          background: "transparent", border: `1px solid ${T.color.ink}`,
          padding: "9px 12px", fontFamily: T.font.serif, fontSize: 12,
          cursor: "pointer", color: T.color.ink
        }}>💡 Tipps ({hintsUnlocked}/3)</button>
        {card.type !== "puzzle" && (
          <button onClick={next} disabled={card.type === "event" && !eventResult} style={{
            flex: 1, background: T.color.ink, color: T.color.paper,
            border: "none", padding: "9px 12px",
            fontFamily: T.font.serif, fontSize: 12, cursor: "pointer",
            opacity: (card.type === "event" && !eventResult) ? 0.5 : 1
          }}>Weiter →</button>
        )}
      </div>

      {showHints && (
        <div onClick={() => setShowHints(false)} style={{
          position: "absolute", inset: 0, background: "rgba(28,24,16,0.75)",
          display: "flex", alignItems: "flex-end", zIndex: 20
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: window.FN.PAPER_BG, width: "100%",
            padding: "18px 20px 24px", borderTop: `3px double ${T.color.ink}`
          }}>
            <div style={{ fontFamily: T.font.hand2, fontSize: 24, marginBottom: 2 }}>Tippkarten</div>
            <div style={{ fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em", color: T.color.inkFaded, marginBottom: 10 }}>
              FREIGESCHALTET NACH 3 / 6 / 9 MINUTEN
            </div>
            {chapter.hints.map((h, i) => {
              const unlocked = i < hintsUnlocked;
              return (
                <div key={i} style={{
                  background: unlocked ? "#fdf8ec" : "rgba(253,248,236,0.35)",
                  padding: "10px 12px", marginBottom: 6,
                  borderLeft: `3px solid ${unlocked ? T.color.rust : T.color.inkFaded}`,
                  opacity: unlocked ? 1 : 0.55
                }}>
                  <div style={{ fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em", color: T.color.inkFaded, textTransform: "uppercase", marginBottom: 3 }}>
                    {h.title} · nach {h.afterMinutes} min {!unlocked && "🔒"}
                  </div>
                  <div style={{ fontFamily: T.font.serif, fontSize: 13, color: unlocked ? T.color.ink : T.color.inkFaded }}>
                    {unlocked ? h.body : "— noch gesperrt —"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Receipt (for Supermarkt) ─────────────────────
function Receipt({ r }) {
  const T = window.FN.TOKENS;
  return (
    <div style={{
      background: "#fff", width: 220, padding: "12px 14px 18px",
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: T.color.ink,
      boxShadow: `2px 4px 6px ${T.color.shadow}`,
      clipPath: "polygon(0 0, 100% 0, 100% 98%, 92% 100%, 80% 97%, 65% 100%, 48% 97%, 32% 100%, 18% 97%, 8% 100%, 0 97%)"
    }}>
      <div style={{ textAlign: "center", fontWeight: 700, letterSpacing: "0.15em" }}>{r.store}</div>
      <div style={{ textAlign: "center", fontSize: 9, color: T.color.inkFaded }}>{r.address}</div>
      <div style={{ textAlign: "center", fontSize: 9, color: T.color.inkFaded, marginBottom: 6 }}>{r.date} · {r.cashier}</div>
      <div style={{ borderTop: "1px dashed #999", borderBottom: "1px dashed #999", padding: "6px 0", margin: "4px 0" }}>
        {r.items.map((it, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            color: it.flagged ? T.color.stamp : T.color.ink,
            marginBottom: 2, fontSize: 10
          }}>
            <span style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i+1}. {it.label}</span>
            <span>{it.price}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: 4 }}>
        <span>TOTAL</span><span>CHF {r.total}</span>
      </div>
      <div style={{ fontSize: 9, color: T.color.inkFaded, marginTop: 4, textAlign: "center" }}>{r.payment} · {r.note}</div>
    </div>
  );
}

// ─── Transition between chapters ──────────────────
function FNTransition({ chapter, onNext }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, Polaroid, CaseHeader } = window.FN;
  const sound = window.FN.useFieldSounds(true);
  const tr = chapter.transition;
  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      padding: "54px 20px 22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden", color: T.color.ink, fontFamily: T.font.serif
    }}>
      <GrainOverlay/>
      <CaseHeader track="ÜBERGANG" step={tr.time} status="UNTERWEGS"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
        {tr.polaroid && (
          <div className="fn-stamp-drop" style={{ "--rot": `${tr.polaroid.rot || -2}deg` }}>
            <Polaroid {...tr.polaroid}/>
          </div>
        )}
        <div style={{
          fontFamily: T.font.serif, fontSize: 14, lineHeight: 1.6,
          color: T.color.inkSoft, textAlign: "center", maxWidth: 280,
          fontStyle: "italic"
        }}>{tr.body}</div>
      </div>
      <button onClick={() => { sound("flip"); onNext(); }} style={{
        background: T.color.ink, color: T.color.paper, border: "none",
        padding: "13px", fontFamily: T.font.serif, fontSize: 14, cursor: "pointer",
        boxShadow: `3px 3px 0 ${T.color.rust}`
      }}>Nächste Spur →</button>
    </div>
  );
}

// ─── Ending ──────────────────────────────────────
function FNEnding({ onReplay }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, Polaroid, Stamp, CaseHeader, Newspaper } = window.FN;
  const { ENDING } = window.FN_DATA;
  return (
    <div style={{
      width: "100%", height: "100%", background: window.FN.PAPER_BG,
      padding: "54px 20px 22px", display: "flex", flexDirection: "column",
      position: "relative", overflow: "auto", color: T.color.ink, fontFamily: T.font.serif
    }}>
      <GrainOverlay/>
      <CaseHeader track="AKTE GESCHLOSSEN" step={ENDING.when} status="GELÖST"/>

      <div className="fn-stamp-drop" style={{ display: "flex", justifyContent: "center", marginTop: 10, "--rot": "-4deg" }}>
        <Polaroid {...ENDING.found.polaroid} rot={-3} w={180}
          stamp={{ label: "GEFUNDEN", color: "thread", rot: 12, size: 76 }}/>
      </div>

      <div style={{ fontFamily: T.font.hand2, fontSize: 38, textAlign: "center", marginTop: 14, lineHeight: 1 }}>
        {ENDING.found.title}
      </div>
      <div style={{
        fontFamily: T.font.serif, fontSize: 13, lineHeight: 1.55,
        color: T.color.inkSoft, textAlign: "center", margin: "8px auto 16px", maxWidth: 280
      }}>{ENDING.found.body}</div>

      <div style={{
        background: "#fdf8ec", padding: "12px 14px",
        boxShadow: `3px 3px 0 ${T.color.shadow}`, marginBottom: 14
      }}>
        <div style={{ fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em", color: T.color.inkFaded, marginBottom: 8 }}>
          BEWEISE · 5 SPUREN
        </div>
        {ENDING.evidence.map((e, i) => (
          <div key={i} style={{ fontSize: 12, color: T.color.inkSoft, marginBottom: 4, paddingLeft: 14, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: T.color.thread, fontWeight: 700 }}>✓</span>{e}
          </div>
        ))}
      </div>

      <Newspaper headline={ENDING.cliffhanger.headline} dek={ENDING.cliffhanger.body}
        source="Appenzeller Zeitung" date="24.04.2026" rot={1.5} w={300}/>

      <div style={{
        fontFamily: T.font.hand2, fontSize: 22, textAlign: "center",
        color: T.color.rust, margin: "18px 10px 14px"
      }}>{ENDING.cliffhanger.cta}</div>

      <button onClick={onReplay} style={{
        background: T.color.ink, color: T.color.paper, border: "none",
        padding: "13px", fontFamily: T.font.serif, fontSize: 14, cursor: "pointer",
        boxShadow: `3px 3px 0 ${T.color.rust}`, marginBottom: 8
      }}>Diskussion im Klassenzimmer →</button>
    </div>
  );
}

// ─── Gamemaster — Field Notes skin ────────────────
function FNGamemaster({ timer, teamName, completed, hintsUnlocked, onAdvance, onRevealHint, onReset, tracks }) {
  const T = window.FN.TOKENS;
  const { GrainOverlay, Polaroid, Stamp, PaperNote, Tape, CaseHeader } = window.FN;
  return (
    <div style={{
      width: "100%", minHeight: "100%", background: window.FN.PAPER_BG,
      padding: 28, boxSizing: "border-box", color: T.color.ink, fontFamily: T.font.serif,
      position: "relative", overflow: "hidden"
    }}>
      <GrainOverlay/>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
        <div>
          <div style={{ fontFamily: T.font.type, fontSize: 10, letterSpacing: "0.25em", color: T.color.inkFaded }}>
            SPIELLEITUNG · KONSOLE · AKTE SP-2026-04-24
          </div>
          <div style={{ fontFamily: T.font.hand2, fontSize: 44, lineHeight: 1, marginTop: 4 }}>
            Wo ist Maya? <span style={{ fontSize: 22, color: T.color.inkFaded }}>— Raum 1</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Stamp label={`⏱ ${timer}`} color="rust" rot={-4} variant="rect"/>
          <button onClick={onReset} style={{
            background: "transparent", color: T.color.ink,
            border: `1px solid ${T.color.ink}`, padding: "8px 14px",
            fontFamily: T.font.serif, fontSize: 13, cursor: "pointer"
          }}>⟲ Reset</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 20 }}>
        {[
          { label: "TEAM", value: teamName, color: T.color.ink },
          { label: "FORTSCHRITT", value: `${completed.length}/5`, color: T.color.thread },
          { label: "TIPPS NUTZT", value: `${hintsUnlocked}/3`, color: T.color.rust },
          { label: "STATUS", value: "ON TRACK", color: T.color.thread },
        ].map(k => (
          <div key={k.label} style={{
            background: "#fdf8ec", padding: "12px 16px",
            boxShadow: `3px 3px 0 ${T.color.shadowSoft}`,
            borderLeft: `3px solid ${k.color}`
          }}>
            <div style={{ fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.2em", color: T.color.inkFaded }}>
              {k.label}
            </div>
            <div style={{ fontFamily: T.font.hand2, fontSize: 24, color: k.color, marginTop: 2 }}>
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginTop: 20 }}>
        {/* Spuren */}
        <div style={{
          background: "#fdf8ec", padding: 18, boxShadow: `3px 3px 0 ${T.color.shadowSoft}`,
          position: "relative"
        }}>
          <div style={{ position: "absolute", top: -10, left: 18 }}>
            <Tape color="tape" w={80} h={16} rot={-2}/>
          </div>
          <div style={{ fontFamily: T.font.hand2, fontSize: 22, marginBottom: 12 }}>Spuren — Live</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tracks.map((t, i) => {
              const done = completed.includes(t.id);
              const active = !done && i === completed.length;
              return (
                <div key={t.id} style={{
                  display: "grid", gridTemplateColumns: "30px 1fr 90px auto", gap: 12, alignItems: "center",
                  padding: "8px 10px",
                  background: active ? `${T.color.rust}11` : "transparent",
                  border: `1px solid ${active ? T.color.rust : T.color.paperDark}`,
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: done ? T.color.thread : active ? T.color.rust : T.color.paperDark,
                    color: T.color.paper, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: T.font.type, fontSize: 10, fontWeight: 700
                  }}>{done ? "✓" : t.glyph}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {t.title} <span style={{ fontFamily: T.font.type, fontSize: 10, color: T.color.inkFaded }}>· {t.theme}</span>
                    </div>
                    <div style={{ fontFamily: T.font.type, fontSize: 10, color: T.color.inkFaded, marginTop: 2 }}>
                      {t.codeHint}
                    </div>
                  </div>
                  <div style={{ fontFamily: T.font.type, fontSize: 10, letterSpacing: "0.15em", color: done ? T.color.thread : active ? T.color.rust : T.color.inkFaded, textAlign: "right" }}>
                    {done ? "VERIFIZIERT" : active ? "AKTIV" : "GESPERRT"}
                  </div>
                  {!done && (
                    <button onClick={() => onAdvance(t.id)} style={{
                      background: "transparent", border: `1px solid ${T.color.ink}`,
                      padding: "5px 10px", fontFamily: T.font.serif, fontSize: 11, cursor: "pointer"
                    }}>↳ Freigeben</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hints + Log */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            background: "#fdf8ec", padding: 18, boxShadow: `3px 3px 0 ${T.color.shadowSoft}`
          }}>
            <div style={{ fontFamily: T.font.hand2, fontSize: 20, marginBottom: 10 }}>Tippkarten — Bahnhof</div>
            {window.FN_DATA.CH_MOBILITY.hints.map((h, i) => {
              const unlocked = i < hintsUnlocked;
              return (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "center", padding: "6px 8px",
                  background: unlocked ? T.color.paperDeep : "transparent",
                  marginBottom: 4, borderLeft: `2px solid ${unlocked ? T.color.thread : T.color.inkFaded}`
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.font.type, fontSize: 9, letterSpacing: "0.15em", color: T.color.inkFaded }}>
                      {h.title} · t+{h.afterMinutes}m
                    </div>
                    <div style={{ fontFamily: T.font.serif, fontSize: 11.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {h.body}
                    </div>
                  </div>
                  {!unlocked && (
                    <button onClick={onRevealHint} style={{
                      background: T.color.rust, color: T.color.paper, border: "none",
                      padding: "4px 8px", fontFamily: T.font.type, fontSize: 9,
                      letterSpacing: "0.15em", cursor: "pointer"
                    }}>ZEIGEN</button>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{
            background: "#fdf8ec", padding: 18, boxShadow: `3px 3px 0 ${T.color.shadowSoft}`, flex: 1
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: T.font.hand2, fontSize: 20 }}>Event-Log</div>
              <span style={{ fontFamily: T.font.type, fontSize: 9, color: T.color.rust, letterSpacing: "0.2em" }}>● LIVE</span>
            </div>
            {[
              { t: "08:23", msg: "Ereignis 'Durchsage' ausgelöst", tag: "EVENT" },
              { t: "08:19", msg: "Infokarte 'Mayas Fahrplan' geöffnet", tag: "INFO" },
              { t: "08:14", msg: "Kapitel Bahnhof gestartet", tag: "CAP" },
              { t: "08:12", msg: `Team '${teamName}' hat begonnen`, tag: "START" }
            ].map((e, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, fontFamily: T.font.type, fontSize: 10.5,
                padding: "5px 0", borderBottom: i < 3 ? `1px dashed ${T.color.paperDark}` : "none"
              }}>
                <span style={{ color: T.color.inkFaded, minWidth: 36 }}>{e.t}</span>
                <span style={{
                  background: T.color.ink, color: T.color.paper,
                  padding: "1px 6px", fontSize: 9, letterSpacing: "0.15em", minWidth: 44, textAlign: "center"
                }}>{e.tag}</span>
                <span style={{ flex: 1 }}>{e.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.FN_SCREENS = { FNStart, FNIntro, FNTutorial, FNHub, FNChapter, FNTransition, FNEnding, FNGamemaster };
