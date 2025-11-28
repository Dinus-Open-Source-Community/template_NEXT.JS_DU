'use client'

import { Spinner } from '@heroui/react'
import React from 'react'

export default function SpinnerLoading() {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Spinner size="sm" color="default" />
      <span>Loading...</span>
    </div>
  )
}
