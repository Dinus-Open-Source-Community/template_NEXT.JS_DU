import React from 'react'

export default function TaskColumn({ title, colorClass, completed, total, children }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-6 text-gray-500 font-bold tracking-wider text-sm uppercase">
        <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
        {title}
        <span className="text-gray-300 ml-auto">...</span>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar flex-1">{children}</div>

      {/* Column Footer (Progress & Add Button) */}
      <div className="mt-auto pt-4">
        <div className="flex justify-between text-xs text-gray-500 font-bold mb-1">
          <span>
            Completed: {completed}/{total}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div className={`h-1.5 rounded-full ${colorClass}`} style={{ width: `${percentage}%` }}></div>
        </div>

        <button className="flex items-center gap-2 text-gray-600 font-bold text-sm hover:text-gray-900 transition group">
          <div
            className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-lg shadow-md transition-transform group-hover:scale-110 ${colorClass}`}
          >
            +
          </div>
          Add task
        </button>
      </div>
    </div>
  )
}
