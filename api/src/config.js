function requiredEnv (name) {
  if (!process.env[name]) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return process.env[name]
}

module.exports = {
  PORT: process.env.API_PORT || 3001,
  API_BASE_URL: requiredEnv('API_BASE_URL'),
  API_TOKEN: requiredEnv('API_TOKEN')
}
