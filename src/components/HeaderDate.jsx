export default function HeaderDate() {
  // Get today's date
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  // Format date as "DD MMM"
  function formatDate(date) {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })
  }

  return (
    <div className="flex gap-3 text-xl items-center">
      <p className="text-gray-400 cursor-pointer">{formatDate(yesterday)}</p>
      <p className="font-bold cursor-pointer">Today</p>
      <p className="text-gray-400 cursor-pointer">{formatDate(tomorrow)}</p>
      <p>|</p>
      <div className="relative group flex items-center">
        <button className="p-1 rounded hover:bg-gray-200 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="text-gray-600 block mx-auto my-auto"
            style={{ display: 'block' }}
          >
            <circle cx="4" cy="10" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="16" cy="10" r="2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
