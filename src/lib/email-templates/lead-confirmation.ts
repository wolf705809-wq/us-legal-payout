import { getStateBySlug } from '@/lib/state-laws';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

interface LeadConfirmationParams {
  name: string;
  email: string;
  state?: string;
  accidentType?: string;
  injuryType?: string;
  severity?: string;
  estimatedLow?: number;
  estimatedHigh?: number;
}

function getFaultRuleLabel(rule?: string): string {
  const map: Record<string, string> = {
    pure_comparative: 'Pure Comparative Fault',
    modified_51: 'Modified Comparative Fault (51% Bar)',
    modified_50: 'Modified Comparative Fault (50% Bar)',
    contributory: 'Contributory Negligence',
  };
  return rule ? (map[rule] ?? rule) : 'N/A';
}

export function buildLeadConfirmationEmail(params: LeadConfirmationParams): {
  from: string;
  to: string;
  subject: string;
  html: string;
} {
  const { name, email, state, accidentType, injuryType, severity, estimatedLow, estimatedHigh } = params;

  const stateData = state ? getStateBySlug(state) : null;
  const stateName = stateData?.name ?? state ?? 'Your State';
  const faultRule = getFaultRuleLabel(stateData?.faultRule);
  const sol = stateData?.solYears ? `${stateData.solYears} year${stateData.solYears !== 1 ? 's' : ''}` : 'N/A';

  const accidentLabel = accidentType
    ? accidentType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'N/A';
  const injuryLabel = injuryType
    ? injuryType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'N/A';
  const severityLabel = severity
    ? severity.charAt(0).toUpperCase() + severity.slice(1)
    : 'N/A';

  const rangeHtml = estimatedLow && estimatedHigh
    ? `<span style="color:#D4A84B;font-weight:900;font-size:22px;">${formatCurrency(estimatedLow)} — ${formatCurrency(estimatedHigh)}</span>`
    : '<span style="color:#D4A84B;font-weight:900;">Based on your inputs</span>';

  const subject = `Your Truck Accident Case Assessment — ${stateName}${accidentType ? ' · ' + accidentLabel : ''}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:32px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a1422 0%,#0F1D32 100%);padding:32px 40px;border-bottom:3px solid #D4A84B;">
            <p style="margin:0;color:#D4A84B;font-size:20px;font-weight:900;letter-spacing:-0.5px;">TruckSettlementPro</p>
            <p style="margin:6px 0 0;color:#8A95A8;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Case Assessment Report</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 24px;">
            <p style="margin:0 0 20px;color:#0F1D32;font-size:16px;">Dear ${name},</p>
            <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.75;">
              Thank you for using TruckSettlementPro. Below is a summary of your case assessment
              based on the information you provided. Please review it carefully before speaking
              with any insurance adjuster or signing any documents.
            </p>

            <!-- Summary table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3EE;border-radius:8px;margin-bottom:24px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 14px;color:#0F1D32;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Your Case Summary</p>
                ${[
                  ['State', stateName],
                  ['Accident Type', accidentLabel],
                  ['Injury Type', injuryLabel],
                  ['Severity', severityLabel],
                ].map(([label, value]) => `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                  <tr>
                    <td style="color:#6b7280;font-size:12px;font-weight:600;width:40%;">${label}</td>
                    <td style="color:#0F1D32;font-size:13px;font-weight:600;text-align:right;">${value}</td>
                  </tr>
                </table>`).join('')}
              </td></tr>
            </table>

            <!-- Settlement range -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F1D32;border-radius:8px;margin-bottom:24px;border:2px solid #D4A84B;">
              <tr><td style="padding:24px;text-align:center;">
                <p style="margin:0 0 8px;color:#8A95A8;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Estimated Case Value Range</p>
                <p style="margin:0;">${rangeHtml}</p>
                <p style="margin:10px 0 0;color:#5a7090;font-size:11px;line-height:1.6;">
                  Based on ${stateName} fault rules, FMCSA carrier data, and injury-specific multipliers.
                  This is an estimate, not a guarantee.
                </p>
              </td></tr>
            </table>

            <!-- State law info -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-left:3px solid #D4A84B;border-radius:4px;margin-bottom:24px;">
              <tr><td style="padding:16px 20px;">
                <p style="margin:0 0 8px;color:#0F1D32;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${stateName} Legal Rules</p>
                <p style="margin:0 0 6px;color:#374151;font-size:13px;"><strong>Fault Rule:</strong> ${faultRule}</p>
                <p style="margin:0;color:#374151;font-size:13px;"><strong>Statute of Limitations:</strong> ${sol} to file a personal injury lawsuit</p>
              </td></tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td align="center">
                <a href="https://trucksettlementpro.com/calculator"
                   style="display:inline-block;background:linear-gradient(135deg,#B8820A,#E8B832);color:#050d1a;text-decoration:none;font-weight:900;font-size:14px;padding:16px 36px;border-radius:8px;letter-spacing:-0.3px;">
                  Get Your Detailed Analysis →
                </a>
              </td></tr>
            </table>

            <!-- Disclaimer -->
            <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.7;border-top:1px solid #f3f4f6;padding-top:20px;">
              <strong>This is not legal advice.</strong> The estimates provided are for informational purposes only
              and are based on publicly available data and typical case parameters. Individual outcomes vary significantly.
              Consult a licensed attorney in your state for advice specific to your situation.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#040b16;padding:20px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#3d5270;font-size:11px;">
              &copy; 2026 TruckSettlementPro. Operated by Nodal Logics.
            </p>
            <p style="margin:0;color:#2d3f54;font-size:10px;">
              300 Delaware Ave, Ste 210 #209, Wilmington, DE 19801 &middot; +1 (302) 273-1345
            </p>
            <p style="margin:6px 0 0;color:#2d3f54;font-size:10px;">
              <a href="https://trucksettlementpro.com/privacy" style="color:#3d5270;text-decoration:underline;">Unsubscribe</a>
              &middot; Not a law firm &middot; Attorney Advertising
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return {
    from: `TruckSettlementPro <${process.env.SENDER_EMAIL ?? 'sj@us-settlement-review.com'}>`,
    to: email,
    subject,
    html,
  };
}
