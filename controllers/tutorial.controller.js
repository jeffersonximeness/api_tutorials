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

exports.findAll = (req, res) => {
    const title = req.body.title

    let condition = title ? { title: { [Op.iLike]: `%${title}` } } : null

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Some error occurred retrieving tutorials' })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({ message: `Cannot find tutorial. ID = ${id}` })
            }
        }).catch(err => {
            res.status(500).send({ message: `Error retrieving tutorial with ID = ${id}` })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: 'Tutorial updated.' })
            } else {
                res.send({ message: 'Cannot update tutorial.\nTutorial was not found or req.body is empty.' })
            }
        }).catch(err => {
            res.status(500).send({ message: `Error updating tutorial with ID = ${id}` })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destroy({
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({ message: 'Tutorial deleted.' })
        } else {
            res.send({ message: 'Cannot delete tutorial.\nTutorial was not found.' })
        }
    }).catch(err => {
        res.status(500).send({ message: `Error deleting tutorial with id ${id}` })
    })
}

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Tutorials were deleted.` })
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Error deleting tutorials.' })
    })
}

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
        where: {
            published: true
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Error retrieving published tutorials.' })
    })
}