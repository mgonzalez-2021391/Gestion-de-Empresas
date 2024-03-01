'use strict'

import { Router } from "express"
import { deleteU, login, save, test, update } from "./user.controller.js"
import { isUser, validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.get('/test', test)
api.post('/register', save)
api.post('/login', login)
api.put('/update/:id', [validateJwt, isUser], update)
api.delete('/delete/:id', [validateJwt, isUser], deleteU)

export default api