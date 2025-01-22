export function extractAllCodeBlocks(input: string) {
  if (!input?.length) return [];
  const codeBlockRegex = /```(?:tsx|ts)(?:\{[^}]*\})?\n([\s\S]*?)\n```/g;
  let match;
  const parts = [];
  let lastIndex = 0;

  while ((match = codeBlockRegex.exec(input)) !== null) {
    // Push the text before the current code block
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: input.substring(lastIndex, match.index).trim(),
      });
    }
    // Push the code block itself
    parts.push({ type: "code", content: match[1].trim() });
    lastIndex = codeBlockRegex.lastIndex;
  }

  // Push the remaining text after the last code block
  if (lastIndex < input.length) {
    parts.push({ type: "text", content: input.substring(lastIndex).trim() });
  }

  return parts;
}
