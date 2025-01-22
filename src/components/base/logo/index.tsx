import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const Logo: FC<{ text?: string }> = ({ text = "REACT AI" }) => {
  return (
    <Link href="/" className="font-bold text-lg flex items-center">
      <BrainCircuit className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
      {text}
    </Link>
  );
};
