const userSignupValidator = (req, res, next) => {
    req.check('userid', 'userid is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    req.check('pan', 'Pan no is required').notEmpty();
    req.check('pan')
        .isLength({ min: 10, max: 10 })
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
        .withMessage('Invalid PAN format');
    req.check('aadhaar')
        .isLength({ min: 12, max: 12 })
        .matches(/^[0-9]{12}$/)
        .withMessage('Invalid Aadhaar number format');
    req.check('mobno')
        .isLength({ min: 10, max: 10 })
        .matches(/^[0-9]{10}$/)
        .withMessage('Invalid mobile number format');

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

const userSigninValidator = (req, res, next) => {
    req.check('userid', 'userid is required').notEmpty();
    req.check('password', 'password is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

module.exports = {userSignupValidator,userSigninValidator}