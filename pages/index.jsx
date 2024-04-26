'use client'
import { useState } from "react";
import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'

import QAGenerator from "./questionGenerator";
import PracticeQuestions from "./practiceQuestions";

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

  const [active, setactive] = useState('Practice Questions');

  const handleFilter = (link) => {
    setactive(link);
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
              <QAGenerator />
            </> :
            <>
              <PracticeQuestions />
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