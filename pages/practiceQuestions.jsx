import React from 'react';
import { useState } from "react";
import axios from 'axios';
import Dropdown from "./Dropdown";
import Response from "./response";

const practiceQuestions = () => {
  const coreSubjectsData = {
    'Computer Science': ['Object-Oriented Programming (OOPs)', 'Operating Systems', 'Computer Networks','Database Management System (DBMS)','Data Structures and Algorithms'],
    'Mechanical Engineering': ['Thermodynamics', 'Mechanics', 'Fluid Dynamics'],
    'Civil Engineering': ['Structural Engineering','Transportation Engineering', 'Environmental Engineering', 'Surveying and Geomatics'],
    'Electronics and telecommunications engineering': ['Digital Communication', 'Power Devices & Circuits', 'VLSI', 'Cellular Networks']
    
  };
  
  const topicsData = {
    "Object-Oriented Programming (OOPs)": [
      "Classes and Objects",
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
      "Abstraction",
      "Constructors and Destructors",
      "Method overloading and overriding",
      "Access Modifiers",
      "Association, Aggregation, and Composition",
      "Interface and Abstract Classes",
      "Static and Instance Members",
      "Object-oriented design principles",
      "Design Patterns",
      "Exception Handling",
      "Generics"
    ],
    "Computer Networks": [
      "Network Topologies",
      "OSI Model",
      "TCP/IP Protocol Suite",
      "IP Addressing and Subnetting",
      "Routing and Switching",
      "Wireless Networks",
      "Network Security",
      "DNS and DHCP",
      "HTTP and HTTPS",
      "Ethernet and LAN Technologies",
      "WAN Technologies",
      "Network Performance Optimization",
      "Network Virtualization",
      "Cloud Computing",
      "Internet of Things (IOT)"
    ],
    "Operating Systems": [
      "Process Management",
      "Memory Management",
      "File Systems",
      "Device Management",
      "CPU Scheduling Algorithms",
      "Deadlocks",
      "Inter-process Communication (IPC)",
      "Shell Programming",
      "System Calls",
      "Kernel Structure",
      "Virtual Memory",
      "Input/Output Systems",
      "Multitasking and Multithreading",
      "Booting Process",
      "Security and Protection"
    ],
    "Database Management System (DBMS)": [
      "Relational Data Model",
      "Structured Query Language (SQL)",
      "Database Design and Normalization",
      "Indexing and Query Optimization",
      "Transactions and Concurrency Control",
      "Database Security",
      "Database Backup and Recovery",
      "Data Warehousing and Data Mining",
      "NoSQL Databases",
      "Distributed Databases",
      "Object-Oriented Databases",
      "Data Modeling",
      "Entity-Relationship (ER) Diagrams",
      "Database Connectivity",
      "Database Administration"
    ],
    "Data Structures and Algorithms": [
      "Arrays and Strings",
      "Linked Lists",
      "Stacks and Queues",
      "Trees",
      "Graphs",
      "Hashing",
      "Sorting Algorithms",
      "Searching Algorithms",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Divide and Conquer",
      "Recursion",
      "Heaps and Priority Queues",
      "Trie Data Structure",
      "Red-Black Trees"
    ],
    "Digital Communication": [
      "Modulation Techniques",
      "Error Detection and Correction",
      "Channel Coding",
      "Digital Modulation Schemes",
      "Spread Spectrum Techniques",
      "Multiplexing Techniques",
      "Synchronization",
      "Digital Communication System Design",
      "Digital Signal Processing (DSP)",
      "Channel Models",
      "Source Coding",
      "Forward Error Correction (FEC)",
      "Digital Communication Protocols",
      "Digital Modems",
      "Software-Defined Radio (SDR)"
    ],
    "Power Devices & Circuits": [
      "Power Semiconductor Devices",
      "Power Amplifiers",
      "Switching Power Supplies",
      "Voltage Regulation",
      "Power Electronics Applications",
      "Power Semiconductor Characteristics",
      "Gate Drive Circuits",
      "Power Losses and Efficiency",
      "Snubber Circuits",
      "Power Factor Correction (PFC)",
      "Soft-Switching Techniques",
      "Gate Turn-Off Thyristors (GTOs)",
      "Protective Circuits",
      "EMI/EMC Considerations",
      "Isolation Techniques"
    ],
    "VLSI": [
      "CMOS Technology",
      "Logic Gates and Basic Building Blocks",
      "Integrated Circuit Design Flow",
      "RTL Design and Synthesis",
      "FPGA Design and Implementation",
      "Timing Analysis and Optimization",
      "Power Analysis and Optimization",
      "Physical Design and Layout",
      "Clock Distribution and Synchronization",
      "Low-Power Design Techniques",
      "Testing and Design for Testability (DFT)",
      "Memory Design",
      "ASICs vs. FPGAs",
      "EDA Tools and CAD Flows",
      "Emerging Trends in VLSI"
    ],
    "Cellular Networks": [
      "Multiple Access Techniques",
      "Cellular Network Architectures",
      "Wireless Channel Characteristics",
      "Network Topologies",
      "Cellular Network Planning",
      "Handover and Mobility Management",
      "Mobile Communication Protocols",
      "Radio Resource Management",
      "Cellular Network Security",
      "Evolution of Cellular Technologies",
      "Cellular Network Performance Metrics",
      "Cellular Network Services",
      "Small Cells and HetNets",
      "Cellular IoT (Internet of Things)",
      "Network Virtualization and Slicing"
    ],
    "Principle of Communication System": [
      "Signal Analysis",
      "Modulation Techniques",
      "Analog Communication Systems",
      "Digital Communication Systems",
      "Transmission Media Characteristics",
      "Noise and Interference",
      "Bandwidth Considerations",
      "Modulation-Demodulation Processes",
      "Multiplexing Techniques",
      "Channel Coding",
      "Spread Spectrum Techniques",
      "Digital Communication Protocols",
      "Equalization Techniques",
      "System Performance Analysis",
      "Emerging Technologies"
    ],
    "Structural Engineering": [
      "Statics",
      "Mechanics of Materials",
      "Structural Analysis",
      "Structural Dynamics",
      "Finite Element Analysis (FEA)",
      "Reinforced Concrete Design",
      "Steel Structures Design",
      "Wood Structures Design",
      "Masonry Structures Design",
      "Composite Structures",
      "Bridge Engineering",
      "Tall Buildings Design",
      "Foundation Engineering",
      "Earthquake Engineering",
      "Structural Health Monitoring (SHM)"
    ],
    "Transportation Engineering": [
      "Traffic Engineering",
      "Highway Engineering",
      "Pavement Design and Analysis",
      "Transportation Planning",
      "Urban Transportation Systems",
      "Traffic Flow Theory",
      "Traffic Safety and Accident Analysis",
      "Intelligent Transportation Systems (ITS)",
      "Public Transportation Systems",
      "Sustainable Transportation",
      "Transportation Infrastructure Management",
      "Transportation Modeling and Simulation",
      "Transportation Economics",
      "Freight Transportation",
      "Active Transportation (Walking and Cycling Infrastructure)"
    ],
    "Environmental Engineering": [
      "Water Quality Management",
      "Air Pollution Control",
      "Solid Waste Management",
      "Wastewater Treatment",
      "Environmental Impact Assessment",
      "Hazardous Waste Management",
      "Environmental Chemistry",
      "Remediation Technologies",
      "Environmental Monitoring and Analysis",
      "Sustainable Development",
      "Ecological Engineering",
      "Climate Change Mitigation and Adaptation",
      "Renewable Energy Systems",
      "Green Infrastructure",
      "Environmental Policy and Regulation"
    ],
    "Surveying and Geomatics": [
      "Geodetic Surveying",
      "Topographic Surveying",
      "Land Surveying",
      "Construction Surveying",
      "Hydrographic Surveying",
      "Photogrammetry",
      "Remote Sensing",
      "Geographic Information Systems (GIS)",
      "Global Navigation Satellite Systems (GNSS)",
      "Cartography",
      "Geographical Information Science (GIScience)",
      "Digital Terrain Modeling (DTM)",
      "LiDAR (Light Detection and Ranging)",
      "Cadastral Surveying",
      "Geospatial Data Management"
    ]
  };

    const data = {'topic': 'Classes and Objects', 'questions': [{'question': 'What is a class in object-oriented programming?', 'answer': 'A class is a blueprint for creating objects. It defines attributes and methods that all objects of the class will have.'}, {'question': 'What is an object?', 'answer': 'An object is an instance of a class. It represents a unique occurrence of the class and has its own set of attributes and methods.'}, {'question': 'What is the difference between a class and an object?', 'answer': 'A class is a template or blueprint for creating objects, whereas an object is an instance of a class, representing a specific entity.'}, {'question': 'What are attributes and methods in a class?', 'answer': "Attributes are data members or variables that hold values associated with the object. Methods are functions defined within a class that perform operations on the object's data."}, {'question': 'How do you create an object in Java?', 'answer': "To create an object in Java, you use the 'new' keyword followed by the class name and any arguments required by the class's constructor."}, {'question': 'What is a constructor?', 'answer': "A constructor is a special method in a class that is automatically called when an object of the class is created. It is used to initialize the object's state."}, {'question': 'What is method overloading?', 'answer': 'Method overloading is a feature in Java that allows a class to have multiple methods with the same name but different parameters. The compiler determines which method to call based on the arguments provided.'}, {'question': 'What is method overriding?', 'answer': 'Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass. It allows for polymorphic behavior.'}, {'question': 'What is encapsulation?', 'answer': 'Encapsulation is the bundling of data and methods that operate on the data into a single unit or class. It helps in hiding the internal state of an object and restricting access to it.'}, {'question': 'What is inheritance?', 'answer': 'Inheritance is a mechanism in object-oriented programming that allows a class (subclass) to inherit properties and behaviors from another class (superclass). It promotes code reusability and establishes a relationship between classes.'}, {'question': 'What is polymorphism?', 'answer': 'Polymorphism is the ability of an object to take on different forms or behaviors based on the context. In Java, it is achieved through method overloading and method overriding.'}, {'question': 'What is abstraction?', 'answer': 'Abstraction is the process of hiding the implementation details and showing only the essential features of an object. It allows for managing complexity by focusing on what an object does rather than how it does it.'}, {'question': "What is the 'this' keyword in Java?", 'answer': "The 'this' keyword in Java refers to the current instance of the class. It is used to differentiate between instance variables and parameters with the same name."}, {'question': 'What is a static method?', 'answer': 'A static method in Java belongs to the class rather than any specific instance of the class. It can be called directly using the class name and does not require an object to be created.'}, {'question': "What is the difference between '== 'and 'equals ()' method in Java?", 'answer': "'==' is an operator used to compare the reference of two objects in memory, while 'equals ()' is a method used to compare the content or values of two objects for equality."}]};

    const [PracticeQA, setPracticeQA] = useState(null);

    const [discipline, setDiscipline] = useState('');
    const [coreSubject, setCoreSubject] = useState('');
    const [topic, setTopic] = useState('');

    const handleDisciplineChange = (value) => {
        setDiscipline(value);
        setCoreSubject('');
        setTopic('');
    };
    

    const getPractiseQuestions = async (event) => {
      event.preventDefault()
      console.log('Event', event);
      console.log('discipline', discipline);
      console.log('coreSubject', coreSubject);
      console.log('topic'+ topic);

      // remove below line after backend setup
      //setPracticeQA(data.questions);

      try {
        const response = await axios.post('http://localhost:5000/practice', {discipline,coreSubject,topic});
        // setPracticeQA(response.data.questions);
        console.log('Response P:', response.data.questions); // Assuming the response contains data
        const data = response.data.questions
        setPracticeQA(data);
        // Handle response data as needed
      } catch (error) {
        console.error('Error:', error);
        // Handle errors if the request fails
      }

    }

  return (
    <div>
        <div className="dropdownContainer">
            <Dropdown
                label="Discipline"
                options={['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electronics and telecommunications engineering']}
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

        {
            PracticeQA && (
                <Response 
                data={PracticeQA}
                />
            )
        }
    </div>
  )
}

export default practiceQuestions
