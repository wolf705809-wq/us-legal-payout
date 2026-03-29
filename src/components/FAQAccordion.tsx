'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#0F1D32',
              border: `1px solid ${isOpen ? 'rgba(212,168,75,0.35)' : 'rgba(255,255,255,0.07)'}`,
              borderLeft: `3px solid ${isOpen ? '#D4A84B' : 'transparent'}`,
              transition: 'border-color 0.3s ease, border-left-color 0.3s ease',
            }}
          >
            <button
              className="w-full flex items-center justify-between text-left px-5 py-5 cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-bold text-white text-sm sm:text-base pr-4 leading-snug">
                {faq.q}
              </span>
              <span
                className="flex-shrink-0 text-2xl font-thin"
                style={{
                  color: '#D4A84B',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s ease',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '600px' : '0',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s ease-out, opacity 0.3s ease-out',
              }}
            >
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
