import React from 'react';
import { useState } from "react";
import axios from 'axios';
import Dropdown from "./Dropdown";
import Response from "./response";

const practiceQuestions = () => {
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
      setPracticeQA(data.questions);

      try {
        const response = await axios.post('http://localhost:5000/practice', {discipline,coreSubject,topic});
        // setPracticeQA(response.data.questions);
        console.log('Response P:', response.data); // Assuming the response contains data
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
