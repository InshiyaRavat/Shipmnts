const mongoose = require('mongoose')

const companySchema =new mongoose.Schema({
    companyName: { type: String, required: true },
    companyAddress: { type: String },
    companyPhone: { type: String },
    companyEmail: { type: String },
    companyWebsite: { type: String },
    numEmployees: { type: Number },
    foundedDate: { type: Date },
    industryType: { type: String, enum: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Other'], required: true }
})

const CompanyModel = mongoose.model('Company',companySchema)
module.exports = CompanyModel;