const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    dateOfBirth: { type: Date },
    contactType: { type: String, enum: ['Primary', 'Secondary', 'Other'], required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
})

const ContactModel = mongoose.model('Contact',contactSchema)
module.exports = ContactModel;