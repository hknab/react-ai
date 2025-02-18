"use server";

import { MODELS } from "@/constants";
import { getSystemPrompt } from "@/lib/get-prompt";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Together from "together-ai";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { z } from "zod";

export async function createChatAction(prompt: string) {
  const chat = await prisma.chat.create({
    data: {
      prompt,
      title: "",
      model: MODELS["meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"],
    },
  });

  const together = new Together();

  async function fetchTitle() {
    const responseForChatTitle = await together.chat.completions.create({
      model: MODELS["meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"],
      messages: [
        {
          role: "system",
          content:
            "You are a chatbot helping the user create a simple app or script, and your current job is to create a succinct title, maximum 3-5 words, for the chat given their initial prompt. Please return only the title.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    const title = responseForChatTitle.choices[0].message?.content || prompt;
    return title;
  }

  async function fetchTopExample() {
    const findSimilarExamples = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful bot. Given a request for building an app, you match it to the most similar example provided. If the request is NOT similar to any of the provided examples, return "none". Here is the list of examples, ONLY reply with one of them OR "none":

          - landing page
          - blog app
          - quiz app
          - pomodoro timer
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const mostSimilarExample =
      findSimilarExamples.choices[0].message?.content || "none";
    return mostSimilarExample;
  }

  const [title, mostSimilarExample] = await Promise.all([
    fetchTitle(),
    fetchTopExample(),
  ]);

  const userMessage: string = prompt;

  const newChat = await prisma.chat.update({
    where: {
      id: chat.id,
    },
    data: {
      title,
      messages: {
        createMany: {
          data: [
            {
              role: "system",
              content: getSystemPrompt(mostSimilarExample),
              position: 0,
            },
            { role: "user", content: userMessage, position: 1 },
          ],
        },
      },
    },
    include: {
      messages: true,
    },
  });

  const lastMessage = newChat.messages
    .sort(
      (a: { position: number }, b: { position: number }) =>
        a.position - b.position
    )
    .at(-1);
  if (!lastMessage) throw new Error("No new message");

  return {
    chatId: chat.id,
    lastMessageId: lastMessage.id,
  };
}

export async function createMessage({
  chatId,
  role,
  text,
}: {
  chatId: string;
  text: string;
  role: "assistant" | "user";
}) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
  if (!chat) notFound();

  const maxPosition = Math.max(
    ...chat.messages.map((m: { position: number }) => m.position)
  );

  const newMessage = await prisma.message.create({
    data: {
      role,
      content: text,
      position: maxPosition + 1,
      chatId,
    },
  });

  return newMessage;
}

export async function chatCompletion(messageId: string) {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  if (!message) notFound();

  const messagesRes = await prisma.message.findMany({
    where: { chatId: message.chatId, position: { lte: message.position } },
    orderBy: { position: "asc" },
  });
  if (messagesRes[messagesRes.length - 1].role === "assistant") return;

  let messages = z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })
    )
    .parse(messagesRes);

  if (messages.length > 4) {
    messages = [messages[0], messages[1], ...messages.slice(-2)];
  }

  const together = new Together();

  const res = await together.chat.completions.create({
    model: MODELS["meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"],
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    stream: true,
    temperature: 0.2,
  });
  return res;
}
