import { TMessage } from "@/types";
import { extractAllCodeBlocks } from "./extract-all-code-blocks";

export const getFirstCodeBlock = ({ messages }: { messages: TMessage[] }) => {
  const assistantMessage = messages.filter(
    (message) => message.role === "assistant"
  );

  const lastAssistantMessage = assistantMessage.length
    ? assistantMessage[assistantMessage.length - 1]
    : { content: "" };

  const codes = extractAllCodeBlocks(lastAssistantMessage.content).filter(
    (part) => part.type === "code"
  );
  return (Boolean(lastAssistantMessage) && codes[0]?.content) || "";
};
