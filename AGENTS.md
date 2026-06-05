# ObjectStack Website — AGENTS.md

Guidance for AI agents working on this Astro marketing site.

## Product Positioning

This website presents ObjectStack as an AI-native application development platform for developers, architects, and platform teams.

Core message:

> ObjectStack helps teams build AI-native applications with AI, either from source code or in an online development workspace. Developers define objects, permissions, UI, APIs, actions, and AI tool surfaces once; ObjectOS runs those applications so every app can interact with AI under governance.

Write for technical buyers and builders first. Business users matter, but this site is not primarily a no-code product page.

## Audience

Primary:
- Backend developers building internal tools or enterprise SaaS.
- Platform engineers standardizing AI-native application development and runtime platforms.
- Architects evaluating governance, deployment, and data-source portability.
- Developers using AI coding agents to generate, review, and maintain applications.

Secondary:
- CTOs and engineering leaders evaluating enterprise readiness.

## Information Architecture

Prefer task-oriented navigation over flat product-name navigation.

Top navigation should stay organized around:
- Platform: ObjectStack, ObjectQL, ObjectOS, ObjectUI.
- Developers: Docs, Quickstart, CLI, Studio, GitHub.
- AI Development: Agents, MCP tools, guardrails, metadata as context.
- Enterprise: Solutions, security/runtime, deployment, contact sales.
- Blog as a direct link.
- Keep pricing hidden from primary navigation until pricing is decided.
- Keep docs inside the developer navigation, not as a top-right CTA.
- Use a language dropdown because more locales are expected.

Important product distinctions:
- ObjectStack: the AI-native application development platform and primary developer entry point. It supports source-code development through the framework/CLI and online development through ObjectCloud/Studio.
- ObjectOS: the AI-native application runtime platform. All applications running on ObjectOS should be able to interact with AI through governed actions, MCP tools, audit, permissions, and shared identity.
- ObjectQL: the query engine and driver contract. Do not describe it as the whole framework.
- ObjectUI: the schema-driven frontend renderer for developers.
- ObjectCloud: the soon-to-open cloud development workspace and runtime preview path. `Start Building` links to `/cloud`.
- Object Studio: visual metadata development environment. It is not CLI and not ObjectCloud.
- ObjectStack CLI: independent command-line tool for scaffolding, validation, build, CI/CD, and deployment.

## Copy Rules

- Lead with AI-native application development, then runtime AI interaction, then enterprise governance.
- Say "AI-native application development platform" for ObjectStack.
- Say "AI-native application runtime platform" for ObjectOS.
- Make it clear ObjectStack supports both source-code development and online development.
- Make it clear applications running on ObjectOS can interact with AI through governed actions/tools.
- Be concrete: objects, permissions, actions, views, SDKs, APIs, MCP tools, audit, drivers, artifacts.
- Avoid generic AI marketing: "transform your business", "unlock potential", "AI magic", and similar filler.
- Do not overstate availability. ObjectCloud is opening soon; avoid implying it is GA unless copy explicitly says so.
- Keep ObjectQL in the infrastructure/query layer story.
- Keep Studio and CLI separate.

## Localization

English and Simplified Chinese are maintained in `src/data/messages/`.

- Maintain `en` and `zh-Hans` by hand.
- `zh-Hant` is generated from `zh-Hans` with OpenCC by `scripts/gen-zh-hant.mjs`.
- When adding Chinese blog content, write the `*.zh-Hans.mdx` source and let the script generate `*.zh-Hant.mdx`.
- Do not edit generated `zh-Hant` files unless you remove the generated marker and intentionally hand-maintain that file.
- Update English and Simplified Chinese together when changing product copy.
- Keep terminology consistent:
  - Framework -> Framework / 框架
  - Query engine -> 查询引擎
  - Driver contract -> Driver 契约
  - Metadata -> 元数据
  - Runtime -> 运行时
  - MCP tools -> MCP 工具
  - Guardrails -> 护栏 or 治理边界 depending on context

## Routes

Keep localized routes under `/en/*`, `/zh-Hans/*`, and `/zh-Hant/*`.

Important routes:
- `/objectstack` framework
- `/objectql` query engine
- `/objectos` runtime
- `/objectui` frontend renderer
- `/cloud` cloud development and runtime preview, opening soon
- `/studio` visual metadata development
- `/cli` independent command-line tool
- `/agents` AI development, MCP tools, guardrails
- `/solutions`, `/enterprise`, `/pricing`, `/blog`

Pricing may remain routable, but do not surface it in header or footer navigation until the offer is finalized.

Do not create a new route if an existing route already matches the concept. For example, cloud development belongs on `/cloud`, not `/cloud-development`.

## Visual Direction

Enterprise developer tool, not consumer SaaS and not a decorative AI landing page.

Prefer:
- Clear hierarchy.
- Dense but readable information.
- Product diagrams, architecture panels, code panels, metadata/tool examples.
- White or near-white surfaces, restrained green accents, low shadow, thin borders.
- 8px or smaller border radius.

Avoid:
- Stock photography.
- Decorative gradient blobs.
- Purple-blue AI gradients.
- Marketing-only hero layouts.
- Floating card stacks with vague copy.

## Verification

Before reporting UI/content work as complete:

```bash
pnpm check
pnpm build
```

For route changes, verify the affected localized paths return 200 in the preview server.
