'use strict'

import mongoose from "mongoose"

export const connect = async() => {
    try {
        mongoose.connection.on('error', ()=> {
            console.log('MongoDD | Error to connect to MongoDB')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', ()=> {
            console.log('MongoDB | Try connecting to MongoDB')
        })
        mongoose.connection.on('connected', ()=> {
            console.log('MongoDB | Connected to MongoDB')
        })
        mongoose.connection.on('open', ()=> {
            console.log('MongoDB | Connected to the DataBase')
        })
        mongoose.connection.on('reconnected', ()=> {
            console.log('MongoDB | Reconnected to MongoDB')
        })
        mongoose.connection.on('disconnected', ()=> {
            console.log('MongoDB | Disconnected to MongoDB')
        })
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
        console.log('CONFIRM | Connected to DB')
    } catch (err) {
        console.log('Connection to the database failed', err);
    }
}