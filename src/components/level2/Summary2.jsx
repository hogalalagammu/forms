// Summary.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './summary2.css'

const Summary2 = () => {
  const location = useLocation();
  const formData = location.state;

  if (!formData) {
    return <div>No data available</div>; // Handle case where data is not passed
  }

  return (
    <div className="summary-container">
      <h2>Job Application Form Summary</h2>
      <p><strong>Full Name:</strong> {formData.fullName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Position:</strong> {formData.position}</p>

      {formData.position === 'Developer' && (
        <p><strong>Relevant Experience (years):</strong> {formData.relevantExperience}</p>
      )}

      {formData.position === 'Designer' && (
        <>
          <p><strong>Relevant Experience (years):</strong> {formData.relevantExperience}</p>
          <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
        </>
      )}

      {formData.position === 'Manager' && (
        <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
      )}

      <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
      <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
    </div>
  );
};

export default Summary2;
