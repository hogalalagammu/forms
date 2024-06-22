import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './summary.css';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, age, attendingWithGuest, guestName } = location.state || {};

  if (!location.state) {
    // Redirect to form if no state is passed
    navigate('/form');
    return null;
  }

  return (
    <div className="summary-container">
      <h2>Form Summary</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Attending with Guest:</strong> {attendingWithGuest ? 'Yes' : 'No'}</p>
      {attendingWithGuest && <p><strong>Guest Name:</strong> {guestName}</p>}
    </div>
  );
};

export default Summary;
