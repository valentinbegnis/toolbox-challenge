const { fetchAndFormatFiles, fetchFilesList } = require('../services/externalApi.service')

async function getFilesData (req, res) {
  try {
    const { fileName } = req.query
    const data = await fetchAndFormatFiles(fileName)

    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

async function getFilesList (req, res) {
  try {
    const files = await fetchFilesList()
    res.json({ files })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getFilesData,
  getFilesList
}
