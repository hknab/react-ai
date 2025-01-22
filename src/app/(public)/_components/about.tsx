import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SOCIAL } from "@/constants/links";
import { Github } from "lucide-react";
import Link from "next/link";

export const AboutSection = () => {
  return (
    <section id="about" className="py-12 ">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20 mx-auto">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <div className="mt-6">
                  What is
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    REACT AI?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[95%] text-xl text-muted-foreground text-center">
              React AI is a web application for generating React components
              based on natural language input. It is powered by Meta’s
              Llama-3.3-70B model and Together AI’s inference infrastructure,
              which handle the natural language processing and code generation
              tasks. The frontend is built using Next.js and styled with
              Tailwind CSS to ensure a responsive and optimized user interface.
              Sandpack is integrated to provide live, interactive previews of
              the generated React components, enabling seamless testing and
              iteration within the browser.
            </CardContent>

            <CardFooter>
              <Button asChild>
                <Link href={SOCIAL.GITHUB_REPO} target="_blank">
                  <Github /> Github
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
