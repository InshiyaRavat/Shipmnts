import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ConfirmationForm() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:5000/data')
            console.log(response.data)
            setData(response.data.uploadedData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    async function handleConfirm() {
        try {
            axios.post('http://localhost:5000/confirm-upload', null, { withCredentials: true })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => console.error(error));
        } catch (err) {
            console.error(err)
            alert('Error saving data.')
        }
    }

    return (
        <div>
            <p>Do you want to confirm and save the file?</p>
            <h2>Uploaded Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Company Phone</th>
                        <th>Company Email</th>
                        <th>Company Website</th>
                        <th>Number of Employees</th>
                        <th>Founded Date</th>
                        <th>Industry Type</th>
                        <th>Contact Name</th>
                        <th>Contact Email</th>
                        <th>Contact Phone</th>
                        <th>Date of Birth</th>
                        <th>Contact Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((company, index) => (
                        <tr key={index}>
                            <td>{company.companyName}</td>
                            <td>{company.companyAddress}</td>
                            <td>{company.companyPhone}</td>
                            <td>{company.companyEmail}</td>
                            <td>{company.companyWebsite}</td>
                            <td>{company.numEmployees}</td>
                            <td>{'17-03-1890'}</td>
                            <td>{company.industryType}</td>
                            <td>{company.contactName}</td>
                            <td>{company.contactEmail}</td>
                            <td>{company.contactPhone}</td>
                            <td>{'15-05-1990'}</td>
                            <td>{company.contactType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleConfirm}>Confirm & Save</button>
            <button onClick={() => window.location.reload()}>Cancel</button>
        </div>
    );
}


export default ConfirmationForm
