import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryPage from './Summary3'; // Adjust the path as needed
import './surveyForm.css';

const SurveyForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [surveyTopic, setSurveyTopic] = useState('');
  const [favoriteProgrammingLanguage, setFavoriteProgrammingLanguage] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [feedback, setFeedback] = useState('');
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // Track form submission

  useEffect(() => {
    if (surveyTopic) {
      axios.get(`https://mocki.io/v1/705cb631-574d-4437-8ac9-00d688a7efdd`)
        .then(response => setAdditionalQuestions(response.data[surveyTopic]))
        .catch(error => console.error('Error fetching additional questions:', error));
    }
  }, [surveyTopic]);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Email is not valid';
    if (!surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';

    if (surveyTopic === 'Technology') {
      if (!favoriteProgrammingLanguage) newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!yearsOfExperience || yearsOfExperience <= 0) newErrors.yearsOfExperience = 'Years of Experience must be greater than 0';
    }

    if (surveyTopic === 'Health') {
      if (!exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }

    if (surveyTopic === 'Education') {
      if (!highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!feedback || feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true); // Mark as submitted

      // Normally, you would navigate to the summary page here
      // For now, let's log the data and display the summary in console
      console.log('Form submitted successfully!', {
        fullName,
        email,
        surveyTopic,
        favoriteProgrammingLanguage,
        yearsOfExperience,
        exerciseFrequency,
        dietPreference,
        highestQualification,
        fieldOfStudy,
        feedback,
        additionalQuestions
      });
    }
  };

  // Render the summary page if submitted
  if (submitted) {
    return <SummaryPage 
      formData={{
        fullName,
        email,
        surveyTopic,
        favoriteProgrammingLanguage,
        yearsOfExperience,
        exerciseFrequency,
        dietPreference,
        highestQualification,
        fieldOfStudy,
        feedback
      }}
      additionalQuestions={additionalQuestions}
    />;
  }

  // Render the form if not yet submitted
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Survey Topic:</label>
        <select value={surveyTopic} onChange={(e) => setSurveyTopic(e.target.value)}>
          <option value="">Select a topic</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <span className="error">{errors.surveyTopic}</span>}
      </div>

      {surveyTopic === 'Technology' && (
        <div>
          <div className="form-group">
            <label>Favorite Programming Language:</label>
            <select value={favoriteProgrammingLanguage} onChange={(e) => setFavoriteProgrammingLanguage(e.target.value)}>
              <option value="">Select a language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <span className="error">{errors.favoriteProgrammingLanguage}</span>}
          </div>

          <div className="form-group">
            <label>Years of Experience:</label>
            <input type="number" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
            {errors.yearsOfExperience && <span className="error">{errors.yearsOfExperience}</span>}
          </div>
        </div>
      )}

      {surveyTopic === 'Health' && (
        <div>
          <div className="form-group">
            <label>Exercise Frequency:</label>
            <select value={exerciseFrequency} onChange={(e) => setExerciseFrequency(e.target.value)}>
              <option value="">Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <span className="error">{errors.exerciseFrequency}</span>}
          </div>

          <div className="form-group">
            <label>Diet Preference:</label>
            <select value={dietPreference} onChange={(e) => setDietPreference(e.target.value)}>
              <option value="">Select a diet</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <span className="error">{errors.dietPreference}</span>}
          </div>
        </div>
      )}

      {surveyTopic === 'Education' && (
        <div>
          <div className="form-group">
            <label>Highest Qualification:</label>
            <select value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)}>
              <option value="">Select a qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <span className="error">{errors.highestQualification}</span>}
          </div>

          <div className="form-group">
            <label>Field of Study:</label>
            <input type="text" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
            {errors.fieldOfStudy && <span className="error">{errors.fieldOfStudy}</span>}
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Feedback:</label>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        {errors.feedback && <span className="error">{errors.feedback}</span>}
      </div>

      {additionalQuestions.length > 0 && (
        <div className="additional-questions">
          <h3>Additional Questions</h3>
          {additionalQuestions.map((question, index) => (
            <div key={index} className="form-group">
              <label>{question}</label>
              <input type="text" />
            </div>
          ))}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;