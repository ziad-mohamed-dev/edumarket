import * as React from "react"

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className="text-2xl font-semibold text-gray-800">{children}</h2>
}

export function DialogContent({ children, className = "" }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>
}
