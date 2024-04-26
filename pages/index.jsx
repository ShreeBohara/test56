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
  'Data Structures': ['Arra    ys', 'Linked Lists', 'Trees'],
};


const links = ['Practice Questions', 'Question Generator'];



export default function HomePage( {username} ) {

  const data = [
        {"Question": "What is statics?", "Answer": "Statics is the branch of mechanics that deals with forces acting on bodies at rest or in equilibrium."},
        {"Question": "What are the fundamental principles of statics?", "Answer": "The fundamental principles of statics include the equilibrium of forces, the concept of moments, and the conditions for stability."},
        {"Question": "What is the difference between static and dynamic forces?", "Answer": "Static forces are those that do not change over time, while dynamic forces vary with time."},
        {"Question": "What is the importance of statics in structural engineering?", "Answer": "Statics is essential for analyzing the forces and stresses acting on structures to ensure they remain stable and safe."},
        {"Question": "What is meant by the term 'equilibrium' in statics?", "Answer": "Equilibrium refers to the state where the sum of all forces and moments acting on a body is zero, resulting in no net movement or rotation."},
        {"Question": "How do you calculate the moment of a force?", "Answer": "The moment of a force about a point is calculated by multiplying the magnitude of the force by the perpendicular distance from the point to the line of action of the force."},
        {"Question": "What are the types of equilibrium?", "Answer": "The types of equilibrium are static equilibrium, where the body is at rest, and dynamic equilibrium, where the body moves at a constant velocity."},
        {"Question": "What is the principle of transmissibility in statics?", "Answer": "The principle of transmissibility states that a force acting on a body can be moved along its line of action without changing its effect on the body's equilibrium."},
        {"Question": "How do you determine the reactions at supports in statics?", "Answer": "The reactions at supports are determined by applying the equations of equilibrium to the entire structure or its individual components."},
        {"Question": "What is the importance of free-body diagrams in statics?", "Answer": "Free-body diagrams are used to visualize and analyze the forces acting on a body or structure, making it easier to solve equilibrium problems."}
    ];

  const [Response, setResponse] = useState(null);

  const [active, setactive] = useState('Practice Questions');
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

    const getPractiseQuestions = async (event) => {
      event.preventDefault()
      console.log('Event', event);
      console.log('discipline', discipline);
      console.log('coreSubject', coreSubject);
      console.log('topic'+ topic);

      try {
        const response = await axios.post('http://localhost:5000/practice', {discipline,coreSubject,topic});
        setResponse(response.data);
        console.log('Response P:', response.data); // Assuming the response contains data
        // Handle response data as needed
      } catch (error) {
        console.error('Error:', error);
        // Handle errors if the request fails
      }

    }

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
                  options={['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electronic Engineering']}
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
                <button type="submit" onClick={getPractiseQuestions}>Submit</button>
              </div>

              <div className="ResponseContainer">
                  <div className="ResponseSet">
                    {
                      data && data.map((pred, index) => (
                        <div className="ResponseTile">
                          <p><strong>Question : </strong>{pred.Question}</p>
                          <p><strong>Answer : </strong>{pred.Answer}</p>
                        </div>
                      ))
                    }

                  </div>
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