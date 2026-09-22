import type { WAMessage } from "@whiskeysockets/baileys";

export type FidelDecision = {
  type: string;
  text?: string;
};

export async function sendMessageToFidelServer(
  message: WAMessage,
): Promise<FidelDecision> {
  console.log("Fidel Server stub received message:", JSON.stringify(message));

  //stubbed for now (just handling text), will need to properly establish communication with fidel server
  const response = {
    type: "reply",
    text: `Wassup Goatsss : ${message.message?.conversation}`,
  };

  return response;
}
