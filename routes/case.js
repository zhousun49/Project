const express = require('express')
const router = express.Router()
const CaseController = require('../controllers/case')

router.get('/cases', CaseController.cases_all)

router.get('/cases/one/:id', CaseController.cases_one)

module.exports = router