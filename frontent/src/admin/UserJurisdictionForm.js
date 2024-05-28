import React, { useState, useEffect } from 'react';
import { createUserJurisdiction, getAllCharges ,getAllJurisdiction,listUser} from './apiAdmin'; // Assuming correct import path
import { isAuthenticated } from '../auth';

const UserJurisdictionForm = () => {
    const [userid, setUserid] = useState('');
    const [chargecodes, setChargecodes] = useState([]);
    const [fromdt, setFromdt] = useState('');
    const [todt, setTodt] = useState('');
    const [status, setStatus] = useState('');
    const [charges, setCharges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [users, setUsers] = useState([]); 

    const [userJurisdictions, setUserJurisdictions] = useState([]);

    const { user, token } = isAuthenticated();

    const fetchCharges = async () => {
        try {
            const response = await getAllCharges(token);
            setCharges(response.charges);
        } catch (err) {
            console.error('Error fetching charges:', err.message);
        }
    };

    const fetchJurisdictions = async () => {
        try {
            const response = await getAllJurisdiction(token);
            setUserJurisdictions(response.data); 
        } catch (err) {
            console.error('Error fetching user jurisdictions:', err.message);
            setError('Error fetching user jurisdictions');
        }
    };
    

   

    useEffect(() => {
        fetchCharges();
      fetchJurisdictions();
    }, [token]);

    const handleChargecodeChange = (e) => {
        const { value, checked } = e.target;
        setChargecodes((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter((code) => code !== value);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = {
                userid,
                chargecodes,
                fromdt,
                todt,
                status
            };
            const response = await createUserJurisdiction(user.userid, token, data);
            setLoading(false);
            setSuccessMessage(response.message);
            // Clear form fields after successful submission if needed
            setUserid('');
            setChargecodes([]);
            setFromdt('');
            setTodt('');
            setStatus('');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create User Jurisdiction</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userid" className="form-label">User ID:</label>
                    <input type="text" className="form-control" id="userid" value={userid} onChange={(e) => setUserid(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Charge Codes:</label>
                    {charges.map((charge) => (
                        <div key={charge.chargecode} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={charge.chargecode}
                                onChange={handleChargecodeChange}
                                checked={chargecodes.includes(charge.chargecode.toString())}
                            />
                            <label className="form-check-label">
                                {charge.chargename}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-3">
                    <label htmlFor="fromdt" className="form-label">From Date:</label>
                    <input type="date" className="form-control" id="fromdt" value={fromdt} onChange={(e) => setFromdt(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="todt" className="form-label">To Date:</label>
                    <input type="date" className="form-control" id="todt" value={todt} onChange={(e) => setTodt(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status:</label>
                    <input type="text" className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Create User Jurisdiction</button>
            </form>
            <h2>User Jurisdictions</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Charge Code</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userJurisdictions  && userJurisdictions.map((jurisdiction, index) => (
                        <tr key={index}>
                            <td>{jurisdiction.userid}</td>
                            <td>{jurisdiction.chargecode}</td>
                            <td>{new Date(jurisdiction.fromdt).toLocaleDateString()}</td>
                            <td>{new Date(jurisdiction.todt).toLocaleDateString()}</td>
                            <td>{jurisdiction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserJurisdictionForm;
