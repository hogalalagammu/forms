import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [attendingWithGuest, setAttendingWithGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Email is not valid';
    if (!age || age <= 0) newErrors.age = 'Age must be greater than 0';
    if (attendingWithGuest && !guestName) newErrors.guestName = 'Guest Name is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/summary', {
        state: {
          name,
          email,
          age,
          attendingWithGuest,
          guestName,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label>Are you attending with a guest?</label>
        <input type="checkbox" checked={attendingWithGuest} onChange={(e) => setAttendingWithGuest(e.target.checked)} />
      </div>

      {attendingWithGuest && (
        <div className="form-group">
          <label>Guest Name:</label>
          <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
          {errors.guestName && <span className="error">{errors.guestName}</span>}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
