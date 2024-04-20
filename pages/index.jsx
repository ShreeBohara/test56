'use client'
import { useState } from "react";

import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import axios from 'axios';
import FileUpload from "./api/FileUpload";
import Dropdown from "./Dropdown";

const coreSubjectsData = {
  'Computer Science': ['Algorithms', 'Data Structures', 'Computer Networks'],
  'Mechanical Engineering': ['Thermodynamics', 'Mechanics', 'Fluid Dynamics'],
  'Civil Engineering': ['Thermodynamics', 'Mechanics', 'Fluid Dynamics'],
  'Electric Engineering': ['Power System', 'Electrical Machine', 'Control Systems, Digital Signal Processing']
  
};

const topicsData = {
  'Algorithms': ['Sorting', 'Searching', 'Graph Algorithms'],
  'Data Structures': ['Arrays', 'Linked Lists', 'Trees'],
};


export default function HomePage( {username} ) {

    const [Response, setResponse] = useState(null);

    const [selectedOption, setSelectedOption] = useState('');
    const [textValue, setTextValue] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [coreSubject, setCoreSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [fileContent, setFileContent] = useState('');
    const handleDisciplineChange = (value) => {
      setDiscipline(value);
      setCoreSubject('');
      setTopic('');
  };
  
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
            setResponse(response.data);
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
    }

    return (
        <Layout pageTitle="Home">
        {username ?
        <>
          <h2>Hi {username}</h2>
          <Link href="/profile">Profile</Link><br/>
          <Link href="/api/logout">Logout</Link>
          

          <div className="container">
            <form id="myUniqueFormId" onSubmit={handleSubmit}>

            <div className="App">
            <Dropdown
                label="Discipline"
                options={['Computer Science', 'Mechanical Engineering']}
                value={discipline}
                onChange={handleDisciplineChange}
            />
            {discipline && (
                <Dropdown
                    label="Core Subject"
                    options={coreSubjectsData[discipline]}
                    value={coreSubject}
                    onChange={(value) => setCoreSubject(value)}
                />
            )}
            {coreSubject && (
                <Dropdown
                    label="Topic"
                    options={topicsData[coreSubject]}
                    value={topic}
                    onChange={(value) => setTopic(value)}
                />
            )}
        </div>

              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="">Select an option</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil </option>
              </select>

              <textarea
                value={textValue}
                onChange={handleTextareaChange}
                placeholder="Enter context here"
              />

              <div>
                    <h1>OR</h1>
                    <FileUpload handleFileUpload={handleFileUpload} />
              </div>

              <div>
                <button type="submit">Submit</button>
                <button className="clearButton" onClick={clearClicked}>Clear</button>
              </div>
            </form>
            <div className="ResponseContainer">
              <div className="ResponseSet">
                {
                  Response && Response.prediction.map((pred, index) => (
                    <div className="ResponseTile">
                      <p><strong>Question : </strong>{pred.question}</p>
                      <p><strong>Answer : </strong>{pred.answer}</p>
                    </div>
                  ))
                }

              </div>
             
            </div>
          </div>


        </>: 
        <>
            <h2>Log in</h2>
            <Link href="/login">Login</Link><br/>
            <Link href="/signup">Signup</Link>
        </>
        }
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    return { props: {username} };
};