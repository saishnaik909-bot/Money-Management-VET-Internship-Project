// Simple SVG pictures used on the website (logo, hero image, empty state).

export function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill="#ffffff" />
      <path d="M8 21l5-6 4 4 7-9" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="10" r="2.2" fill="#60a5fa" />
    </svg>
  );
}

// Big picture on the dashboard banner: wallet + coins + bars
export function HeroArt() {
  return (
    <svg viewBox="0 0 320 230" className="hero-art" role="img" aria-label="Wallet with coins and chart">
      <circle cx="160" cy="115" r="105" fill="#ffffff" opacity="0.12" />
      {/* bar chart */}
      <rect x="40" y="130" width="22" height="50" rx="5" fill="#bfdbfe" />
      <rect x="70" y="105" width="22" height="75" rx="5" fill="#93c5fd" />
      <rect x="100" y="80" width="22" height="100" rx="5" fill="#ffffff" />
      {/* wallet */}
      <rect x="130" y="90" width="150" height="100" rx="18" fill="#ffffff" />
      <rect x="130" y="90" width="150" height="34" rx="14" fill="#dbeafe" />
      <rect x="225" y="130" width="62" height="34" rx="12" fill="#2563eb" />
      <circle cx="243" cy="147" r="6" fill="#ffffff" />
      {/* coins */}
      <g className="coin c1"><circle cx="190" cy="62" r="20" fill="#fbbf24" /><text x="190" y="69" textAnchor="middle" fontSize="20" fontWeight="700" fill="#b45309">₹</text></g>
      <g className="coin c2"><circle cx="240" cy="40" r="14" fill="#fcd34d" /><text x="240" y="46" textAnchor="middle" fontSize="15" fontWeight="700" fill="#b45309">₹</text></g>
      <g className="coin c3"><circle cx="150" cy="40" r="11" fill="#fde68a" /><text x="150" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309">₹</text></g>
    </svg>
  );
}

// Picture shown when there are no transactions
export function EmptyArt() {
  return (
    <svg viewBox="0 0 200 140" width="180" role="img" aria-label="Empty">
      <ellipse cx="100" cy="125" rx="70" ry="9" fill="#dbeafe" />
      <rect x="45" y="35" width="110" height="80" rx="14" fill="#eff6ff" stroke="#93c5fd" strokeWidth="3" />
      <rect x="45" y="35" width="110" height="26" rx="12" fill="#bfdbfe" />
      <circle cx="132" cy="88" r="9" fill="#60a5fa" />
      <path d="M62 84h38M62 98h26" stroke="#93c5fd" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
