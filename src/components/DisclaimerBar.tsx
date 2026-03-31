export default function DisclaimerBar() {
  return (
    <div
      style={{
        backgroundColor: '#040b16',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <p className="text-xs leading-relaxed text-center" style={{ color: '#2d3f54' }}>
          <strong style={{ color: '#3d5270' }}>Attorney Advertising</strong>
          {' · '}
          <strong style={{ color: '#3d5270' }}>Not a law firm</strong>
          {' · '}
          <strong style={{ color: '#3d5270' }}>Not legal advice</strong>
          {' · '}
          Past results do not guarantee future outcomes
          {' · '}
          Settlement estimates are for informational purposes only and do not constitute legal advice or predict any specific outcome.
          Consult a licensed attorney for advice specific to your situation.
          {' · '}
          &copy; 2026 TruckSettlementPro
        </p>
      </div>
    </div>
  );
}
