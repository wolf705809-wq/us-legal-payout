import type { Metadata } from 'next';
import CalculatorWizard from './CalculatorWizard';

export const metadata: Metadata = {
  title: 'Free Truck Accident Settlement Calculator',
  description:
    'Estimate your truck accident settlement in 3 minutes. State-specific comparative fault laws, FMCSA insurance data, and injury multipliers — all applied automatically.',
  openGraph: {
    title: 'Free Truck Accident Settlement Calculator | TruckSettlementPro',
    description:
      'State-specific settlement estimate powered by FMCSA data and real crash statistics. No sign-up required.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Truck Accident Settlement Calculator',
  url: 'https://trucksettlementpro.com/calculator',
  applicationCategory: 'LegalService',
  description: 'Free calculator that estimates truck accident settlement values using state-specific laws and FMCSA data.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: '#111827' }}
      >
        {/* Page header */}
        <div
          className="text-center px-6 pt-12 pb-8"
          style={{
            background: 'linear-gradient(160deg, #0F1D32 0%, #0F1D32 100%)',
            borderBottom: '3px solid #D4A84B',
          }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: '#D4A84B', letterSpacing: '0.2em' }}
          >
            Free · No Sign-Up · Results in 3 Minutes
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Truck Accident Settlement Calculator
          </h1>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: '#C8CADA' }}>
            Enter your accident details below. We apply your state&apos;s exact
            fault laws and injury multipliers to estimate your case value.
          </p>
        </div>

        {/* Wizard */}
        <div className="flex-1">
          <CalculatorWizard />
        </div>
      </div>
    </>
  );
}
