// Import your database connection pool
const pool = require('../dbConfig');

// Controller function to insert data into user_jurisdiction table
const createUserJurisdiction = async (req, res) => {
    const { userid, chargecodes, fromdt, todt, status } = req.body;

    if (!Array.isArray(chargecodes) || chargecodes.length === 0) {
        return res.status(400).json({ success: false, message: 'chargecodes should be a non-empty array' });
    }

    try {
        const promises = chargecodes.map(chargecode => {
            return pool.query(
                'INSERT INTO public.user_jurisdiction(userid, chargecode, fromdt, todt, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [userid, chargecode, fromdt, todt, status]
            );
        });

        const results = await Promise.all(promises);

        const insertedRows = results.map(result => result.rows[0]);

        res.status(200).json({ success: true, message: 'User jurisdictions created successfully', data: insertedRows });
    } catch (error) {
        console.error('Error creating user jurisdiction:', error);
        res.status(500).json({ success: false, message: 'Error creating user jurisdiction', error: error.message });
    }
};
// Controller function to retrieve list of user jurisdictions
const listUserJurisdictions = async (req, res) => {
    try {
        // Query to fetch all user jurisdictions
        const { rows } = await pool.query('SELECT * FROM public.user_jurisdiction');

        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching user jurisdictions:', error);
        res.status(500).json({ success: false, message: 'Error fetching user jurisdictions', error: error.message });
    }
};



// Controller function to update data in user_jurisdiction table for multiple chargecodes
const updateMultipleUserJurisdictions = async (req, res) => {
    try {
        const { userid, jurisdictions } = req.body;

        // Check if userid and jurisdictions array are provided
        if (!userid || !Array.isArray(jurisdictions) || jurisdictions.length === 0) {
            return res.status(400).json({ success: false, message: 'userid and jurisdictions array are required' });
        }

        // Iterate over the jurisdictions array and execute update queries for each chargecode
        for (const jurisdiction of jurisdictions) {
            const { chargecode, fromdt, todt, status } = jurisdiction;
            // Execute the SQL update query for each chargecode
            await pool.query(
                'UPDATE public.user_jurisdiction SET fromdt = $1, todt = $2, status = $3 WHERE userid = $4 AND chargecode = $5',
                [fromdt, todt, status, userid, chargecode]
            );
        }

        res.status(200).json({ success: true, message: 'User jurisdictions updated successfully' });
    } catch (error) {
        console.error('Error updating user jurisdictions:', error);
        res.status(500).json({ success: false, message: 'Error updating user jurisdictions', error: error.message });
    }
};



module.exports = { createUserJurisdiction,listUserJurisdictions,updateMultipleUserJurisdictions };
