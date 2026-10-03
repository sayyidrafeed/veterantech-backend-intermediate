import {
  useSlidePageNumber,
  type DesignSystem,
  type Page,
  type SlideMeta,
} from "@open-slide/core";
import type { CSSProperties, ReactNode } from "react";

export const design: DesignSystem = {
  palette: { bg: "#fffaf8", text: "#241e1d", accent: "#c85864" },
  fonts: {
    display: '"Space Grotesk", Arial, sans-serif',
    body: '"Space Grotesk", Arial, sans-serif',
  },
  typeScale: { hero: 112, body: 32 },
  radius: 8,
};

const mono = '"JetBrains Mono", Consolas, monospace';
const gradient = "linear-gradient(110deg, #f2b07c, #cd7986)";
const border = "#745e5b";
const neutral = "#f1eaea";
const fontHref =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap";
if (typeof document !== "undefined") {
  const id = "osd-webfont-pertemuan-03-docker-compose";
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== fontHref) link.href = fontHref;
}

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
      fontFamily: "var(--osd-font-display)",
      fontSize: cover ? "var(--osd-size-hero)" : 60,
      fontWeight: 600,
      lineHeight: 1.12,
      letterSpacing: "-0.035em",
      color: "var(--osd-text)",
    }}
  >
    {children}
  </h1>
);
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p
    style={{
      margin: 0,
      fontFamily: mono,
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1.4,
    }}
  >
    {children}
  </p>
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
        borderTop: `1px solid ${border}`,
        paddingTop: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: mono,
        fontSize: 24,
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
const Canvas = ({ children }: { children: ReactNode }) => (
  <div
    data-p03-canvas
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      background: "var(--osd-bg)",
      color: "var(--osd-text)",
      fontFamily: "var(--osd-font-body)",
    }}
  >
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
const Body = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{ position: "absolute", left: 100, right: 100, top: 340, ...style }}
  >
    {children}
  </div>
);
const Frame = ({
  section,
  title,
  children,
  takeaway,
}: {
  section: string;
  title: string;
  children: ReactNode;
  takeaway?: string;
}) => (
  <Canvas>
    <Header section={section}>{title}</Header>
    <Body>{children}</Body>
    {takeaway && (
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          top: 858,
          padding: "18px 28px",
          background: gradient,
          fontSize: 36,
          lineHeight: 1.3,
        }}
      >
        {takeaway}
      </div>
    )}
  </Canvas>
);
const Text = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <p
    style={{
      margin: 0,
      fontSize: "var(--osd-size-body)",
      lineHeight: 1.4,
      ...style,
    }}
  >
    {children}
  </p>
);
const Label = ({ children }: { children: ReactNode }) => (
  <div style={{ fontFamily: mono, fontSize: 24, lineHeight: 1.4 }}>
    {children}
  </div>
);
const Columns = ({
  children,
  ratio = "1fr 1fr",
}: {
  children: ReactNode;
  ratio?: string;
}) => (
  <div style={{ display: "grid", gridTemplateColumns: ratio, gap: 48 }}>
    {children}
  </div>
);
const Node = ({
  title,
  detail,
  focus = false,
  style,
}: {
  title: string;
  detail?: string;
  focus?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      padding: "30px 32px",
      border: `2px solid ${focus ? "var(--osd-accent)" : border}`,
      background: focus ? gradient : neutral,
      borderRadius: "var(--osd-radius)",
      ...style,
    }}
  >
    <div style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.2 }}>
      {title}
    </div>
    {detail && <Text style={{ marginTop: 16 }}>{detail}</Text>}
  </div>
);
const Arrow = ({ label }: { label?: string }) => (
  <div style={{ textAlign: "center", alignSelf: "center", minWidth: 65 }}>
    <div style={{ fontSize: 48, color: "#342c2a" }}>→</div>
    {label && <Label>{label}</Label>}
  </div>
);
const Flow = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "flex", alignItems: "stretch", gap: 20 }}>
    {children}
  </div>
);
const Code = ({ children }: { children: string }) => (
  <pre
    style={{
      margin: 0,
      padding: "24px 28px",
      background: neutral,
      border: `1px solid ${border}`,
      fontFamily: mono,
      fontSize: 28,
      lineHeight: 1.35,
      whiteSpace: "pre",
    }}
  >
    <code>{children}</code>
  </pre>
);
const Rule = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ padding: "14px 0", borderBottom: `1px solid ${border}` }}>
    <Label>{label}</Label>
    <Text style={{ marginTop: 8 }}>{children}</Text>
  </div>
);

const Cover: Page = () => (
  <Canvas>
    <div style={{ position: "absolute", left: 100, top: 160, width: 760 }}>
      <Eyebrow>Meeting 03 / Docker Compose</Eyebrow>
      <div style={{ marginTop: 48 }}>
        <Title cover>
          Docker
          <br />
          Compose
        </Title>
      </div>
      <Text style={{ marginTop: 42, maxWidth: 660 }}>
        Describe how your backend and database run together.
      </Text>
      <div style={{ marginTop: 70 }}>
        <Label>Recall · Configure · Connect · Persist</Label>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 1000,
        top: 160,
        width: 820,
        height: 720,
        background: gradient,
        padding: 52,
      }}
    >
      <Label>Application boundary</Label>
      <Node
        title="Backend"
        detail="Handles API requests"
        style={{ marginTop: 40 }}
      />
      <div style={{ textAlign: "center", fontSize: 48, padding: "12px 0" }}>
        ↓
      </div>
      <Node title="Database" detail="Stores application data" />
      <Text style={{ marginTop: 40 }}>
        Compose describes the services and their connections.
      </Text>
    </div>
  </Canvas>
);

const Session: Page = () => (
  <Frame
    section="Session / 120 minutes"
    title="We will move from one container to a connected application"
  >
    <Columns ratio="1.1fr 1fr">
      <div>
        <Rule label="01 / Recall and demonstrations">
          SSH to a server. Build a backend image.
        </Rule>
        <Rule label="02 / Compose concepts">
          Read YAML. Connect services. Keep data.
        </Rule>
        <Rule label="03 / Check and discuss">
          Diagnose failures. Discuss assignments.
        </Rule>
      </div>
      <Node
        title="Switch between slides and tools"
        detail="Slides explain the relationships. Terminal and editor show the steps."
        focus
        style={{ alignSelf: "center" }}
      />
    </Columns>
  </Frame>
);

const Outcomes: Page = () => (
  <Frame
    section="Learning outcomes / Syllabus"
    title="Explain how the application runs, connects, and keeps data"
  >
    <Rule label="Manage">
      Explain why multiple containers need a shared configuration.
    </Rule>
    <Rule label="Configure">Read YAML and identify each service setting.</Rule>
    <Rule label="Persist">Explain why database data belongs in a volume.</Rule>
    <Rule label="Connect">
      Explain service names, ports, and network boundaries.
    </Rule>
    <Rule label="Integrate">
      Trace an API request through the backend to the database.
    </Rule>
  </Frame>
);

const Recall: Page = () => (
  <Frame
    section="Recall / Meeting 02"
    title="An image packages the app; a container runs it"
    takeaway="Changing source files does not update an existing image."
  >
    <Flow>
      <Node title="Source" detail="Application files" style={{ flex: 1 }} />
      <Arrow />
      <Node
        title="Dockerfile"
        detail="Build instructions"
        style={{ flex: 1 }}
      />
      <Arrow />
      <Node title="Image" detail="Build output" focus style={{ flex: 1 }} />
      <Arrow />
      <Node title="Container" detail="Running instance" style={{ flex: 1 }} />
    </Flow>
    <Text style={{ marginTop: 64 }}>
      Which step must happen again when the application changes?
    </Text>
  </Frame>
);

const SSHDemo: Page = () => (
  <Canvas>
    <Header section="Live demonstration / Terminal">
      Connect to the VPS with SSH
    </Header>
    <Body>
      <Flow>
        <Node
          title="Laptop"
          detail="SSH client and private key"
          style={{ flex: 1 }}
        />
        <Arrow label="SSH" />
        <Node
          title="VPS"
          detail="Remote Linux terminal"
          focus
          style={{ flex: 1 }}
        />
      </Flow>
      <Text style={{ marginTop: 64 }}>
        Login → verify the server → inspect files and ports → exit.
      </Text>
    </Body>
  </Canvas>
);

const DockerfileDemo: Page = () => (
  <Canvas>
    <Header section="Live demonstration / Editor + terminal">
      Write a Dockerfile and build your own image
    </Header>
    <Body>
      <Node
        title="From an Express starter to a running container"
        detail="Write the instructions. Build the image. Map the port. Check the response."
        focus
      />
      <Text style={{ marginTop: 64 }}>
        Explain what happens at build time and what happens at runtime.
      </Text>
    </Body>
  </Canvas>
);

const Manual: Page = () => (
  <Frame
    section="Problem / Several containers"
    title="Separate commands leave the connections for you to manage"
    takeaway="The application needs more than two running processes."
  >
    <Columns>
      <div>
        <Label>Manual setup</Label>
        <Code>{`docker network create app-net
docker volume create db-data
docker run … database
docker build … backend
docker run … backend`}</Code>
      </div>
      <div>
        <Rule label="Configuration">Which image, environment, and port?</Rule>
        <Rule label="Connections">Which network and database hostname?</Rule>
        <Rule label="Lifecycle">How do you start, inspect, and stop them?</Rule>
      </div>
    </Columns>
  </Frame>
);

const ComposeRole: Page = () => (
  <Frame
    section="Compose / Role"
    title="Compose describes the services as one application"
    takeaway="Compose coordinates containers; it does not build your business logic."
  >
    <Flow>
      <Node
        title="compose.yaml"
        detail="Services, networks, volumes"
        focus
        style={{ flex: 1.2 }}
      />
      <Arrow />
      <Node
        title="Compose"
        detail="Reads the configuration"
        style={{ flex: 1 }}
      />
      <Arrow />
      <Node
        title="Docker Engine"
        detail="Builds and runs containers"
        style={{ flex: 1.2 }}
      />
    </Flow>
    <Text style={{ marginTop: 58 }}>
      Run the application with{" "}
      <span style={{ fontFamily: mono }}>docker compose up</span>.
    </Text>
  </Frame>
);

const YAML: Page = () => (
  <Frame
    section="Configuration / YAML"
    title="Indentation expresses which settings belong together"
    takeaway="Use spaces, keep nesting consistent, and validate the file."
  >
    <Columns>
      <Code>{`services:
  api:
    build: ./api
    ports:
      - "8080:3000"
    environment:
      PORT: "3000"`}</Code>
      <div>
        <Rule label="Mapping">Keys such as services and environment.</Rule>
        <Rule label="Nesting">api settings sit inside the api service.</Rule>
        <Rule label="Sequence">A dash starts an item in the ports list.</Rule>
      </div>
    </Columns>
  </Frame>
);

const Structure: Page = () => (
  <Frame
    section="Configuration / Application structure"
    title="Services use the networks and volumes declared for the app"
  >
    <Columns>
      <Code>{`services:
  api:
    build: ./api
  db:
    image: postgres:17-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
networks:
  app-net: {}
volumes:
  db-data: {}`}</Code>
      <div>
        <Rule label="services">Containers that perform application roles.</Rule>
        <Rule label="networks">Named communication boundaries.</Rule>
        <Rule label="volumes">Named storage independent of containers.</Rule>
        <Label>Structural excerpt; service attachments follow.</Label>
      </div>
    </Columns>
  </Frame>
);

const Settings: Page = () => (
  <Frame
    section="Configuration / Service settings"
    title="Each setting answers a different runtime question"
  >
    <Rule label="build: ./api">
      Where should Docker build the backend image?
    </Rule>
    <Rule label="image: postgres:17-alpine">
      Which existing database image should it use?
    </Rule>
    <Rule label="environment: DB_HOST: db">
      Which configuration does the application read?
    </Rule>
    <Rule label={'ports: ["127.0.0.1:8080:3000"]'}>
      How can the laptop reach the backend?
    </Rule>
    <Text style={{ marginTop: 28 }}>
      Environment values configure code; they do not implement database access.
    </Text>
  </Frame>
);

const RequestPath: Page = () => (
  <Frame
    section="Integration / Request path"
    title="The backend handles HTTP and uses a database connection"
    takeaway="A running database alone does not prove backend integration."
  >
    <Flow>
      <Node title="Client" detail="HTTP request" style={{ flex: 1 }} />
      <Arrow />
      <Node
        title="Backend"
        detail="Route + database driver"
        focus
        style={{ flex: 1.3 }}
      />
      <Arrow />
      <Node
        title="PostgreSQL"
        detail="Query + stored data"
        style={{ flex: 1.2 }}
      />
    </Flow>
    <Text style={{ marginTop: 64 }}>
      Proof to look for: create data through the API, then read it back.
    </Text>
    <Label>
      Illustrative architecture; the current Express starter has no database
      integration.
    </Label>
  </Frame>
);

const Hostname: Page = () => (
  <Frame
    section="Networking / Service discovery"
    title="Inside the backend container, localhost means the backend"
    takeaway="Use the database service name: db:5432."
  >
    <Columns>
      <Node
        title="localhost:5432"
        detail="Looks for PostgreSQL inside the backend container."
      />
      <Node
        title="db:5432"
        detail="Reaches the database service on the shared Compose network."
        focus
      />
    </Columns>
    <Text style={{ marginTop: 58 }}>
      Compose provides service-name discovery on its networks. Container IP
      addresses can change.
    </Text>
  </Frame>
);

const Ports: Page = () => (
  <Frame
    section="Networking / Two paths"
    title="Host access and container-to-container access use different ports"
    takeaway="Service-to-service traffic uses the container port."
  >
    <Rule label="Laptop → backend">localhost:8080 → api:3000</Rule>
    <Rule label="Backend → database">db:5432 over the shared network</Rule>
    <div style={{ marginTop: 36 }}>
      <Columns>
        <Code>{`api:
  ports:
    - "127.0.0.1:8080:3000"`}</Code>
        <Text>
          8080 belongs to the host.
          <br />
          3000 belongs to the container.
          <br />
          The database needs no host mapping.
        </Text>
      </Columns>
    </div>
  </Frame>
);

const Isolation: Page = () => (
  <Frame
    section="Networking / Boundaries"
    title="Only services on a shared network can use that connection"
    takeaway="No database host port is published in this local example."
  >
    <Columns>
      <Code>{`api:
  networks: [app-net]
  ports:
    - "127.0.0.1:8080:3000"
db:
  networks: [app-net]
networks:
  app-net: {}`}</Code>
      <div>
        <Node title="app-net" detail="api ↔ db" focus />
        <Text style={{ marginTop: 32 }}>
          A service on another isolated network cannot directly use this path.
        </Text>
        <Text style={{ marginTop: 24 }}>
          Network membership and published ports are different controls.
        </Text>
      </div>
    </Columns>
  </Frame>
);

const Storage: Page = () => (
  <Frame
    section="Persistence / Storage ownership"
    title="Container replacement should not replace your database data"
    takeaway="A named volume has a lifecycle separate from its container."
  >
    <Columns>
      <Node
        title="Writable layer"
        detail="Belongs to one container. Removing that container removes this data."
      />
      <Node
        title="Named volume"
        detail="Mounted into the database. Retained when containers are removed normally."
        focus
      />
    </Columns>
    <div style={{ marginTop: 44 }}>
      <Code>{`volumes:
  - db-data:/var/lib/postgresql/data`}</Code>
    </div>
    <Label>
      Mount path shown for PostgreSQL 17; check the image documentation before
      changing major versions.
    </Label>
  </Frame>
);

const PersistenceProof: Page = () => (
  <Frame
    section="Persistence / Verification sequence"
    title="Replace the containers, then check the same record"
    takeaway="A restart is weaker evidence than removing and recreating containers."
  >
    <Rule label="01 / Write">Create a record through the integrated API.</Rule>
    <Rule label="02 / Remove containers">
      Run docker compose down without --volumes.
    </Rule>
    <Rule label="03 / Recreate">
      Run docker compose up -d with the same project and named volume.
    </Rule>
    <Rule label="04 / Read">Read the original record through the API.</Rule>
    <Text style={{ marginTop: 28 }}>
      Expected result to verify: the record still exists.
    </Text>
  </Frame>
);

const Readiness: Page = () => (
  <Frame
    section="Startup / Readiness"
    title="A started container may not be ready to accept connections"
  >
    <Columns ratio="1.2fr 1fr">
      <Code>{`api:
  depends_on:
    db:
      condition: service_healthy
db:
  healthcheck:
    test:
      - CMD-SHELL
      - pg_isready -U demo -d classroom
    interval: 5s
    timeout: 3s
    retries: 10`}</Code>
      <div>
        <Rule label="Start order">Create the dependency first.</Rule>
        <Rule label="Ready signal">Wait for its configured healthcheck.</Rule>
        <Rule label="After startup">
          The application still needs to handle connection failures.
        </Rule>
        <Label>
          Excerpt: DB environment and credentials are configured separately.
        </Label>
      </div>
    </Columns>
  </Frame>
);

const Lifecycle: Page = () => (
  <Frame
    section="Lifecycle / Compose CLI"
    title="Use the same project configuration to inspect and manage the app"
    takeaway="down --volumes deletes declared named volumes: database data can be lost."
  >
    <Columns>
      <div>
        <Rule label="docker compose config">
          Validate and inspect the resolved configuration.
        </Rule>
        <Rule label="docker compose up -d">
          Create and start the application.
        </Rule>
        <Rule label="docker compose ps">
          Inspect service state and port mappings.
        </Rule>
      </div>
      <div>
        <Rule label="docker compose logs --tail 50 api">
          Read recent backend logs.
        </Rule>
        <Rule label="docker compose exec api sh">
          Open a shell inside the running backend.
        </Rule>
        <Rule label="docker compose down">
          Remove project containers and networks.
        </Rule>
      </div>
    </Columns>
  </Frame>
);

const Diagnosis: Page = () => (
  <Frame
    section="Checkpoint / Explain your diagnosis"
    title="Locate the failed connection before changing configuration"
  >
    <Columns>
      <div>
        <Rule label="01 / Hostname">
          The backend tries localhost:5432. Where does it connect?
        </Rule>
        <Rule label="02 / Port">
          The app listens on 4000; mapping targets 3000. What changes?
        </Rule>
      </div>
      <div>
        <Rule label="03 / Readiness">
          Database is running; first request fails. What would you inspect?
        </Rule>
        <Rule label="04 / Persistence">
          Data vanishes after container replacement. Where was it stored?
        </Rule>
      </div>
    </Columns>
    <Text style={{ marginTop: 48 }}>
      Explain the path, read the logs, then change the relevant setting.
    </Text>
  </Frame>
);

const Assignment: Page = () => (
  <Frame
    section="Assignment 1 / Direction for discussion"
    title="Package and connect a small backend application"
    takeaway="This exercise is separate from the application used for the Final Project."
  >
    <Columns>
      <div>
        <Rule label="Package">Explain the Dockerfile and custom image.</Rule>
        <Rule label="Connect">
          Describe backend and database services in Compose.
        </Rule>
        <Rule label="Keep data">
          Explain network access and demonstrate persistence.
        </Rule>
      </div>
      <div>
        <Node
          title="Scope to finalize"
          detail="Exact starter, deliverables, and assessment criteria will be confirmed in the assignment instructions."
          focus
        />
        <Text style={{ marginTop: 28 }}>
          Assignment 1 is issued in Meeting 3 or 4. The SOP sets a one-week
          submission window.
        </Text>
      </div>
    </Columns>
  </Frame>
);

const Roadmap: Page = () => (
  <Frame
    section="Final Project / Early preview + class vote"
    title="Assignment 2 will show progress toward your Final Project"
  >
    <Columns ratio="1fr 1.15fr">
      <div>
        <Rule label="Meeting 03 / Preview">
          Discuss the direction. Vote: individual or group work?
        </Rule>
        <Rule label="Meeting 06 / Formal instructions">
          Assignment 2 + Final Project briefing.
        </Rule>
        <Rule label="Later / Complete and present">
          Assignment 2 is a milestone, not a separate app.
        </Rule>
      </div>
      <div>
        <Node
          title="Event-driven direction"
          detail="API → event broker → worker → observable result"
          focus
        />
        <Text style={{ marginTop: 28 }}>
          A possible architecture, not a mandatory stack yet.
        </Text>
        <Text style={{ marginTop: 24 }}>
          Discuss project size, access to tools, and each member’s contribution.
        </Text>
      </div>
    </Columns>
  </Frame>
);

export const meta: SlideMeta = {
  title: "Meeting 3 · Docker Compose",
  createdAt: "2026-10-03T05:50:11.866Z",
  theme: "ksm-consulting-organic",
};

export const notes: (string | undefined)[] = [
  "Buka dengan pengalaman mereka membuat API. Hari ini fokus cara beberapa container menjadi satu aplikasi. Theme KSM Consulting Organic: ENERGY 3 / RHYTHM 3 / MOTION 0; gradient memberi fokus, layout mengikuti hubungan materi.",
  "Alokasi 120 menit: recall 10, SSH 15, Dockerfile 20, konsep Compose 15, pembahasan/praktik Compose 35, diagnosis 10, briefing/voting 15. Runbook Compose belum tersedia; siapkan demonstrasi terintegrasi pada pekerjaan berikutnya, jangan menganggap starter lama sudah memakai DB.",
  "Lima indikator dari Silabus Backend Intermediate Batch 2 2026, Pertemuan 3: multi-container, YAML, volumes, networking, integrasi backend + database. Minta mentee menjelaskan setiap hubungan, bukan menghafal command.",
  "Tanya apa beda image dan container. Jawaban: image hasil build, container instance. Setelah source berubah perlu rebuild dan recreate; bukan sekadar restart.",
  "Pindah ke praktikum/pertemuan-03/ssh/demo.md. Persiapan ada di ssh/persiapan-mentor.md. Gunakan akun sah, jangan menampilkan private key/password. Buktikan hostname dan user sebelum/sesudah SSH; firewall cukup inspect.",
  "Pindah ke praktikum/pertemuan-03/dockerfile/demo.md. Starter Dockerfile kosong, checkpoint 01–03 tersedia. Ketik bertahap, jelaskan RUN saat build versus CMD saat runtime, EXPOSE versus publish, lalu curl health. Perhatikan headroom disk dan helper build.",
  "Command memakai elipsis sebagai sketsa, bukan command siap copy-paste. Tanya apa yang perlu disamakan selain menjalankan backend dan database: network, environment, storage, dan lifecycle.",
  "Compose bukan Kubernetes dan bukan generator business logic. Docker Engine menjalankan container sesuai konfigurasi. Referensi: https://docs.docker.com/compose/ . compose.yaml nama pilihan saat ini; docker-compose.yml juga dikenali.",
  "Tunjukkan nesting dengan dua spasi, list dengan dash, string port diberi kutip. Cek dengan docker compose config. Contoh build ./api bersifat ilustratif, bukan path starter yang siap integrasi DB.",
  "Ini structural excerpt, bukan konfigurasi runnable lengkap: environment DB dan attachment network belum ada. Bedakan declaration network/volume dengan pemakaian pada service. PostgreSQL 17 memakai /var/lib/postgresql/data; referensi https://hub.docker.com/_/postgres .",
  "build memilih source image, image memilih image yang sudah ada. Environment harus benar-benar dibaca oleh aplikasi. DB_HOST bukan fitur ajaib: kode dan driver DB dibutuhkan. Starter Express saat ini belum mengakses PostgreSQL.",
  "Telusuri request dan hasil query kembali ke client. Bukti integrasi adalah write/read melalui API, bukan hanya database healthy. Diagram konseptual; tidak ada klaim aplikasi terintegrasi sudah diuji.",
  "Minta mentee menunjuk localhost milik siapa. Default Compose service discovery bekerja pada shared network, pakai db bukan IP container. Referensi https://docs.docker.com/compose/how-tos/networking/ .",
  "Client di laptop memakai host port 8080, api ke DB memakai container port 5432. Binding 127.0.0.1 contoh lokal, bukan konfigurasi VPS publik. DB tidak perlu publish port untuk diakses api pada network sama.",
  "Snippet adalah service-level excerpt; api dan db berada di bawah services pada file lengkap. Shared network mengizinkan path langsung antarservice. Tanpa publish DB, tidak ada host-port mapping untuk DB; jangan menyebutnya jaminan keamanan menyeluruh atau menyamakan dengan internal:true.",
  "Bandingkan storage container dengan volume. Restart tidak menghapus writable layer; removal yang membuat perbedaannya terlihat. Named volume digunakan ulang bila nama project/volume sama. Referensi https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/ .",
  "Ini urutan pembuktian yang harus dicoba pada API terintegrasi, bukan hasil yang sudah terjadi. Gunakan project dan volume yang sama, down tanpa -v. Jangan demonstrasikan penghapusan volume yang menyimpan data penting.",
  "depends_on biasa mengatur urutan start, bukan readiness. condition service_healthy menunggu healthcheck. demo dan classroom adalah contoh user/database, bukan credential nyata; harus sesuai environment DB. pg_isready memeriksa penerimaan koneksi, bukan schema atau semua query aplikasi. Referensi https://docs.docker.com/compose/how-tos/startup-order/ .",
  "Jalankan dari folder konfigurasi yang sama. config dapat memuat environment ter-resolve, jadi hindari menampilkan rahasia. down default mempertahankan named volume; --volumes menghapus volume yang dideklarasikan. Referensi https://docs.docker.com/reference/cli/docker/compose/down/ .",
  "Jawaban: 1 localhost adalah api; 2 target container port harus 4000 atau PORT dikembalikan ke 3000; 3 cek logs, healthcheck, credentials/schema, jangan menebak; 4 cek volume mount, nama project/volume, dan apakah down -v pernah dipakai.",
  "Ini arah Tugas 1, bukan instruksi final. Sumber SOP 6.f dan onboarding: diberikan P3/P4, deadline satu minggu. Rubrik dan starter belum dikunci; jangan mengumumkan nilai atau tanggal spesifik. Template instruksi akan diduplikasi kemudian.",
  "Sumber SOP 6.f–6.g dan onboarding: Tugas 2 progress FP, keduanya diberikan P6; FP due sehari sebelum presentasi, ada sesi presentasi tambahan. Hari ini preview saja. Event-driven masih arah diskusi. Voting individu/kelompok dipimpin Rafee; catat hasil kemudian, jangan mengasumsikan keputusan.",
];

export default [
  Cover,
  Session,
  Outcomes,
  Recall,
  SSHDemo,
  DockerfileDemo,
  Manual,
  ComposeRole,
  YAML,
  Structure,
  Settings,
  RequestPath,
  Hostname,
  Ports,
  Isolation,
  Storage,
  PersistenceProof,
  Readiness,
  Lifecycle,
  Diagnosis,
  Assignment,
  Roadmap,
] satisfies Page[];
