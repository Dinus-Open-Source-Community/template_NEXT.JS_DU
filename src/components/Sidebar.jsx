'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const menuItems = ['Activity', 'List', 'Statistik', 'Setting']

  const handleLogout = () => {
    // Hapus token JWT dari localStorage
    localStorage.removeItem('token')
    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
    // Redirect ke halaman login
    router.push('/login')
  }

  return (
    <aside className="w-[13%] min-w-[200px] bg-white border-r border-gray-200 flex flex-col justify-between py-8 px-4 drop-shadow-xl z-10 h-screen sticky top-0">
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
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

      <button
        onClick={handleLogout}
        className="text-left px-4 py-3 text-red-400 font-medium hover:bg-red-50 rounded-xl transition-all"
      >
        Logout
      </button>
    </aside>
  )
}
