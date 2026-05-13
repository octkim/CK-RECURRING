const GS_URL = 'https://script.google.com/macros/s/AKfycbz7OAU7h0vEcQLwkK3bUVIvzFPhn3yEzne8LcTd3xqWuCmQT88aws9BbyIX70UbXkrE/exec';

export default async function handler(req, res) {
  const qs = new URLSearchParams(req.query).toString();
  const targetUrl = qs ? `${GS_URL}?${qs}` : GS_URL;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();

    // Apps Script가 HTML 에러페이지 반환하는지 체크
    if (text.startsWith('<') || text.startsWith('A server')) {
      res.status(502).json({ error: 'Apps Script 오류', raw: text.slice(0, 200) });
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
