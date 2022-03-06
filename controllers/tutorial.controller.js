const db = require('../models')
const Tutorial = require('../models/tutorial.model')

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: 'Title can not be empty.' })
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Some error occurred creating the tutorial' })
        })
}