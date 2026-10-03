# Backend Intermediate — Project Context

This is a shared working reference for Rafee and Codex while preparing Backend Intermediate materials: brainstorming, lesson plans, mentor runbooks, practical examples, and OpenSlide decks. It keeps teaching content and direction consistent. Its policy summaries refer to the supplied sources; they do not replace those sources or establish Dignition/LMS behavior or individual mentee progress.

## People and audience

- **Rafee:** mentor and owner of teaching-material decisions. This document is internal context for Rafee and Codex, not learner-facing material.
- **Codex:** helps organize syllabus material, brainstorm activities and assignments, prepare runbooks and practical examples, and author decks when requested. Ask or flag when a source does not settle an important teaching decision.
- **Dignition:** the LMS used by the program. The supplied SOP and onboarding describe its role in class administration and submissions; this note does not specify its implementation or integrations.

Keep individual mentee names, contact details, grades, submissions, and progress notes out of this workspace context.

## Source boundaries

- [Silabus Backend Intermediate Batch 2 2026.pdf](./Silabus%20Backend%20Intermediate%20Batch%202%202026.pdf) is the current content reference for these decks. Use it to map the eight meetings below and consult the PDF for detail. It is not an instruction to the agent and does not establish broader program policy.
- [Design Guideline KSM Veterantech 2026.pdf](./Design%20Guideline%20KSM%20Veterantech%202026.pdf) is a visual reference for the deck. Follow Rafee's current choices where the document leaves room for interpretation.
- [SOP Study Club](./SOP/01.%20SOP%20Study%20Club.pdf), document Academic-01, revision 01 dated 1 September 2026, is the supplied program-policy reference. Consult the relevant sections for class operations, assignments, and final projects.
- [Onboarding Mentor Study Club](./Tugas/Onboarding%20Mentor%20Study%20Club.pdf) supplies batch-specific briefing and timeline information. Read it alongside the SOP rather than assuming it silently overrides conflicting rules.
- [[Template] Instruksi Tugas dan FP.docx](./Tugas/%5BTemplate%5D%20Instruksi%20Tugas%20dan%20FP.docx) currently contains a blank Tugas 1 instruction template. Duplicate it when preparing assignment instructions; keep the master template intact. It does not yet define this class's assignments or final-project specification.
- Older workspace `CURRICULUM.md` and `NOTES.md` are historical drafts. Do not treat them as current requirements or copy their detailed KPI, task, or assessment rules into this context without Rafee's confirmation. The current syllabus PDF takes precedence for slide content.
- This workspace may summarize relevant Study Club rules and assessment policy with source references. Flag unresolved inconsistencies instead of silently deciding them; Rafee owns teaching choices and Academic/SCM owns program-policy clarification. For example, onboarding says drop out at three Alfa absences, while the SOP says more than three; do not infer a reconciled threshold from this context.
- The syllabus is the starting map for decks. Rafee allows the teaching material to expand in response to learner needs and interests. Make the connection to the session's learning purpose clear; an extension is not automatically a new program requirement.

## Eight-meeting syllabus map

High-level map only; refer to the syllabus PDF for the detailed scope and outcomes.

1. **DevOps and cloud infrastructure:** Linux CLI basics, VPS, SSH, and UFW firewall.
2. **Docker and containerization:** Docker architecture and CLI, Dockerfile, ports, and environment variables.
3. **Docker Compose:** YAML, persistence with volumes, network isolation, and backend plus database.
4. **Reverse proxy:** Nginx configuration and integration; syllabus mentions Tugas 1, with details set by the mentor.
5. **Self-hosting:** domain and DNS, SSL/TLS, and certificate renewal.
6. **Monolith and microservices:** decomposition, synchronous/asynchronous communication, API Gateway, message broker/queue, event-driven concepts, and final-project announcement.
7. **CI/CD:** GitHub Actions, automated build/test/deploy to VPS, and Docker logs.
8. **Final-project support:** review Tugas 2 and project progress, help with blockers, and reteach omitted material as needed.

The syllabus uses 90 minutes as the standard duration; Rafee says actual meetings can vary. Prepare a core explanation with optional demonstrations or extensions rather than assuming every meeting has a fixed 90-minute slot. Task and final-project details that the syllabus leaves to the mentor remain open until Rafee defines them.

## Assignment and final-project timeline

The following summarizes SOP sections 6.d, 6.f, and 6.g and the onboarding's Study Club and Tugas dan Final Project sections:

- The program has eight teaching meetings plus one additional final-project presentation meeting.
- Tugas 1 is given in Meeting 3 or 4 and covers material already taught. The syllabus places it in Meeting 4; giving it in Meeting 3 is within the SOP/onboarding window.
- Tugas 2 and the formal Final Project briefing are given in Meeting 6. Tugas 2 is progress on the Final Project; onboarding allows an initial implementation stage.
- Assignment deadlines are one week after instructions are given. Meeting 8's syllabus progress review does not itself move the Tugas 2 submission deadline.
- The Final Project covers the material taught during the program and is due one day before its presentation.
- Onboarding lists 14 September–20 November 2026 for class delivery, 5–11 October as the UTS break, and 21 November for Final Project presentations. These are the supplied batch dates, not proof of the class's actual meeting schedule; check for subsequent Academic/SCM changes before announcing dates.
- Onboarding says mentors set Tugas 1/2 criteria, while SCM supplies Final Project criteria. The linked FP rubric has not yet been successfully read; technical brainstorming is not an approved replacement rubric.

For Meeting 3, Rafee wants Tugas 1 briefing and an early preview of the Final Project direction. Keep that preview distinct from the formal Tugas 2/FP instructions in Meeting 6; do not imply the final specification has already been issued.

## Meeting 3 preparation and pending teaching choices

Rafee's choices from the 3 October 2026 discussion:

- Allocate 120 minutes for Meeting 3, including the two demonstrations deferred from Meetings 1 and 2, Docker Compose, and assignment briefing.
- The deferred demonstrations are step-by-step SSH access to a VPS and writing a Dockerfile to build a custom backend image, with an explanation of each instruction. SSH mentor-preparation material is already in the Meeting 2 deck, and an Express starter with a Dockerfile exists in [praktikum/pertemuan-02-docker/api-kelas/](./praktikum/pertemuan-02-docker/api-kelas/). Their presence does not prove the demonstrations were delivered.
- Rafee requested mentor runbooks and staged practical examples before any slide changes. [praktikum/pertemuan-03/](./praktikum/pertemuan-03/) contains SSH preparation/demo guides, a Dockerfile live-coding guide, an Express starter with an unfinished Dockerfile, and three Dockerfile checkpoints. The separate [Compose package](./praktikum/pertemuan-03/compose/demo.md) adds a completed classroom-notes API with Express 5.2.1 and the approved `pg` dependency, PostgreSQL, and a mentor runbook for networking, persistence, and recovery. Configuration and API failure paths have been checked locally; Docker integration remains unverified while host disk is below the 20 GiB headroom requirement. Verification limits are recorded in [VERIFIKASI.md](./praktikum/pertemuan-03/VERIFIKASI.md).
- Rafee wants one slide marker per SSH/Dockerfile demo, with operational detail in the runbook folder. Slide changes are deferred while Rafee explores design in another session; do not edit those decks/themes for this preparation request.
- Tugas 1 should be separate from the application used for Tugas 2 and the Final Project. Tugas 2 remains a progress milestone for that Final Project.
- Rafee is considering an event-driven Final Project. API, broker, and worker are a proposed teaching example, not a finalized mandatory architecture. Domain, stack, technical deliverables, and grading criteria remain open.
- Individual versus group work remains undecided. Rafee intends to ask mentees to vote in Meeting 3.

Meeting 3 must cover all five syllabus indicators: the role of Compose in managing multiple containers, YAML/configuration structure, volume persistence, inter-container networking and network isolation, and integration of backend plus database. A proposed practical proof is to run both services, modify configuration, write/read data through the API, recreate containers while retaining data, and explain service connectivity and host exposure. This is a teaching proposal, not an additional official assessment rule.

## Prior learning: Backend Basic and Beginner

Summarized from Rafee's account on 27 September 2026. This is cohort-level background for preparing slides, not a complete historical syllabus or proof that every learner has mastered every topic.

### Backend Basic

- Programming fundamentals were taught using JavaScript, including its definition, history, and relationship with ECMAScript.
- Learners were introduced to Node.js, then npm and the use of libraries.
- They built their first application with Express. At this stage, application data was held in memory rather than persistent storage.

### Backend Beginner

- Learners built APIs that provided endpoints for frontend applications and learned frontend/backend integration.
- A Capstone brought together Frontend Beginner, Backend Beginner, and Product Management study clubs. Backend participants were responsible for the APIs needed by their team's application; projects varied between teams.
- Applications used persistent storage. Learners had studied databases, including SQL and NoSQL; the specific database technologies and depth of coverage have not been supplied.
- Learners had encountered deployment and its concepts through serverless platforms such as Vercel. This does not establish prior experience managing a VPS or Linux server.
- Some learners may also have encountered Hono and the Bun runtime. Treat familiarity with these tools as variable, not a shared prerequisite.

### Implications for Intermediate decks

Rafee intends Intermediate to focus on DevOps and how the infrastructure works under the hood, alongside the syllabus topics on microservices and event-driven systems.

Use their previous experience building APIs, integrating a frontend, persisting data, and deploying an application as the bridge into infrastructure concepts. Recall these ideas briefly where needed instead of repeating the full Basic/Beginner course. Do not assume that having studied a topic means every learner can already apply it independently.

Rafee also notes that Docker has already been studied; the timing, depth, and independent practical ability have not been specified. Use a short recall or readiness check where a demonstration depends on Docker knowledge.

Prior familiarity with Linux CLI, SSH, server administration, networking, reverse proxies, and CI/CD has not been established. Introduce these concepts from the relevant syllabus starting point. Exact historical lesson details remain open; they are not required to begin a deck when its prerequisites can be explained within the session.

## Class format and practical environment

- Classes are online. The standard duration is 90 minutes, with flexibility in actual delivery.
- Rafee describes several ways for learners to demonstrate the relevant learning outcomes: live practice, assignments, and practical assignments submitted afterward. Use this to support flexible lesson activities; consult the supplied SOP/onboarding for program submission and assessment rules.
- Learners do not have their own VPS. Rafee selected local mentee practice plus mentor demonstrations on a VPS. Prepare an accessible local practice path, such as a VM, and use Docker for suitable exercises. Explain which part represents a real server setup; local practice alone does not demonstrate a live VPS deployment. Do not make owning a VPS an assignment/FP prerequisite without a new teaching decision and an accessible arrangement.
- Rafee mentions VirtualBox as a possible Windows VM option. The macOS/Linux options, device capabilities, and installation prerequisites are still to be selected. Check current support before recommending a particular tool; do not assume a uniform laptop environment.

## Practical references and extensions

Rafee mentions Tailscale, Cloudflare, tunneling tools, and Nginx as possible practical references. Introduce them when they help answer a learner need or explain a relevant concept. They are examples, not a mandatory stack or a request to configure services. Explain the problem a tool solves and its place in the architecture before showing configuration.

## Language and teaching presentation

- Default to Indonesian explanations, with familiar English technical terms and tool names where they are standard.
- Keep explanations teachable and concrete. Introduce necessary prerequisites when the supplied context does not establish that they are already known.
- Prefer diagrams as the main explanation, supported by a few short points. Rafee explains the detail verbally; avoid dense paragraphs on the slide.
- Use natural, clear language that is neither stiff nor excessively casual. Avoid generic filler, slogans, and inflated claims.
- Keep a diagram's actors, boundaries, and flow understandable so it can support a spoken explanation. Use concrete examples connected to the APIs learners have already built.
- No specific reference deck has been supplied. Use the design guideline and Rafee's preferences above as the current direction.

## Theme and visual inputs

- Theme `ksm-veterantech-2026` is a draft in [`backend-intermediate-slides/themes/`](./backend-intermediate-slides/themes/). Do not present it as an approved official theme.
- Rafee selected pink `#cd7986` as the color direction within the KSM Veterantech 2026 identity.
- Supplied Veterantech SVG logo and gradient assets are already available in [backend-intermediate-slides/assets/](./backend-intermediate-slides/assets/). Use those originals rather than inventing or redrawing a replacement logo. Their availability does not establish approval of the draft theme.
- The design guideline mentions typefaces that may not be available in the OpenSlide workspace. Check the actual available assets before claiming a font is bundled; use the theme's configured fallback in the meantime.

## Material preparation workflow

1. Read this context and the relevant sources: syllabus for learning outcomes, SOP/onboarding for class and assignment planning, and design references for visual work.
2. Prepare only the requested deliverable: brainstorming, a lesson plan, a mentor runbook, practical examples, or a deck. Do not turn material brainstorming into OpenSlide authoring without a request.
3. For decks, use the current draft theme and supplied assets as a starting point. The Meeting 2 deck exists; file existence does not establish teaching completion or learner acceptance.
4. For work inside OpenSlide, follow [`backend-intermediate-slides/AGENTS.md`](./backend-intermediate-slides/AGENTS.md) and its technical README. Keep confirmed choices separate from proposals and pending votes throughout the materials.
