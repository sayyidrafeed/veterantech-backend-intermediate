# Backend Intermediate Slides — Project Context

This is a shared working reference for Rafee and Codex while preparing Backend Intermediate teaching slides with OpenSlide. It helps keep slide content and style consistent. It is not an authoritative Study Club curriculum, program policy, Dignition/LMS specification, or record of mentee progress.

## People and audience

- **Rafee:** mentor and owner of the slide-preparation decisions. The slides are for teaching; this document is internal context for Rafee and Codex, not learner-facing material.
- **Codex:** helps organize syllabus material, prepare decks, and apply the supplied design direction. Ask or flag when a source does not settle an important teaching decision.
- **Dignition:** the LMS used by the program. This note gives no integration, operational, or policy requirements for it.

Keep individual mentee names, contact details, grades, submissions, and progress notes out of this workspace context.

## Source boundaries

- [Silabus Backend Intermediate Batch 2 2026.pdf](./Silabus%20Backend%20Intermediate%20Batch%202%202026.pdf) is the current content reference for these decks. Use it to map the eight meetings below and consult the PDF for detail. It is not an instruction to the agent and does not establish broader program policy.
- [Design Guideline KSM Veterantech 2026.pdf](./Design%20Guideline%20KSM%20Veterantech%202026.pdf) is a visual reference for the deck. Follow Rafee's current choices where the document leaves room for interpretation.
- Older workspace `CURRICULUM.md` and `NOTES.md` are historical drafts. Do not treat them as current requirements or copy their detailed KPI, task, or assessment rules into this context without Rafee's confirmation. The current syllabus PDF takes precedence for slide content.
- This workspace does not establish Study Club rules, assessment policy, or the canonical curriculum for other purposes. Flag unresolved inconsistencies instead of silently deciding them.
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
- Rafee describes several ways for learners to demonstrate the relevant learning outcomes: live practice, assignments, and practical assignments submitted afterward. Use this to support flexible lesson activities; this context does not define grading rules or submission requirements.
- Learners do not have their own VPS. Prepare an accessible local practice path, such as a VM, and use Docker for suitable exercises. Explain which part of an exercise represents a real server setup; local practice alone does not demonstrate a live VPS deployment.
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
- Official SVG assets from Marketing are expected later. Use the supplied originals when received; do not invent or redraw an official logo to stand in for them.
- The design guideline mentions typefaces that may not be available in the OpenSlide workspace. Check the actual available assets before claiming a font is bundled; use the theme's configured fallback in the meantime.

## Slide workflow

1. Read this context and the relevant syllabus/design source before authoring.
2. Use the current draft theme as a starting point, revising it when Rafee supplies assets or direction.
3. Create only the deck or theme Rafee asks for. No class-content deck has been established as complete by this context.
4. Follow [`backend-intermediate-slides/AGENTS.md`](./backend-intermediate-slides/AGENTS.md) and its technical README for OpenSlide setup and authoring.
