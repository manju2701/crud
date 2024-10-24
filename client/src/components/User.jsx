import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/User.css';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/users");
        console.log(response.data); 
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/user/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId)); 
        console.log("User deleted successfully");
      } catch (error) {
        console.log("Error deleting user:", error);
      }
    }
  };

  return (
    <div className='userTable'>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/add" className='add-user'>
          <i className="fas fa-user-plus"></i> Add User
        </Link>
        </div>
        {users.length===0?(
          <div className='NoData'>
            <h3>No Data to display.</h3>
            <p>please add New User</p>
          </div>
        ) :(
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.gender}</td>
                <td>
                  <div className="actionsButtons">
                    <Link to={`/update/${user._id}`} className="update">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="delete" onClick={() => handleDelete(user._id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
}

export default User;
