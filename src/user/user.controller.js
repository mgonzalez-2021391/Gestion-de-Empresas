'use strict'

import { generateJwt } from '../utils/jwt.js'
import { checkPassword, checkUpdate, encrypt } from '../utils/validate.js'
import User from './user.model.js'

export const test = async (req, res) => {
        console.log('test running')
        return res.send({message: 'Test running'})
}

export const save = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.phone = "+502 " + data.phone
        let user = new User(data)
        await user.save()
        return res.send({message: `Creation of user with names: ${user.names}, surnames: ${user.surnames} and, username: ${user.username} has been successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: User has not been created'})
    }
}

export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                names: user.names,
                surnames: user.surnames,
                username: user.username,
                role: user.role
            }
            let authorization = await generateJwt(loggedUser)
            return res.send({message: `Welcome to the system: ${username}`, loggedUser, token: authorization})
        }
        return res.status(404).send({message: 'ERROR: Invalid credentials'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Attempt of login has been failed'})
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        data.phone = "+502 " + data.phone
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({ message: 'ERROR: Data from user that cannot be update || PASSWORD & ROLE'})
        let updatedUser = await User.findOneAndUpdate({_id: id}, data, {new: true})
        if(!updatedUser) return res.status(404).send({message: 'ERROR: Data from user has not been updated because not found'})
        return res.send({message: 'User updated successfully', updatedUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `ALERT: Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'ERROR: User has not been updated'})
    }
}

export const deleteU = async (req, res) => {
    try {
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'ERROR: User not found and not deleted'})
        return res.send({message: `User: ${deletedUser.username} has been deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: User has not been deleted'})
    }
}