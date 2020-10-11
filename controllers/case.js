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
    const id = req.params.id;
    // console.log(id)
    Case.find({_id: id})
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
