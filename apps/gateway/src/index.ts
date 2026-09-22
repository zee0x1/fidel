import express from "express";

import { startWhatsApp } from "./whatsapp.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.disable("x-powered-by");
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok", service: "gateway" });
});

app.listen(port, () => {
  console.log(`Gateway listening on http://localhost:${port}`);
});

await startWhatsApp();
