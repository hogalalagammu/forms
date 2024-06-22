import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import SurveyForm from './components/level3/SurveyForm'
import JobApplicationForm from './components/level2/JobApplicationForm';
import Form from './components/level1/Form';
import Main from './components/Main';
import Summary from './components/level1/Summary';
import './App.css'; // Import the CSS file for App
import Summary2 from './components/level2/Summary2';

const App = () => {
  return (
    <>
      <div className="bbg">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/survey-form" element={<SurveyForm />} />
          <Route path="/job-application-form" element={<JobApplicationForm />} />
          <Route path="/summary2" element={<Summary2 />} />
          <Route path="/form" element={<Form />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
