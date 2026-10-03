---
name: KSM Consulting Organic
description: Argument-led analytical compositions with KSM Veterantech's warm visual identity.
mode: light
---

# KSM Consulting Organic

## Palette

| Role | Value | Usage |
| --- | --- | --- |
| bg | `#fffaf8` | Light, warm background that contrasts with gradient fields |
| grey | `#f1eaea` | KSM neutral available for supporting surfaces |
| text | `#241e1d` | Dark charcoal for text over the pink gradient |
| connector | `#342c2a` | Flow connectors |
| accent | `#c85864` | Borders around focal elements |
| pink | `#cd7986` | Separators between information groups |
| silk | `#efcec0` | Optional supporting highlight surface |
| muted | `#745e5b` | Divider lines and node borders |
| caramel | `#f2b07c` | Gradient starting color |

Use `linear-gradient(110deg, #f2b07c, #cd7986)` for the cover diagram panel, emphasized nodes, and the analysis takeaway. Headers use a gradient rule; footers retain an 8 px gradient line. This gives KSM color a visible role in the hierarchy. The `#fffaf8` background is an added neutral for this adaptation, not an official guideline color. Use pink and maroon for surfaces and borders rather than small text on light backgrounds. Keep text charcoal. Do not reuse the reference deck's green palette, logos, or visual assets.

## Typography

- Titles and narrative: `"Space Grotesk", Arial, sans-serif`, weights 400/500/600/700. Sans makes arguments and explanations easier to scan in analytical compositions.
- Code, technical labels, and footers: `"JetBrains Mono", Consolas, monospace`, weights 400/500. Mono distinguishes technical information from narrative.
- Rafee chose this adaptation: paragraphs use sans, departing from the KSM guideline's JetBrains Mono body font.
- Cover title 112 px; content title 60 px; column title 44 px; narrative 32 px; takeaway 36 px; captions/labels/footer 24 px.
- Title line-height: 1.12, with no more than two lines on content pages. Narrative: 1.35–1.45. Captions: 1.3–1.4.
- Stylesheet: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap`.
- The theme demo loads the stylesheet inline under OpenSlide's preview contract. For real decks, load it once in the document head using the idempotent loader in the `slide-authoring` webfonts reference. Fallbacks must remain readable offline; identical font metrics are not guaranteed.
- Use English throughout titles, narrative, diagram labels, captions, and examples. Keep wording concrete and direct.

## Layout

- Canvas: 1920 × 1080; horizontal margins: 100 px; minimum gutter: 40 px. Rounding a three-column layout may produce 41 px gutters.
- Content headers start at y=100. A section label precedes the title; a divider follows the title by 28 px. Body content starts at y=330–340 and ends before y=940 to leave room for the footer.
- Keep footers consistent across pages. Covers place the title on the left and the main visual on the right. Content pages use the content title scale rather than the cover scale.
- One main message per page, written as a sentence. Choose the visual after identifying the information relationship. Place evidence, sources, units, periods, and limitations next to claims when available.
- Use columns for comparisons, nodes and arrows for flows, and side panels for role explanations. Caramel–Pink gradients mark the focal object and shared takeaway; supporting nodes stay neutral. Applying gradients to every column removes the emphasis.
- SCQ: Situation → Complication → Question, with evidence in each relevant column and a question that connects them. Do not force SCQ onto a topic better explained by a flow.
- Comparison matrix: rows represent criteria; columns represent alternatives. State criteria, units, and the reason for emphasis. Color does not replace labels.
- Cause and effect: start with the problem, branch into causes, then show evidence. Arrows must express relationships; distinguish hypotheses from demonstrated causes.
- Roadmap: time on one axis, workstreams on the other. Distinguish plans from completed milestones. Do not invent deadlines, statuses, or KPIs.
- If text does not fit, shorten it or split the page. Do not reduce narrative below 32 px to imitate the PDF's density.

## Fixed components

Copy these constants before the components. The Title, Footer, Eyebrow, Canvas, and Header snippets match the demo exactly. The demo requires no external assets or helpers.

```tsx
import { type Page, useSlidePageNumber } from "@open-slide/core";
import type { ReactNode } from "react";

const displayFont = '"Space Grotesk", Arial, sans-serif';
const technicalFont = '"JetBrains Mono", Consolas, monospace';
const gradient = "linear-gradient(110deg, #f2b07c, #cd7986)";
const fontStyles = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');`;
```

### Title

```tsx
const Title = ({
  children,
  cover = false,
}: {
  children: ReactNode;
  cover?: boolean;
}) => (
  <h1
    style={{
      margin: 0,
      fontFamily: displayFont,
      fontSize: cover ? 112 : 60,
      fontWeight: 600,
      lineHeight: 1.12,
      letterSpacing: "-0.035em",
      color: "#241e1d",
    }}
  >
    {children}
  </h1>
);
```

### Footer

Page numbers come from the OpenSlide context rather than hardcoded values.

```tsx
const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        bottom: 38,
        borderTop: "1px solid #745e5b",
        paddingTop: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: technicalFont,
        fontSize: 24,
        color: "#241e1d",
      }}
    >
      <span>KSM Veterantech · Backend Intermediate</span>
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -38,
          height: 8,
          background: gradient,
        }}
      />
    </footer>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p
    style={{
      margin: 0,
      fontFamily: technicalFont,
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#241e1d",
    }}
  >
    {children}
  </p>
);
```

### Canvas and Header

Canvas includes the footer and preview fonts. Header provides the analytical page frame.

```tsx
const Canvas = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      background: "#fffaf8",
      color: "#241e1d",
      fontFamily: displayFont,
    }}
  >
    <style>{fontStyles}</style>
    {children}
    <Footer />
  </div>
);

const Header = ({
  section,
  children,
}: {
  section: string;
  children: ReactNode;
}) => (
  <header style={{ position: "absolute", left: 100, right: 100, top: 100 }}>
    <Eyebrow>{section}</Eyebrow>
    <div style={{ marginTop: 20, maxWidth: 1600 }}>
      <Title>{children}</Title>
    </div>
    <div style={{ height: 2, background: gradient, marginTop: 28 }} />
  </header>
);
```

## Motion

Static. Pages change without added animation. Position, labels, and connectors communicate information relationships. No loops, decorative reveals, or transitions are required to understand a page.

## Aesthetic

Analytical editorial with KSM identity: a light warm background, sans narrative, precise lines, and visible Caramel–Pink gradient fields at each page's focal point. The organic feel comes from compositions that follow the argument, not artificial irregularity. Advadev's hierarchy and varied compositions are the north star; this is neither a deck replica nor an approved official theme. Avoid uniform cards as a default, large shadows, decorative icons, and unsourced numbers. ENERGY 3 / RHYTHM 3 / MOTION 0: visible color, compositions that vary with content, fully static.

## Example usage

```tsx
const Content: Page = () => (
  <Canvas>
    <Header section="Architecture / Request path">
      A reverse proxy forwards requests to the application
    </Header>
    <p style={{ position: "absolute", left: 100, top: 340, width: 1100, margin: 0, fontSize: 32, lineHeight: 1.4 }}>
      The client contacts the reverse proxy. The application handles the forwarded request.
    </p>
  </Canvas>
);
```

Select `ksm-consulting-organic` when creating a deck through `create-slide`. For real decks, declare `design: DesignSystem` following the `slide-authoring` reference; use the palette and fonts above as initial values. The three-page demo shows a cover with a vertical flow, a three-column analysis, and an architecture diagram with role explanations. Backend examples illustrate concepts; they are not deployment results or performance benchmarks.
