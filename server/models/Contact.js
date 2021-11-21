import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'contact has to be named']
    }, 
    familyName: {
        type: String,
        default: ''
    },
    companyName: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    }, 
    primaryNumber: {
        type: String,
        required:[true, 'contact has to include at least one phone number']
    },
    secondaryNumber: {
        type: String,
        default: ''
    }, 
    primaryEmail: {
        type: String,
        default:''
    }, 
    secondaryEmail: {
        type: String,
        default: ''
    },
    primaryAddress: {
        type: String,
        default: ''
    },
    secondaryAddress: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    },
    searchesCount: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Contacts', ContactSchema)