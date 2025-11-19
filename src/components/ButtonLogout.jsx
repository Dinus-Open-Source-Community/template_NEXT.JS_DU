'use client'

import { Button } from '@heroui/react'

export default function App({ children }) {
  return <Button className="bg-black hover:bg-gray-900 text-white">{children}</Button>
}
