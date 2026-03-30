function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

interface TelegramLeadPayload {
  name: string;
  email: string;
  phone?: string;
  state?: string;
  accidentType?: string;
  injuryType?: string;
  severity?: string;
  estimatedLow?: number;
  estimatedHigh?: number;
  faultPercentage?: number;
  carrierName?: string;
  sourcePage?: string;
}

function getUrgencyTag(estimatedHigh?: number): string {
  if (!estimatedHigh) return '🟢 STANDARD';
  if (estimatedHigh >= 500000) return '🔴 HIGH VALUE';
  if (estimatedHigh >= 200000) return '🟡 MEDIUM VALUE';
  return '🟢 STANDARD';
}

export async function sendTelegramLeadAlert(lead: TelegramLeadPayload): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID_TRUCKPRO;

  if (!botToken || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID_TRUCKPRO not configured');
  }

  const urgency = getUrgencyTag(lead.estimatedHigh);
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour12: false });

  const rangeStr = lead.estimatedLow && lead.estimatedHigh
    ? `${formatCurrency(lead.estimatedLow)} — ${formatCurrency(lead.estimatedHigh)}`
    : 'N/A';

  const lines = [
    `🚨 <b>NEW LEAD</b> ${urgency}`,
    `━━━━━━━━━━`,
    `👤 ${lead.name} | 📧 ${lead.email} | 📞 ${lead.phone ?? 'N/A'}`,
    `📍 ${lead.state ?? 'N/A'} | 🚛 ${lead.accidentType ?? 'N/A'}`,
    `🏥 ${lead.injuryType ?? 'N/A'} (${lead.severity ?? 'N/A'})`,
    `💰 ${rangeStr}`,
    `📊 Fault: ${lead.faultPercentage ?? 'N/A'}% | 🏢 ${lead.carrierName ?? 'N/A'}`,
    `📄 Source: ${lead.sourcePage ?? 'N/A'}`,
    `⏰ ${timestamp} ET`,
    `━━━━━━━━━━`,
  ];

  const text = lines.join('\n');

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${body}`);
  }
}
