'use strict'

import { Router } from "express"
import { getAllCompanies, getAllCompaniesAZ, getAllCompaniesZA, getCompaniesWithCategory, getCompaniesWithExperienceYears, reportExcel, save, update } from "./company.controller.js"
import { validateJwt, isAdmin} from "../middlewares/validate-jwt.js"


const api = Router()

api.post('/create', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.get('/get', [validateJwt, isAdmin], getAllCompanies)
api.post('/searchWithYears', [validateJwt, isAdmin], getCompaniesWithExperienceYears)
api.post('/searchWithCategory',  [validateJwt, isAdmin], getCompaniesWithCategory)
api.get('/orderA-Z', [validateJwt, isAdmin], getAllCompaniesAZ)
api.get('/orderZ-A', [validateJwt, isAdmin], getAllCompaniesZA)
api.get('/report', [validateJwt, isAdmin], reportExcel)

export default api