import client from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import PageClient from "./page.client";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const chat = await getChatById(id);

  return {
    title: "React AI | " + chat?.title,
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const chat = await getChatById(id);
  if (!chat) notFound();

  return <PageClient chat={chat} />;
}

const getChatById = cache(async (id: string) => {
  return await client.chat.findFirst({
    where: { id },
    include: { messages: { orderBy: { position: "asc" } } },
  });
});

export type Chat = NonNullable<Awaited<ReturnType<typeof getChatById>>>;
export type Message = Chat["messages"][number];

export const maxDuration = 45;
