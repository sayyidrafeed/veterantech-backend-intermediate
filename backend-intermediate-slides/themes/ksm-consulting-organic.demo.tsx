import { type Page, useSlidePageNumber } from "@open-slide/core";
import type { ReactNode } from "react";

const displayFont = '"Space Grotesk", Arial, sans-serif';
const technicalFont = '"JetBrains Mono", Consolas, monospace';
const gradient = "linear-gradient(110deg, #f2b07c, #cd7986)";
const fontStyles = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');`;

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

const Node = ({
  x,
  y,
  width = 250,
  title,
  detail,
  emphasis = false,
}: {
  x: number;
  y: number;
  width?: number;
  title: string;
  detail: string;
  emphasis?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height: 160,
      boxSizing: "border-box",
      padding: 24,
      background: emphasis ? gradient : "#fffaf8",
      border: emphasis ? "2px solid #c85864" : "2px solid #745e5b",
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 12,
    }}
  >
    <strong style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.15 }}>
      {title}
    </strong>
    <span style={{ fontFamily: technicalFont, fontSize: 24, lineHeight: 1.3 }}>
      {detail}
    </span>
  </div>
);

const Cover: Page = () => (
  <Canvas>
    <div style={{ position: "absolute", left: 100, top: 160, width: 980 }}>
      <Eyebrow>Backend Intermediate / Infrastructure</Eyebrow>
      <div style={{ marginTop: 52 }}>
        <Title cover>From API code to a running service</Title>
      </div>
      <p
        style={{
          fontSize: 32,
          lineHeight: 1.45,
          margin: "36px 0 0",
          maxWidth: 810,
        }}
      >
        Code handles requests. The runtime executes it. Infrastructure makes the
        service reachable.
      </p>
      <div
        style={{
          marginTop: 72,
          width: 790,
          paddingTop: 24,
          borderTop: "2px solid #745e5b",
        }}
      >
        <Eyebrow>The basic flow</Eyebrow>
        <p style={{ fontSize: 32, lineHeight: 1.35, margin: "12px 0 0" }}>
          Follow the journey of a single request.
        </p>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 1220,
        top: 160,
        width: 600,
        height: 710,
        background: gradient,
        borderRadius: 4,
      }}
    >
      <svg
        width="600"
        height="710"
        viewBox="0 0 600 710"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <defs>
          <marker
            id="ksm-cover-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path
              d="M0 0 L8 5 L0 10"
              fill="none"
              stroke="#342c2a"
              strokeWidth="1.5"
            />
          </marker>
        </defs>
        <path
          d="M300 170 V270 M300 430 V530"
          fill="none"
          stroke="#342c2a"
          strokeWidth="3"
          markerEnd="url(#ksm-cover-arrow)"
        />
      </svg>
      <Node x={100} y={10} width={400} title="Client" detail="Sends requests" />
      <Node
        x={100}
        y={270}
        width={400}
        title="API"
        detail="Handles requests"
        emphasis
      />
      <Node x={100} y={530} width={400} title="Database" detail="Stores data" />
      <span
        style={{
          position: "absolute",
          left: 328,
          top: 205,
          fontFamily: technicalFont,
          fontSize: 24,
        }}
      >
        HTTP
      </span>
      <span
        style={{
          position: "absolute",
          left: 328,
          top: 465,
          fontFamily: technicalFont,
          fontSize: 24,
        }}
      >
        Query
      </span>
    </div>
  </Canvas>
);

const AnalysisColumn = ({
  x,
  number,
  title,
  question,
  children,
}: {
  x: number;
  number: string;
  title: string;
  question: string;
  children: ReactNode;
}) => (
  <section
    style={{ position: "absolute", left: x, top: 330, width: 546, height: 390 }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 24,
        paddingBottom: 24,
        borderBottom: "3px solid #cd7986",
      }}
    >
      <span style={{ fontFamily: technicalFont, fontSize: 24 }}>{number}</span>
      <h2 style={{ margin: 0, fontSize: 44, fontWeight: 600 }}>{title}</h2>
    </div>
    <p
      style={{
        fontSize: 32,
        lineHeight: 1.35,
        fontWeight: 600,
        margin: "28px 0 24px",
      }}
    >
      {question}
    </p>
    <div style={{ fontSize: 32, lineHeight: 1.45 }}>{children}</div>
  </section>
);

const Analysis: Page = () => (
  <Canvas>
    <Header section="Analysis / Three layers">
      Running an API takes more than code
    </Header>
    <AnalysisColumn
      x={100}
      number="01"
      title="Code"
      question="What does the application do?"
    >
      <p style={{ margin: 0 }}>
        Routes, input validation, and business logic determine how requests are
        handled.
      </p>
      <p
        style={{ margin: "28px 0 0", fontFamily: technicalFont, fontSize: 24 }}
      >
        Example: Express handler
      </p>
    </AnalysisColumn>
    <AnalysisColumn
      x={687}
      number="02"
      title="Runtime"
      question="What executes the code?"
    >
      <p style={{ margin: 0 }}>
        A Node.js process runs the application with the dependencies and
        environment it needs.
      </p>
      <p
        style={{ margin: "28px 0 0", fontFamily: technicalFont, fontSize: 24 }}
      >
        Example: Node.js process
      </p>
    </AnalysisColumn>
    <AnalysisColumn
      x={1274}
      number="03"
      title="Infrastructure"
      question="How is the service reached?"
    >
      <p style={{ margin: 0 }}>
        Servers, networks, and a reverse proxy provide a path to the
        application.
      </p>
      <p
        style={{ margin: "28px 0 0", fontFamily: technicalFont, fontSize: 24 }}
      >
        Example: VPS + Nginx
      </p>
    </AnalysisColumn>
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        top: 794,
        padding: "28px 32px",
        background: gradient,
        borderTop: "3px solid #c85864",
      }}
    >
      <Eyebrow>Implication</Eyebrow>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 36,
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        When a service fails, trace the layers before changing the code.
      </p>
    </div>
  </Canvas>
);

const Role = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={{ padding: "22px 0", borderBottom: "1px solid #745e5b" }}>
    <h3 style={{ margin: 0, fontSize: 32, fontWeight: 600 }}>{title}</h3>
    <p style={{ margin: "10px 0 0", fontSize: 32, lineHeight: 1.35 }}>
      {children}
    </p>
  </div>
);

const Architecture: Page = () => (
  <Canvas>
    <Header section="Architecture / Request path">
      A reverse proxy forwards requests to the application
    </Header>
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 340,
        width: 1120,
        height: 570,
      }}
    >
      <Eyebrow>Request flow and data access</Eyebrow>
      <svg
        width="1120"
        height="400"
        viewBox="0 0 1120 400"
        aria-hidden="true"
        style={{ position: "absolute", top: 0 }}
      >
        <defs>
          <marker
            id="ksm-architecture-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path
              d="M0 0 L8 5 L0 10"
              fill="none"
              stroke="#342c2a"
              strokeWidth="1.5"
            />
          </marker>
        </defs>
        <path
          d="M250 230 H290 M560 230 H600 M830 230 H870"
          stroke="#342c2a"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#ksm-architecture-arrow)"
        />
      </svg>
      <Node x={0} y={150} title="Client" detail="Browser / app" />
      <Node
        x={290}
        y={150}
        width={270}
        title="Reverse proxy"
        detail="Nginx"
        emphasis
      />
      <Node x={600} y={150} width={230} title="API" detail="Node.js" />
      <Node x={870} y={150} title="Database" detail="Application data" />
      <span
        style={{
          position: "absolute",
          left: 80,
          top: 98,
          fontFamily: technicalFont,
          fontSize: 24,
        }}
      >
        HTTPS
      </span>
      <span
        style={{
          position: "absolute",
          left: 620,
          top: 98,
          fontFamily: technicalFont,
          fontSize: 24,
        }}
      >
        HTTP
      </span>
      <span
        style={{
          position: "absolute",
          left: 900,
          top: 98,
          fontFamily: technicalFont,
          fontSize: 24,
        }}
      >
        Query
      </span>
      <p
        style={{
          position: "absolute",
          left: 0,
          top: 360,
          margin: 0,
          maxWidth: 1040,
          fontSize: 32,
          lineHeight: 1.4,
        }}
      >
        The client contacts the reverse proxy. The application handles the
        forwarded request and accesses data as needed.
      </p>
      <p
        style={{
          position: "absolute",
          left: 0,
          top: 498,
          margin: 0,
          fontFamily: technicalFont,
          fontSize: 24,
          lineHeight: 1.4,
        }}
      >
        Simplified diagram; arrows show the inbound flow.
      </p>
    </div>
    <aside
      style={{
        position: "absolute",
        left: 1300,
        top: 340,
        width: 520,
        paddingLeft: 40,
        boxSizing: "border-box",
        borderLeft: "2px solid #cd7986",
      }}
    >
      <Eyebrow>The role of each layer</Eyebrow>
      <Role title="Reverse proxy">
        Accepts public connections and routes requests.
      </Role>
      <Role title="API">Handles validation and business logic.</Role>
      <Role title="Database">Stores and retrieves data.</Role>
    </aside>
  </Canvas>
);

export default [Cover, Analysis, Architecture] satisfies Page[];
