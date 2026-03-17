import { cn } from "@/lib/utils";

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const RadioOption = ({ label, selected, onSelect }: RadioOptionProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer",
        selected
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/30"
      )}
    >
      <div
        className={cn(
          "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
          selected ? "border-primary" : "border-muted-foreground/40"
        )}
      >
        {selected && <div className="h-2 w-2 rounded-full bg-primary" />}
      </div>
      {label}
    </button>
  );
};

export default RadioOption;
