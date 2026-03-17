import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Bot, Sparkles, AppWindow, Workflow, BarChart3, Globe, Headset, HelpCircle, Wrench, FileText, Users, Brain, Zap, Send, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectableCard from "@/components/SelectableCard";
import RadioOption from "@/components/RadioOption";
import ProgressBar from "@/components/ProgressBar";
import SuccessScreen from "@/components/SuccessScreen";
import logo from "@/assets/binary-roots-logo.png";

const ROLES = [
  "CTO / CIO",
  "IT Manager",
  "Business Analyst",
  "Operations Head",
  "Founder / CEO",
  "Developer",
  "Other",
];

const INTERESTS = [
  { icon: <Bot className="h-5 w-5" />, label: "AI Agents / Automation" },
  { icon: <Sparkles className="h-5 w-5" />, label: "Microsoft Copilot / Copilot Studio" },
  { icon: <AppWindow className="h-5 w-5" />, label: "Power Apps" },
  { icon: <Workflow className="h-5 w-5" />, label: "Power Automate" },
  { icon: <BarChart3 className="h-5 w-5" />, label: "Power BI" },
  { icon: <Globe className="h-5 w-5" />, label: "SharePoint / Intranet" },
  { icon: <Headset className="h-5 w-5" />, label: "Managed Services" },
  { icon: <HelpCircle className="h-5 w-5" />, label: "Not sure – need guidance" },
];

const IMPROVEMENTS = [
  { icon: <Wrench className="h-5 w-5" />, label: "Reduce manual work" },
  { icon: <FileText className="h-5 w-5" />, label: "Improve reporting" },
  { icon: <Zap className="h-5 w-5" />, label: "Automate approvals" },
  { icon: <AppWindow className="h-5 w-5" />, label: "Build internal tools" },
  { icon: <Users className="h-5 w-5" />, label: "Improve collaboration" },
  { icon: <Brain className="h-5 w-5" />, label: "Explore AI use cases" },
];

const TIMELINES = ["Immediate (0–1 month)", "1–3 months", "Exploring"];
const INTENTS = ["Quick demo", "Free consultation", "Just information"];

const Index = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [intent, setIntent] = useState("");
  const [notes, setNotes] = useState("");

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSelection = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const filledSections = [
    name && email && company && role,
    interests.length > 0,
    improvements.length > 0,
    timeline && intent,
  ].filter(Boolean).length;
  const progress = (filledSections / 4) * 100;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Required";
    if (!email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
    if (!company.trim()) errs.company = "Required";
    if (!role) errs.role = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName(""); setEmail(""); setCompany(""); setRole("");
    setInterests([]); setImprovements([]); setTimeline(""); setIntent(""); setNotes("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <img src={logo} alt="Binary Roots" className="h-10 w-auto" />
          <span className="text-xs text-muted-foreground hidden sm:block">
            AI · Power Platform · Microsoft 365 Solutions
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessScreen key="success" interests={interests} onReset={handleReset} />
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Hero */}
              <section className="text-center mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3"
                >
                  Let's Build Something Smarter
                  <br />
                  <span className="bg-clip-text text-transparent gradient-primary">with AI & Microsoft</span>
                </motion.h1>
                <p className="text-muted-foreground max-w-lg mx-auto mb-4">
                  Met us at Convergence India? Share your requirement and we'll suggest a tailored solution.
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Gift className="h-4 w-4" /> Get a use-case idea within 48 hours
                </span>
              </section>

              {/* Progress */}
              <div className="mb-8">
                <ProgressBar progress={progress} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Section 1: Basic Info */}
                <Section title="Basic Information" icon={<Users className="h-5 w-5 text-primary" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" error={errors.name}>
                      <Input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                    </Field>
                    <Field label="Work Email" error={errors.email}>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                    </Field>
                    <Field label="Company Name" error={errors.company}>
                      <Input
                        placeholder="Acme Corp"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={errors.company ? "border-destructive" : ""}
                      />
                    </Field>
                    <Field label="Role / Designation" error={errors.role}>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select role</option>
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Section>

                {/* Section 2: Interests */}
                <Section title="What are you interested in?" icon={<Sparkles className="h-5 w-5 text-primary" />}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {INTERESTS.map((item) => (
                      <SelectableCard
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        selected={interests.includes(item.label)}
                        onToggle={() => toggleSelection(interests, setInterests, item.label)}
                      />
                    ))}
                  </div>
                </Section>

                {/* Section 3: Improvements */}
                <Section title="What do you want to improve?" icon={<Zap className="h-5 w-5 text-primary" />}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {IMPROVEMENTS.map((item) => (
                      <SelectableCard
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        selected={improvements.includes(item.label)}
                        onToggle={() => toggleSelection(improvements, setImprovements, item.label)}
                      />
                    ))}
                  </div>
                </Section>

                {/* Section 4: Priority & Intent */}
                <Section title="Priority & Intent" icon={<Calendar className="h-5 w-5 text-primary" />}>
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Timeline</p>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINES.map((t) => (
                          <RadioOption key={t} label={t} selected={timeline === t} onSelect={() => setTimeline(t)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">What are you looking for?</p>
                      <div className="flex flex-wrap gap-2">
                        {INTENTS.map((i) => (
                          <RadioOption key={i} label={i} selected={intent === i} onSelect={() => setIntent(i)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Optional */}
                <Section title="Anything else?" icon={<FileText className="h-5 w-5 text-primary" />}>
                  <Textarea
                    placeholder="Tell us briefly (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </Section>

                {/* CTA */}
                <div className="flex flex-col items-center gap-3 pt-4">
                  <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full sm:w-auto">
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="h-4 w-4" /> Get My Use Case Idea</>
                    )}
                  </Button>
                  <button type="button" className="text-sm text-primary hover:underline underline-offset-4 transition-colors">
                    Or book a 15-min discussion →
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">
          AI · Power Platform · Microsoft 365 Solutions — © {new Date().getFullYear()} Binary Roots
        </p>
      </footer>
    </div>
  );
};

// Helpers
const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    {children}
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

export default Index;
