// UIComponents.tsx | ECOSYSTEM_OS | v2.0 | 2026-03-09
import type { ReactNode } from "react";

// === CARD ===
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = "", onClick }: CardProps) => (
  <div
    onClick={onClick}
    className={`rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }: CardProps) => (
  <h2 className={`font-semibold leading-none tracking-tight text-white ${className}`}>
    {children}
  </h2>
);

export const CardDescription = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <p className={`text-sm text-slate-400 ${className}`}>{children}</p>;

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// === BADGE ===
interface BadgeProps {
  children: ReactNode;
  variant?: string;
  className?: string;
  color?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
  color,
}: BadgeProps) => {
  const base =
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors";
  const variants: Record<string, string> = {
    default: "border-transparent bg-emerald-500 text-white shadow",
    outline: "text-slate-400 border-slate-800",
    success: "bg-emerald-900/20 text-emerald-400 border-emerald-800",
    danger: "bg-red-900/20 text-red-400 border-red-800",
    warning: "bg-amber-900/20 text-amber-400 border-amber-800",
    cyan: "bg-cyan-900/20 text-cyan-400 border-cyan-800",
  };
  const resolved = color || variants[variant] || variants.default;
  return <div className={`${base} ${resolved} ${className}`}>{children}</div>;
};

// === PROGRESS ===
interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export const Progress = ({
  value,
  className = "",
  indicatorClassName = "bg-emerald-500",
}: ProgressProps) => (
  <div className={`h-1.5 w-full bg-slate-800 rounded-full overflow-hidden ${className}`}>
    <div
      className={`h-full rounded-full transition-all duration-500 ${indicatorClassName}`}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// === SCROLL AREA ===
export const ScrollArea = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`overflow-y-auto scrollbar-thin ${className}`}>{children}</div>;

// === STAT BLOCK ===
interface StatBlockProps {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

export const StatBlock = ({
  label,
  value,
  sub,
  color = "text-white",
}: StatBlockProps) => (
  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
    <div className="text-[9px] text-slate-500 uppercase font-mono tracking-widest mb-1">{label}</div>
    <div className={`text-lg font-black ${color}`}>{value}</div>
    {sub && <div className="text-[9px] text-slate-600 mt-0.5">{sub}</div>}
  </div>
);

// === TIMELINE ITEM ===
interface TimelineItemProps {
  date: string;
  title: string;
  desc: string;
  status: "done" | "current" | "future";
}

export const TimelineItem = ({ date, title, desc, status }: TimelineItemProps) => {
  const dotColor =
    status === "done"
      ? "bg-emerald-500"
      : status === "current"
      ? "bg-cyan-400 animate-pulse"
      : "bg-slate-700";
  const textColor =
    status === "done"
      ? "text-emerald-400"
      : status === "current"
      ? "text-cyan-400"
      : "text-slate-500";
  return (
    <div className="relative">
      <div
        className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${dotColor}`}
      />
      <div className={`text-[9px] font-mono uppercase tracking-widest ${textColor}`}>{date}</div>
      <div className="text-xs font-bold text-white mt-0.5">{title}</div>
      <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
    </div>
  );
};

// === CHECK ITEM ===
interface CheckItemProps {
  text: string;
  checked?: boolean;
}

export const CheckItem = ({ text, checked = false }: CheckItemProps) => (
  <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer group">
    <div
      className={`mt-0.5 w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
        checked
          ? "bg-emerald-600 border-emerald-500"
          : "border-slate-600 group-hover:border-slate-400"
      }`}
    >
      {checked && <span className="text-white text-[9px]">&#10003;</span>}
    </div>
    <span className={checked ? "line-through text-slate-600" : ""}>{text}</span>
  </label>
);
