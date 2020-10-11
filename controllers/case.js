const Case = require('../model/case')

exports.cases_all = (req, res) => {
    Case.find()
        .then(result => [
            res.status(200).json({
                count: result.length,
                cases: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.cases_one = (req, res) => {
    const state = req.params.state;
    const date = req.params.date
    // console.log(id)
    Case.find({state: state, date: date})
        .then(result => [
            res.status(200).json({
                case: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.cases_one_state = (req, res) => {
    const state = req.params.state;
    // console.log(id)
    Case.find({state: state})
        .then(result => [
            res.status(200).json({
                count: result.length,
                case: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}
exports.cases_one_date = (req, res) => {
    const date = req.params.date;
    console.log(date)
    Case.find({date: date})
        .then(result => [
            res.status(200).json({
                count: result.length,
                case: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}