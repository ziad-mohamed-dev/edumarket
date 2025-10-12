import * as React from "react"

export function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full ${className}`}>
      {children}
    </span>
  )
}
