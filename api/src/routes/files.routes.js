const express = require('express')
const router = express.Router()

const { getFilesData, getFilesList } = require('../controllers/files.controller')

router.get('/data', getFilesData)
router.get('/list', getFilesList)

module.exports = router
