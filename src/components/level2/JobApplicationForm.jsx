import React, { useState } from 'react';
import './jobApplicationForm.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const JobApplicationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [relevantExperience, setRelevantExperience] = useState('');
  const [portfolioURL, setPortfolioURL] = useState('');
  const [managementExperience, setManagementExperience] = useState('');
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [preferredInterviewTime, setPreferredInterviewTime] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Use useNavigate hook

  const skillOptions = ['JavaScript', 'CSS', 'Python', 'React', 'Node.js'];

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validateURL = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const handleSkillChange = (skill) => {
    setAdditionalSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Email is not valid';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!position) newErrors.position = 'Position is required';

    if ((position === 'Developer' || position === 'Designer') && (!relevantExperience || relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    }

    if (position === 'Designer' && !portfolioURL) {
      newErrors.portfolioURL = 'Portfolio URL is required';
    } else if (position === 'Designer' && portfolioURL && !validateURL(portfolioURL)) {
      newErrors.portfolioURL = 'Portfolio URL is not valid';
    }

    if (position === 'Manager' && !managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }

    if (additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected';
    }

    if (!preferredInterviewTime) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Navigate to summary page on successful form submission
      navigate('/summary2', {
        state: {
          fullName,
          email,
          phoneNumber,
          position,
          relevantExperience,
          portfolioURL,
          managementExperience,
          additionalSkills,
          preferredInterviewTime
        }
      });
    }
  };

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
        <label>Phone Number:</label>
        <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </div>

      <div className="form-group">
        <label>Applying for Position:</label>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="">Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.position && <span className="error">{errors.position}</span>}
      </div>

      {(position === 'Developer' || position === 'Designer') && (
        <div className="form-group">
          <label>Relevant Experience (years):</label>
          <input type="number" value={relevantExperience} onChange={(e) => setRelevantExperience(e.target.value)} />
          {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
        </div>
      )}

      {position === 'Designer' && (
        <div className="form-group">
          <label>Portfolio URL:</label>
          <input type="text" value={portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)} />
          {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
        </div>
      )}

      {position === 'Manager' && (
        <div className="form-group">
          <label>Management Experience:</label>
          <input type="text" value={managementExperience} onChange={(e) => setManagementExperience(e.target.value)} />
          {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
        </div>
      )}

      <div className="form-group">
        <label>Additional Skills:</label><br />
        <div className="skills-container">
          {skillOptions.map((skill) => (
            <div key={skill}>
              <label>{skill}</label>
              <input
                type="checkbox"
                checked={additionalSkills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
              />
              
            </div>
          ))}
        </div>
        {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
      </div>

      <div className="form-group">
        <label>Preferred Interview Time:</label>
        <input type="datetime-local" value={preferredInterviewTime} onChange={(e) => setPreferredInterviewTime(e.target.value)} />
        {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
