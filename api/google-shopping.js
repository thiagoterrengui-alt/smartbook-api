export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { q } = req.query

  if (!q) {
    return res.status(400).json({ error: 'Parâmetro q obrigatório' })
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&gl=br&hl=pt&api_key=cebca7bf534daab762d8190769757b2f7f469426421bf121bf43b38bee7c75f4`
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar no Google Shopping', details: error.message })
  }
}
