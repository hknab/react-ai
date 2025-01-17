import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="font-bold text-lg flex items-center">
      <BrainCircuit className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
      REACT AI
    </Link>
  );
};
