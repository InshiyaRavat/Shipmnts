const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const CompanyModel = require('./models/Company')
const ContactModel = require('./models/Contact')
const xlsx = require('xlsx')
const moment = require('moment')
require('dotenv').config()

const app = express()
app.use(express.json())

let uploadedData = []

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

const port = 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.error("DB not connected", err))

app.post('/upload', upload.single('excel'), async (req, res) => {
    const file = req.file
    if (!file) {
        return res.status(400).send('No file found!')
    }
    try {
        const book = xlsx.readFile(file.path)
        const sheetName = book.SheetNames[0]
        const sheet = book.Sheets[sheetName]
        const data = xlsx.utils.sheet_to_json(sheet)

        uploadedData = data
        console.log('Uploaded Data:', data)
        return res.json({ message: 'File uploaded successfully!', data })
    } catch (err) {
        console.log(err)
        res.status(500).send('Error processing file.')
    } finally {
        const fs = require('fs')
        fs.unlink(file.path, (err) => {
            if (err) console.error(err)
        })
    }
});

app.get('/data',async(req,res)=>{
    return res.json({uploadedData})
})

app.post('/confirm-upload', async (req, res) => {
    try {
        const data = uploadedData
        if (!data || data.length === 0) {
            console.log('No uploaded data found in memory')
            return res.status(400).send('No uploaded data found in memory')
        }
        const dateString = '15-05-1990'
        const dateObj = moment(dateString, 'DD-MM-YYYY').toDate()
        console.log('Data to be saved:', data)

        for (const row of data) {
           

            const company = new CompanyModel({
                companyName: row.companyName,
                companyAddress: row.companyAddress,
                companyPhone: row.companyPhone,
                companyEmail: row.companyEmail,
                companyWebsite: row.companyWebsite,
                numEmployees: row.numEmployees,
                foundedDate: dateObj,
                industryType: row.industryType
            })
            await company.save()

            const contact = new ContactModel({
                contactName: row.contactName,
                contactEmail: row.contactEmail,
                contactPhone: row.contactPhone,
                dateOfBirth: dateObj,
                contactType: row.contactType,
                companyId: company._id
            })
            await contact.save()
        }

        res.json({ message: 'Data saved to database',data})
        uploadedData = []
    } catch (err) {
        console.error('Error occurred while saving data:', err)
        res.status(500).send('Error occurred while saving data')
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
