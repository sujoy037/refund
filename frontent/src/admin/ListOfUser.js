import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listUser } from './apiAdmin';
import { useNavigate } from 'react-router-dom';

const ListOfUser = () => {
    const navigate=useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { user, token } = isAuthenticated(); // Ensure user and token are correctly retrieved

    useEffect(() => {
        console.log('Authenticated user:', user); // Log user info
        console.log('User ID:', user ? user.userid : 'No user ID'); // Log user ID
        const loadUsers = async () => {
            try {
                const data = await listUser(user.userid, token); // Ensure user._id is correctly passed
                if (data.error) {
                    setError(data.error);
                } else {
                    setUsers(data.users);
                }
            } catch (err) {
                setError('Something went wrong');
            }
        };
        loadUsers();
    }, [user.userid,token]); // Ensure dependencies are correctly set

    const handleEdit = (userId) => {
        console.log('Edit user:', userId);
        return navigate(`/user/${userId}/details`)
    };

    const handleDelete = (userid) => {
        console.log('Delete user:', userid);
        // Implement delete functionality here
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showUsers = () => (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Date of Birth</th>
                        <th>PAN</th>
                        <th>GPF</th>
                        <th>Aadhaar</th>
                        <th>User Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{user.userid}</td>
                            <td>{user.nameoftaxofficial}</td>
                            <td>{user.designation}</td>
                            <td>{user.email}</td>
                            <td>{user.mobno}</td>
                            <td>{user.dob}</td>
                            <td>{user.pan}</td>
                            <td>{user.gpf}</td>
                            <td>{user.aadhaar}</td>
                            <td>{user.usertype === 'admin' ? 'Admin' : 'Registered User'}</td>
                            <td>
                                <button 
                                    className="btn btn-primary btn-sm mr-2" 
                                    onClick={() => handleEdit(user.userid)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(user.userid)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    

    return (
        <Layout title="List of Users" description="View all users" className='container-fluid'>
            {showError()}
            {showUsers()}
        </Layout>
    );
};

export default ListOfUser;
