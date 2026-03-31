export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { source } = req.query

  const urls = {
    hagnos: 'https://www.hagnos.com.br/loja/arquivos/1272564/sitemaps/sitemap_1.xml',
    unitedpress: 'https://www.unitedpress.com.br/loja/arquivos/1366432/sitemaps/sitemap_1.xml'
  }

  const targetUrl = urls[source]

  if (!targetUrl) {
    return res.status(400).json({ error: 'Source inválido. Use: hagnos ou unitedpress' })
  }

  try {
    const response = await fetch(targetUrl)
    const xml = await response.text()
    res.setHeader('Content-Type', 'application/xml')
    res.status(200).send(xml)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar sitemap', details: error.message })
  }
}
