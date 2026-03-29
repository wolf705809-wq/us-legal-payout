'use client';

interface Props {
  className?: string;
  size?: 'sm' | 'md';
}

export default function CallNowButton({ className = '', size = 'md' }: Props) {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '';
  if (!phone) return null;

  const pad = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm';

  return (
    <a
      href={`tel:${phone}`}
      className={`inline-flex items-center gap-2 rounded-lg font-bold transition-opacity hover:opacity-90 ${pad} ${className}`}
      style={{
        border: '2px solid #D4A84B',
        backgroundColor: '#0F1D32',
        color: '#D4A84B',
      }}
    >
      <span>📞</span>
      <span>Call Now — Free Consultation</span>
    </a>
  );
}
