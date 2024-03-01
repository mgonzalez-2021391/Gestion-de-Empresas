'use strict'

import { checkUpdateCompany } from "../utils/validate.js"
import Company from "./company.model.js"
import ExcelJS from 'exceljs'

export const save = async (req, res) => {
    try {
        let data = req.body
        data.experienceyears = data.experienceyears + " years"
    let company = new Company(data)
    await company.save()
    return res.send({message: `Company: ${company.name} created succesfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Company has not been saved'})
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdateCompany(data, id)
        if(!update) return res.status(400).send({message: 'ERROR: Data not updateable'})
        let updatedCompany = await Company.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
            )
        if(!updatedCompany) return res.status(404).send({message: 'ERROR: Company not updated because this not found'})
        return res.send({message: 'Company has been updated'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Company has not been updated'})
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        let allCompanies = await Company.find()
        return res.send({allCompanies})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All companies not found'})
    }
}

export const getCompaniesWithExperienceYears = async (req, res) => {
    try {
        let data = req.body
        let companiesYears = await Company.find(
            {experienceyears: data.experienceyears}
            )
        return res.send({companiesYears})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Companies not found'})
    }
}

export const getCompaniesWithCategory = async (req, res) => {
    try {
        const { categoryId } = req.body
        const companies = await Company.find({category: categoryId}).populate('category', ['name'])
        if (!companies.length) {
            return res.status(404).send({message: 'ERROR: Companies of category not found'});
        }
        return res.send({companies});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'ERROR: Search companies with the category has not been successfully', err: err});
    }
}


export const getAllCompaniesAZ = async (req, res) => {
    try {
        let allCompaniesAZ = await Company.find().sort({name: +1})
        return res.send({allCompaniesAZ});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'ERROR: All companies for A-Z not found' });
    }
}

export const getAllCompaniesZA = async (req, res) => {
    try {
        let allCompaniesZA = await Company.find().sort({name: -1})
        return res.send({allCompaniesZA})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All companies for Z-A not found'})
    }
}

export const reportExcel = async (req, res) => {
    try {
       let reportCompany = await Company.find().populate('category', ['name'])
       let excelWB = new ExcelJS.Workbook()
       let sheetExcel = excelWB.addWorksheet('Companies Report', {properties:{tabColor:{argb:'76fffe'}}})
        sheetExcel.columns = [
            {header: 'ID', key: '_id', width: 26.5, style: {alignment: {horizontal: 'center' }}},
            {header: 'Company', key: 'name', width: 25, style: {alignment: {horizontal: 'center' }}},
            {header: 'Level of Impact', key: 'levelimpact', width: 14, style: {alignment: {horizontal: 'center' }}},
            {header: 'Experience Years', key: 'experienceyears', width:15, style: {alignment: {horizontal: 'center' }}},
            {header: 'Category', key: 'category', width:20, style: {alignment: {horizontal: 'center' }}}
        ]
        reportCompany.forEach(Company => {
            sheetExcel.addRow({
                _id: Company._id,
                name: Company.name,
                levelimpact: Company.levelimpact,
                experienceyears: Company.experienceyears,
                category: Company.category.name
            })
        })
        let fileXlsx = await excelWB.xlsx.writeFile('Report of Companies.xlsx')
        res.attachment(fileXlsx)
        res.send(fileXlsx)
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Generation of report has not been successfully'})
    }
}