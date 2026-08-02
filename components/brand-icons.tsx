export function InstagramIcon({
  size = 20,
  strokeWidth = 1.5,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function PinterestIcon({
  size = 20,
  strokeWidth = 1.5,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.6 20.4c.4-1.6 1-4 1.4-5.6.3-1.3-.5-2.2-.9-3.1-.8-1.6.4-3.5 2-3.5 1.1 0 2 .8 2 2.1 0 1.3-1 2.5-1.4 3.9-.3 1.3.7 2.4 2 2.4 2.4 0 4.3-2.6 4.3-6.2 0-3.3-2.4-5.6-5.7-5.6-3.9 0-6.2 2.9-6.2 5.9 0 1.1.4 2.1 1 2.8" />
    </svg>
  );
}
