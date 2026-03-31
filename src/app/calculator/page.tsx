import type { Metadata } from 'next';
import CalculatorWizard from './CalculatorWizard';

const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Free Truck Accident Case Evaluation Tool — All 50 States (${YEAR})`,
  description:
    'Evaluate your truck accident case in 2 minutes. Accounts for your state\'s fault laws, injury severity, and damages. No personal info required for instant results.',
  openGraph: {
    title: `Free Truck Accident Case Evaluation Tool — All 50 States (${YEAR})`,
    description:
      'State-specific settlement estimate powered by FMCSA data and real crash statistics. No sign-up required.',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Truck Accident Settlement Calculator',
  applicationCategory: 'LegalApplication',
  description: 'Calculate your truck accident settlement estimate based on your state\'s fault laws, injury type, and damages.',
  url: 'https://us-settlement-review.com/calculator',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  creator: {
    '@type': 'Organization',
    name: 'TruckSettlementPro',
    url: 'https://us-settlement-review.com',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Truck Accident Settlement',
  description: 'Use our 4-step calculator to estimate your truck accident settlement based on state laws and injury severity.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select Your State and Accident Type',
      text: 'Choose the state where your accident occurred and the type of truck accident.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Your Injuries',
      text: 'Select all injury types you sustained and indicate severity, hospitalization, and surgery.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Input Your Economic Damages',
      text: 'Enter your medical bills, future treatment costs, lost income, and property damage.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review Your Settlement Estimate',
      text: 'Get your personalized settlement range adjusted for your state\'s comparative fault laws.',
    },
  ],
};

export default function CalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: '#080f1e' }}
      >
        {/* Page header */}
        <div
          className="hero-pattern text-center px-6 pt-12 pb-8"
          style={{
            background: 'linear-gradient(160deg, #0a1422 0%, #080f1e 100%)',
            borderBottom: '3px solid #D4A84B',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Radial glow — top right */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(212,168,75,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          {/* Radial glow — bottom left */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '-40px',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(99,140,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Pill badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(212,168,75,0.10)',
                border: '0.5px solid rgba(212,168,75,0.35)',
                color: '#E8C46A',
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '20px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              Free · No Sign-Up · Results in 3 Minutes
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Truck Accident Case Evaluation Tool
            </h1>
            {/* Gold divider */}
            <div
              style={{
                width: '48px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #D4A84B, transparent)',
                margin: '12px auto',
              }}
            />
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: '#C8CADA' }}>
              Enter your accident details below. We apply your state&apos;s exact
              fault laws and injury multipliers to estimate your case value.
            </p>
          </div>
        </div>

        {/* Wizard */}
        <div className="flex-1">
          <CalculatorWizard />
        </div>
      </div>
    </>
  );
}
