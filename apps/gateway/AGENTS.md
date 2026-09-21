# Gateway

This is a Node.js + Express.js + TypeScript worker using Baileys. It connects WhatsApp
to the server and executes server-authorized messaging actions. This project is part of a monorepo rooted two directory levels above
this directory (`../../`). Sibling projects are located in `../`.

## Boundaries

- Own WhatsApp pairing, connection lifecycle, and linked-device state.
- Forward incoming messages to the server.
- Execute moderation actions returned by the server.
- Report connection status and action outcomes to the server.
- Do not implement policies, Laya inference, user authentication, or
  application authorization here.
- Do not access the application database.
- Persist WhatsApp session state separately from application data.

## WhatsApp Behavior

- Process only explicitly enabled groups.
- Initially support new text messages; do not silently expand scope.
- Ignore bot-generated messages and irrelevant protocol events.
- Preserve identifiers required to target the exact original message.
- Never substitute local deletion for deletion for everyone.
- Handle missing admin permissions as an explicit action failure.
- Reconnect with bounded backoff and persist updated session state.
- Do not retry permanently invalid actions indefinitely.
- Prevent duplicate events or retries from repeating completed actions.

## Security and Operations

- Keep pairing codes, QR data, session keys, and tokens out of logs,
  source control, and public endpoints.
- Report useful health information without exposing message contents
  or credentials unnecessarily.
- Keep Baileys-specific details inside the WhatsApp integration code.
- Avoid designing a multi-platform framework before it is needed.

## Development Workflow

- Do not use TDD. Do not add automated tests unless requested.
- Run available lint, type, and build checks appropriate to the change.
- Provide a short manual checklist with steps and expected outcomes.
- Identify checks requiring a real WhatsApp account or a second device.
- Never claim live pairing, delivery, or deletion was verified unless
  it was actually observed.
- Stop at the block boundary for manual acceptance before continuing.
- Fix feedback on the current block before starting the next one.
