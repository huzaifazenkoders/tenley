const NoPropertiesIllustration = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground */}
    <rect x="20" y="170" width="200" height="4" rx="2" fill="#FDCFCB" />

    {/* Building 1 - tall center */}
    <rect x="90" y="80" width="60" height="90" rx="4" fill="#DB3E31" />
    <rect x="90" y="80" width="60" height="6" rx="2" fill="#B52E23" />
    {/* Windows B1 */}
    {[0,1,2].map(col => [0,1,2,3].map(row => (
      <rect key={`b1-${col}-${row}`} x={98 + col * 18} y={94 + row * 18} width="10" height="12" rx="1" fill="white" opacity="0.7" />
    )))}
    {/* Door B1 */}
    <rect x="110" y="148" width="20" height="22" rx="2" fill="#B52E23" />
    <circle cx="127" cy="159" r="1.5" fill="white" />

    {/* Building 2 - left */}
    <rect x="30" y="110" width="50" height="60" rx="3" fill="#F67D73" />
    <rect x="30" y="110" width="50" height="5" rx="2" fill="#DB3E31" />
    {/* Windows B2 */}
    {[0,1].map(col => [0,1,2].map(row => (
      <rect key={`b2-${col}-${row}`} x={38 + col * 20} y={122 + row * 16} width="10" height="10" rx="1" fill="white" opacity="0.7" />
    )))}
    {/* Door B2 */}
    <rect x="47" y="152" width="16" height="18" rx="2" fill="#DB3E31" />

    {/* Building 3 - right */}
    <rect x="160" y="100" width="50" height="70" rx="3" fill="#F9A09A" />
    <rect x="160" y="100" width="50" height="5" rx="2" fill="#DB3E31" />
    {/* Windows B3 */}
    {[0,1].map(col => [0,1,2].map(row => (
      <rect key={`b3-${col}-${row}`} x={168 + col * 20} y={112 + row * 16} width="10" height="10" rx="1" fill="white" opacity="0.7" />
    )))}
    {/* Door B3 */}
    <rect x="177" y="152" width="16" height="18" rx="2" fill="#DB3E31" />

    {/* Small building far left */}
    <rect x="10" y="130" width="30" height="40" rx="2" fill="#FDCFCB" />
    <rect x="16" y="138" width="8" height="8" rx="1" fill="white" opacity="0.6" />
    <rect x="16" y="152" width="8" height="18" rx="1" fill="#F9A09A" />

    {/* Small building far right */}
    <rect x="200" y="135" width="30" height="35" rx="2" fill="#FDCFCB" />
    <rect x="206" y="143" width="8" height="8" rx="1" fill="white" opacity="0.6" />
    <rect x="206" y="155" width="8" height="15" rx="1" fill="#F9A09A" />

    {/* Roof triangle center */}
    <polygon points="120,60 90,80 150,80" fill="#B52E23" />

    {/* Stars / sparkles */}
    <circle cx="60" cy="40" r="3" fill="#F67D73" opacity="0.5" />
    <circle cx="180" cy="30" r="4" fill="#DB3E31" opacity="0.4" />
    <circle cx="200" cy="60" r="2" fill="#F9A09A" opacity="0.6" />
    <circle cx="40" cy="70" r="2.5" fill="#FDCFCB" opacity="0.7" />
  </svg>
);

export default NoPropertiesIllustration;
