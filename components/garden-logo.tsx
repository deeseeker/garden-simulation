export default function GardenLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Garden's distinctive rounded square shape */}
        <path
          d="M25 15 C15 15, 15 15, 15 25 L15 75 C15 85, 15 85, 25 85 L75 85 C85 85, 85 85, 85 75 L85 25 C85 15, 85 15, 75 15 Z"
          fill="#FCB9C2"
          className="drop-shadow-sm"
        />
        {/* Bitcoin-style B symbol */}
        <path
          d="M35 25 L35 75 M35 25 L55 25 C62 25, 62 35, 55 35 L35 35 M35 35 L58 35 C65 35, 65 45, 58 45 L35 45 M35 45 L35 75"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M40 20 L40 30 M50 20 L50 30 M40 70 L40 80 M50 70 L50 80"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
