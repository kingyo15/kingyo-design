export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-2xl sm:text-[30px] font-medium tracking-[-0.03em] text-black leading-none">
      / {children}.
    </span>
  );
}
