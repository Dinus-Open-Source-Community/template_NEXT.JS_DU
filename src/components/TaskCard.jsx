import React from 'react'

export default function TaskCard({ title, desc, time, type, isDone = false }) {
  // Config warna
  const styles = {
    work: { border: 'border-blue-400', text: 'text-blue-500', icon: 'bg-blue-50 text-blue-500' },
    home: { border: 'border-yellow-400', text: 'text-yellow-500', icon: 'bg-yellow-50 text-yellow-500' },
    other: { border: 'border-purple-400', text: 'text-purple-500', icon: 'bg-purple-50 text-purple-500' },
    done: { border: 'border-red-400', text: 'text-red-500', icon: 'bg-red-100 text-red-500' },
  }

  // Fallback ke 'work' kalau type gak dikenali
  const currentStyle = styles[type] || styles.work

  return (
    <div
      className={`w-full bg-white p-5 rounded-2xl drop-shadow-sm border border-gray-100 flex gap-4 mb-4 ${
        isDone ? 'opacity-60 grayscale-[0.5]' : ''
      }`}
    >
      {/* Garis warna di kiri */}
      <div className={`h-full w-1 rounded-full ${currentStyle.border} border-l-4`}></div>

      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-start">
          <h3 className={`font-bold text-lg leading-tight ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {title}
          </h3>
          {/* Check Icon */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStyle.icon}`}>
            <span className="text-xs">✓</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{desc}</p>
        <p className={`text-sm font-semibold mt-2 ${currentStyle.text}`}>{time}</p>
      </div>
    </div>
  )
}
