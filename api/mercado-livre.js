export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { q, limit = 20 } = req.query

  if (!q) {
    return res.status(400).json({ error: 'Parâmetro q obrigatório' })
  }

  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=${limit}&category=MLB1459`
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar no Mercado Livre', details: error.message })
  }
}
