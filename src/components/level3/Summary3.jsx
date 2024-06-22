import React from 'react';
import './summary3.css'

const Summary3 = ({ formData, additionalQuestions }) => {
  return (
    <div className="summary-container">
      <h2>Summary of Your Survey</h2>
      
      <div className="summary-section">
        <h3>Personal Information</h3>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
      </div>

      {formData.surveyTopic === 'Technology' && (
        <div className="summary-section">
          <h3>Technology Details</h3>
          <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
          <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
        </div>
      )}

      {formData.surveyTopic === 'Health' && (
        <div className="summary-section">
          <h3>Health Details</h3>
          <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
          <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
        </div>
      )}

      {formData.surveyTopic === 'Education' && (
        <div className="summary-section">
          <h3>Education Details</h3>
          <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
          <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
        </div>
      )}

      <div className="summary-section">
        <h3>Feedback</h3>
        <p>{formData.feedback}</p>
      </div>

      {additionalQuestions.length > 0 && (
        <div className="summary-section">
          <h3>Additional Questions</h3>
          {additionalQuestions.map((question, index) => (
            <p key={index}><strong>{question}</strong></p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary3;
