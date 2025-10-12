import * as React from "react"

export function Button({ className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition ${className}`}
      {...props}
    />
  )
}
