"use client";

import { Button } from "@/components/ui";
import { Code, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { chatCompletion, createMessage } from "../actions";
import type { Chat } from "./page";

import { Logo } from "@/components/base";
import { ReactCodeRunner } from "@/components/feature";
import { TMessage } from "@/types";
import assert from "assert";
import { CodeLoading, Messages, PromptInput } from "./_components";
import { getFirstCodeBlock } from "./_utils";

export default function PageClient({ chat }: { chat: Chat }) {
  const [messages, setMessages] = useState<typeof chat.messages>(chat.messages);

  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isMessageCreating, setIsMessageCreating] = useState<boolean>(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const createdFirstAssistantResponse = useRef<boolean>(false);

  const lastMessage = messages[messages.length - 1];

  const scrollToBottom = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollToBottom();
    }
    if (lastMessage.role === "user" && !createdFirstAssistantResponse.current) {
      getAssistantAnswer(lastMessage);
      createdFirstAssistantResponse.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAssistantAnswer = useCallback(async (userMessage: TMessage) => {
    if (userMessage.role === "assistant") return;
    setIsStreaming(true);

    const res = (await chatCompletion(userMessage.id)) || [];
    let content = "";
    for await (const token of res) {
      content += token.choices[0].delta.content;
    }
    await createAnewMessage({ messageContent: content, role: "assistant" });
    setIsStreaming(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAnewMessage = useCallback(
    async ({
      messageContent,
      role,
    }: {
      role: "assistant" | "user";
      messageContent: string;
    }) => {
      const message = await createMessage({
        chatId: chat.id,
        role: role,
        text: messageContent,
      });
      setMessages((prev) => [...prev, message]);
      setTimeout(() => {
        scrollToBottom();
      }, 300);
      if (message.role === "user") {
        getAssistantAnswer(message);
      }
    },
    [chat.id, getAssistantAnswer]
  );

  const handleSubmitPrompt: (prompt: string) => void = async (prompt) => {
    setIsMessageCreating(true);
    assert.ok(typeof prompt === "string");
    await createAnewMessage({ messageContent: prompt, role: "user" });

    setIsMessageCreating(false);
  };
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row overflow-hidden h-full">
        <div
          className={`flex flex-col border-r flex-1  ${
            isResultVisible ? "hidden md:flex" : "flex"
          }`}
          style={{ minWidth: "50%" }}
        >
          <div className="p-4 border-b flex justify-start gap-4 items-center">
            <Logo text={chat.title} />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-auto"
              onClick={() => setIsResultVisible(true)}
            >
              <Code size={24} />
            </Button>
          </div>

          <div
            className="flex-grow p-4 pb-0 [&>div>div]:!block overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 138px)" }}
            ref={scrollRef}
          >
            <Messages isStreaming={isStreaming} messages={messages} />
          </div>
          <PromptInput
            onSubmit={handleSubmitPrompt}
            isLoading={isMessageCreating || isStreaming}
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          className={`hidden fixed top-1 right-1 z-50 md:flex ${
            isResultVisible && "flex"
          }`}
          onClick={() => setIsResultVisible(false)}
        >
          <X size={24} />
        </Button>

        <div
          className={` flex-grow  h-full ${
            isResultVisible ? "flex" : "hidden md:flex"
          }`}
        >
          {Boolean(
            !isStreaming &&
              getFirstCodeBlock({ messages }).length &&
              lastMessage.role === "assistant" &&
              !isMessageCreating
          ) && <ReactCodeRunner code={getFirstCodeBlock({ messages })} />}
          {isStreaming && <CodeLoading />}
          {Boolean(!getFirstCodeBlock({ messages }).length && !isStreaming) && (
            <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-primary to-secondary text-white">
              No Code Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
