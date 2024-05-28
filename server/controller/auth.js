const pool = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check

const signup = async (req, res) => {
    console.log(req.body);
    const { userid, nameoftaxofficial, designation, email, mobno, dob, pan, gpf, aadhaar, password } = req.body;
    const usertype = req.body.usertype || 'user';
    const userstatus = req.body.userstatus || 'active';

    try {
        const saltRounds = 8;
        const encryptedPassword = await bcrypt.hash(password, saltRounds); // Ensure password is a string
        const result = await pool.query(
            'INSERT INTO user_master (userid, nameoftaxofficial, designation, email, mobno, dob, pan, gpf, aadhaar, usertype, password, userstatus, logdt) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) ' +
            'RETURNING *',
            [userid, nameoftaxofficial, designation, email, mobno, dob, pan, gpf, aadhaar, usertype, encryptedPassword, userstatus]
        );
        res.status(200).json({ success: true, message: 'User created successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Error creating user', error });
    }
};

const signin = async (req, res) => {
    const { userid, password } = req.body;

    try {
        // Query the database for the user with the provided userid
        const result = await pool.query('SELECT * FROM user_master WHERE userid = $1', [userid]);
        // Check if user exists
        if (!result.rows[0]) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, result.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // Create JWT payload
        const payload = { userid: result.rows[0].userid, email: result.rows[0].email, usertype: result.rows[0].usertype,name:result.rows[0].nameoftaxofficial };
        // Generate a JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Persist the token as 't' in a cookie with an expiry date
        res.cookie('t', token, { httpOnly: true, expire: new Date(Date.now() + 3600000) }); // 1 hour

        // Return response with user details and token to frontend client
        const userId = result.rows[0].userid;
        const userEmail = result.rows[0].email;
        const userType = result.rows[0].usertype;
        const userName=result.rows[0].nameoftaxofficial;

        return res.json({ token, user: { userid: userId, email: userEmail, usertype: userType,username:userName } });
    } catch (error) {
        console.error('Error during sign in:', error.message);
        return res.status(500).send('Server Error');
    }
};
const signout= async(req,res)=>{
    try {
        res.clearCookie('t');
        res.json({ message: 'Signout success' });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signout:', error);
        // Send an internal server error response
        res.status(500).json({ error: 'Internal server error' });
    }
}
const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

const isAuth = (req, res, next) => {
    console.log('isAuth middleware triggered');
    console.log('req.profile:', req.profile); // Log profile data
    console.log('req.auth:', req.auth); // Log decoded token data
    const isUserAuth = req.profile && req.auth && req.profile.userid === req.auth.userid;
    console.log('isUserAuth:', isUserAuth);
    if (!isUserAuth) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};


// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    console.log('isAdmin middleware triggered');
    console.log('req.profile:', req.profile);
    if (req.profile.usertype !== 'admin') {
        return res.status(403).json({ error: 'Admin resource! Access denied' });
    }
    next();
};

module.exports = {signup,signin,signout,requireSignin,isAdmin,isAuth};
