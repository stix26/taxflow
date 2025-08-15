const tintColorLight = "#2563EB";

const palette = {
  white: "#FFFFFF",
  black: "#000000",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate400: "#94A3B8",
  slate600: "#475569",
  slate800: "#1F2937",
  blue600: "#2563EB",
  blue700: "#1D4ED8",
  emerald500: "#10B981",
  amber500: "#F59E0B",
  rose500: "#F43F5E",
};

export default {
  light: {
    text: palette.slate800,
    background: palette.white,
    card: palette.slate50,
    border: palette.slate200,
    muted: palette.slate600,
    tint: tintColorLight,
    success: palette.emerald500,
    warning: palette.amber500,
    danger: palette.rose500,
    gradientStart: "#0ea5e9",
    gradientEnd: "#2563eb",
  },
  palette,
};