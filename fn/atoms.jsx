// Field Notes v2 — shared design tokens, reusable visual atoms, sound hook.
// Expects React to be on window. Exports onto window.FN.*

// ─────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────
const FN_TOKENS = {
  color: {
    paper:      "#F1E7D2",
    paperDeep:  "#E5D7B6",
    paperDark:  "#D7C59C",
    ink:        "#1C1810",
    inkSoft:    "#433a28",
    inkFaded:   "#7a6e55",
    rust:       "#A8421C",   // rot stempel / pin
    rustDeep:   "#7a2c11",
    stamp:      "#8a1f1f",   // "Vertraulich"-Stempel
    thread:     "#2C5542",   // grün faden/erfolg
    threadLeaf: "#4a7a5c",
    tape:       "#E6C56D",   // gelbes tape
    tapeBlue:   "#7fa8c4",   // blaues tape
    shadow:     "rgba(28, 24, 16, 0.22)",
    shadowSoft: "rgba(28, 24, 16, 0.10)",
    night:      "#0E0B07",   // dark mode
  },
  font: {
    serif: "'Fraunces', 'Times New Roman', serif",
    hand:  "'Caveat', cursive",
    hand2: "'Kalam', 'Caveat', cursive",
    type:  "'Special Elite', 'Courier New', monospace",   // Schreibmaschine
    mono:  "'IBM Plex Mono', monospace",
  },
  radius: { sm: 2, md: 4 },
};

// ─────────────────────────────────────────────
// Paper background (with grain + subtle vignette)
// ─────────────────────────────────────────────
const FN_PAPER_BG = `
  radial-gradient(at 15% 20%, rgba(168, 66, 28, 0.05), transparent 55%),
  radial-gradient(at 85% 75%, rgba(44, 85, 66, 0.04), transparent 50%),
  radial-gradient(ellipse at center, transparent 50%, rgba(28, 24, 16, 0.12) 100%),
  repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(28, 24, 16, 0.018) 2px, rgba(28, 24, 16, 0.018) 3px),
  repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(28, 24, 16, 0.012) 3px, rgba(28, 24, 16, 0.012) 4px),
  ${FN_TOKENS.color.paper}
`;

// A small noise layer — pseudo-grain using dots
const GrainOverlay = ({ opacity = 0.08 }) => (
  <svg width="100%" height="100%" style={{
    position: "absolute", inset: 0, pointerEvents: "none", opacity, mixBlendMode: "multiply"
  }}>
    <filter id="fn-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/>
      <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.09  0 0 0 0 0.06  0 0 0 0.5 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#fn-noise)"/>
  </svg>
);

// ─────────────────────────────────────────────
// Tape (strips) — two colours, rotatable
// ─────────────────────────────────────────────
function Tape({ color = "tape", w = 70, h = 18, rot = -4, style = {} }) {
  const c = FN_TOKENS.color[color] || color;
  return (
    <div style={{
      width: w, height: h,
      background: `linear-gradient(180deg, ${c}dd, ${c} 50%, ${c}cc)`,
      boxShadow: `0 2px 3px ${FN_TOKENS.color.shadowSoft}, inset 0 0 8px rgba(255,255,255,0.25)`,
      transform: `rotate(${rot}deg)`,
      position: "relative",
      ...style
    }}>
      {/* torn edges */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.25,
        background: `repeating-linear-gradient(90deg, transparent 0 6px, rgba(0,0,0,0.2) 6px 7px)`
      }}/>
    </div>
  );
}

// ─────────────────────────────────────────────
// Stamp — circular or rectangular, with rotation/smudge
// ─────────────────────────────────────────────
function Stamp({
  label = "VERTRAULICH", sub, color = "stamp",
  rot = -8, size = 90, variant = "round", style = {},
}) {
  const c = FN_TOKENS.color[color] || color;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: variant === "round" ? 0 : "8px 14px",
      width: variant === "round" ? size : "auto",
      height: variant === "round" ? size : "auto",
      borderRadius: variant === "round" ? "50%" : 4,
      border: `2.5px solid ${c}`,
      color: c,
      fontFamily: FN_TOKENS.font.type,
      fontSize: variant === "round" ? 11 : 13,
      fontWeight: 700, letterSpacing: "0.15em",
      textAlign: "center", lineHeight: 1.1,
      transform: `rotate(${rot}deg)`,
      opacity: 0.82,
      textTransform: "uppercase",
      // ink bleed + smudge
      boxShadow: `inset 0 0 4px ${c}33`,
      filter: "contrast(1.1)",
      position: "relative",
      ...style
    }}>
      <div>
        {label}
        {sub && <div style={{ fontSize: 8, marginTop: 3, letterSpacing: "0.2em" }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Polaroid — square photo card with caption + tape
// ─────────────────────────────────────────────
function Polaroid({
  caption, subtitle, rot = -3, w = 180, scene = "forest",
  stamp, tape = "tape", tapeRot = -4, style = {}, children
}) {
  // procedural scene placeholder
  const scenes = {
    forest: `linear-gradient(160deg, #4a7a5c 0%, #2C5542 60%, #1a3329 100%)`,
    station: `linear-gradient(160deg, #8a7a62 0%, #5a4e3e 100%)`,
    supermarket: `linear-gradient(160deg, #c9a44e 0%, #A8421C 100%)`,
    house: `linear-gradient(160deg, #b08564 0%, #6b4a30 100%)`,
    power: `linear-gradient(160deg, #3a3530 0%, #1a1510 100%)`,
    note: `linear-gradient(160deg, ${FN_TOKENS.color.paperDeep}, ${FN_TOKENS.color.paperDark})`,
    maya: `linear-gradient(160deg, #8a6b4a 0%, #4a3520 100%)`,
  };
  const scenePaint = scenes[scene] || scenes.forest;

  return (
    <div style={{
      display: "inline-block", position: "relative",
      transform: `rotate(${rot}deg)`,
      filter: `drop-shadow(3px 5px 6px ${FN_TOKENS.color.shadow})`,
      ...style
    }}>
      {/* tape */}
      {tape && (
        <div style={{
          position: "absolute", top: -8, left: "50%",
          transform: `translateX(-50%) rotate(${tapeRot}deg)`, zIndex: 2
        }}>
          <Tape color={tape} w={w * 0.42} h={16} rot={0} />
        </div>
      )}
      {/* polaroid card */}
      <div style={{
        width: w, background: "#fdf8ec",
        padding: "10px 10px 28px",
        position: "relative",
      }}>
        {/* photo area */}
        <div style={{
          width: "100%", aspectRatio: "1/1",
          background: scenePaint,
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.3)"
        }}>
          {/* procedural "photo" content */}
          {children || (
            <div style={{
              fontFamily: FN_TOKENS.font.type,
              fontSize: 10, color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em", textTransform: "uppercase"
            }}>[ foto ]</div>
          )}
          {/* film grain */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3), transparent 40%)`
          }}/>
        </div>
        {/* caption */}
        {caption && (
          <div style={{
            fontFamily: FN_TOKENS.font.hand2, fontSize: 16, color: FN_TOKENS.color.ink,
            textAlign: "center", marginTop: 6, lineHeight: 1.1
          }}>{caption}</div>
        )}
        {subtitle && (
          <div style={{
            fontFamily: FN_TOKENS.font.type, fontSize: 8, color: FN_TOKENS.color.inkFaded,
            letterSpacing: "0.15em", textAlign: "center", marginTop: 2,
          }}>{subtitle}</div>
        )}
        {/* optional stamp */}
        {stamp && (
          <div style={{ position: "absolute", top: -10, right: -14, zIndex: 3 }}>
            <Stamp {...stamp} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Paper note — handwritten on lined paper
// ─────────────────────────────────────────────
function PaperNote({ children, rot = 0, w, pinColor = "rust", hand = true, style = {} }) {
  return (
    <div style={{
      position: "relative", display: "inline-block",
      transform: `rotate(${rot}deg)`,
      filter: `drop-shadow(2px 4px 5px ${FN_TOKENS.color.shadow})`,
      ...style
    }}>
      <div style={{
        background: `
          linear-gradient(180deg, #fdf8ec, #f5ecd3),
          repeating-linear-gradient(0deg, transparent 0 22px, rgba(28,24,16,0.08) 22px 23px)`,
        backgroundBlendMode: "multiply",
        padding: "16px 18px",
        width: w,
        fontFamily: hand ? FN_TOKENS.font.hand2 : FN_TOKENS.font.type,
        fontSize: hand ? 17 : 12,
        color: FN_TOKENS.color.ink,
        lineHeight: 1.5,
      }}>
        {/* pin */}
        <div style={{
          position: "absolute", top: -6, left: "50%",
          transform: "translateX(-50%)",
          width: 14, height: 14, borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, ${FN_TOKENS.color[pinColor]}, ${FN_TOKENS.color[pinColor]} 60%, #000 100%)`,
          boxShadow: `0 2px 3px ${FN_TOKENS.color.shadow}`,
          zIndex: 2,
        }}/>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Newspaper clipping
// ─────────────────────────────────────────────
function Newspaper({ headline, dek, body, source = "Appenzeller Zeitung", date, rot = -1, w = 280, style = {} }) {
  return (
    <div style={{
      background: "#EDE5D0",
      padding: "14px 16px 16px",
      transform: `rotate(${rot}deg)`,
      filter: `drop-shadow(2px 3px 4px ${FN_TOKENS.color.shadow})`,
      maxWidth: w,
      position: "relative",
      // torn bottom edge
      clipPath: "polygon(0 0, 100% 0, 100% 96%, 96% 99%, 88% 96%, 78% 100%, 65% 97%, 52% 99%, 40% 96%, 28% 99%, 15% 97%, 4% 100%, 0 97%)",
      ...style
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: FN_TOKENS.font.type, fontSize: 8, letterSpacing: "0.2em",
        color: FN_TOKENS.color.inkFaded, textTransform: "uppercase",
        borderBottom: `1px solid ${FN_TOKENS.color.inkFaded}`, paddingBottom: 4, marginBottom: 6
      }}>
        <span>{source}</span><span>{date}</span>
      </div>
      <div style={{
        fontFamily: FN_TOKENS.font.serif, fontWeight: 700,
        fontSize: 20, lineHeight: 1.05, color: FN_TOKENS.color.ink,
        letterSpacing: "-0.01em",
      }}>{headline}</div>
      {dek && (
        <div style={{
          fontFamily: FN_TOKENS.font.serif, fontStyle: "italic",
          fontSize: 12, color: FN_TOKENS.color.inkSoft, marginTop: 4, lineHeight: 1.3
        }}>{dek}</div>
      )}
      {body && (
        <div style={{
          fontFamily: FN_TOKENS.font.serif, fontSize: 10.5, lineHeight: 1.45,
          color: FN_TOKENS.color.inkSoft, marginTop: 8,
          columnCount: 2, columnGap: 10,
          textAlign: "justify", hyphens: "auto"
        }}>{body}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Case file header — Aktenzeichen strip
// ─────────────────────────────────────────────
function CaseHeader({ caseNo = "SP-2026-04-24", track, step, status = "AKTIV" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: FN_TOKENS.font.type, fontSize: 9, letterSpacing: "0.2em",
      color: FN_TOKENS.color.inkFaded, textTransform: "uppercase",
      borderTop: `1px solid ${FN_TOKENS.color.inkFaded}`,
      borderBottom: `1px solid ${FN_TOKENS.color.inkFaded}`,
      padding: "4px 0", marginBottom: 10,
    }}>
      <span>AKTE {caseNo}</span>
      {track && <span>· {track} ·</span>}
      {step && <span>{step}</span>}
      <span style={{ color: FN_TOKENS.color.rust }}>{status}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sound — minimal WebAudio stubs (no assets)
// ─────────────────────────────────────────────
function useFieldSounds(enabled = true) {
  const ctxRef = React.useRef(null);
  const getCtx = () => {
    if (!ctxRef.current) {
      const A = window.AudioContext || window.webkitAudioContext;
      if (A) ctxRef.current = new A();
    }
    return ctxRef.current;
  };
  const play = (type) => {
    if (!enabled) return;
    const ctx = getCtx(); if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    if (type === "flip") {
      // paper flip: noise burst
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (d.length * 0.3)) * 0.4;
      const src = ctx.createBufferSource(); src.buffer = buf;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1800;
      const g = ctx.createGain(); g.gain.value = 0.3;
      src.connect(hp).connect(g).connect(ctx.destination); src.start();
    } else if (type === "stamp") {
      // stamp: low thud
      const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = 120;
      const g = ctx.createGain(); g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.5, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      o.connect(g).connect(ctx.destination); o.start(now); o.stop(now + 0.2);
    } else if (type === "type") {
      // typewriter click
      const o = ctx.createOscillator(); o.type = "square"; o.frequency.value = 2000 + Math.random() * 500;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.15, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      o.connect(g).connect(ctx.destination); o.start(now); o.stop(now + 0.05);
    } else if (type === "success") {
      // rising chime
      [523, 659, 784].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);
        o.connect(g).connect(ctx.destination); o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.5);
      });
    } else if (type === "error") {
      const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = 180;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.2, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      o.connect(g).connect(ctx.destination); o.start(now); o.stop(now + 0.3);
    }
  };
  return play;
}

// ─────────────────────────────────────────────
// Global CSS injector (animations)
// ─────────────────────────────────────────────
const FN_ANIMS = `
@keyframes fn-flip-in { from { opacity: 0; transform: translateY(14px) rotate(var(--rot, 0deg)) scale(0.95); } to { opacity: 1; transform: translateY(0) rotate(var(--rot, 0deg)) scale(1); } }
@keyframes fn-stamp-drop { 0% { opacity: 0; transform: rotate(var(--rot, 0deg)) scale(2.2); } 60% { opacity: 1; transform: rotate(var(--rot, 0deg)) scale(0.92); } 80% { transform: rotate(var(--rot, 0deg)) scale(1.06); } 100% { transform: rotate(var(--rot, 0deg)) scale(1); } }
@keyframes fn-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes fn-flutter { 0%, 100% { transform: rotate(var(--rot, 0deg)) translateY(0); } 50% { transform: rotate(calc(var(--rot, 0deg) + 0.8deg)) translateY(-2px); } }
@keyframes fn-blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes fn-type-cursor { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
.fn-flip-in { animation: fn-flip-in 0.5s ease-out; }
.fn-stamp-drop { animation: fn-stamp-drop 0.55s cubic-bezier(.2,1.2,.4,1); }
.fn-shake { animation: fn-shake 0.35s; }
.fn-flutter { animation: fn-flutter 4s ease-in-out infinite; }
`;

window.FN = {
  TOKENS: FN_TOKENS, PAPER_BG: FN_PAPER_BG, ANIMS: FN_ANIMS,
  GrainOverlay, Tape, Stamp, Polaroid, PaperNote, Newspaper, CaseHeader, useFieldSounds
};
