import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { updateUser, getUser } from './apiAdmin'; // Ensure this path is correct

const UpdateUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const {token } = isAuthenticated();

    const [values, setValues] = useState({
        userid: '',
        nameoftaxofficial: '',
        designation: '',
        email: '',
        mobno: '',
        dob: '',
        pan: '',
        gpf: '',
        aadhaar: '',
        usertype: '',
        password: '',
        error: '',
        success: false,
    });

    const {
        userid,
        nameoftaxofficial,
        designation,
        email,
        mobno,
        dob,
        pan,
        gpf,
        aadhaar,
        usertype,
        password,
        error,
        success,
    } = values;

    useEffect(() => {
        const loadUser = async () => {
            console.log('Fetching user data for userId:', userId);
            console.log('Token:', token);
            try {
                const data = await getUser(userId, token);
                console.log('API Response:', data);
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...data.user }); // Update state directly with fetched user data
                }
            } catch (err) {
                setValues({ ...values, error: 'Something went wrong' });
            }
        };
        loadUser();
    }, [userId, token]);
    

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            userid,
            nameoftaxofficial,
            designation,
            email,
            mobno,
            dob,
            pan,
            gpf,
            aadhaar,
            usertype,
            password,
        };

        try {
            const data = await updateUser(userId, userData, token);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, success: true });
                return navigate('/admin/list')
            }
        } catch (err) {
            setValues({ ...values, error: 'Something went wrong' });
        }
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            User updated successfully
        </div>
    );

    const updateUserForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">User ID</label>
                <input
                    type="text"
                    className="form-control"
                    value={userid}
                    onChange={handleChange('userid')}
                    disabled
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Name of Tax Official</label>
                <input
                    type="text"
                    className="form-control"
                    value={nameoftaxofficial}
                    onChange={handleChange('nameoftaxofficial')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Designation</label>
                <input
                    type="text"
                    className="form-control"
                    value={designation}
                    onChange={handleChange('designation')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange('email')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Mobile Number</label>
                <input
                    type="text"
                    className="form-control"
                    value={mobno}
                    onChange={handleChange('mobno')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Date of Birth</label>
                <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={handleChange('dob')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">PAN</label>
                <input
                    type="text"
                    className="form-control"
                    value={pan}
                    onChange={handleChange('pan')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">GPF</label>
                <input
                    type="text"
                    className="form-control"
                    value={gpf}
                    onChange={handleChange('gpf')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Aadhaar</label>
                <input
                    type="text"
                    className="form-control"
                    value={aadhaar}
                    onChange={handleChange('aadhaar')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">User Type</label>
                <select className="form-control" value={usertype} onChange={handleChange('usertype')}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className="btn btn-primary">Update User</button>
        </form>
    );

    return (
        <div className="container">
            <h2 className="mb-4">Update User</h2>
            {showError()}
            {showSuccess()}
            {updateUserForm()}
        </div>
    );
};

export default UpdateUser;





