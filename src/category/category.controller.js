'use strict'

import Category from './category.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body
    let category = new Category(data)
    await category.save()
    return res.send({message: `Category: ${category.name} saved successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Category has not been saved'})
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = (data, id)
        if(!update) return res.status(400).send({message: 'ERROR: Data not updateable'})
        let updatedCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
            )
        if(!updatedCategory) return res.status(404).send({message: 'ERROR: Category not updated because this not found'})
        return res.send({message: 'Category has been updated'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Category has not been updated'})
    }
}

export const getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find()
    return res.send({categories})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All categories not found'})
    }
}

export const getCategory = async (req, res) => {
    try {
        let { name } = req.body
        let categories = await Category.find(
            {name: name}
        )
    return res.send({categories})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Category not obtained'})
    }
}