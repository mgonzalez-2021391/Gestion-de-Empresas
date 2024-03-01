'use strict'

import { compare, hash } from "bcrypt"

export const encrypt = async (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkUpdate = async (data, userId) => {
        if(userId){
            if(Object.entries(data).length === 0 ||
                data.password ||
                data.password == '' ||
                data.role ||
                data.role == ''
            ) {
                return false
            }
            return true
        } else {
            return false
        }
}

 export const checkUpdateCompany = async (data, companyId) => {
        if(companyId){
            if(Object.entries(data).length === 0 ||
                data.levelimpact ||
                data.levelimpact == '' ||
                data.category ||
                data.category == ''
            ) {
                return false
            }
            return true
        } else {
            return false
        }
}