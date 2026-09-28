import closingGradient from "@assets/Veterantech-gradient-2.svg";
import coverGradient from "@assets/Veterantech-gradient-4.svg";
import brandMark from "@assets/Veterantech-white.svg";
import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  Step,
  Steps,
  useSlidePageNumber,
} from "@open-slide/core";
import type { CSSProperties, ReactNode } from "react";

const colors = {
  bg: "#f1eaea",
  text: "#342c2a",
  muted: "#745e5b",
  caramel: "#f2b07c",
  silk: "#efcec0",
  tangerine: "#f1a17a",
  pink: "#cd7986",
  maroon: "#c85864",
  white: "#fffaf8",
};

const primaryGradient = `linear-gradient(110deg, ${colors.caramel}, ${colors.pink})`;
const fontHref =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap";
const fontLinkId = "osd-webfont-pertemuan-02-docker";

if (typeof document !== "undefined") {
  let link = document.getElementById(fontLinkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = fontLinkId;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== fontHref) link.href = fontHref;
}

export const design: DesignSystem = {
  palette: { bg: colors.bg, text: colors.text, accent: colors.maroon },
  fonts: {
    display: '"Space Grotesk", sans-serif',
    body: '"JetBrains Mono", monospace',
  },
  typeScale: { hero: 160, body: 34 },
  radius: 12,
};

const base: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  background: "var(--osd-bg)",
  color: "var(--osd-text)",
  fontFamily: "var(--osd-font-body)",
  WebkitFontSmoothing: "antialiased",
};

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 64,
        padding: "0 120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: primaryGradient,
        color: colors.text,
        fontSize: 20,
        fontWeight: 500,
      }}
    >
      <span>KSM VETERANTECH 2026 · BACKEND INTERMEDIATE</span>
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
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Heading = ({
  children,
  size = 72,
}: {
  children: ReactNode;
  size?: number;
}) => (
  <h1
    style={{
      margin: 0,
      maxWidth: 1460,
      color: colors.text,
      fontFamily: "var(--osd-font-display)",
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: "-0.04em",
    }}
  >
    {children}
  </h1>
);

const Shell = ({ children }: { children: ReactNode }) => (
  <div style={{ ...base, padding: "100px 120px 112px" }}>
    {children}
    <Footer />
  </div>
);

const Label = ({ children }: { children: ReactNode }) => (
  <span style={{ color: colors.maroon, fontSize: 24, fontWeight: 700 }}>
    {children}
  </span>
);

const Body = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <p
    style={{
      margin: 0,
      color: colors.muted,
      fontSize: 32,
      lineHeight: 1.48,
      ...style,
    }}
  >
    {children}
  </p>
);

const Code = ({
  children,
  size = 26,
}: {
  children: ReactNode;
  size?: number;
}) => (
  <pre
    style={{
      margin: 0,
      padding: "28px 32px",
      background: colors.text,
      color: colors.white,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: size,
      lineHeight: 1.55,
      whiteSpace: "pre-wrap",
      overflowWrap: "anywhere",
    }}
  >
    <code>{children}</code>
  </pre>
);

const Row = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 28, ...style }}>
    {children}
  </div>
);

const DiagramBox = ({
  title,
  detail,
  tone = colors.white,
}: {
  title: ReactNode;
  detail?: ReactNode;
  tone?: string;
}) => {
  const foreground = tone === colors.text ? colors.white : colors.text;
  const secondary = tone === colors.text ? colors.silk : colors.muted;
  return (
    <div
      style={{
        minHeight: 92,
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
        background: tone,
        border: `2px solid ${colors.text}`,
        color: foreground,
      }}
    >
      <strong
        style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 27 }}
      >
        {title}
      </strong>
      {detail && (
        <span style={{ color: secondary, fontSize: 21, lineHeight: 1.35 }}>
          {detail}
        </span>
      )}
    </div>
  );
};

const FlowArrow = ({
  label,
  bidirectional = false,
}: {
  label?: ReactNode;
  bidirectional?: boolean;
}) => (
  <div
    style={{
      minWidth: 94,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      color: colors.maroon,
      fontSize: 19,
      fontWeight: 700,
      textAlign: "center",
    }}
  >
    {label && <span>{label}</span>}
    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      {bidirectional && (
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: `14px solid ${colors.maroon}`,
          }}
        />
      )}
      <div style={{ flex: 1, height: 3, background: colors.maroon }} />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderLeft: `14px solid ${colors.maroon}`,
        }}
      />
    </div>
  </div>
);

const SvgNode = ({
  x,
  y,
  width,
  height,
  title,
  detail,
  tone = colors.white,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail?: string;
  tone?: string;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={12}
      fill={tone}
      stroke={colors.text}
      strokeWidth={2}
    />
    <text
      x={x + 18}
      y={y + (detail ? 40 : height / 2 + 9)}
      fill={colors.text}
      fontFamily={'"Space Grotesk", sans-serif'}
      fontSize={25}
      fontWeight={700}
    >
      {title}
    </text>
    {detail && (
      <text
        x={x + 18}
        y={y + 70}
        fill={colors.muted}
        fontFamily={'"JetBrains Mono", monospace'}
        fontSize={19}
      >
        {detail}
      </text>
    )}
  </g>
);

const RouteStroke = ({ d }: { d: string }) => (
  <path
    d={d}
    fill="none"
    stroke={colors.maroon}
    strokeWidth={6}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const Cover: Page = () => (
  <div
    style={{ ...base, display: "grid", gridTemplateColumns: "1.25fr 0.75fr" }}
  >
    <div
      style={{
        padding: "128px 80px 128px 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <Eyebrow>Meeting 02 · Backend Intermediate</Eyebrow>
      <Heading size={142}>Docker &amp; Container</Heading>
      <Body style={{ maxWidth: 950, fontSize: 34 }}>
        Menjalankan API dalam lingkungan yang bisa dibangun dan dijalankan
        ulang.
      </Body>
    </div>
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "130px 110px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <img
        src={coverGradient}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <img
        src={brandMark}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 118,
          left: 110,
          width: 88,
          height: 82,
          objectFit: "contain",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color: colors.text,
          fontFamily: "var(--osd-font-display)",
          fontSize: 260,
          fontWeight: 700,
          lineHeight: 0.85,
          letterSpacing: "-0.09em",
        }}
      >
        02
      </span>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 34,
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.55,
        }}
      >
        IMAGE
        <br />
        CONTAINER
        <br />
        PORT
      </div>
    </div>
    <Footer />
  </div>
);

const LearningPath: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <Eyebrow>Session Goals</Eyebrow>
      <Heading>API yang sama, cara jalan yang lebih konsisten</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 70,
          marginTop: 18,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Label>By the End of This Session</Label>
          <Body>Menjelaskan image, container, dan alur kerja Docker.</Body>
          <Body>
            Membangun image API lalu menjalankannya dengan port dan env.
          </Body>
        </div>
        <div
          style={{ paddingLeft: 48, borderLeft: `3px solid ${colors.pink}` }}
        >
          <Label>Quick Recall</Label>
          <Body style={{ marginTop: 20 }}>
            API yang pernah dibuat butuh runtime, dependency, konfigurasi, dan
            port.
          </Body>
          <Body style={{ marginTop: 18 }}>
            Bagian mana yang paling sering bikin setup beda?
          </Body>
        </div>
      </div>
    </div>
  </Shell>
);

const WhyContainers: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
      <Eyebrow>The Problem</Eyebrow>
      <Heading>“Di laptop gue jalan”</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 80,
          marginTop: 18,
        }}
      >
        <Body style={{ fontSize: 36 }}>
          API bergantung pada runtime, package, konfigurasi, dan cara prosesnya
          dimulai.
        </Body>
        <div
          style={{ borderTop: `4px solid ${colors.maroon}`, paddingTop: 24 }}
        >
          <Label>Docker Packages</Label>
          <Body style={{ marginTop: 14 }}>
            instruksi aplikasi dan dependency ke image, lalu menjalankan image
            sebagai container.
          </Body>
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 26, color: colors.muted }}>
        Hasilnya: langkah menjalankan aplikasi lebih mudah diulang di mesin
        lain.
      </div>
    </div>
  </Shell>
);

const VmVsContainer: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
      <Eyebrow>Containerization</Eyebrow>
      <Heading>VM dan container berbagi hardware dengan cara berbeda</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 62,
          marginTop: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Label>Virtual machines</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }}
          >
            <DiagramBox title="App A" detail="Guest OS" tone={colors.silk} />
            <DiagramBox title="App B" detail="Guest OS" tone={colors.silk} />
            <DiagramBox title="App C" detail="Guest OS" tone={colors.silk} />
          </div>
          <DiagramBox title="Hypervisor" tone={colors.pink} />
          <DiagramBox
            title="Hardware"
            tone={colors.text}
            detail="CPU · memory · storage"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Label>Containers</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }}
          >
            <DiagramBox title="App A" detail="Runtime + libs" />
            <DiagramBox title="App B" detail="Runtime + libs" />
            <DiagramBox title="App C" detail="Runtime + libs" />
          </div>
          <DiagramBox title="Container runtime" tone={colors.pink} />
          <DiagramBox title="Host OS" tone={colors.silk} />
          <DiagramBox
            title="Hardware"
            tone={colors.text}
            detail="CPU · memory · storage"
          />
        </div>
      </div>
      <Body style={{ fontSize: 28 }}>
        Tiap VM membawa Guest OS. Container berbagi kernel dari Host OS.
      </Body>
    </div>
  </Shell>
);

const Architecture: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Eyebrow>Docker Engine</Eyebrow>
      <Heading>CLI, daemon, host, dan registry punya peran berbeda</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.65fr 0.25fr 1.8fr 0.25fr 0.7fr",
          gap: 20,
          alignItems: "stretch",
          marginTop: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Label>CLIENT</Label>
          <DiagramBox
            title="Docker CLI"
            detail="build · pull · run"
            tone={colors.silk}
          />
          <div style={{ fontSize: 21, color: colors.muted }}>
            Perintah dari terminal
          </div>
        </div>
        <FlowArrow label="Docker API" />
        <div
          style={{
            padding: 22,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
            background: "rgba(239, 206, 192, 0.38)",
            border: `2px solid ${colors.pink}`,
          }}
        >
          <Label>DOCKER HOST</Label>
          <DiagramBox
            title="Docker daemon"
            detail="receives and executes API requests"
            tone={colors.white}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            <DiagramBox
              title="Images"
              detail="local templates"
              tone={colors.silk}
            />
            <DiagramBox
              title="Containers"
              detail="running processes"
              tone={colors.pink}
            />
          </div>
          <div style={{ fontSize: 21, color: colors.muted }}>
            CLI berkomunikasi dengan daemon lewat Docker API.
          </div>
        </div>
        <FlowArrow label="pull / push" bidirectional />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Label>REGISTRY</Label>
          <DiagramBox
            title="Image store"
            detail="pull untuk mengambil · push untuk membagikan"
          />
          <div style={{ fontSize: 21, color: colors.muted }}>
            Contoh: Docker Hub
          </div>
        </div>
      </div>
      <Steps>
        <Step>
          <Body style={{ fontSize: 26 }}>
            CLI meminta daemon membuat container dari image.
          </Body>
        </Step>
        <Step>
          <Body style={{ fontSize: 26 }}>
            Jika image belum ada di host, daemon dapat mengambilnya dari
            registry.
          </Body>
        </Step>
      </Steps>
    </div>
  </Shell>
);

const ImageContainer: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <Eyebrow>Core Concepts</Eyebrow>
      <Heading>Satu image bisa menjalankan banyak container</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.85fr 0.85fr 1.3fr",
          alignItems: "center",
          gap: 24,
          marginTop: 28,
        }}
      >
        <DiagramBox
          title="Registry"
          detail="image disimpan dan dibagikan"
          tone={colors.silk}
        />
        <FlowArrow label="docker pull" />
        <DiagramBox
          title="Image · api-kelas:1.0"
          detail="paket aplikasi yang siap dijalankan"
          tone={colors.pink}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          gap: 22,
          marginTop: 4,
        }}
      >
        <div />
        <FlowArrow label="docker run" />
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <DiagramBox title="Container 1" detail="proses berjalan" />
          <DiagramBox title="Container 2" detail="proses berjalan" />
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          paddingTop: 18,
          borderTop: `2px solid ${colors.silk}`,
        }}
      >
        <Body style={{ fontSize: 26 }}>
          Registry menyimpan image. Docker host memakai image untuk membuat
          container.
        </Body>
      </div>
    </div>
  </Shell>
);

const CliFlow: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <Eyebrow>Docker CLI</Eyebrow>
      <Heading>Perintah dasar mengikuti siklus container</Heading>
      <Steps>
        <Step>
          <Code>docker pull nginx:alpine</Code>
        </Step>
        <Step>
          <Code>docker run -d --name web-demo nginx:alpine</Code>
        </Step>
        <Step>
          <Code>
            docker ps
            <br />
            docker logs web-demo
          </Code>
        </Step>
        <Step>
          <Code>
            docker stop web-demo
            <br />
            docker rm web-demo
          </Code>
        </Step>
      </Steps>
      <Body style={{ fontSize: 26 }}>
        Untuk melihat resource lain: docker image ls, docker volume ls, docker
        network ls.
      </Body>
    </div>
  </Shell>
);

const DockerRunJourney: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Eyebrow>Docker Run · Runtime Flow</Eyebrow>
      <Heading size={68}>Perjalanan satu perintah docker run</Heading>
      <Code size={21}>
        docker run -d --name api-kelas -p 8080:3000 api-kelas:1.0
      </Code>
      <div style={{ position: "relative", width: "100%", height: 475 }}>
        <svg
          viewBox="0 0 1600 420"
          style={{ width: "100%", height: 420, overflow: "visible" }}
        >
          <title>Perjalanan perintah docker run</title>
          <desc>
            Docker CLI mengirim request ke daemon, yang memakai image lokal atau
            registry untuk memulai container dan meneruskan port ke browser.
          </desc>
          <rect
            x={258}
            y={64}
            width={904}
            height={330}
            rx={16}
            fill="rgba(239, 206, 192, 0.24)"
            stroke={colors.pink}
            strokeWidth={3}
          />
          <text
            x={282}
            y={98}
            fill={colors.maroon}
            fontFamily={'"JetBrains Mono", monospace'}
            fontSize={19}
            fontWeight={700}
            letterSpacing={2}
          >
            DOCKER HOST
          </text>

          <path d="M220 202 H300" stroke={colors.silk} strokeWidth={6} />
          <polygon points="300,202 284,193 284,211" fill={colors.silk} />
          <path d="M520 202 H570" stroke={colors.silk} strokeWidth={6} />
          <polygon points="570,202 554,193 554,211" fill={colors.silk} />
          <path d="M755 202 H815" stroke={colors.silk} strokeWidth={6} />
          <polygon points="815,202 799,193 799,211" fill={colors.silk} />
          <path
            d="M420 155 C580 54 1065 54 1300 130"
            fill="none"
            stroke={colors.silk}
            strokeWidth={6}
          />
          <polygon points="1300,130 1281,122 1287,140" fill={colors.silk} />
          <path d="M927 244 V286" stroke={colors.silk} strokeWidth={6} />
          <polygon points="927,286 918,270 936,270" fill={colors.silk} />
          <path d="M1038 328 H1300" stroke={colors.silk} strokeWidth={6} />
          <polygon points="1300,328 1284,319 1284,337" fill={colors.silk} />

          <text
            x={533}
            y={139}
            fill={colors.muted}
            fontSize={18}
            textAnchor="middle"
          >
            cek image
          </text>
          <text
            x={895}
            y={47}
            fill={colors.muted}
            fontSize={18}
            textAnchor="middle"
          >
            jika belum ada: pull
          </text>
          <text
            x={1050}
            y={316}
            fill={colors.muted}
            fontSize={18}
            textAnchor="middle"
          >
            publish port
          </text>

          <SvgNode
            x={18}
            y={157}
            width={202}
            height={90}
            title="Docker CLI"
            detail="kirim request"
            tone={colors.silk}
          />
          <SvgNode
            x={300}
            y={155}
            width={220}
            height={94}
            title="Docker daemon"
            detail="menjalankan instruksi"
          />
          <SvgNode
            x={570}
            y={155}
            width={185}
            height={94}
            title="Image lokal"
            detail="api-kelas:1.0"
            tone={colors.silk}
          />
          <SvgNode
            x={815}
            y={155}
            width={223}
            height={90}
            title="Container"
            detail="aplikasi :3000"
            tone={colors.pink}
          />
          <SvgNode
            x={819}
            y={286}
            width={219}
            height={84}
            title="Host :8080"
            detail="-p 8080:3000"
            tone={colors.white}
          />
          <SvgNode
            x={1300}
            y={83}
            width={238}
            height={94}
            title="Registry"
            detail="Docker Hub"
            tone={colors.silk}
          />
          <SvgNode
            x={1300}
            y={281}
            width={238}
            height={94}
            title="Browser"
            detail="localhost:8080"
            tone={colors.white}
          />
        </svg>
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
            marginTop: 7,
          }}
        >
          <Steps>
            <Step duration={320}>
              <>
                <svg
                  viewBox="0 0 1600 420"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: -427,
                    width: "100%",
                    height: 420,
                    pointerEvents: "none",
                  }}
                >
                  <RouteStroke d="M220 202 H300" />
                </svg>
                <div
                  style={{
                    paddingTop: 8,
                    borderTop: `3px solid ${colors.maroon}`,
                  }}
                >
                  <Label>CLI → daemon</Label>
                  <Body style={{ marginTop: 5, fontSize: 19 }}>
                    Docker menerima request.
                  </Body>
                </div>
              </>
            </Step>
            <Step duration={320}>
              <>
                <svg
                  viewBox="0 0 1600 420"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: -427,
                    width: "100%",
                    height: 420,
                    pointerEvents: "none",
                  }}
                >
                  <RouteStroke d="M520 202 H570" />
                  <RouteStroke d="M420 155 C580 54 1065 54 1300 130" />
                </svg>
                <div
                  style={{
                    paddingTop: 8,
                    borderTop: `3px solid ${colors.maroon}`,
                  }}
                >
                  <Label>Image Check</Label>
                  <Body style={{ marginTop: 5, fontSize: 19 }}>
                    Unduh dari registry bila belum ada.
                  </Body>
                </div>
              </>
            </Step>
            <Step duration={320}>
              <>
                <svg
                  viewBox="0 0 1600 420"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: -427,
                    width: "100%",
                    height: 420,
                    pointerEvents: "none",
                  }}
                >
                  <RouteStroke d="M755 202 H815" />
                </svg>
                <div
                  style={{
                    paddingTop: 8,
                    borderTop: `3px solid ${colors.maroon}`,
                  }}
                >
                  <Label>Start the Container</Label>
                  <Body style={{ marginTop: 5, fontSize: 19 }}>
                    Proses aplikasi listen di :3000.
                  </Body>
                </div>
              </>
            </Step>
            <Step duration={320}>
              <>
                <svg
                  viewBox="0 0 1600 420"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: -427,
                    width: "100%",
                    height: 420,
                    pointerEvents: "none",
                  }}
                >
                  <RouteStroke d="M927 245 V286" />
                  <RouteStroke d="M1038 328 H1300" />
                </svg>
                <div
                  style={{
                    paddingTop: 8,
                    borderTop: `3px solid ${colors.maroon}`,
                  }}
                >
                  <Label>Publish the Port</Label>
                  <Body style={{ marginTop: 5, fontSize: 19 }}>
                    Browser membuka localhost:8080.
                  </Body>
                </div>
              </>
            </Step>
          </Steps>
        </div>
      </div>
    </div>
  </Shell>
);

const PortMapping: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <Eyebrow>Port mapping</Eyebrow>
      <Heading>Port host diteruskan ke port aplikasi</Heading>
      <Body style={{ maxWidth: 1300 }}>
        API mendengarkan di port 3000 dalam container. Browser mengakses port
        8080 di laptop.
      </Body>
      <Steps>
        <Step>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 0.5fr 2fr",
              alignItems: "center",
              gap: 18,
              marginTop: 14,
            }}
          >
            <DiagramBox
              title="Browser"
              detail="localhost:8080"
              tone={colors.silk}
            />
            <FlowArrow label="request" />
            <div
              style={{
                padding: 20,
                border: `2px solid ${colors.maroon}`,
                background: "rgba(239, 206, 192, 0.24)",
              }}
            >
              <Label>HOST MACHINE</Label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 94px 1fr",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 14,
                }}
              >
                <DiagramBox title="Host port 8080" detail="published" />
                <FlowArrow label="-p" />
                <DiagramBox
                  title="Container port 3000"
                  detail="API listens here"
                  tone={colors.pink}
                />
              </div>
            </div>
          </div>
        </Step>
      </Steps>
      <Code size={24}>docker run -p 8080:3000 api-kelas:1.0</Code>
      <Body style={{ fontSize: 26 }}>
        Formatnya: -p PORT_HOST:PORT_CONTAINER
      </Body>
    </div>
  </Shell>
);

const DockerfilePage: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Eyebrow>Dockerfile</Eyebrow>
      <Heading>Instruksi untuk membangun image</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.12fr 0.88fr",
          gap: 52,
          marginTop: 8,
        }}
      >
        <Code size={24}>{`FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`}</Code>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Body>Setiap baris mendeskripsikan satu langkah build.</Body>
          <Body>EXPOSE mendokumentasikan port aplikasi.</Body>
          <Body>
            Port baru bisa diakses host saat container dijalankan dengan -p.
          </Body>
        </div>
      </div>
      <div style={{ fontSize: 24, color: colors.maroon, fontWeight: 600 }}>
        Contoh Node.js dengan package-lock.json. Simpan sebagai Dockerfile di
        root proyek.
      </div>
    </div>
  </Shell>
);

const DockerfileLifecycle: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
      <Eyebrow>Dockerfile · Build and Runtime</Eyebrow>
      <Heading>RUN bekerja saat build, CMD saat container dimulai</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.42fr 1fr 0.42fr 1fr",
          alignItems: "center",
          gap: 10,
          marginTop: 26,
        }}
      >
        <DiagramBox
          title="Dockerfile"
          detail={
            <>
              FROM · COPY
              <br />
              RUN npm ci
            </>
          }
          tone={colors.silk}
        />
        <FlowArrow label="docker build" />
        <DiagramBox
          title="Image"
          detail="app + dependency"
          tone={colors.pink}
        />
        <FlowArrow label="docker run" />
        <DiagramBox
          title="Container"
          detail={
            <>
              CMD npm start
              <br />
              proses berjalan
            </>
          }
        />
      </div>
      <Steps>
        <Step>
          <Body style={{ fontSize: 27 }}>
            RUN menyimpan hasil perintah build ke layer image.
          </Body>
        </Step>
        <Step>
          <Body style={{ fontSize: 27 }}>
            CMD menentukan proses utama saat container mulai berjalan.
          </Body>
        </Step>
      </Steps>
      <Code size={24}>{'RUN npm ci --omit=dev\nCMD ["npm", "start"]'}</Code>
    </div>
  </Shell>
);

const BuildContext: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Eyebrow>Build context</Eyebrow>
      <Heading>Docker hanya menerima file yang masuk build context</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.55fr 1.1fr",
          alignItems: "center",
          gap: 18,
          marginTop: 16,
        }}
      >
        <div
          style={{
            padding: 22,
            border: `2px solid ${colors.text}`,
            background: colors.white,
          }}
        >
          <Label>PROJECT FOLDER</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 16,
            }}
          >
            <DiagramBox title="Dockerfile" />
            <DiagramBox title="src/" />
            <DiagramBox title="package.json" />
            <DiagramBox title="node_modules/" tone={colors.silk} />
            <DiagramBox title=".env" tone={colors.silk} />
          </div>
        </div>
        <FlowArrow label="docker build ." />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <DiagramBox
            title="Build context"
            detail="file yang dapat dipakai COPY"
            tone={colors.pink}
          />
          <DiagramBox
            title=".dockerignore"
            detail="singkirkan node_modules/ dan .env"
            tone={colors.silk}
          />
        </div>
      </div>
      <Code size={24}>{"node_modules\n.env\n.git"}</Code>
      <Body style={{ fontSize: 25 }}>
        Simpan aturan tersebut di .dockerignore pada root build context.
      </Body>
    </div>
  </Shell>
);

const BuildPipeline: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Eyebrow>Image Build · Context to Container</Eyebrow>
      <Heading size={68}>Dari build context jadi image</Heading>
      <Code size={21}>docker build -t api-kelas:1.0 .</Code>
      <svg viewBox="0 0 1600 470" style={{ width: "100%", height: 450 }}>
        <title>Dari build context menjadi image</title>
        <desc>
          File proyek disaring oleh dockerignore, diproses oleh instruksi
          Dockerfile menjadi image berlapis, lalu dijalankan sebagai container.
        </desc>
        <path d="M337 220 H435" stroke={colors.silk} strokeWidth={7} />
        <polygon points="435,220 417,210 417,230" fill={colors.silk} />
        <path d="M675 220 H745" stroke={colors.silk} strokeWidth={7} />
        <polygon points="745,220 727,210 727,230" fill={colors.silk} />
        <path d="M1085 220 H1150" stroke={colors.silk} strokeWidth={7} />
        <polygon points="1150,220 1132,210 1132,230" fill={colors.silk} />
        <path d="M1370 220 H1420" stroke={colors.silk} strokeWidth={7} />
        <polygon points="1420,220 1402,210 1402,230" fill={colors.silk} />

        <text
          x={18}
          y={62}
          fill={colors.maroon}
          fontSize={20}
          fontWeight={700}
          letterSpacing={2}
        >
          PROJECT FOLDER
        </text>
        <path
          d="M18 82 H337 V382 H18 Z"
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={2}
        />
        <text
          x={40}
          y={124}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={21}
        >
          package.json
        </text>
        <text
          x={40}
          y={170}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={21}
        >
          package-lock.json
        </text>
        <text
          x={40}
          y={216}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={21}
        >
          src/
        </text>
        <text
          x={40}
          y={262}
          fill={colors.muted}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={21}
        >
          node_modules/
        </text>
        <path d="M38 249 L191 270" stroke={colors.maroon} strokeWidth={3} />
        <text
          x={40}
          y={309}
          fill={colors.muted}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={21}
        >
          .env
        </text>
        <path d="M38 296 L100 318" stroke={colors.maroon} strokeWidth={3} />
        <text x={40} y={340} fill={colors.maroon} fontSize={19}>
          .dockerignore
        </text>
        <text x={40} y={365} fill={colors.maroon} fontSize={19}>
          filters local files
        </text>

        <rect
          x={435}
          y={105}
          width={240}
          height={230}
          rx={12}
          fill="rgba(239, 206, 192, 0.3)"
          stroke={colors.pink}
          strokeWidth={3}
        />
        <text
          x={455}
          y={142}
          fill={colors.maroon}
          fontSize={18}
          fontWeight={700}
          letterSpacing={1}
        >
          BUILD CONTEXT
        </text>
        <text
          x={455}
          y={194}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={18}
        >
          package files
        </text>
        <text
          x={455}
          y={230}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={18}
        >
          src/
        </text>
        <text x={455} y={282} fill={colors.muted} fontSize={19}>
          hanya file yang dikirim
        </text>
        <text x={455} y={308} fill={colors.muted} fontSize={19}>
          untuk proses build
        </text>

        <rect
          x={745}
          y={76}
          width={340}
          height={304}
          rx={12}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={2}
        />
        <text
          x={770}
          y={111}
          fill={colors.maroon}
          fontSize={18}
          fontWeight={700}
          letterSpacing={1}
        >
          DOCKERFILE · BUILD
        </text>
        <rect
          x={770}
          y={132}
          width={290}
          height={42}
          rx={7}
          fill={colors.silk}
        />
        <text
          x={788}
          y={160}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={20}
          fontWeight={700}
        >
          FROM node:lts-alpine
        </text>
        <rect
          x={770}
          y={180}
          width={290}
          height={42}
          rx={7}
          fill={colors.silk}
        />
        <text
          x={788}
          y={208}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={20}
          fontWeight={700}
        >
          COPY package*.json
        </text>
        <rect
          x={770}
          y={228}
          width={290}
          height={42}
          rx={7}
          fill={colors.pink}
        />
        <text
          x={788}
          y={256}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={20}
          fontWeight={700}
        >
          RUN npm ci
        </text>
        <rect
          x={770}
          y={276}
          width={290}
          height={42}
          rx={7}
          fill={colors.silk}
        />
        <text
          x={788}
          y={304}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={20}
          fontWeight={700}
        >
          COPY . .
        </text>
        <text x={788} y={355} fill={colors.muted} fontSize={19}>
          instruksi build membentuk layer
        </text>

        <text
          x={1150}
          y={62}
          fill={colors.maroon}
          fontSize={20}
          fontWeight={700}
          letterSpacing={2}
        >
          IMAGE · API-KELAS:1.0
        </text>
        <rect
          x={1150}
          y={96}
          width={220}
          height={70}
          rx={8}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={2}
        />
        <text
          x={1170}
          y={139}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={19}
        >
          app source
        </text>
        <rect
          x={1164}
          y={174}
          width={206}
          height={70}
          rx={8}
          fill={colors.pink}
          stroke={colors.text}
          strokeWidth={2}
        />
        <text
          x={1184}
          y={217}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={19}
        >
          dependencies
        </text>
        <rect
          x={1178}
          y={252}
          width={192}
          height={70}
          rx={8}
          fill={colors.silk}
          stroke={colors.text}
          strokeWidth={2}
        />
        <text
          x={1198}
          y={295}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={19}
        >
          base image
        </text>

        <rect
          x={1420}
          y={170}
          width={170}
          height={100}
          rx={12}
          fill={colors.pink}
          stroke={colors.text}
          strokeWidth={2}
        />
        <text
          x={1440}
          y={211}
          fill={colors.text}
          fontFamily={'"Space Grotesk", sans-serif'}
          fontSize={23}
          fontWeight={700}
        >
          Container
        </text>
        <text
          x={1440}
          y={242}
          fill={colors.text}
          fontFamily={'"JetBrains Mono", monospace'}
          fontSize={18}
        >
          CMD npm start
        </text>
        <text x={770} y={408} fill={colors.muted} fontSize={18}>
          Saat `docker run`, image menjadi container dan CMD memulai proses
          utama.
        </text>
      </svg>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: -8,
        }}
      >
        <Steps>
          <Step duration={340}>
            <>
              <svg
                viewBox="0 0 1600 470"
                style={{
                  position: "absolute",
                  left: 0,
                  top: -442,
                  width: "100%",
                  height: 450,
                  pointerEvents: "none",
                }}
              >
                <RouteStroke d="M337 220 H435" />
              </svg>
              <Body
                style={{
                  paddingTop: 8,
                  borderTop: `3px solid ${colors.maroon}`,
                  fontSize: 20,
                }}
              >
                Titik `.` mengirim folder aktif sebagai build context.
              </Body>
            </>
          </Step>
          <Step duration={340}>
            <>
              <svg
                viewBox="0 0 1600 470"
                style={{
                  position: "absolute",
                  left: 0,
                  top: -442,
                  width: "100%",
                  height: 450,
                  pointerEvents: "none",
                }}
              >
                <RouteStroke d="M675 220 H745" />
                <RouteStroke d="M1085 220 H1150" />
              </svg>
              <Body
                style={{
                  paddingTop: 8,
                  borderTop: `3px solid ${colors.maroon}`,
                  fontSize: 20,
                }}
              >
                `RUN` berjalan saat build dan hasilnya masuk ke image.
              </Body>
            </>
          </Step>
          <Step duration={340}>
            <>
              <svg
                viewBox="0 0 1600 470"
                style={{
                  position: "absolute",
                  left: 0,
                  top: -442,
                  width: "100%",
                  height: 450,
                  pointerEvents: "none",
                }}
              >
                <RouteStroke d="M1370 220 H1420" />
              </svg>
              <Body
                style={{
                  paddingTop: 8,
                  borderTop: `3px solid ${colors.maroon}`,
                  fontSize: 20,
                }}
              >
                `CMD` berjalan saat image dimulai sebagai container.
              </Body>
            </>
          </Step>
        </Steps>
      </div>
    </div>
  </Shell>
);

const BuildRun: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <Eyebrow>Build and Run</Eyebrow>
      <Heading>Build menghasilkan image, run membuat container</Heading>
      <Steps>
        <Step>
          <Code>docker build -t api-kelas:1.0 .</Code>
        </Step>
        <Step>
          <Code>docker run --name api-kelas -p 8080:3000 api-kelas:1.0</Code>
        </Step>
        <Step>
          <Code>
            docker ps
            <br />
            docker logs api-kelas
          </Code>
        </Step>
      </Steps>
      <Body style={{ fontSize: 26 }}>
        Titik (.) berarti Docker memakai folder saat ini sebagai build context.
      </Body>
    </div>
  </Shell>
);

const Environment: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <Eyebrow>Environment variables</Eyebrow>
      <Heading>Konfigurasi masuk saat container dijalankan</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          marginTop: 14,
        }}
      >
        <div>
          <Code size={24}>
            docker run -p 8080:3000 {"\\"}
            <br />
            {"  -e PORT=3000 \\"}
            <br />
            {"  api-kelas:1.0"}
          </Code>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Body>Image tetap sama; nilai env dapat berbeda per lingkungan.</Body>
          <Body>
            Jangan masukkan password atau API key ke dalam Dockerfile atau
            image.
          </Body>
          <Body>File .env lokal jangan ikut tersalin ke image.</Body>
        </div>
      </div>
      <Body style={{ marginTop: 4, fontSize: 25 }}>
        Tambahkan aturan .dockerignore untuk file lokal sensitif.
      </Body>
    </div>
  </Shell>
);

const HandsOn: Page = () => (
  <Shell>
    <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
      <Eyebrow>Quick Exercise</Eyebrow>
      <Heading>API tidak bisa dibuka dari browser</Heading>
      <Body>Container berstatus running. Aplikasi listen di port 3000.</Body>
      <Steps>
        <Step>
          <Body>Cek port mapping pada perintah docker run.</Body>
        </Step>
        <Step>
          <Body>Cek log aplikasi dengan docker logs.</Body>
        </Step>
        <Step>
          <Body>Pastikan aplikasi listen di 0.0.0.0 dalam container.</Body>
        </Step>
      </Steps>
      <div
        style={{
          marginTop: 6,
          paddingTop: 22,
          borderTop: `2px solid ${colors.silk}`,
        }}
      >
        <Label>Discussion Question</Label>
        <Body style={{ marginTop: 10 }}>
          Apa beda port host dengan port container?
        </Body>
      </div>
    </div>
  </Shell>
);

const WrapUp: Page = () => (
  <Shell>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: 54,
        alignItems: "stretch",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <Eyebrow>Wrap-up</Eyebrow>
        <Heading>Alur kerja Docker untuk satu API</Heading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 16,
          }}
        >
          <Row>
            <Label>01</Label>
            <Body>Tulis Dockerfile</Body>
          </Row>
          <Row>
            <Label>02</Label>
            <Body>Build image</Body>
          </Row>
          <Row>
            <Label>03</Label>
            <Body>Run container</Body>
          </Row>
          <Row>
            <Label>04</Label>
            <Body>Cek port dan log</Body>
          </Row>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          minHeight: 820,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 48,
          background: colors.tangerine,
        }}
      >
        <img
          src={closingGradient}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <img
          src={brandMark}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 46,
            right: 42,
            width: 76,
            height: 72,
            objectFit: "contain",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, color: colors.text }}>
          <Label>Next Meeting</Label>
          <div
            style={{
              marginTop: 16,
              fontFamily: "var(--osd-font-display)",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Docker
            <br />
            Compose
          </div>
          <div style={{ marginTop: 24, fontSize: 24, lineHeight: 1.5 }}>
            Backend dan database sebagai beberapa service.
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const PrepDivider: Page = () => (
  <Shell>
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        gap: 64,
        alignItems: "center",
      }}
    >
      <div>
        <Eyebrow>Mentor Prep · Read Only</Eyebrow>
        <Heading size={88}>Siapkan demo dari kode sampai container</Heading>
        <Body style={{ maxWidth: 1000, marginTop: 30 }}>
          Appendix bacaan mentor. Lewati bagian ini saat presentasi kelas.
        </Body>
      </div>
      <div
        style={{
          padding: 44,
          background: colors.silk,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {[
          "Express API",
          "Dockerfile + context",
          "Image → container",
          "Verifikasi + debug",
        ].map((item, index) => (
          <div
            key={item}
            style={{ display: "flex", alignItems: "center", gap: 24 }}
          >
            <Label>{String(index + 1).padStart(2, "0")}</Label>
            <span style={{ fontSize: 28, fontWeight: 600 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const PrepPreflight: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · Sebelum mulai</Eyebrow>
    <Heading>Pastikan runtime dan Docker siap</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 0.85fr",
        gap: 48,
        marginTop: 42,
        alignItems: "start",
      }}
    >
      <Code size={25}>{`node --version
npm --version
docker version
docker info
docker ps`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Body>
          `docker version` harus menampilkan Client dan Server. Kalau Server
          tidak muncul, Docker Engine belum aktif.
        </Body>
        <Body>
          Siapkan Node.js + npm untuk membuat lockfile. Di Windows, jalankan
          perintah terminal dari PowerShell atau WSL; `curl.exe` dipakai untuk
          smoke check.
        </Body>
        <Body>
          Pastikan port host 8080 belum dipakai. Build pertama perlu akses
          registry untuk mengambil base image.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepProject: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 01</Eyebrow>
    <Heading>Buat folder proyek dan manifest npm</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.95fr 1.05fr",
        gap: 48,
        marginTop: 42,
        alignItems: "start",
      }}
    >
      <Code size={24}>{`mkdir api-kelas
cd api-kelas
npm init -y
npm install express
npm pkg set scripts.start="node server.js"`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Body>
          Setelah install, folder berisi `package.json`, `package-lock.json`,
          dan `node_modules/`.
        </Body>
        <div style={{ padding: 26, background: colors.silk }}>
          <Label>Yang dikomit</Label>
          <Body style={{ marginTop: 10 }}>
            `package.json` + `package-lock.json`; `node_modules/` tidak dikirim
            ke image.
          </Body>
        </div>
        <Body>
          Buat file `server.js` di editor. Langkah ini memakai Express yang
          familier dari Backend Basic.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepExpressApi: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 02 · server.js</Eyebrow>
    <Heading>API kecil dengan dua endpoint</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        gap: 48,
        marginTop: 38,
        alignItems: "start",
      }}
    >
      <Code size={23}>{`const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("API kelas berjalan");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "api-kelas" });
});

app.listen(port, "0.0.0.0", () => {
  console.log("API listening on " + port);
});`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Body>
          `PORT` punya default 3000 dan bisa dioverride dari environment
          container.
        </Body>
        <Body>
          Bind ke `0.0.0.0` agar koneksi yang diteruskan Docker dapat mencapai
          proses API.
        </Body>
        <Body>
          `/health` mengembalikan JSON sederhana untuk memastikan request
          benar-benar sampai ke aplikasi.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepManifest: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 03 · Dependency</Eyebrow>
    <Heading>Lockfile menjaga install tetap konsisten</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 44,
        marginTop: 42,
        alignItems: "start",
      }}
    >
      <Code size={25}>{`{
  "scripts": {
    "start": "node server.js"
  }
}`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Body>
          `npm pkg set` menambah script start. `npm install express` menambahkan
          dependency dan versinya ke manifest.
        </Body>
        <Code size={22}>{`# install saat mengembangkan
npm install

# install reproducible saat build
npm ci --omit=dev`}</Code>
        <Body>
          `package-lock.json` dikirim bersama `package.json`. `npm ci` memakai
          lockfile dan berhenti jika keduanya tidak cocok.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepDockerfile: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 04 · Dockerfile</Eyebrow>
    <Heading>Cache dependency sebelum copy source</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 44,
        marginTop: 38,
        alignItems: "start",
      }}
    >
      <Code size={23}>{`FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Body>
          `FROM` memilih runtime. `WORKDIR` menetapkan direktori kerja.
        </Body>
        <Body>
          Salin manifest sebelum `npm ci`. Perubahan source tidak mengulang
          install dependency.
        </Body>
        <Body>
          `RUN` terjadi saat build; `CMD` memulai app. `EXPOSE`
          mendokumentasikan port, sementara `-p` mempublikasikannya ke host.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepIgnore: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 05 · Build context</Eyebrow>
    <Heading>Jangan kirim file yang tidak dibutuhkan</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: 48,
        marginTop: 40,
        alignItems: "start",
      }}
    >
      <Code size={24}>{`node_modules
.git
*.log
.env
.env.*
coverage`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Body>
          Simpan daftar ini sebagai `.dockerignore` di root proyek, berdampingan
          dengan Dockerfile.
        </Body>
        <Body>
          Docker mengirim build context ke daemon. Tanpa ignore, `node_modules/`
          lokal dapat memperbesar transfer dan menimpa hasil install di image.
        </Body>
        <div style={{ padding: 26, background: colors.silk }}>
          <Label>Periksa sebelum build</Label>
          <Body style={{ marginTop: 10 }}>
            Jangan masukkan `.env`, credential, atau file lokal yang tidak
            dibutuhkan aplikasi.
          </Body>
        </div>
      </div>
    </div>
  </Shell>
);

const PrepBuild: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 06 · Build image</Eyebrow>
    <Heading>Tandai image dan kirim context saat build</Heading>
    <div style={{ marginTop: 42, maxWidth: 1360 }}>
      <Code size={27}>{`docker build -t api-kelas:1.0 .`}</Code>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 30,
          marginTop: 34,
        }}
      >
        {[
          ["docker build", "Membaca Dockerfile dan membangun image."],
          ["-t api-kelas:1.0", "Memberi nama dan tag yang mudah dirujuk."],
          [".", "Mengirim folder saat ini sebagai build context."],
        ].map(([title, detail]) => (
          <div key={title} style={{ padding: 24, background: colors.silk }}>
            <Label>{title}</Label>
            <Body style={{ marginTop: 12 }}>{detail}</Body>
          </div>
        ))}
      </div>
      <Body style={{ marginTop: 28 }}>
        Jalankan dari folder yang berisi `Dockerfile`, `package.json`, dan
        `.dockerignore`. Build pertama dapat mengunduh base image.
      </Body>
    </div>
  </Shell>
);

const PrepInspect: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 07 · Setelah build</Eyebrow>
    <Heading>Pastikan image terbentuk sebelum menjalankannya</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 42,
        marginTop: 44,
        alignItems: "start",
      }}
    >
      <Code size={24}>{`docker image ls api-kelas
docker history api-kelas:1.0`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Body>
          Baris `api-kelas` dengan tag `1.0` menandakan hasil build tersedia
          secara lokal.
        </Body>
        <Body>
          `docker history` membantu menghubungkan instruksi Dockerfile dengan
          layer image. Tidak semua instruksi menghasilkan layer filesystem baru.
        </Body>
        <Body>
          Kalau tag tidak muncul, baca error build dari baris paling awal yang
          gagal; jangan lanjut ke `docker run` dulu.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepRun: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 08 · Jalankan container</Eyebrow>
    <Heading>Pisahkan port host dan port aplikasi</Heading>
    <div style={{ marginTop: 40, maxWidth: 1500 }}>
      <Code
        size={22}
      >{`docker run -d --name api-kelas -p 8080:3000 -e PORT=3000 api-kelas:1.0`}</Code>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
          marginTop: 28,
        }}
      >
        <Body>
          `-d` berjalan di background; `--name` membuat container mudah dirujuk.
        </Body>
        <Body>
          `-p 8080:3000` berarti host 8080 diteruskan ke container 3000.
        </Body>
        <Body>
          `-e` memberi nilai runtime. `EXPOSE` sendiri tidak membuka port ke
          host.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepVerify: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 09 · Smoke check</Eyebrow>
    <Heading>Buktikan request mencapai API</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 42,
        marginTop: 42,
        alignItems: "start",
      }}
    >
      <div>
        <Label>macOS / Linux / WSL</Label>
        <Code size={23}>{`docker ps --filter name=api-kelas
curl http://localhost:8080/health`}</Code>
      </div>
      <div>
        <Label>Windows PowerShell</Label>
        <Code size={23}>{`docker ps --filter name=api-kelas
curl.exe http://localhost:8080/health`}</Code>
      </div>
    </div>
    <div style={{ marginTop: 28, maxWidth: 1200 }}>
      <Body>
        Hasil endpoint: {`{"status":"ok","service":"api-kelas"}`}. Kalau
        container berstatus `Up` tetapi request gagal, cek port mapping dan port
        yang dipakai aplikasi.
      </Body>
    </div>
  </Shell>
);

const PrepLogs: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 10 · Observability lokal</Eyebrow>
    <Heading>Gunakan status dan log untuk mencari masalah</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.95fr 1.05fr",
        gap: 42,
        marginTop: 40,
        alignItems: "start",
      }}
    >
      <Code size={24}>{`docker ps -a
docker logs api-kelas
docker logs -f api-kelas
docker inspect api-kelas`}</Code>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Body>
          `docker ps` hanya menampilkan container yang aktif. Tambahkan `-a`
          untuk melihat container yang sudah berhenti.
        </Body>
        <Body>
          `docker logs -f` mengikuti output secara langsung. Tekan Ctrl+C untuk
          berhenti mengikuti log; container tetap berjalan.
        </Body>
        <Body>
          Jika aplikasi berhenti, baca log dan exit state sebelum menghapus
          container agar penyebabnya tidak hilang.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepLifecycle: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 11 · Siklus demo</Eyebrow>
    <Heading>Stop, hapus container, lalu ulangi dengan nama sama</Heading>
    <div style={{ marginTop: 42, maxWidth: 1420 }}>
      <Code size={25}>{`docker stop api-kelas
docker rm api-kelas

# setelah mengubah source / Dockerfile
docker build -t api-kelas:1.0 .
docker run -d --name api-kelas -p 8080:3000 -e PORT=3000 api-kelas:1.0`}</Code>
      <Body style={{ marginTop: 26 }}>
        Container berhenti tetap menyimpan nama. Hapus container lama sebelum
        membuat container baru bernama `api-kelas`. Image lama boleh disimpan
        agar tidak perlu diunduh lagi.
      </Body>
    </div>
  </Shell>
);

const PrepTroubleshoot: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 12 · Troubleshooting</Eyebrow>
    <Heading>Mulai dari gejala, lalu cek batas yang tepat</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.8fr 1.2fr",
        gap: 38,
        marginTop: 34,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {[
          [
            "Docker daemon mati",
            "Jalankan Docker Engine; cek `docker version`.",
          ],
          [
            "Build gagal di npm ci",
            "Pastikan `package-lock.json` ada dan sinkron.",
          ],
          [
            "Nama container bentrok",
            "`docker ps -a`, lalu stop dan rm container lama.",
          ],
          [
            "Port host sudah dipakai",
            "Gunakan host lain, misalnya `-p 8081:3000`.",
          ],
        ].map(([symptom, action]) => (
          <div key={symptom} style={{ padding: 18, background: colors.silk }}>
            <Label>{symptom}</Label>
            <Body style={{ marginTop: 8 }}>{action}</Body>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Code size={23}>{`docker ps -a
docker logs api-kelas
docker port api-kelas`}</Code>
        <Body>
          Jika port host merespons tetapi endpoint tidak, pastikan server bind
          ke `0.0.0.0`, `PORT` container sesuai, dan `-p HOST:CONTAINER`
          menunjuk port yang benar.
        </Body>
        <Body>
          `EXPOSE` adalah metadata, bukan pemeriksaan kesehatan atau aturan
          firewall.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepExercise: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · 13 · Latihan singkat</Eyebrow>
    <Heading>Ganti port host tanpa mengubah aplikasi</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 44,
        marginTop: 40,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Body>
          Port host 8080 sudah dipakai. Hentikan dan hapus container lama, lalu
          publish host port 8081 menuju port aplikasi 3000.
        </Body>
        <Body>
          Minta peserta memprediksi apakah `8081:8081` akan berhasil sebelum
          mereka mencoba.
        </Body>
      </div>
      <div>
        <Code size={23}>{`docker stop api-kelas
docker rm api-kelas
docker run -d --name api-kelas -p 8081:3000 -e PORT=3000 api-kelas:1.0
curl http://localhost:8081/health`}</Code>
        <Body style={{ marginTop: 22 }}>
          Expected: JSON status `ok`. `8081:8081` gagal karena proses masih
          listen di port container 3000. Di PowerShell, gunakan `curl.exe` untuk
          smoke check.
        </Body>
      </div>
    </div>
  </Shell>
);

const PrepRunOfShow: Page = () => (
  <Shell>
    <Eyebrow>Mentor Prep · Penutup appendix</Eyebrow>
    <Heading>Checklist sebelum membuka sesi</Heading>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 44,
        marginTop: 38,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {[
          [
            "Sebelum kelas",
            "Build image sekali, cek /health, siapkan port cadangan.",
          ],
          ["Saat demo", "Tunjukkan file → build → run → request → log."],
          [
            "Saat latihan",
            "Biarkan peserta mengubah host port dan membaca gejalanya.",
          ],
          [
            "Jika waktu singkat",
            "Lewati inspect/history; pertahankan alur run dan verifikasi.",
          ],
        ].map(([phase, detail]) => (
          <div
            key={phase}
            style={{
              display: "grid",
              gridTemplateColumns: "190px 1fr",
              gap: 18,
            }}
          >
            <Label>{phase}</Label>
            <Body>{detail}</Body>
          </div>
        ))}
      </div>
      <div style={{ padding: 30, background: colors.silk }}>
        <Label>Catatan adaptasi</Label>
        <Body style={{ marginTop: 12 }}>
          Express menjadi contoh utama karena familiar untuk cohort. Hono bisa
          memakai alur container yang sama setelah server mendengarkan pada host
          dan port yang tepat; tidak perlu menyiapkan demo kedua.
        </Body>
        <Body style={{ marginTop: 18 }}>
          Compose tetap menjadi topik Pertemuan 3. Bahan ini menutup alur satu
          API dan satu container.
        </Body>
      </div>
    </div>
  </Shell>
);

export const meta: SlideMeta = {
  title: "Pertemuan 2 · Docker dan Containerization",
  createdAt: "2026-09-27T14:25:26.829Z",
  theme: "ksm-veterantech-2026",
};

export const notes: (string | undefined)[] = [
  undefined,
  undefined,
  "Referensi: Docker Dasar.pdf, Pengenalan Container.",
  "Diagram digambar ulang dari konsep Diagram Virtual Machine dan Diagram Container, Docker Dasar.pdf, hlm. 8 dan 10.",
  "Diagram digambar ulang dari Docker Architecture, Docker Dasar.pdf, hlm. 14–15.",
  "Referensi konsep registry, image, dan container: Docker Dasar.pdf, hlm. 19–27.",
  "Referensi perintah CLI dan log: Docker Dasar.pdf, bagian Docker Container dan Container Log.",
  "Telusuri perintah docker run: CLI mengirim request ke daemon, daemon memakai image lokal atau mengambilnya dari registry, lalu membuat container. Hubungkan -p 8080:3000 dengan browser yang membuka localhost:8080.",
  "Referensi port forwarding: Docker Dasar.pdf, hlm. 52–56.",
  "Contoh Dockerfile disederhanakan untuk API Node.js yang menggunakan package-lock.json. Referensi instruksi: Docker Dockerfile.pdf.",
  "Bedakan RUN pada tahap build dengan CMD saat container berjalan. Referensi: Docker Dockerfile.pdf, bagian RUN dan Command Instruction.",
  "Diagram build context dan .dockerignore digambar ulang dari Docker Dockerfile.pdf, bagian .dockerignore.",
  "Rangkai build context dengan instruksi Dockerfile. Tekankan .dockerignore, RUN yang dieksekusi saat build, layer image, dan CMD yang menentukan proses saat container dimulai. Referensi: Docker Dockerfile.pdf.",
  "Urutan docker build dan docker run merujuk pada Docker Dockerfile.pdf dan Docker Dasar.pdf.",
  "Referensi environment variable: Docker Dasar.pdf dan Docker Dockerfile.pdf, bagian Environment Variable.",
  "Latihan troubleshooting merangkum port mapping dan container logs dari Docker Dasar.pdf.",
  "Docker Compose.pdf dipakai sebagai referensi materi lanjutan Pertemuan 3: services, ports, environment, volumes, dan networks.",
];

export default [
  Cover,
  LearningPath,
  WhyContainers,
  VmVsContainer,
  Architecture,
  ImageContainer,
  CliFlow,
  DockerRunJourney,
  PortMapping,
  DockerfilePage,
  DockerfileLifecycle,
  BuildContext,
  BuildPipeline,
  BuildRun,
  Environment,
  HandsOn,
  WrapUp,
  PrepDivider,
  PrepPreflight,
  PrepProject,
  PrepExpressApi,
  PrepManifest,
  PrepDockerfile,
  PrepIgnore,
  PrepBuild,
  PrepInspect,
  PrepRun,
  PrepVerify,
  PrepLogs,
  PrepLifecycle,
  PrepTroubleshoot,
  PrepExercise,
  PrepRunOfShow,
] satisfies Page[];
