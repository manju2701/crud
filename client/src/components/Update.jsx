import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Update.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

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
      const response = await axios.put(`http://localhost:5000/user/users/${id}`, formData);
      console.log("User updated:", response.data); 

      navigate('/'); 
    } catch (error) {
      console.error("There was an error updating the user:", error);
    }
  };

  return (
    <div className='addUser'>
      <button className='backButton' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h3 className='title'>Update User</h3>
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
        <button type='submit' className='submitButton'>Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
