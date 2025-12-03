'use client'

import React from 'react'

export default function Button({
  type = 'button',
  children,
  onClick,
  leftIcon,
  rightIcon,
  className = 'bg-blue-900 hover:bg-blue-950 font-bold',
}) {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 text-white p-3 rounded-lg duration-300 ${className}`}
      onClick={onClick}
    >
      {leftIcon && <span className="text-lg">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="text-lg">{rightIcon}</span>}
    </button>
  )
}
