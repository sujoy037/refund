const express = require('express');
const router = express.Router();
const { userById, list, updateUser, getUserDetails} = require('../controller/user');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

// Route to get the profile of a user by ID, with necessary middlewares
router.get('/user/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json(req.profile);
});

// Route to list users, excluding the logged-in user and filtered by user status
router.get('/users/:userId/list', requireSignin, isAuth, isAdmin, list);

// Route to update user information
router.put('/user/:userId', requireSignin,updateUser);

// Route to get user details
router.get('/user/:userId/details',requireSignin,getUserDetails);

// Middleware to extract userId parameter
router.param('userId', userById);

module.exports = router;
