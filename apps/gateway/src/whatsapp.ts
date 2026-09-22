import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WAMessage,
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

import { sendMessageToFidelServer } from "./fidel-server.js";
import { MessageQueue } from "./message-queue.js";
import { Boom } from "@hapi/boom";

const TEST_GROUP_JID = process.env.GROUP_JID;

export async function startWhatsApp(): Promise<void> {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const whatsapp = makeWASocket({ auth: state });

  whatsapp.ev.on("creds.update", saveCreds);

  whatsapp.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log("Scan this QR code in WhatsApp > Linked devices:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;

      if (statusCode === DisconnectReason.loggedOut) {
        console.log(
          "WhatsApp logged out. Delete auth_info and pair the account again.",
        );
        return;
      }

      console.log(
        `WhatsApp connection closed (status: ${statusCode ?? "unknown"}). Reconnecting...`,
      );
      startWhatsApp();
      return;
    }

    if (connection) {
      console.log(`WhatsApp connection: ${connection}`);
    }
  });

  const messageQueue = new MessageQueue(async (message: WAMessage) => {
    const response = await sendMessageToFidelServer(message);
    if (response.type === "reply" && response.text && message.key.remoteJid) {
      whatsapp.sendMessage(message.key.remoteJid, { text: response.text });
    }
  });

  whatsapp.ev.on("messages.upsert", ({ messages, type }) => {
    console.log(
      "[WA MESSAGE RECIEVED] : ",
      JSON.stringify({
        messages,
        type,
        groupId: TEST_GROUP_JID,
      }),
    );

    if (type !== "notify") {
      return;
    }

    for (const message of messages) {
      if (message.key.remoteJid === TEST_GROUP_JID) {
        messageQueue.enqueue(message);
      }
    }
  });
}
