'use strict'

import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJwt = async (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'ALERT: Unauthorized'})
        let { uid } = jwt.verify(authorization, secretKey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'ERROR: User not found - Unauthorized'})
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: 'ALERT: Invalid token'})
    }
}

export const isUser = async (req, res, next)=>{
    try {
        let { id } = req.params
        let { user } = req
        if(!user || user.id !== id) return res.status(403).send({message: 'ALERT: You dont have access'})
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({message: 'ALERT: Unauthorized user'})
    }
}

export const isAdmin = async (req, res, next)=>{
    try {
        let { user } = req
        if(!user || user.role !== "ADMIN") return res.status(403).send({message: 'ALERT: You dont have access'})
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({message: 'ALERT: Unauthorized role'})
    }
}