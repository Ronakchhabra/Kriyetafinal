import React, { useState } from 'react';
import './App.css';
import Courses from './Componets/Pages/Courses';
// import CourseDetalis from './Componets/Pages/CourseDetalis';
import NotFound from './Componets/Pages/NotFound';
import AddCourse from './Componets/Pages/AddCourse';
import Auth from './Componets/Pages/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Documentation from './Componets/Pages/Documentation';
import Video from './Componets/Pages/Video';
import Project from './Componets/Pages/Project';
import Notes from './Componets/Pages/Notes';
import ChatSidebar from './Componets/Pages/ChatSidebar';
import Quill from './Componets/Pages/Quill';
import DocumentationContent from './Componets/Pages/DocumentationContent';

function App() {
  const [selectedCourse,setselectedCourse] = useState([]);
  const [selectedDocs,setselectedDocs] = useState([]);
  return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route
              path="/"
              element={<Auth />}
            />
            <Route
              path="/courses"
              element={<Courses setselectedCourse={setselectedCourse}/>}
            />
            <Route
              path="/coursedetalis"
              element={<Documentation selectedCourse={selectedCourse} setselectedDocs={setselectedDocs}/>}
            />                                   
            <Route
              path="/coursevideo"
              element={<Video />}
            />
            <Route
              path="/editor"
              element={<Quill selectedCourse={selectedCourse}/>}
            />
            <Route
              path="/project"
              element={<Project />}
            />    
            <Route
              path="/notes"
              element={<Notes />}
            />                       
            <Route
              path="/addcourse"
              element={<AddCourse />}
            />                       
            <Route
              path="/community"
              element={<ChatSidebar />}
            />
            <Route
              path="/DocumentationContent"
              element={<DocumentationContent selectedDocs={selectedDocs}/>}
            />            
            <Route
              path="/*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
