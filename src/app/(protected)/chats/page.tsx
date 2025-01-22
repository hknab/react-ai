"use client";
import { Button, Input } from "@/components/ui";
import assert from "assert";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, startTransition, useState } from "react";
import { createChatAction } from "./actions";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { prompt } = Object.fromEntries(formData.entries());
    setIsLoading(true);
    startTransition(async () => {
      assert.ok(typeof prompt === "string");
      const { chatId } = await createChatAction(prompt);
      router.push(`/chats/${chatId}`);
    });
  };

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="mx-auto  px-4 py-8 w-full">
        <h1 className="mb-8 text-center text-4xl font-thin tracking-tight">
          What can I help you ship?
        </h1>
        <form
          className="flex items-stretch gap-2 min-w-72 h-full w-full  max-w-[720px] mx-auto"
          onSubmit={handleForm}
        >
          <div className="relative flex-1 w-full ">
            <Input
              name="prompt"
              placeholder="What do you want to build?"
              className="w-full h-full"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12"
            disabled={isLoading}
          >
            <SendHorizontal className="text-4xl" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
