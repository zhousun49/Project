const express = require('express')
const router = express.Router()
const CaseController = require('../controllers/case')

router.get('/cases', CaseController.cases_all)

router.get('/cases/single/:state/:date', CaseController.cases_one)

router.get('/cases/state/:state', CaseController.cases_one_state)

router.get('/cases/date/:date', CaseController.cases_one_date)

module.exports = router