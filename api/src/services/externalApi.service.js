const axios = require('axios')
const { parseCsvContent } = require('../utils/csvParser')
const { API_BASE_URL, API_TOKEN } = require('../config')

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    authorization: API_TOKEN
  },
  timeout: 5000
})

async function fetchFilesList () {
  const response = await client.get('/v1/secret/files')
  return response.data.files
}

async function fetchFileContent (fileName) {
  const response = await client.get(`/v1/secret/file/${fileName}`)
  return response.data
}

async function fetchAndFormatFiles (fileName) {
  let files = await fetchFilesList()

  if (fileName) {
    files = files.filter(f => f === fileName)
  }

  const results = await Promise.allSettled(
    files.map(async (file) => {
      try {
        const csv = await fetchFileContent(file)
        const lines = parseCsvContent(csv, file)

        return {
          file,
          lines
        }
      } catch (error) {
        // Ignore file
        return null
      }
    })
  )

  return results
    .filter(r => r.status === 'fulfilled' && r.value)
    .map(r => r.value)
}

module.exports = {
  fetchFilesList,
  fetchAndFormatFiles
}
