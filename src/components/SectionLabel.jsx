import GoldDivider from './GoldDivider'

export default function SectionLabel({ label, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <p className="text-yellow-500 tracking-[0.4em] text-xs uppercase mb-3">{label}</p>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
      <GoldDivider />
      {subtitle && (
        <p className="text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
