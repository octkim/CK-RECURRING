const GS_URL = 'https://script.google.com/macros/s/AKfycbz7OAU7h0vEcQLwkK3bUVIvzFPhn3yEzne8LcTd3xqWuCmQT88aws9BbyIX70UbXkrE/exec';

export default async function handler(req, res) {
  const qs = new URLSearchParams(req.query).toString();
  const targetUrl = qs ? `${GS_URL}?${qs}` : GS_URL;

  const response = await fetch(targetUrl, {
    redirect: 'follow'
  });
  
  const text = await response.text();
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(text);
}
