// Vercel Serverless Function — Apps Script 프록시
// Apps Script URL은 환경변수에만 저장, 클라이언트에 절대 노출 안 됨

export default async function handler(req, res) {
  // CORS 허용 (Vercel 도메인만)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 환경변수에서 Apps Script URL 가져오기 (클라이언트에 노출 안 됨)
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
  if (!APPS_SCRIPT_URL) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { sheet } = req.query;
  if (!sheet) {
    return res.status(400).json({ error: 'sheet parameter required' });
  }

  try {
    const url = `${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheet)}&t=${Date.now()}`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
