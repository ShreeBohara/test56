import React from 'react'
import { useState } from "react";
import FileUpload from "./api/FileUpload";
import Response from "./response";


const questionGenerator = () => {

    const [Prediction, setPrediction] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [textValue, setTextValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Event', event);
        console.log('drop', selectedOption);
        console.log('text', textValue);
        console.log('file'+ fileContent);

        var final = "";
        if(textValue == ""){
          final = fileContent;
        }else{
          final = textValue
        }
        
        try {
            const response = await axios.post('http://localhost:5000/predict', {selectedOption,final});
            setPrediction(response.data);
            console.log('Response:', response.data); // Assuming the response contains data
            // Handle response data as needed
          } catch (error) {
            console.error('Error:', error);
            // Handle errors if the request fails
          }
        console.log('Dropdown value:', selectedOption);
        console.log('Text area value:', textValue);
    };

    const clearClicked = () => {
      setSelectedOption('');
      setTextValue('');
      setFileContent('');
    }

    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleTextareaChange = (event) => {
      setTextValue(event.target.value);
    };
    const handleFileUpload = async (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        console.log("File Content:", fileContent);
      };
      reader.readAsText(file);
    };


  return (
    <div className="container">
        <form id="myUniqueFormId" onSubmit={handleSubmit}>
            <div className="inputContextContainer">
                <div>
                    <textarea
                    value={textValue}
                    onChange={handleTextareaChange}
                    placeholder="Enter context here"
                    />
                </div>
                <div className="OR">
                    <h1>OR</h1>
                </div>
            
                <div>
                    <FileUpload handleFileUpload={handleFileUpload} />
                </div>
            </div>
            <div>
                <button type="submit">Submit</button>
                <button className="clearButton" onClick={clearClicked}>Clear</button>
            </div>
        </form>
        {
            Prediction && (
            <Response 
                data={Prediction.predict}
            />
            )
        }
    </div>
  )
}

export default questionGenerator
