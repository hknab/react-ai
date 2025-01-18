"use client";
import { Button, Card, CardContent, Input } from "@/components/ui";
import assert from "assert";
import { startTransition } from "react";
import { createChat } from "./actions";

const Page = () => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-thin tracking-tight">
          What can I help you ship?
        </h1>
        <Card className="bg-background">
          <CardContent className="p-3 ">
            <form
              className="flex items-center gap-2"
              action={async (formData) => {
                startTransition(async () => {
                  const { prompt } = Object.fromEntries(formData);

                  assert.ok(typeof prompt === "string");

                  const { chatId, lastMessageId } = await createChat(prompt);
                  console.log({ chatId, lastMessageId });
                  /*        const { streamPromise } =
                    await getNextCompletionStreamPromise(lastMessageId);
                  startTransition(() => {
                    setStreamPromise(streamPromise);
                    router.push(`/chats/${chatId}`);
                  }); */
                });
              }}
            >
              <div className="relative flex-1">
                <Input
                  name="prompt"
                  placeholder="What do you want to build?"
                  className="pr-20"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      const target = event.target;
                      if (!(target instanceof HTMLTextAreaElement)) return;
                      target.closest("form")?.requestSubmit();
                    }
                  }}
                />
              </div>
              <Button type="submit">Generate</Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Generate a sticky header →
          </Button>
          <Button variant="outline" size="sm">
            How can I structure LLM output? →
          </Button>
          <Button variant="outline" size="sm">
            Write code to implement a min heap →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
