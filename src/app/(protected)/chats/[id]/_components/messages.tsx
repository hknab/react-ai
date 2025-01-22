"use client";

import { Avatar, AvatarFallback } from "@/components/ui";
import { TMessage } from "@/types";
import { Bot, User } from "lucide-react";
import { FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { extractAllCodeBlocks } from "../_utils";

export const Messages: FC<{ isStreaming: boolean; messages: TMessage[] }> = ({
  isStreaming,
  messages,
}) => {
  console.log({ messages });
  return (
    <>
      {messages
        .filter((message) => message.role !== "system")
        .map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 mb-4 overflow-hidden	  ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <Avatar>
                <AvatarFallback>
                  <Bot size={24} />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-3 max-w-[90%] overflow-hidden	 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {message.role === "assistant" ? (
                <>
                  {extractAllCodeBlocks(message.content).map((part) => {
                    if (part.type === "code")
                      return (
                        <CopyBlock
                          key={part.content}
                          language="tsx"
                          text={part.content}
                          showLineNumbers
                          theme={dracula}
                          codeBlock
                        />
                      );
                    else
                      return (
                        <Markdown
                          remarkPlugins={[remarkGfm]}
                          key={part.content}
                        >
                          {part.content}
                        </Markdown>
                      );
                  })}
                </>
              ) : (
                message.content
              )}
            </div>
            {message.role === "user" && (
              <Avatar>
                <AvatarFallback>
                  <User size={24} />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      {isStreaming && (
        <div className={`flex items-start space-x-2 mb-4 justify-start`}>
          <Avatar>
            <AvatarFallback>
              <Bot size={24} />
            </AvatarFallback>
          </Avatar>
          <div className={`rounded-lg p-3 max-w-[90%] bg-secondary`}>
            generating...
          </div>
        </div>
      )}
    </>
  );
};
