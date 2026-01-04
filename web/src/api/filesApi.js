const BASE_URL = process.env.REACT_APP_API_BASE_URL

async function requestJson (path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}

export function getFilesData (fileName) {
  const qs = fileName ? `?fileName=${encodeURIComponent(fileName)}` : ''
  return requestJson(`/files/data${qs}`)
}
