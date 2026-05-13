export default async function handler(req, res) {
  const GS_URL = 'https://script.google.com/macros/s/AKfycbz7...여기에_원본URL';
  
  const response = await fetch(GS_URL, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });
  
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
}
