// Variant 3 — "Wildgrün" — light, optimistic, nature / learning-app feel
// Inter + Source Serif Pro · sage/forest greens · soft rounded

const wildPalette = {
  bg: "#F4F1EA",
  bgSoft: "#EAE5D8",
  card: "#FFFFFF",
  text: "#1A2E1D",
  textSoft: "#4F6651",
  sage: "#8FA68A",
  forest: "#2E5E3A",
  moss: "#5B7F4E",
  sun: "#E8B44A",
  coral: "#D66853",
  shadow: "rgba(46, 94, 58, 0.12)"
};

const wildFonts = {
  sans: "'Inter', sans-serif",
  serif: "'Source Serif Pro', Georgia, serif"
};

// ---------- START ----------
const WildStart = ({ onStart, teamName, setTeamName }) => (
  <div style={{
    width: "100%", height: "100%",
    background: `
      radial-gradient(at 20% 10%, ${wildPalette.sage}33, transparent 50%),
      radial-gradient(at 90% 80%, ${wildPalette.sun}22, transparent 50%),
      ${wildPalette.bg}`,
    color: wildPalette.text,
    fontFamily: wildFonts.sans, padding: "54px 24px 24px",
    display: "flex", flexDirection: "column", position: "relative"
  }}>
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      alignSelf: "flex-start",
      background: wildPalette.card, borderRadius: 999, padding: "6px 12px 6px 8px",
      boxShadow: `0 4px 14px ${wildPalette.shadow}`,
      fontSize: 11, fontWeight: 600, color: wildPalette.forest,
      letterSpacing: "0.05em"
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: "50%", background: wildPalette.forest,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: wildPalette.card, fontSize: 11
      }}>🌿</div>
      SPEICHER AR · 24. Apr
    </div>

    <div style={{ marginTop: 32 }}>
      <div style={{
        fontFamily: wildFonts.serif, fontSize: 54, lineHeight: 1,
        fontWeight: 400, letterSpacing: "-0.02em", fontStyle: "italic"
      }}>Wo ist</div>
      <div style={{
        fontFamily: wildFonts.serif, fontSize: 72, lineHeight: 1,
        fontWeight: 600, letterSpacing: "-0.03em", color: wildPalette.forest,
        marginTop: 2
      }}>Maya?</div>
    </div>

    <div style={{
      fontSize: 14, lineHeight: 1.55, color: wildPalette.textSoft,
      marginTop: 16, maxWidth: 280
    }}>
      Eine Spurensuche durch Speicher – um fünf Fragen zu einem nachhaltigen Dorf.
    </div>

    {/* Illustration card */}
    <div style={{
      marginTop: 24, background: wildPalette.card,
      borderRadius: 22, padding: 16,
      boxShadow: `0 10px 24px ${wildPalette.shadow}`
    }}>
      <div style={{
        aspectRatio: "16/10", borderRadius: 14,
        background: `linear-gradient(160deg, ${wildPalette.sage}, ${wildPalette.moss})`,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "flex-end", padding: 14
      }}>
        {/* stylized hills */}
        <svg viewBox="0 0 200 80" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35
        }}>
          <path d="M0,60 Q50,30 100,50 T200,40 L200,80 L0,80 Z" fill={wildPalette.forest} />
          <path d="M0,70 Q60,50 120,65 T200,60 L200,80 L0,80 Z" fill={wildPalette.text} opacity="0.4" />
        </svg>
        <div style={{
          position: "relative", color: wildPalette.card,
          fontFamily: wildFonts.serif, fontSize: 17, fontStyle: "italic"
        }}>
          „Alle 5 Spuren führen zum selben Schluss."
          <div style={{
            fontFamily: wildFonts.sans, fontSize: 11, opacity: 0.85,
            marginTop: 4, fontStyle: "normal", letterSpacing: "0.1em"
          }}>— MAYA, 23:47</div>
        </div>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginTop: 14, fontSize: 11, color: wildPalette.textSoft, fontWeight: 500
      }}>
        <span>⏱ 60 Minuten</span>
        <span>📍 5 Orte</span>
        <span>👥 1 Team</span>
      </div>
    </div>

    <div style={{ flex: 1 }} />

    <div style={{
      background: wildPalette.card, borderRadius: 16, padding: "12px 14px",
      boxShadow: `0 4px 14px ${wildPalette.shadow}`, marginBottom: 12
    }}>
      <div style={{
        fontSize: 11, color: wildPalette.textSoft, fontWeight: 600,
        letterSpacing: "0.05em", marginBottom: 2
      }}>Teamname</div>
      <input
        value={teamName} onChange={e => setTeamName(e.target.value)}
        placeholder="z.B. Spurensucher 9b..."
        style={{
          width: "100%", background: "transparent", border: "none", outline: "none",
          fontFamily: wildFonts.serif, fontSize: 22, fontStyle: "italic",
          color: wildPalette.forest, padding: 0
        }}
      />
    </div>

    <button onClick={onStart} style={{
      background: wildPalette.forest, color: wildPalette.card,
      border: "none", padding: "16px 20px", borderRadius: 16,
      fontFamily: wildFonts.sans, fontSize: 16, fontWeight: 600,
      cursor: "pointer", boxShadow: `0 8px 20px ${wildPalette.shadow}`
    }}>Spurensuche starten →</button>
  </div>
);

// ---------- HUB ----------
const WildHub = ({ onPick, timer, teamName, completed }) => (
  <div style={{
    width: "100%", height: "100%",
    background: wildPalette.bg, color: wildPalette.text,
    fontFamily: wildFonts.sans, padding: "54px 20px 22px",
    display: "flex", flexDirection: "column"
  }}>
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center"
    }}>
      <div>
        <div style={{ fontSize: 11, color: wildPalette.textSoft, fontWeight: 500 }}>
          Hallo, {teamName}
        </div>
        <div style={{
          fontFamily: wildFonts.serif, fontSize: 24, fontWeight: 600,
          color: wildPalette.text, letterSpacing: "-0.02em"
        }}>Deine 5 Spuren</div>
      </div>
      <div style={{
        background: wildPalette.card, borderRadius: 999,
        padding: "8px 14px", boxShadow: `0 4px 10px ${wildPalette.shadow}`,
        fontSize: 14, fontWeight: 700, color: wildPalette.coral,
        fontVariantNumeric: "tabular-nums"
      }}>⏱ {timer}</div>
    </div>

    {/* progress */}
    <div style={{
      marginTop: 16, background: wildPalette.card, borderRadius: 16,
      padding: "12px 14px", boxShadow: `0 4px 10px ${wildPalette.shadow}`
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, fontWeight: 600, marginBottom: 8
      }}>
        <span>Fortschritt</span>
        <span style={{ color: wildPalette.forest }}>{completed.length} / 5</span>
      </div>
      <div style={{
        height: 6, borderRadius: 4, background: wildPalette.bgSoft, overflow: "hidden"
      }}>
        <div style={{
          width: `${(completed.length / 5) * 100}%`, height: "100%",
          background: `linear-gradient(90deg, ${wildPalette.sage}, ${wildPalette.forest})`,
          transition: "width 0.5s"
        }} />
      </div>
    </div>

    <div style={{ flex: 1, overflowY: "auto", marginTop: 14, marginRight: -8, paddingRight: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TRACKS.map((t, i) => {
          const done = completed.includes(t.id);
          const locked = t.status === "gesperrt" && !done;
          const bg = [wildPalette.sage, wildPalette.sun, wildPalette.moss, wildPalette.coral, wildPalette.forest][i];
          return (
            <button key={t.id} onClick={() => !locked && onPick(t.id)} style={{
              background: wildPalette.card, border: "none",
              borderRadius: 18, padding: 14, textAlign: "left",
              cursor: locked ? "not-allowed" : "pointer",
              boxShadow: `0 6px 14px ${wildPalette.shadow}`,
              opacity: locked ? 0.5 : 1,
              display: "flex", gap: 14, alignItems: "center",
              fontFamily: wildFonts.sans
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `linear-gradient(135deg, ${bg}cc, ${bg})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, flexShrink: 0, position: "relative",
                boxShadow: `inset 0 -4px 8px rgba(0,0,0,0.1)`
              }}>
                {t.icon}
                {done && (
                  <div style={{
                    position: "absolute", top: -4, right: -4, width: 22, height: 22,
                    borderRadius: "50%", background: wildPalette.forest,
                    color: wildPalette.card, fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>✓</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: wildPalette.textSoft, fontWeight: 600, marginBottom: 2
                }}>{t.theme} {locked && "· gesperrt"}</div>
                <div style={{
                  fontFamily: wildFonts.serif, fontSize: 19, fontWeight: 600,
                  color: wildPalette.text, letterSpacing: "-0.01em"
                }}>{t.title}</div>
                <div style={{
                  fontSize: 12, lineHeight: 1.4, color: wildPalette.textSoft,
                  marginTop: 3
                }}>{t.teaser}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ---------- CHAPTER ----------
const WildChapter = ({ onBack, onComplete, timer, hintsUnlocked }) => {
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
      width: "100%", height: "100%",
      background: wildPalette.bg, color: wildPalette.text,
      fontFamily: wildFonts.sans, padding: "54px 20px 22px",
      display: "flex", flexDirection: "column", position: "relative"
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <button onClick={onBack} style={{
          background: wildPalette.card, border: "none", borderRadius: 999,
          padding: "8px 14px", fontSize: 13, fontWeight: 600,
          color: wildPalette.text, cursor: "pointer",
          boxShadow: `0 2px 6px ${wildPalette.shadow}`
        }}>← Spuren</button>
        <div style={{
          background: wildPalette.card, borderRadius: 999,
          padding: "8px 14px", boxShadow: `0 2px 6px ${wildPalette.shadow}`,
          fontSize: 13, fontWeight: 700, color: wildPalette.coral,
          fontVariantNumeric: "tabular-nums"
        }}>⏱ {timer}</div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{
          display: "inline-block",
          background: wildPalette.sage, color: wildPalette.card,
          padding: "4px 10px", borderRadius: 999, fontSize: 10,
          fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase"
        }}>🚆 Spur I · Mobilität</div>
        <div style={{
          fontFamily: wildFonts.serif, fontSize: 32, fontWeight: 600,
          letterSpacing: "-0.02em", marginTop: 8, lineHeight: 1.05
        }}>Am Bahnhof</div>
      </div>

      {/* dots */}
      <div style={{ display: "flex", gap: 6, marginTop: 12, marginBottom: 14 }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= cardIdx ? wildPalette.forest : wildPalette.bgSoft
          }} />
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", marginRight: -8, paddingRight: 8 }}>
        {card.type === "story" && (
          <div style={{
            background: wildPalette.card, borderRadius: 20, padding: 18,
            boxShadow: `0 8px 20px ${wildPalette.shadow}`
          }}>
            <div style={{
              display: "flex", gap: 8, alignItems: "center", marginBottom: 10
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: wildPalette.bgSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14
              }}>📖</div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: wildPalette.textSoft
              }}>Storykarte · {card.time}</div>
            </div>
            <div style={{
              fontFamily: wildFonts.serif, fontSize: 22, fontWeight: 600,
              marginBottom: 10
            }}>{card.title}</div>
            <div style={{
              fontSize: 15, lineHeight: 1.65, whiteSpace: "pre-wrap",
              color: wildPalette.textSoft
            }}>{card.body}</div>
          </div>
        )}

        {card.type === "info" && (
          <div style={{
            background: wildPalette.card, borderRadius: 20, padding: 18,
            boxShadow: `0 8px 20px ${wildPalette.shadow}`,
            borderTop: `4px solid ${wildPalette.forest}`
          }}>
            <div style={{
              display: "flex", gap: 8, alignItems: "center", marginBottom: 10
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: wildPalette.forest,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: wildPalette.card
              }}>ⓘ</div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: wildPalette.forest
              }}>Infokarte · {card.subtitle.split('·')[1]?.trim()}</div>
            </div>
            <div style={{
              fontFamily: wildFonts.serif, fontSize: 22, fontWeight: 600, marginBottom: 12
            }}>{card.title}</div>
            <div style={{
              background: wildPalette.bgSoft, borderRadius: 12, padding: "12px 14px",
              fontFamily: "'SF Mono', monospace", fontSize: 12, lineHeight: 1.7,
              whiteSpace: "pre-wrap", color: wildPalette.text
            }}>{card.body}</div>
            <div style={{
              fontSize: 11, color: wildPalette.textSoft, marginTop: 10, fontStyle: "italic"
            }}>↳ {card.meta}</div>
          </div>
        )}

        {card.type === "event" && (
          <div style={{
            background: `linear-gradient(160deg, ${wildPalette.sun}, ${wildPalette.coral})`,
            color: wildPalette.card, borderRadius: 20, padding: 18,
            boxShadow: `0 10px 24px ${wildPalette.shadow}`
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", opacity: 0.85, marginBottom: 8
            }}>⚡ Ereignis · {card.subtitle.split('·')[1]?.trim()}</div>
            <div style={{
              fontFamily: wildFonts.serif, fontSize: 24, fontWeight: 600, marginBottom: 10
            }}>{card.title}</div>
            <div style={{
              fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap",
              marginBottom: 14, opacity: 0.95
            }}>{card.body}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {card.choices.map((c, i) => (
                <button key={i} onClick={() => setCardIdx(cardIdx + 1)} style={{
                  background: "rgba(255,255,255,0.2)", color: wildPalette.card,
                  border: `1px solid rgba(255,255,255,0.5)`, borderRadius: 12,
                  padding: "12px 14px", fontFamily: wildFonts.sans,
                  fontSize: 13, fontWeight: 600, textAlign: "left", cursor: "pointer",
                  backdropFilter: "blur(4px)"
                }}>
                  <span style={{ opacity: 0.7, marginRight: 6 }}>
                    {String.fromCharCode(65+i)}
                  </span> {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {card.type === "puzzle" && !showSuccess && (
          <div style={{
            background: wildPalette.card, borderRadius: 20, padding: 18,
            boxShadow: `0 8px 20px ${wildPalette.shadow}`,
            borderTop: `4px solid ${wildPalette.coral}`
          }}>
            <div style={{
              display: "flex", gap: 8, alignItems: "center", marginBottom: 10
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: wildPalette.coral, color: wildPalette.card,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14
              }}>🔐</div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: wildPalette.coral
              }}>Verifizierung</div>
            </div>
            <div style={{
              fontFamily: wildFonts.serif, fontSize: 20, fontWeight: 600, marginBottom: 8
            }}>{card.title}</div>
            <div style={{
              fontSize: 13, lineHeight: 1.5, color: wildPalette.textSoft,
              marginBottom: 18
            }}>{card.body}</div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 52, height: 64, borderRadius: 12,
                  background: wildPalette.bgSoft,
                  border: `2px solid ${codeError ? wildPalette.coral : code[i] ? wildPalette.forest : "transparent"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: wildFonts.serif, fontSize: 30, fontWeight: 700,
                  color: wildPalette.forest,
                  transition: "all 0.2s"
                }}>{code[i] || ""}</div>
              ))}
            </div>
            <input
              autoFocus inputMode="numeric" maxLength={4}
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="Code eingeben"
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12,
                background: wildPalette.bgSoft, border: "none",
                fontFamily: wildFonts.sans, fontSize: 14, textAlign: "center",
                color: wildPalette.text, outline: "none", fontWeight: 600
              }}
            />
            <button onClick={submitCode} disabled={code.length !== 4} style={{
              width: "100%", marginTop: 10, borderRadius: 14,
              background: code.length === 4 ? wildPalette.forest : wildPalette.bgSoft,
              color: code.length === 4 ? wildPalette.card : wildPalette.textSoft,
              border: "none", padding: "14px",
              fontFamily: wildFonts.sans, fontSize: 15, fontWeight: 600,
              cursor: code.length === 4 ? "pointer" : "not-allowed",
              boxShadow: code.length === 4 ? `0 6px 14px ${wildPalette.shadow}` : "none"
            }}>Spur prüfen →</button>
            {codeError && (
              <div style={{
                fontSize: 12, color: wildPalette.coral, marginTop: 8,
                textAlign: "center", fontWeight: 600
              }}>Der Code stimmt nicht – schaut nochmal hin.</div>
            )}
          </div>
        )}

        {card.type === "puzzle" && showSuccess && (
          <div style={{
            background: `linear-gradient(160deg, ${wildPalette.sage}, ${wildPalette.forest})`,
            color: wildPalette.card, borderRadius: 20, padding: "28px 20px",
            textAlign: "center",
            boxShadow: `0 12px 28px ${wildPalette.shadow}`
          }}>
            <div style={{
              fontSize: 48, marginBottom: 6
            }}>✓</div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", opacity: 0.9
            }}>Spur freigeschaltet</div>
            <div style={{
              fontFamily: wildFonts.serif, fontSize: 38, fontWeight: 600, margin: "6px 0"
            }}>0725</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.95 }}>
              {card.success}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => setShowHints(true)} style={{
          background: wildPalette.card, border: "none", borderRadius: 14,
          padding: "10px 14px", fontFamily: wildFonts.sans,
          fontSize: 13, fontWeight: 600, color: wildPalette.text,
          cursor: "pointer", boxShadow: `0 2px 6px ${wildPalette.shadow}`
        }}>💡 Tipps ({hintsUnlocked}/3)</button>
        {card.type !== "puzzle" && (
          <button onClick={() => setCardIdx(Math.min(cards.length - 1, cardIdx + 1))} style={{
            flex: 1, background: wildPalette.forest, color: wildPalette.card,
            border: "none", borderRadius: 14, padding: "10px 14px",
            fontFamily: wildFonts.sans, fontSize: 13, fontWeight: 600,
            cursor: "pointer", boxShadow: `0 4px 10px ${wildPalette.shadow}`
          }}>Weiter →</button>
        )}
      </div>

      {showHints && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(26, 46, 29, 0.5)",
          display: "flex", alignItems: "flex-end", zIndex: 10,
          backdropFilter: "blur(4px)"
        }} onClick={() => setShowHints(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: wildPalette.bg, width: "100%",
            borderRadius: "24px 24px 0 0", padding: "18px 20px 28px"
          }}>
            <div style={{
              width: 40, height: 4, borderRadius: 2,
              background: wildPalette.bgSoft, margin: "0 auto 14px"
            }} />
            <div style={{
              fontFamily: wildFonts.serif, fontSize: 22, fontWeight: 600, marginBottom: 4
            }}>Tippkarten</div>
            <div style={{
              fontSize: 12, color: wildPalette.textSoft, marginBottom: 14
            }}>Automatisch freigeschaltet nach 3 / 6 / 9 Minuten.</div>
            {CHAPTER_BAHNHOF.hints.map((h, i) => {
              const unlocked = i < hintsUnlocked;
              return (
                <div key={i} style={{
                  background: wildPalette.card, borderRadius: 14,
                  padding: "12px 14px", marginBottom: 8,
                  borderLeft: `4px solid ${unlocked ? wildPalette.sun : wildPalette.bgSoft}`,
                  opacity: unlocked ? 1 : 0.55
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: wildPalette.textSoft, marginBottom: 3
                  }}>{h.title} · nach {h.afterMinutes} min {!unlocked && "🔒"}</div>
                  <div style={{
                    fontSize: 14, color: unlocked ? wildPalette.text : wildPalette.textSoft,
                    filter: unlocked ? "none" : "blur(3px)"
                  }}>{unlocked ? h.body : "Noch gesperrt – die Zeit läuft."}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { WildStart, WildHub, WildChapter, wildPalette, wildFonts });
