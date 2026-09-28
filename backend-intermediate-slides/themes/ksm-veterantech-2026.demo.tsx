import {
  type DesignSystem,
  type Page,
  useSlidePageNumber,
} from "@open-slide/core";
import type { ReactNode } from "react";

const colors = {
  bg: "#f1eaea",
  text: "#342c2a",
  muted: "#745e5b",
  caramel: "#f2b07c",
  silk: "#efcec0",
  tangerine: "#f1a17a",
  pink: "#cd7986",
  maroon: "#c85864",
};

const primaryGradient = `linear-gradient(110deg, ${colors.caramel}, ${colors.pink})`;
const alternateGradient = `linear-gradient(110deg, ${colors.tangerine}, ${colors.maroon})`;
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
`;

export const design: DesignSystem = {
  palette: { bg: colors.bg, text: colors.text, accent: colors.maroon },
  fonts: {
    display: '"Space Grotesk", sans-serif',
    body: '"JetBrains Mono", monospace',
  },
  typeScale: { hero: 160, body: 34 },
  radius: 12,
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 160,
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: "-0.045em",
      margin: 0,
      color: colors.text,
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 68,
        padding: "0 120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: primaryGradient,
        color: colors.text,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 22,
        fontWeight: 500,
      }}
    >
      <span>KSM VETERANTECH 2026</span>
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: colors.maroon,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const base = {
  position: "relative" as const,
  width: "100%",
  height: "100%",
  overflow: "hidden" as const,
  background: "var(--osd-bg)",
  color: "var(--osd-text)",
  fontFamily: "var(--osd-font-body)",
};

const Cover: Page = () => (
  <div style={{ ...base, display: "grid", gridTemplateColumns: "1.2fr 0.8fr" }}>
    <style>{fontStyles}</style>
    <div
      style={{
        padding: "140px 100px 140px 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 34,
      }}
    >
      <Eyebrow>Study Club · 2026</Eyebrow>
      <Title>
        Backend
        <br />
        Intermediate
      </Title>
      <p
        style={{
          maxWidth: 900,
          margin: 0,
          color: colors.muted,
          fontSize: 34,
          lineHeight: 1.5,
        }}
      >
        A warm technical editorial direction for clear, focused learning
        materials.
      </p>
    </div>
    <div
      style={{
        padding: "140px 120px 140px 80px",
        background: alternateGradient,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <span
        style={{
          color: colors.text,
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 250,
          fontWeight: 700,
          letterSpacing: "-0.08em",
          lineHeight: 0.9,
        }}
      >
        26
      </span>
    </div>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...base, padding: 140, paddingBottom: 168 }}>
    <style>{fontStyles}</style>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 42,
        maxWidth: 1420,
      }}
    >
      <Eyebrow>Visual language</Eyebrow>
      <Title>Clear type. Warm color.</Title>
      <p
        style={{
          maxWidth: 1240,
          margin: 0,
          color: colors.muted,
          fontSize: 38,
          lineHeight: 1.55,
        }}
      >
        Space Grotesk gives technical topics a strong headline. JetBrains Mono
        keeps labels, explanations, and examples direct and easy to scan.
      </p>
      <div
        style={{
          width: 520,
          height: 18,
          marginTop: 22,
          background: primaryGradient,
        }}
      />
    </div>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <div
    style={{
      ...base,
      padding: 140,
      paddingBottom: 168,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 36,
    }}
  >
    <style>{fontStyles}</style>
    <Eyebrow>Theme preview</Eyebrow>
    <Title>Room for the idea.</Title>
    <p
      style={{
        maxWidth: 1060,
        margin: 0,
        color: colors.muted,
        fontSize: 34,
        lineHeight: 1.55,
      }}
    >
      Use gradients to mark a page or section, then let one clear point lead the
      slide.
    </p>
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 24,
        height: "calc(100% - 68px)",
        background: alternateGradient,
      }}
    />
    <Footer />
  </div>
);

export default [Cover, Content, Closing] satisfies Page[];
