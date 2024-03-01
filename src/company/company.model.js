import { Schema, model} from "mongoose"

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    levelimpact: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        uppercase: true,
        required: true
    },
    experienceyears: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
},
{
    versionKey: false
})

export default model('company', companySchema)