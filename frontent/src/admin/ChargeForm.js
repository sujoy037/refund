import React, { useState,useEffect } from 'react';
import { createCharge ,getAllCharges} from './apiAdmin'; // Assuming correct import path
import { isAuthenticated } from '../auth';

const ChargeForm = () => {
    const [circlename, setCirclename] = useState('');
    const [chargename, setChargename] = useState('');
    const [chargecode, setChargecode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const [charges, setCharges] = useState([]);
    const [loadingCharges, setLoadingCharges] = useState(false);

    

    const fetchCharges = async () => {
        setLoadingCharges(true);
        try {
            const response = await getAllCharges(token);
            setCharges(response.charges);
        } catch (err) {
            console.error('Error fetching charges:', err.message);
        } finally {
            setLoadingCharges(false);
        }
    };

    useEffect(() => {
        fetchCharges();
    }, []);


     // destructure user and token from localstorage
     const { user, token } = isAuthenticated();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const charge = { circlename, chargename, chargecode };
            const response = await createCharge(user.userid, token, charge);
            console.log(response);
            setLoading(false);
            setSuccessMessage(response.message);
            // Clear form fields after successful submission if needed
            setCirclename('');
            setChargename('');
            setChargecode('');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Charge Circle</h2>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="circlename" className="form-label">Circle Name:</label>
                    <input type="text" className="form-control" id="circlename" value={circlename} onChange={(e) => setCirclename(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="chargename" className="form-label">Charge Name:</label>
                    <input type="text" className="form-control" id="chargename" value={chargename} onChange={(e) => setChargename(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="chargecode" className="form-label">Charge Code:</label>
                    <input type="text" className="form-control" id="chargecode" value={chargecode} onChange={(e) => setChargecode(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Create Charge Circle</button>
            </form>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Circle Name</th>
                        <th>Charge Name</th>
                        <th>Charge Code</th>
                    </tr>
                </thead>
                <tbody>
                    {charges.map((charge, index) => (
                        <tr key={index}>
                            <td>{charge.circlename}</td>
                            <td>{charge.chargename}</td>
                            <td>{charge.chargecode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChargeForm;
