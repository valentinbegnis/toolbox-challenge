require('dotenv').config()

const app = require('./app')
const { PORT } = require('./config')

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})  
