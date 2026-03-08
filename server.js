require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const API_PORT = process.env.API_PORT || process.env.PORT || 4000;
const buildPath = path.join(__dirname, 'build');

app.use(express.json());
app.use(express.static(buildPath));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/register', async (req, res) => {
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
    `Izoh: ${note ? note : 'Yoq'}`,
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

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }
});

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found' });
  }
  return res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(API_PORT, () => {
  console.log(`Server listening on http://localhost:${API_PORT}`);
});
