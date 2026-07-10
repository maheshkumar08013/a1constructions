import React from 'react'

const taglines = [
  '⚙️  Engineering Precision',
  '🏛  Government Approved',
  '⏱  On-Time Delivery',
  '🦺  Safety First',
  '🌿  Sustainable Practices',
  '📋  Full PMC Services',
  '🤝  Client Partnership',
]

export default function TaglineStrip() {
  const doubled = [...taglines, ...taglines]
  return (
    <div className="bg-navy py-3.5 overflow-hidden">
      <div className="flex items-center animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((t, i) => (
          <React.Fragment key={i}>
            <span className="text-white/80 text-[11px] font-semibold tracking-[2px] uppercase font-inter px-6">{t}</span>
            <span className="text-blue-brand text-xs">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
