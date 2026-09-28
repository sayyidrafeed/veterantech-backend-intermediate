---
name: KSM Veterantech 2026
description: Warm technical editorial slides using the KSM palette, soft gradients, and geometric typography.
mode: light
---

# KSM Veterantech 2026

## Palette

| Role               | Value                                       | Notes                                               |
| ------------------ | ------------------------------------------- | --------------------------------------------------- |
| bg                 | `#f1eaea`                                   | Grey, the warm canvas background                    |
| text               | `#342c2a`                                   | Dark warm charcoal for readable copy                |
| accent             | `#c85864`                                   | Maroon for emphasis and key terms                   |
| muted              | `#745e5b`                                   | Secondary copy and labels                           |
| silk               | `#efcec0`                                   | Soft surface and subtle highlights                  |
| caramel            | `#f2b07c`                                   | First gradient endpoint                             |
| tangerine          | `#f1a17a`                                   | Alternate gradient endpoint                         |
| pink               | `#cd7986`                                   | Chosen from the HEX value in the supplied guideline |
| maroon             | `#c85864`                                   | Second endpoint for the alternate gradient          |
| gradient-primary   | `linear-gradient(110deg, #f2b07c, #cd7986)` | Caramel to Pink                                     |
| gradient-alternate | `linear-gradient(110deg, #f1a17a, #c85864)` | Tangerine to Maroon                                 |

The supplied guideline's Pink RGB value differs from its HEX value. This theme uses `#cd7986` as the token and treats the printed RGB value as a likely transcription error.

## Typography

- Display font: `"Space Grotesk", sans-serif` — 600–700 for titles.
- Body font: `"JetBrains Mono", monospace` — 400–500 for paragraphs, labels, and footer.
- Webfont import: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap`.
- Special font: `Pf Pixelscript Pro` is reserved for brief decorative accents. Its font file is not present in this workspace, so the demo uses the display font as a fallback.
- Type scale:
  - Hero title: 160 px.
  - Page heading: 76 px.
  - Body text: 34 px.
  - Caption and footer: 22 px.

## Layout

- Canvas: 1920 × 1080 landscape.
- Content padding: 120 px from the canvas edges.
- Alignment: left-aligned editorial grid with wide margins and short text blocks.
- Use one clear focal point per page. Reserve dense technical examples for their own pages.
- Include a visible Caramel-to-Pink or Tangerine-to-Maroon gradient on every page, as required by the supplied guideline.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 160,
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: "-0.045em",
      margin: 0,
      color: "#342c2a",
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()`.

```tsx
import { useSlidePageNumber } from "@open-slide/core";

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
        background: "linear-gradient(110deg, #f2b07c, #cd7986)",
        color: "#342c2a",
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
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      color: "#c85864",
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
```

## Motion

- Philosophy: subtle. Keep the presentation still by default, with short fades for section transitions only when they help the audience follow the topic.
- Reusable keyframes are intentionally omitted. Use the framework's default transition unless a deck brief calls for motion.

## Aesthetic

Warm technical editorial: generous warm-grey space, Space Grotesk titles, JetBrains Mono labels and copy, and a restrained gradient footer or color field on every page. Use the supplied Caramel-to-Pink and Tangerine-to-Maroon combinations. Keep technical explanations calm and legible; reserve Pf Pixelscript Pro for a small accent when its font file is available. Avoid dense decorative grids, excessive gradients, and dashboard-like card layouts.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#f1eaea",
      color: "#342c2a",
      padding: 120,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 28,
    }}
  >
    <Eyebrow>KSM Veterantech 2026</Eyebrow>
    <Title>Backend Intermediate</Title>
    <p
      style={{
        maxWidth: 1120,
        margin: 0,
        color: "#745e5b",
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 34,
        lineHeight: 1.5,
      }}
    >
      A reusable visual direction for technical learning materials.
    </p>
    <Footer />
  </div>
);
```
