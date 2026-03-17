import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface SelectableCardProps {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const SelectableCard = ({ icon, label, selected, onToggle }: SelectableCardProps) => {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={cn(
        "relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 text-center transition-all duration-200 cursor-pointer",
        selected
          ? "border-primary bg-primary/5 shadow-card-hover"
          : "border-border bg-card hover:border-primary/30 hover:shadow-card shadow-soft"
      )}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="h-3 w-3 text-primary-foreground" />
        </motion.div>
      )}
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
    </motion.button>
  );
};

export default SelectableCard;
