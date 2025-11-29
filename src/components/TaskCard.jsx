import React from 'react'
import { Button } from '@heroui/react'

export default function TaskCard({ title, desc, time, type, isDone, onDelete }) {
  return (
    <div className={`p-4 rounded-md shadow-md bg-white flex flex-col`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-gray-800">{title}</h4>
          {desc && <p className="text-gray-500 text-sm">{desc}</p>}
        </div>
        {onDelete && (
          <Button size="sm" color="danger" variant="light" onPress={onDelete}>
            Delete
          </Button>
        )}
      </div>
      <span className="text-gray-400 text-xs">{time}</span>
    </div>
  )
}
