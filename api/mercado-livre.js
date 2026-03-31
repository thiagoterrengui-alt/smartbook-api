export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { q, limit = 20 } = req.query

  if (!q) {
    return res.status(400).json({ error: 'Parâmetro q obrigatório' })
  }

  try {
    const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: '7787620594905398',
        client_secret: 'TZ5mFcrm1rHCFuAWCvO52P84cLXAoIXg'
      })
    })

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=${limit}`
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar no Mercado Livre', details: error.message })
  }
}
