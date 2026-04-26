// Field Notes system — Atomic components

const { useState, useEffect } = React;

// Global animation styles
const ANIMS = `
  @keyframes fn-flip-in { from { opacity: 0; transform: translateY(14px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes fn-stamp-drop { 0% { opacity: 0; transform: rotate(var(--rot, 0deg)) scale(2.2); } 60% { opacity: 1; transform: rotate(var(--rot, 0deg)) scale(0.92); } 80% { transform: rotate(var(--rot, 0deg)) scale(1); } 100% { opacity: 1; transform: rotate(var(--rot, 0deg)) scale(1); } }
  @keyframes fn-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
  @keyframes fn-flutter { 0%, 100% { transform: rotate(var(--rot, 0deg)) translateY(0); } 50% { transform: rotate(calc(var(--rot, 0deg) + 0.6deg)) translateY(-1px); } }
  .fn-flip-in { animation: fn-flip-in 0.5s ease-out; }
  .fn-stamp-drop { animation: fn-stamp-drop 0.55s cubic-bezier(.2,1.2,.4,1); }
  .fn-shake { animation: fn-shake 0.35s; }
  .fn-flutter { animation: fn-flutter 5s ease-in-out infinite; }
`;

// Button component
function Button({ children, onClick, variant = "primary", size = "md", disabled = false, style = {} }) {
  const baseStyle = {
    padding: size === "sm" ? "6px 12px" : size === "lg" ? "12px 20px" : "8px 16px",
    fontSize: size === "sm" ? "12px" : size === "lg" ? "15px" : "13px",
    fontWeight: "600",
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  if (variant === "primary") {
    return (
      <button
        style={{
          ...baseStyle,
          background: "#f4a261",
          color: "#1a1812",
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else if (variant === "secondary") {
    return (
      <button
        style={{
          ...baseStyle,
          background: "transparent",
          border: "1px solid #e9c46a",
          color: "#e9c46a",
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        style={{
          ...baseStyle,
          background: "transparent",
          border: "1px solid #eaedf2",
          color: "#eaedf2",
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

// Card container
function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(26, 24, 18, 0.8)",
        border: "1px solid rgba(234, 205, 106, 0.2)",
        borderRadius: "6px",
        padding: "16px",
        marginBottom: "12px",
        backdropFilter: "blur(4px)",
        ...style,
      }}
      className="fn-flip-in"
    >
      {children}
    </div>
  );
}

// Timer display
function Timer({ time }) {
  return (
    <div
      style={{
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "'Courier New', monospace",
        color: "#f4a261",
        textAlign: "center",
        padding: "12px",
        background: "rgba(244, 162, 97, 0.1)",
        borderRadius: "4px",
        border: "1px solid rgba(244, 162, 97, 0.2)",
      }}
    >
      ⏱️ {time}
    </div>
  );
}

// Alert/notification
function Alert({ title, body, type = "info" }) {
  const colors = {
    info: { bg: "rgba(41, 128, 185, 0.1)", border: "#2980b9" },
    success: { bg: "rgba(46, 204, 113, 0.1)", border: "#2ecc71" },
    warning: { bg: "rgba(241, 196, 15, 0.1)", border: "#f1c40f" },
    error: { bg: "rgba(231, 76, 60, 0.1)", border: "#e74c3c" },
  };
  const color = colors[type] || colors.info;
  return (
    <div
      style={{
        background: color.bg,
        border: `1px solid ${color.border}`,
        borderRadius: "4px",
        padding: "12px",
        marginBottom: "12px",
        fontSize: "12px",
      }}
    >
      {title && <div style={{ fontWeight: "600", marginBottom: "4px" }}>{title}</div>}
      <div>{body}</div>
    </div>
  );
}

// Hint component
function Hint({ title, body }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "rgba(233, 196, 106, 0.1)",
        border: "1px solid rgba(233, 196, 106, 0.3)",
        borderRadius: "4px",
        padding: "8px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ fontSize: "12px", fontWeight: "600", color: "#e9c46a" }}>
        {open ? "▼" : "▶"} {title}
      </div>
      {open && <div style={{ fontSize: "12px", marginTop: "6px", opacity: 0.8 }}>{body}</div>}
    </div>
  );
}

// Progress indicator
function Progress({ current, total }) {
  const percent = (current / total) * 100;
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ fontSize: "11px", marginBottom: "4px", opacity: 0.6 }}>
        {current} / {total}
      </div>
      <div
        style={{
          height: "6px",
          background: "rgba(233, 196, 106, 0.1)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#e9c46a",
            width: `${percent}%",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}

// Input field
function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "8px",
        background: "rgba(26, 24, 18, 0.8)",
        border: "1px solid rgba(233, 196, 106, 0.3)",
        borderRadius: "4px",
        color: "#eaedf2",
        fontSize: "13px",
        fontFamily: "inherit",
      }}
    />
  );
}

// Export atoms
window.FN = {
  ATOMS: {
    Button,
    Card,
    Timer,
    Alert,
    Hint,
    Progress,
    Input,
  },
  ANIMS,
};
