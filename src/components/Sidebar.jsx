import React from 'react'

export default function Sidebar() {
  const menuItems = ['Activity', 'List', 'Statistik', 'Setting']

  return (
    <aside className="w-[13%] min-w-[200px] bg-white border-r border-gray-200 flex flex-col justify-between py-8 px-4 drop-shadow-xl z-10 h-screen sticky top-0">
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <p className="font-bold text-xl tracking-tight">To Do List</p>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`text-left px-4 py-3 rounded-xl font-medium transition-all ${
                item === 'List'
                  ? 'bg-purple-50 text-purple-600 shadow-sm'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <button className="text-left px-4 py-3 text-red-400 font-medium hover:bg-red-50 rounded-xl transition-all">
        Logout
      </button>
    </aside>
  )
}
