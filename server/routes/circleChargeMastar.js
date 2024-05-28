const express = require('express');
const router = express.Router();
const { userById} = require('../controller/user');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const {createCircle,getAllCharges} = require('../controller/circleChargeMastar'); // Assuming the correct path to createCircle.js
// Route to create a charge circle
router.post('/charge/create/:userId', requireSignin, isAuth, isAdmin, createCircle);

router.get('/charge/list',getAllCharges);

// Middleware to extract userId parameter
router.param('userId', userById);

module.exports = router;
