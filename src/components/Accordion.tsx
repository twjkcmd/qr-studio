import { useState } from 'react'

interface AccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-glass-border">
      <div className={`py-4 px-4 ${isOpen ? 'relative' : ''}`}>
        {isOpen && (
          <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-violet rounded-[2px]" />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left font-inter font-medium text-primary hover:text-violet transition-colors relative z-10"
        >
          <span className="text-lg">{title}</span>
          <span className="text-muted font-jetbrains text-xs tracking-[0.02em]">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="pb-4 pl-4 pr-4 transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  )
}
