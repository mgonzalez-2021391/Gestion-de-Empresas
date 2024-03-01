'use strict'

import { Router } from "express"

import { getAllCategories, getCategory, save, update } from "./category.controller.js"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.get('/get', [validateJwt, isAdmin], getAllCategories)
api.post('/search', [validateJwt, isAdmin], getCategory)

export default api

