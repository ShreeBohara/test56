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


const links = ['Practice Questions', 'Question Generator'];



export default function HomePage( {username} ) {

  const [Response, setResponse] = useState(null);

  const [active, setactive] = useState('Question Generator');
  const handleFilter = (link) => {
    setactive(link);
  }

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
          <div className="headerContainer">
            <h2>Hi {username}</h2>
            <div className="header">
              <Link href="/profile">Profile</Link><br/>
              <Link href="/api/logout">Logout</Link>
            </div>
          </div>

          <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
              {links.map((link) => (
                  <button 
                  key={link}
                  onClick={() => {handleFilter(link)}}
                  className={`${active === link ? 'gradient_blue-purple' : ''} additional-style`}
                  >
                      {link}
                  </button>
              ))}
          </ul>
          {
            active === 'Question Generator' ?
            <>
              <div className="container">
                <form id="myUniqueFormId" onSubmit={handleSubmit}>
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
            </> :
            <>
            {/* practice question */}
            <div className="dropdownContainer">
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
            </>
          }
          
          

          
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