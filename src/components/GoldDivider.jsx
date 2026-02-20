export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-600" />
      <div className="w-2 h-2 rotate-45 bg-yellow-500" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-600" />
    </div>
  )
}
