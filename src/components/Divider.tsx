export function Divider({ className }: { className?: string }): JSX.Element {
  return <div className={`w-full h-[1px] bg-slate-700 ${className}`}></div>;
}
