const mongoose = require('mongoose')

const CaseSchema = new mongoose.Schema({
    state: { type: String },
    date: { type: String },
    confirmed: {type: Number},
    death: {type: Number},
    recorvered: {type: Number},
    active: {type: Number},
    incident_rate: {type: Number},
    people_tested: {type: Number},
    mortality_rate: {type: Number},
    testing_rate: {type: Number},
})

const Case = mongoose.model('Case', CaseSchema);
module.exports = Case;