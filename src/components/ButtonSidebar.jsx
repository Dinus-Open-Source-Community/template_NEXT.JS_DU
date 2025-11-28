'use client'

import { Button } from '@heroui/react'

export default function App({ children }) {
  return <Button className="bg-transparent hover:bg-gray-200">{children}</Button>
}
