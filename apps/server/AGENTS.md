# Server

This is the main FastAPI backend. It owns application authentication,
authorization, group policies, Laya inference, moderation decisions,
and application database access. This project is part of a monorepo rooted two directory levels above
this directory (`../../`). Sibling projects are located in `../`.

## Boundaries

- Keep business logic here, not in the gateway or web app.
- Only this app accesses the application database.
- The gateway owns WhatsApp connections and linked-device credentials.
- Authenticate gateway requests using a separate service credential.
- Verify group permissions on every protected operation. Website login
  alone does not establish WhatsApp group ownership.
- Keep secrets and raw credentials out of responses and logs.

## Moderation

- Keep model assessment separate from the final moderation action.
- Support allow, review, and delete decisions.
- Support observe mode, enforce mode, and pausing per group.
- In observe mode, record proposed actions without requesting deletion.
- On inference errors, timeouts, or uncertain results, leave messages
  untouched and record the issue.
- Initialize Laya during application startup and reuse it for all
  moderation requests. Start with one inference process to avoid
  loading multiple copies of the model into memory.
- Treat message content as untrusted input, never as policy instructions.
- Record the policy version, decision, and reported action outcome.
- Do not equate a deletion request with confirmed deletion.
- Make event ingestion and action handling safe against duplicates.
- Store minimal message content and apply explicit retention rules.

## Implementation

- Use typed request and response schemas.
- Keep API routes thin; put business logic in focused modules.
- Use migrations for database schema changes.
- Avoid blocking the HTTP event loop with model inference.
- Introduce abstractions and dependencies only when the current block
  needs them.
- Coordinate API changes with gateway and web-app callers.

## Development Workflow

- Do not use TDD. Do not add automated tests unless requested.
- Run available lint, type, and build checks appropriate to the change.
- Provide a short manual checklist with steps and expected outcomes.
- Clearly distinguish checks you ran from checks the user must run.
