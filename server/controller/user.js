const pool = require('../dbConfig');

const userById = async (req, res, next, userId) => {
    try {
        console.log('Received userId:', userId);

        const result = await pool.query('SELECT * FROM user_master WHERE userid = $1', [userId]);
        console.log('Database query result:', result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.profile = result.rows[0];
        next();
    } catch (err) {
        next(err);
    }
};


const list = async (req, res) => {
    try {
        const currentUser = req.profile;

        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const userListResult = await pool.query(
            `SELECT * FROM user_master 
            WHERE userid != $1 
            AND (usertype = 'admin' OR usertype = 'user')`,
            [currentUser.userid]
        );

        res.json({ success: true, users: userListResult.rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const {
        nameoftaxofficial,
        designation,
        email,
        mobno,
        dob,
        pan,
        gpf,
        aadhaar,
        usertype,
        password
    } = req.body;

    try {
        // Update user information in the database
        const result = await pool.query(
            `UPDATE user_master 
             SET nameoftaxofficial = $1, 
                 designation = $2, 
                 email = $3, 
                 mobno = $4, 
                 dob = $5, 
                 pan = $6, 
                 gpf = $7, 
                 aadhaar = $8, 
                 usertype = $9, 
                 password = $10
             WHERE userid = $11`,
            [
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
                userId
            ]
        );

        // Check if the user was updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error updating user' });
    }
};
// Controller function to get user details by ID
const getUserDetails = async (req, res) => {
    try {
        // Extract userId from req.params
        console.log(req.params);
        const { userId } = req.params;

        // Query the database for the user with the provided id
        const result = await pool.query('SELECT * FROM user_master WHERE userid = $1', [userId]);

        // Check if user exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract user details from the database query result
        const user = result.rows[0];

        // Return user details in the response
        res.json({ success: true, user });
    } catch (error) {
        // Handle errors
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { userById, list, updateUser,getUserDetails};
