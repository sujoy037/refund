const express = require('express');
const router = express.Router();
const { userById} = require('../controller/user');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { createUserJurisdiction, listUserJurisdictions, updateMultipleUserJurisdictions } = require('../controller/userjurisdiction'); // Assuming the correct path to createCircle.js
// Route to create a charge circle
router.post('/create/:userId', requireSignin, isAuth, isAdmin,createUserJurisdiction);

router.get('/list',listUserJurisdictions);

// Route to update user information
router.put('/update/:userId', requireSignin,updateMultipleUserJurisdictions);
// Middleware to extract userId parameter
router.param('userId', userById);

module.exports = router;
