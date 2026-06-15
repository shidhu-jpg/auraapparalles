export default function AnnouncementBar() {
  const messages = [
    '🔥 Sale — Up to 50% Off Selected Styles',
    '✨ Free Shipping on Orders Above ₹999',
    '🎁 New Arrivals Every Week — Stay Fresh',
    '💳 Easy Returns Within 7 Days',
  ]

  // Duplicate for seamless loop
  const all = [...messages, ...messages]

  return (
    <div className="bg-gray-950 text-white text-xs font-medium py-2.5 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee">
        {all.map((msg, i) => (
          <span key={i} className="mx-10 flex-shrink-0 tracking-wide">{msg}</span>
        ))}
      </div>
    </div>
  )
}
