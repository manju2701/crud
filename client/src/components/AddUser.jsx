import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/AddUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/user/addUser', formData);
      console.log("User added:", response.data); 

      navigate('/'); 
    } catch (error) {
      console.error("There was an error adding the user:", error);
    }
  };

  return (
    <div className='addUser'>
      <button className='backButton' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h3 className='title'>Add New User</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label>First Name</label>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputGroup'>
          <label>Last Name</label>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputGroup'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputGroup'>
          <label>Phone Number</label>
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputGroup'>
          <label>Address</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputGroup'>
          <label>Gender</label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <button type='submit' className='submitButton'>Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
