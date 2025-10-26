export const QrCode = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-5a1 1 0 0 0-1 1v4" />
        <path d="M16 8h1" />
        <path d="M19 8h1" />
        <path d="M16 11h2" />
        <path d="M16 14h3" />
        <path d="M8 8h2" />
        <path d="M8 11h4" />
        <path d="M11 14h1" />
        <path d="M8 16h1" />
        <path d="M8 19h1" />
        <path d="M11 16h1" />
        <path d="M14 19h1" />
        <path d="M14 16h1" />
    </svg>
);