'use client'
import { useState } from "react";

import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import axios from 'axios';


export default function HomePage( {username} ) {

    const [selectedOption, setSelectedOption] = useState('');
    const [textValue, setTextValue] = useState('');
  
    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleTextareaChange = (event) => {
      setTextValue(event.target.value);
    };
  
  
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Event', event);
        console.log('drop', selectedOption);
        console.log('text', textValue);

        try {
            const response = await axios.post('http://localhost:5000/predict', {selectedOption,textValue});
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
            <Link href="/model/front">Model</Link>

            <div className="container">
        <form id="myUniqueFormId" onSubmit={handleSubmit}>

          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="">Select an option</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Civil">Civil</option>
          </select>

          <textarea
            value={textValue}
            onChange={handleTextareaChange}
            placeholder="Enter context here"
          />

          <div>
            <button type="submit">Submit</button>
            <button className="clearButton" onClick={clearClicked}>Clear</button>
          </div>

          
        </form>
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