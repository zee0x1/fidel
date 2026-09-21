# Web App

This is the TanStack Start administration dashboard. It lets users sign
in, connect groups, configure moderation, and inspect activity. This project is part of a monorepo rooted two directory levels above
this directory (`../../`). Sibling projects are located in `../`.

## Boundaries

- FastAPI owns authentication, authorization, policies, moderation,
  and application database access.
- Use the server API;
- TanStack server functions may support API access and session transport,
  but must not become a second business-logic backend.
- Follow the agreed authentication integration; do not introduce an
  independent identity or session system.
- Keep service credentials and other secrets out of browser bundles.
- UI permission checks improve usability; FastAPI must enforce access.

## Product Scope

- Build dashboard functionality only;
- Prioritize onboarding, group settings, connection health, and
  moderation history.
- Begin with supported policy presets rather than an unrestricted
  policy builder.
- Clearly distinguish observe mode, enforce mode, and paused moderation.
- Show actual server-reported connection and action states.
- Distinguish model assessments from actions that were executed.
- Never imply deleted WhatsApp messages can be restored.
- Do not present mock data as a functioning integration.

## User Experience

- Use plain language suitable for nontechnical group admins.
- Provide clear loading, empty, success, and failure states.
- Explain what the user can do when pairing, permissions, or connections
  fail.
- Confirm successful saves from the server before presenting settings
  as applied.
- Use accessible labels, keyboard interactions, and readable contrast.
- Make core flows usable on mobile and desktop.
- Keep implementation details out of user-facing copy.

## Implementation

- Follow established project conventions.
- Keep API access centralized and request/response types consistent
  with the server contract.
- Prefer small, focused components over premature UI abstractions.
- Add dependencies only when we need them.

## Development Workflow

- Do not use TDD. Do not add automated tests unless requested.
- Run available lint, type, and build checks appropriate to the change.
- Provide a short manual checklist with steps and expected outcomes.
- Fix feedback on the current block before starting the next one.
