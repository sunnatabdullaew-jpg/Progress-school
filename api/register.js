module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, phone, course, note } = req.body || {};
  if (!name || !phone || !course) {
    return res.status(400).json({ ok: false, error: 'name, phone, course are required' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Server Telegram config missing' });
  }

  const text = [
    'Yangi royxatdan otish!',
    '',
    `Ism: ${name}`,
    `Telefon: ${phone}`,
    `Kurs: ${course}`,
    `Izoh: ${note || 'Yoq'}`,
    `Vaqt: ${new Date().toISOString()}`,
  ].join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const tgData = await tgRes.json();
    if (!tgRes.ok || !tgData.ok) {
      return res.status(502).json({ ok: false, error: 'Telegram send failed', details: tgData });
    }

    return res.status(200).json({ ok: true });
  } catch (_error) {
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }
};
