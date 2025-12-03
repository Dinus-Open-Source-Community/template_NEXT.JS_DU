import React from 'react'

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-10">
      <div className="flex items-baseline gap-6">
        <h1 className="text-4xl font-bold text-gray-300">Nov 11</h1>
        <div className="relative">
          <h1 className="text-4xl font-bold text-gray-800">Today</h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
        </div>
        <h1 className="text-4xl font-bold text-gray-300">Nov 13</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm font-medium">Categories: 3/4</span>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:bg-gray-100">
            &lt;
          </button>
          <button className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:bg-gray-100">
            &gt;
          </button>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gray-300 ml-4 overflow-hidden border">
          {/* Ganti src image sesuai kebutuhan */}
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
