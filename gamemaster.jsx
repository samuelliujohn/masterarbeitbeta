// Gamemaster overview — tablet/desktop-sized, not phone
// One unified look (dark-neutral admin style), independent of player variant

const gmPalette = {
  bg: "#0F1115",
  panel: "#181B22",
  panelSoft: "#1F232C",
  border: "#2A3040",
  text: "#EAEDF2",
  textDim: "#8B93A3",
  accent: "#6EE7B7",   // mint
  warn: "#F59E0B",
  danger: "#EF4444",
  info: "#60A5FA"
};

const Gamemaster = ({ timer, teamName, completed, hintsUnlocked, onReset, onAdvance, onRevealHint }) => {
  const totalProgress = (completed.length / 5) * 100;

  return (
    <div style={{
      width: "100%", minHeight: "100%",
      background: gmPalette.bg, color: gmPalette.text,
      fontFamily: "'Inter', sans-serif",
      padding: 28, boxSizing: "border-box"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        paddingBottom: 20, borderBottom: `1px solid ${gmPalette.border}`
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: "0.2em", color: gmPalette.accent, textTransform: "uppercase"
          }}>Gamemaster · Konsole</div>
          <div style={{
            fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4
          }}>Wo ist Maya? <span style={{ color: gmPalette.textDim, fontWeight: 400 }}>· Raum 1</span></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{
            background: gmPalette.panel, border: `1px solid ${gmPalette.border}`,
            borderRadius: 10, padding: "10px 16px",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700,
            color: gmPalette.warn, fontVariantNumeric: "tabular-nums"
          }}>⏱ {timer}</div>
          <button onClick={onReset} style={{
            background: "transparent", color: gmPalette.textDim,
            border: `1px solid ${gmPalette.border}`, borderRadius: 10,
            padding: "10px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer"
          }}>⟲ Reset</button>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 20
      }}>
        {[
          { label: "Team", value: teamName, sub: "aktiv", color: gmPalette.accent },
          { label: "Fortschritt", value: `${completed.length}/5`, sub: `${Math.round(totalProgress)}%`, color: gmPalette.info },
          { label: "Tipps genutzt", value: hintsUnlocked, sub: "von 15", color: gmPalette.warn },
          { label: "Status", value: "ON TRACK", sub: "Vorhersage: 52 min", color: gmPalette.accent }
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: gmPalette.panel, border: `1px solid ${gmPalette.border}`,
            borderRadius: 12, padding: "14px 16px"
          }}>
            <div style={{
              fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
              color: gmPalette.textDim, fontWeight: 600
            }}>{kpi.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, color: kpi.color }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: 11, color: gmPalette.textDim, marginTop: 2 }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 20
      }}>
        {/* Spuren status */}
        <div style={{
          background: gmPalette.panel, border: `1px solid ${gmPalette.border}`,
          borderRadius: 12, padding: 16
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14
          }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Spuren — Live-Status</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: gmPalette.textDim, letterSpacing: "0.15em", textTransform: "uppercase"
            }}>Auto-Refresh · 1s</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TRACKS.map((t, i) => {
              const done = completed.includes(t.id);
              const active = !done && i === completed.length;
              const pct = done ? 100 : active ? 45 : 0;
              return (
                <div key={t.id} style={{
                  background: gmPalette.panelSoft,
                  border: `1px solid ${active ? gmPalette.accent : gmPalette.border}`,
                  borderRadius: 10, padding: "10px 14px",
                  display: "grid", gridTemplateColumns: "24px 1fr auto auto auto", gap: 14,
                  alignItems: "center"
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: done ? gmPalette.accent : active ? gmPalette.info : gmPalette.border,
                    color: done ? gmPalette.bg : gmPalette.text,
                    fontSize: 11, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{done ? "✓" : t.glyph}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>
                      {t.title} <span style={{ color: gmPalette.textDim, fontWeight: 400, fontSize: 12 }}>· {t.theme}</span>
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                      color: gmPalette.textDim, marginTop: 2
                    }}>{t.codeHint}</div>
                  </div>
                  <div style={{
                    width: 100, height: 4, borderRadius: 2,
                    background: gmPalette.border, overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${pct}%`, height: "100%",
                      background: done ? gmPalette.accent : gmPalette.info
                    }} />
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: done ? gmPalette.accent : active ? gmPalette.info : gmPalette.textDim,
                    minWidth: 70, textAlign: "right", letterSpacing: "0.1em"
                  }}>{done ? "VERIFIZIERT" : active ? "AKTIV" : "GESPERRT"}</div>
                  {!done && (
                    <button onClick={() => onAdvance(t.id)} style={{
                      background: "transparent", color: gmPalette.textDim,
                      border: `1px solid ${gmPalette.border}`, borderRadius: 6,
                      padding: "4px 10px", fontSize: 11, cursor: "pointer"
                    }}>↳ Freigeben</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Hints */}
          <div style={{
            background: gmPalette.panel, border: `1px solid ${gmPalette.border}`,
            borderRadius: 12, padding: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
              Tippkarten — Bahnhof
            </div>
            {CHAPTER_BAHNHOF.hints.map((h, i) => {
              const unlocked = i < hintsUnlocked;
              return (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "center",
                  padding: "8px 10px", borderRadius: 8,
                  background: gmPalette.panelSoft, marginBottom: 6,
                  opacity: unlocked ? 1 : 0.6
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: unlocked ? gmPalette.accent : gmPalette.textDim
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 11, color: gmPalette.textDim,
                      letterSpacing: "0.1em", textTransform: "uppercase"
                    }}>{h.title} · t+{h.afterMinutes}min</div>
                    <div style={{
                      fontSize: 12, marginTop: 2, whiteSpace: "nowrap",
                      overflow: "hidden", textOverflow: "ellipsis"
                    }}>{h.body}</div>
                  </div>
                  {!unlocked && (
                    <button onClick={onRevealHint} style={{
                      background: gmPalette.warn, color: gmPalette.bg,
                      border: "none", borderRadius: 6, padding: "4px 10px",
                      fontSize: 11, fontWeight: 700, cursor: "pointer"
                    }}>Jetzt zeigen</button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Events log */}
          <div style={{
            background: gmPalette.panel, border: `1px solid ${gmPalette.border}`,
            borderRadius: 12, padding: 16, flex: 1
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 10
            }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Event-Log</div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: gmPalette.accent, letterSpacing: "0.15em"
              }}>● LIVE</span>
            </div>
            {[
              { t: "08:23", msg: "Event 'Durchsage' ausgelöst", tag: "event", color: gmPalette.warn },
              { t: "08:19", msg: "Infokarte 'Mayas Fahrplan' geöffnet", tag: "info", color: gmPalette.info },
              { t: "08:14", msg: "Kapitel Bahnhof gestartet", tag: "chapter", color: gmPalette.accent },
              { t: "08:12", msg: "Team '"+teamName+"' hat begonnen", tag: "start", color: gmPalette.textDim },
            ].map((e, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "baseline",
                padding: "6px 0", borderBottom: i < 3 ? `1px solid ${gmPalette.border}` : "none",
                fontSize: 12
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: gmPalette.textDim, minWidth: 40
                }}>{e.t}</span>
                <span style={{
                  background: `${e.color}22`, color: e.color,
                  fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                  letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 60, textAlign: "center"
                }}>{e.tag}</span>
                <span style={{ flex: 1 }}>{e.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Gamemaster, gmPalette });
