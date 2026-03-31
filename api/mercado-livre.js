export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { q, limit = 20 } = req.query

  if (!q) {
    return res.status(400).json({ error: 'Parâmetro q obrigatório' })
  }

  try {
    const url = `https://mercado-libre-api.p.rapidapi.com/product/search?keyword=${encodeURIComponent(q)}&country_code=br&page=1`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'mercado-libre-api.p.rapidapi.com',
        'x-rapidapi-key': 'bc678b9c28msh96a56790fbe1affp1bc08djsn78e468af3aa0'
      }
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar no Mercado Livre', details: error.message })
  }
}
