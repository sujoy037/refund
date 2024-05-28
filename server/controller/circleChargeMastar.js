const pool = require('../dbConfig');

const createCircle = async (req, res) => {
    const { circlename, chargename, chargecode } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO circle_charge_master (circlename, chargename, chargecode) ' +
            'VALUES ($1, $2, $3) ' +
            'RETURNING *',
            [circlename, chargename, chargecode]
        );
        res.status(200).json({ success: true, message: 'Charge Circle created successfully', charge: result.rows[0] });
    } catch (error) {
        console.error('Error creating charge circle:', error);
        res.status(500).json({ success: false, message: 'Error creating charge circle', error });
    }
};
const getAllCharges = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM circle_charge_master'
        );
        res.status(200).json({ success: true, charges: result.rows });
    } catch (error) {
        console.error('Error fetching charges:', error);
        res.status(500).json({ success: false, message: 'Error fetching charges', error });
    }
};

module.exports = { createCircle, getAllCharges };
