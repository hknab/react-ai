import { Button, Input } from "@/components/ui";
import { SendHorizontal } from "lucide-react";
import { FC, FormEventHandler, useState } from "react";

export const PromptInput: FC<{
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setPrompt("");
  };
  return (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="flex gap-2 items-stretch">
        <Input
          name="prompt"
          type="text"
          placeholder="Type your message..."
          className="h-12"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" className="h-12" disabled={isLoading || !prompt}>
          <SendHorizontal size={18} />
        </Button>
      </form>
    </div>
  );
};
