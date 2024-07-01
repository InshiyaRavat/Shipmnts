import './App.css'
import React, { useState } from 'react'
import axios from 'axios'
import ConfirmationForm from './components/ConfirmationForm'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState(null)

  function handleChange(e) {
    e.preventDefault()
    setSelectedFile(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('excel', selectedFile)
    try {
      const response = await axios.post("http://localhost:5000/upload", formData)
      if (response.data.message === "File uploaded successfully!") {
        console.log(response.data)
        alert("Success")
        setUploadStatus('uploaded')
      } else {
        setUploadStatus('error');
        alert("Error occurred in uploading file")
      }
    } catch (err) {
      console.log(err)
      setUploadStatus('error')
      alert("Error occurred in uploading file")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>Upload file (.xls / .xlsx)</label>
          <input type='file' onChange={handleChange} />
          <button type='submit'>Submit</button>
        </form>
        {uploadStatus === 'uploaded' && (
          <div>
            <p>File uploaded successfully!</p>
            <div>
              <button onClick={() => setUploadStatus('confirm')}>Confirm & Save upload</button>
              <button onClick={() => setUploadStatus(null)}>Cancel upload</button>
            </div>
          </div>
        )}
        {uploadStatus === 'confirm' && (
          <ConfirmationForm />
        )}
      </header>
    </div>
  )
}

export default App
