import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  function handleChange(e){
    e.preventDefault();
    setSelectedFile(e.target.files[0])
    if(selectedFile.size > 1024){
      alert('file size exceeded 1MB')
    }
  }
  async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append('excel',selectedFile)
    try{
      const response = await axios.post("http://localhost:5000/upload",formData)
      if(response.ok){
        alert("file uploaded successfully!!")
      }
      else{
        alert("erroe occured in uploading file")
      }
    }
    catch(err){
      console.log(err)
      alert("erroe occured in uploading file")
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>upload file(.xls / .xlsx)</label>
          <input type='file' onChange={handleChange}/>
          <button type='submit'>submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
